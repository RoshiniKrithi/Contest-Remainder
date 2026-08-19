import { Fingerprint } from "./winnowing";

export interface MatchResult {
  similarityScore: number; // 0 to 100
  matchedFingerprintCount: number;
  totalFingerprintsA: number;
  totalFingerprintsB: number;
  explanation: string;
}

/**
 * Calculates Jaccard similarity between two sets of fingerprints
 * Filters out low-discriminative / common hashes to avoid false positives
 */
export function calculateAstSimilarity(
  fingerprintsA: Fingerprint[],
  fingerprintsB: Fingerprint[]
): MatchResult {
  const setA = new Set(fingerprintsA.map((f) => f.hash));
  const setB = new Set(fingerprintsB.map((f) => f.hash));

  if (setA.size === 0 || setB.size === 0) {
    return {
      similarityScore: 0,
      matchedFingerprintCount: 0,
      totalFingerprintsA: setA.size,
      totalFingerprintsB: setB.size,
      explanation: "No AST fingerprints available for structural comparison.",
    };
  }

  // Calculate Intersection
  let intersectionCount = 0;
  for (const hash of setA) {
    if (setB.has(hash)) {
      intersectionCount++;
    }
  }

  // Calculate Union
  const unionSize = setA.size + setB.size - intersectionCount;
  const jaccard = intersectionCount / (unionSize || 1);
  const similarityScore = Math.round(jaccard * 100);

  // Generate clear explanations for instructors
  let explanation = "";
  if (similarityScore >= 80) {
    explanation = `High structural similarity (${similarityScore}%). The loop nesting, function calls, and control-flow layout match almost perfectly, suggesting a shared codebase.`;
  } else if (similarityScore >= 50) {
    explanation = `Moderate structural similarity (${similarityScore}%). Significant portions of code structure block matches, indicating potential code block copying or identical algorithm decomposition.`;
  } else {
    explanation = `Low structural similarity (${similarityScore}%). Distinct structure topologies indicate independently solved implementations.`;
  }

  return {
    similarityScore,
    matchedFingerprintCount: intersectionCount,
    totalFingerprintsA: setA.size,
    totalFingerprintsB: setB.size,
    explanation,
  };
}
