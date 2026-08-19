import { Router } from "express";
import { db } from "../db";
import {
  integrityEvents,
  telemetrySnapshots,
  integrityReports,
  integrityAuditLogs,
  users,
  submissions,
  userDsaProgress,
  problems,
  dsaProblems,
} from "../shared/schema";
import { eq, desc, and } from "drizzle-orm";
import { parseCode, getAstNodeCount, getCyclomaticComplexity } from "../services/integrity/ast/parser";

const router = Router();

// Helper to check admin access
function isAdmin(req: any): boolean {
  return !!(req.isAuthenticated && req.isAuthenticated() && req.user && (req.user.role === "admin" || req.user.role === "staff"));
}

/**
 * POST /api/integrity/events
 * Upload event telemetry batch
 */
router.post("/integrity/events", async (req: any, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { sessionId, problemId, events } = req.body;
  if (!sessionId || !problemId || !Array.isArray(events)) {
    return res.status(400).json({ error: "Invalid payload parameters" });
  }

  try {
    const userId = req.user.id;
    const values = events.map((e: any) => ({
      sessionId,
      userId,
      problemId: String(problemId),
      eventType: e.eventType,
      timestamp: e.timestamp ? new Date(e.timestamp) : new Date(),
      cursorOffset: e.cursorOffset || 0,
      payload: e.payload || {},
    }));

    if (values.length > 0) {
      await db.insert(integrityEvents).values(values);
    }

    res.json({ success: true, count: values.length });
  } catch (err: any) {
    console.error("Error saving telemetry events:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/integrity/snapshots
 * Upload code checkpoints and update AST node/complexity telemetry metrics
 */
router.post("/integrity/snapshots", async (req: any, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { sessionId, problemId, code, language, totalCharCount } = req.body;
  if (!sessionId || !problemId || code === undefined) {
    return res.status(400).json({ error: "Invalid snapshot parameters" });
  }

  try {
    const userId = req.user.id;
    const astNodes = parseCode(code, language || "javascript");
    const nodeCount = getAstNodeCount(astNodes);
    const complexity = getCyclomaticComplexity(astNodes);

    const [snapshot] = await db
      .insert(telemetrySnapshots)
      .values({
        userId,
        problemId: String(problemId),
        sessionId,
        totalCharCount: totalCharCount || code.length,
        astNodeCount: nodeCount,
        cyclomaticComplexity: complexity,
        codeDelta: [],
        metadata: {},
      } as any)
      .returning();

    res.json({ success: true, snapshotId: snapshot.id, nodeCount, complexity });
  } catch (err: any) {
    console.error("Error saving telemetry snapshot:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/integrity/reports/:submissionId
 * Student checking their own report (or Admin checking it)
 */
router.get("/integrity/reports/:submissionId", async (req: any, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const userId = req.user.id;
    const subId = req.params.submissionId;

    const [report] = await db
      .select()
      .from(integrityReports)
      .where(eq(integrityReports.submissionId, subId))
      .limit(1);

    if (!report) {
      return res.status(404).json({ error: "Integrity report not found" });
    }

    // Students can only access their own reports
    if (report.userId !== userId && !isAdmin(req)) {
      return res.status(403).json({ error: "Access denied." });
    }

    res.json(report);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/integrity/reports/dsa/:dsaProgressId
 * Retrieve integrity report for DSA progress record
 */
router.get("/integrity/reports/dsa/:dsaProgressId", async (req: any, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const userId = req.user.id;
    const progressId = parseInt(req.params.dsaProgressId, 10);

    const [report] = await db
      .select()
      .from(integrityReports)
      .where(eq(integrityReports.userDsaProgressId, progressId))
      .limit(1);

    if (!report) {
      return res.status(404).json({ error: "Integrity report not found" });
    }

    if (report.userId !== userId && !isAdmin(req)) {
      return res.status(403).json({ error: "Access denied." });
    }

    res.json(report);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/admin/integrity/reports
 * Admin Dashboard - lists all integrity reports
 */
router.get("/admin/integrity/reports", async (req: any, res) => {
  if (!isAdmin(req)) {
    return res.status(403).json({ error: "Access denied. Admin privileges required." });
  }

  try {
    const reportsList = await db
      .select()
      .from(integrityReports)
      .orderBy(desc(integrityReports.overallRiskScore));

    // Hydrate reports with student username, problem title info
    const [allUsers, allProblems, allDsaProblems] = await Promise.all([
      db.select().from(users),
      db.select().from(problems),
      db.select().from(dsaProblems),
    ]);

    const userMap = new Map(allUsers.map((u) => [u.id, u.username]));
    const probMap = new Map(allProblems.map((p) => [p.id, p.title]));
    const dsaProbMap = new Map(allDsaProblems.map((p) => [String(p.id), p.title]));

    const hydrated = reportsList.map((rep) => {
      const isDsa = !!rep.userDsaProgressId;
      const problemTitle = isDsa ? dsaProbMap.get(rep.problemId) : probMap.get(rep.problemId);

      return {
        ...rep,
        username: userMap.get(rep.userId) || "anonymous",
        problemTitle: problemTitle || `Problem ${rep.problemId}`,
        contextType: isDsa ? "DSA Sheet" : "Contest Challenge",
      };
    });

    res.json(hydrated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/admin/integrity/reports/:id
 * Fetch detailed single report with full timeline events and audit trail log
 */
router.get("/admin/integrity/reports/detail/:id", async (req: any, res) => {
  if (!isAdmin(req)) {
    return res.status(403).json({ error: "Access denied. Admin privileges required." });
  }

  try {
    const reportId = req.params.id;

    const [report] = await db
      .select()
      .from(integrityReports)
      .where(eq(integrityReports.id, reportId))
      .limit(1);

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    // Hydrate student information
    const [student] = await db.select().from(users).where(eq(users.id, report.userId)).limit(1);

    // Fetch related events and snapshots for DVR timeline reconstruction
    const [events, snapshots] = await Promise.all([
      db.select().from(integrityEvents).where(eq(integrityEvents.sessionId, report.sessionId)).orderBy(integrityEvents.timestamp),
      db.select().from(telemetrySnapshots).where(eq(telemetrySnapshots.sessionId, report.sessionId)).orderBy(telemetrySnapshots.timestamp),
    ]);

    // Create Admin Audit Trail Log
    await db.insert(integrityAuditLogs).values({
      adminUserId: req.user.id,
      reportId: report.id,
      action: `Viewed integrity report details for student ${student?.username || "unknown"}`,
    });

    res.json({
      report,
      username: student?.username || "anonymous",
      events,
      snapshots,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/admin/integrity/matches/:id
 * Retrieve code differences between current submission and best matched code
 */
router.get("/admin/integrity/matches/:id", async (req: any, res) => {
  if (!isAdmin(req)) {
    return res.status(403).json({ error: "Access denied. Admin privileges required." });
  }

  try {
    const reportId = req.params.id;
    const [report] = await db.select().from(integrityReports).where(eq(integrityReports.id, reportId)).limit(1);

    if (!report) return res.status(404).json({ error: "Report not found" });

    // Fetch current code
    let currentCode = "";
    if (report.submissionId) {
      const [sub] = await db.select().from(submissions).where(eq(submissions.id, report.submissionId)).limit(1);
      currentCode = sub?.code || "";
    } else if (report.userDsaProgressId) {
      const [prog] = await db.select().from(userDsaProgress).where(eq(userDsaProgress.id, report.userDsaProgressId)).limit(1);
      currentCode = prog?.code || "";
    }

    // Fetch matched code
    let matchedCode = "";
    let matchedUser = "Another Operative";

    if (report.matchedSubmissionId) {
      const [sub] = await db.select().from(submissions).where(eq(submissions.id, report.matchedSubmissionId)).limit(1);
      matchedCode = sub?.code || "";
      if (sub) {
        const [u] = await db.select().from(users).where(eq(users.id, sub.userId)).limit(1);
        matchedUser = u?.username || matchedUser;
      }
    } else if (report.matchedUserDsaProgressId) {
      const [prog] = await db.select().from(userDsaProgress).where(eq(userDsaProgress.id, report.matchedUserDsaProgressId)).limit(1);
      matchedCode = prog?.code || "";
      if (prog) {
        const [u] = await db.select().from(users).where(eq(users.id, prog.userId)).limit(1);
        matchedUser = u?.username || matchedUser;
      }
    }

    res.json({
      currentCode,
      matchedCode,
      matchedUser,
      astSimilarityScore: report.astSimilarityScore,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
