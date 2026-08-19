import { analyzeTelemetryCadence } from "../../services/integrity/telemetry/cadenceAnalyzer";
import { calculateRiskScore } from "../../services/integrity/scoring/riskScorer";

console.log("🧪 Running Telemetry and Risk Scorer verification test...");

const mockRoboticEvents = [
  { eventType: "KEYSTROKE", timestamp: "2026-08-19T00:00:00.000Z" },
  { eventType: "KEYSTROKE", timestamp: "2026-08-19T00:00:00.100Z" },
  { eventType: "KEYSTROKE", timestamp: "2026-08-19T00:00:00.200Z" },
  { eventType: "KEYSTROKE", timestamp: "2026-08-19T00:00:00.300Z" },
  { eventType: "KEYSTROKE", timestamp: "2026-08-19T00:00:00.400Z" },
  { eventType: "KEYSTROKE", timestamp: "2026-08-19T00:00:00.500Z" },
];

const mockCopyPasteEvents = [
  { eventType: "PASTE", timestamp: "2026-08-19T00:00:01.000Z", payload: { insertedLength: 850 } },
];

const mockSnapshots = [
  { timestamp: "2026-08-19T00:00:00.000Z", astNodeCount: 5, totalCharCount: 50 },
  { timestamp: "2026-08-19T00:00:01.000Z", astNodeCount: 95, totalCharCount: 900 },
];

try {
  // Test robotic cadence parsing
  const roboticMetrics = analyzeTelemetryCadence(mockRoboticEvents, [{ timestamp: "2026-08-19T00:00:00.500Z", totalCharCount: 100 }]);
  console.log(`✅ Robotic IKI average calculated: ${roboticMetrics.ikiAverageMs}ms, Entropy: ${roboticMetrics.ikiEntropy}`);
  
  const roboticRisk = calculateRiskScore(20, roboticMetrics);
  if (!roboticRisk.flagReasons.includes("LOW_CADENCE_VARIANCE")) {
    throw new Error("Expected robotic metrics to trigger LOW_CADENCE_VARIANCE");
  }

  // Test paste metrics parsing
  const pasteMetrics = analyzeTelemetryCadence(mockCopyPasteEvents, mockSnapshots);
  console.log(`✅ Paste Ratio calculated: ${pasteMetrics.pasteRatio}%, AST Max Velocity: ${pasteMetrics.astVelocityMax}`);
  
  if (pasteMetrics.pasteRatio < 90) {
    throw new Error(`Expected paste ratio to be >90%, got: ${pasteMetrics.pasteRatio}%`);
  }

  const pasteRisk = calculateRiskScore(85, pasteMetrics);
  if (!pasteRisk.flagReasons.includes("HIGH_PASTE_RATIO")) {
    throw new Error("Expected paste metrics to trigger HIGH_PASTE_RATIO");
  }
  if (!pasteRisk.flagReasons.includes("HIGH_AST_SIMILARITY")) {
    throw new Error("Expected high match to trigger HIGH_AST_SIMILARITY");
  }

  console.log(`✅ Risk score correctly classified as: ${pasteRisk.riskLevel} (${pasteRisk.overallRiskScore}%)`);
  if (pasteRisk.riskLevel !== "HIGH RISK") {
    throw new Error(`Expected HIGH RISK level, got: ${pasteRisk.riskLevel}`);
  }

  console.log("🎉 Telemetry and Scorer verification tests passed successfully!");
  process.exit(0);
} catch (err) {
  console.error("❌ Telemetry verification tests failed:", err);
  process.exit(1);
}
