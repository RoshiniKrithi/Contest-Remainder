import { TelemetryMetrics } from "../telemetry/cadenceAnalyzer";

export interface RiskReport {
  overallRiskScore: number; // 0 to 100
  riskLevel: "LOW RISK" | "MODERATE RISK" | "HIGH RISK";
  flagReasons: string[];
  signals: Array<{ name: string; value: number; weight: number }>;
}

/**
 * Calculates behavioral risk scores based on telemetry cadence and AST matching
 */
export function calculateRiskScore(
  astSimilarity: number,
  telemetry: TelemetryMetrics
): RiskReport {
  const flagReasons: string[] = [];
  const signals: Array<{ name: string; value: number; weight: number }> = [];

  // 1. AST Similarity (Weight: 40%)
  signals.push({ name: "AST Structural Similarity", value: astSimilarity, weight: 0.4 });
  if (astSimilarity >= 75) {
    flagReasons.push("HIGH_AST_SIMILARITY");
  }

  // 2. Keystroke Cadence Entropy (Weight: 25%)
  // A low entropy implies highly uniform, robotic, or scripted typing rhythms
  let cadenceScore = 0;
  if (telemetry.ikiAverageMs > 0 && telemetry.ikiEntropy >= 0) {
    if (telemetry.ikiEntropy < 1.5) {
      cadenceScore = 80;
      flagReasons.push("LOW_CADENCE_VARIANCE");
    } else if (telemetry.ikiEntropy < 2.5) {
      cadenceScore = 40;
    }
  }
  signals.push({ name: "Keystroke Cadence Anomaly", value: cadenceScore, weight: 0.25 });

  // 3. AST Velocity Spikes (Weight: 20%)
  // Unusually fast node creation in short spans indicates copy-pasting structure
  let velocityScore = 0;
  if (telemetry.astVelocityMax > 15) {
    velocityScore = 100;
    flagReasons.push("AST_VELOCITY_SPIKE");
  } else if (telemetry.astVelocityMax > 5) {
    velocityScore = 50;
  }
  signals.push({ name: "AST Structural Insertion Velocity", value: velocityScore, weight: 0.2 });

  // 4. Paste Ratio (Weight: 15%)
  // High volume of code inserted via paste events
  signals.push({ name: "Pasted Code Ratio", value: telemetry.pasteRatio, weight: 0.15 });
  if (telemetry.pasteRatio >= 70) {
    flagReasons.push("HIGH_PASTE_RATIO");
  } else if (telemetry.pasteRatio >= 40) {
    flagReasons.push("MODERATE_PASTE_RATIO");
  }

  // Add friction signals if key flags were low
  if (telemetry.backspaceCount === 0 && telemetry.deleteCount === 0 && telemetry.pasteRatio > 20) {
    flagReasons.push("LOW_FRICTION_SIGNAL");
  }

  // Compute overall weighted risk score
  let overallRiskScore = 0;
  for (const sig of signals) {
    overallRiskScore += sig.value * sig.weight;
  }
  overallRiskScore = Math.min(100, Math.max(0, Math.round(overallRiskScore)));

  let riskLevel: "LOW RISK" | "MODERATE RISK" | "HIGH RISK" = "LOW RISK";
  if (overallRiskScore >= 65) {
    riskLevel = "HIGH RISK";
  } else if (overallRiskScore >= 25) {
    riskLevel = "MODERATE RISK";
  }

  return {
    overallRiskScore,
    riskLevel,
    flagReasons,
    signals,
  };
}
