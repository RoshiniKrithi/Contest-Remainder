import { db } from "../../db";
import {
  telemetrySnapshots,
  integrityReports,
  integrityEvents,
  submissions as dbSubmissions,
  userDsaProgress,
} from "../../shared/schema";
import { eq, and, not } from "drizzle-orm";
import { parseCode, getAstNodeCount, getCyclomaticComplexity } from "./ast/parser";
import { getAstFingerprints } from "./ast/winnowing";
import { calculateAstSimilarity } from "./ast/treeMatcher";
import { analyzeTelemetryCadence } from "./telemetry/cadenceAnalyzer";
import { calculateRiskScore } from "./scoring/riskScorer";

export interface IntegrityEngineConfig {
  userId: string;
  problemId: string;
  code: string;
  language: string;
  sessionId: string;
  submissionId?: string; // standard submissions
  userDsaProgressId?: number; // dsa progress submissions
}

/**
 * Global Integrity Engine Orchestrator
 */
export async function runIntegrityAnalysis(config: IntegrityEngineConfig): Promise<any> {
  const { userId, problemId, code, language, sessionId, submissionId, userDsaProgressId } = config;

  try {
    console.log(`📡 [IntegrityEngine] Running code integrity analysis for session ${sessionId}...`);

    // 1. Fetch telemetry events and snapshots for this session from DB
    const [events, snapshots] = await Promise.all([
      db.select().from(integrityEvents).where(eq(integrityEvents.sessionId, sessionId)),
      db.select().from(telemetrySnapshots).where(eq(telemetrySnapshots.sessionId, sessionId)),
    ]);

    // 2. Parse current code into normalized AST nodes & fingerprints
    const astNodes = parseCode(code, language);
    const nodeCount = getAstNodeCount(astNodes);
    const complexity = getCyclomaticComplexity(astNodes);
    const currentFingerprints = getAstFingerprints(astNodes);

    // 3. Find candidates for structural comparison
    // Compare standard submissions and user dsa progress tables on the SAME problemId
    let maxSimilarityScore = 0;
    let matchedSubmissionId: string | null = null;
    let matchedUserDsaProgressId: number | null = null;
    let bestMatchExplanation = "No matching prior submissions found.";

    // Query standard submissions
    const priorSubmissions = await db
      .select()
      .from(dbSubmissions)
      .where(and(eq(dbSubmissions.problemId, problemId), not(eq(dbSubmissions.userId, userId))));

    for (const sub of priorSubmissions) {
      if (!sub.code) continue;
      const subNodes = parseCode(sub.code, sub.language);
      const subFingerprints = getAstFingerprints(subNodes);
      const match = calculateAstSimilarity(currentFingerprints, subFingerprints);

      if (match.similarityScore > maxSimilarityScore) {
        maxSimilarityScore = match.similarityScore;
        matchedSubmissionId = sub.id;
        matchedUserDsaProgressId = null;
        bestMatchExplanation = match.explanation;
      }
    }

    // Query DSA progress submissions
    const priorDsaProgress = await db
      .select()
      .from(userDsaProgress)
      .where(and(eq(userDsaProgress.problemId, parseInt(problemId, 10) || 0), not(eq(userDsaProgress.userId, userId))));

    for (const prog of priorDsaProgress) {
      if (!prog.code || !prog.language) continue;
      const progNodes = parseCode(prog.code, prog.language);
      const progFingerprints = getAstFingerprints(progNodes);
      const match = calculateAstSimilarity(currentFingerprints, progFingerprints);

      if (match.similarityScore > maxSimilarityScore) {
        maxSimilarityScore = match.similarityScore;
        matchedSubmissionId = null;
        matchedUserDsaProgressId = prog.id;
        bestMatchExplanation = match.explanation;
      }
    }

    // 4. Run telemetry cadence metrics analysis
    const telemetryMetrics = analyzeTelemetryCadence(events, snapshots);

    // 5. Compute overall risk scoring & flags
    const riskReport = calculateRiskScore(maxSimilarityScore, telemetryMetrics);

    // If similarity matched another user, append to flags
    const flags = [...riskReport.flagReasons];
    if (maxSimilarityScore >= 75) {
      flags.push("MATCHED_STRUCTURAL_SUBMISSION");
    }

    // 6. Write final report into Database
    const [report] = await db
      .insert(integrityReports)
      .values({
        submissionId: submissionId || null,
        userDsaProgressId: userDsaProgressId || null,
        userId,
        problemId,
        sessionId,
        astSimilarityScore: maxSimilarityScore,
        aiAttributionScore: 0, // calculated from metadata when applicable
        overallRiskScore: riskReport.overallRiskScore,
        matchedSubmissionId,
        matchedUserDsaProgressId,
        structuralFingerprints: currentFingerprints as any,
        signals: riskReport.signals as any,
        flagReasons: flags as any,
        confidenceScore: 90,
      } as any)
      .returning();

    console.log(`✅ [IntegrityEngine] Saved report for session ${sessionId}. Risk score: ${report.overallRiskScore} (${riskReport.riskLevel})`);
    return report;
  } catch (err) {
    console.error("❌ [IntegrityEngine] Error during integrity analysis:", err);
    // Failure tolerance: never block normal submissions
    return null;
  }
}
