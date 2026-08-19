import { Router } from "express";
import { db } from "../db";
import { dsaSheets, dsaTopics, dsaSubtopics, dsaProblems, userDsaProgress, users } from "../shared/schema";
import { eq, and, asc } from "drizzle-orm";
import { executeCode } from "../judge";
import { getProblemDetailsSpec } from "../scripts/dsaProblemCatalog";

const router = Router();

// Helper to check admin access
function isAdmin(req: any): boolean {
  return !!(req.isAuthenticated && req.isAuthenticated() && req.user && (req.user.role === "admin" || req.user.role === "staff"));
}

// Helper to calculate streak from solved progress records
function calculateStreak(progressRecords: Array<{ status: string; solvedAt?: Date | null }>): number {
  const solvedDates = progressRecords
    .filter(p => p.status === "solved" && p.solvedAt)
    .map(p => {
      const d = new Date(p.solvedAt!);
      return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
    });

  if (solvedDates.length === 0) return 0;

  const uniqueSorted = Array.from(new Set(solvedDates)).sort().reverse();
  const now = new Date();
  const todayStr = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}`;
  
  const yest = new Date(now);
  yest.setUTCDate(yest.getUTCDate() - 1);
  const yesterdayStr = `${yest.getUTCFullYear()}-${String(yest.getUTCMonth() + 1).padStart(2, '0')}-${String(yest.getUTCDate()).padStart(2, '0')}`;

  let checkDateStr = uniqueSorted.includes(todayStr) ? todayStr : (uniqueSorted.includes(yesterdayStr) ? yesterdayStr : null);
  if (!checkDateStr) return 0;

  let streak = 0;
  let checkDate = new Date(checkDateStr + "T00:00:00Z");

  while (true) {
    const dStr = `${checkDate.getUTCFullYear()}-${String(checkDate.getUTCMonth() + 1).padStart(2, '0')}-${String(checkDate.getUTCDate()).padStart(2, '0')}`;
    if (uniqueSorted.includes(dStr)) {
      streak++;
      checkDate.setUTCDate(checkDate.getUTCDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

// ── 1. GET /api/dsa/modules ───────────────────────────────────────────
router.get("/dsa/modules", async (req: any, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated() || !req.user) {
    return res.status(401).json({ error: "Authentication required. Please log in." });
  }

  try {
    const userId = req.user.id;

    // Fetch all topics, subtopics, problems, and user progress
    const [topics, subtopics, problems, progressList] = await Promise.all([
      db.select().from(dsaTopics).orderBy(asc(dsaTopics.orderIndex), asc(dsaTopics.id)),
      db.select().from(dsaSubtopics).orderBy(asc(dsaSubtopics.orderIndex), asc(dsaSubtopics.id)),
      db.select().from(dsaProblems).orderBy(asc(dsaProblems.orderIndex), asc(dsaProblems.id)),
      db.select().from(userDsaProgress).where(eq(userDsaProgress.userId, userId)),
    ]);

    const progressMap = new Map<number, typeof progressList[0]>();
    for (const p of progressList) {
      progressMap.set(p.problemId, p);
    }

    let totalSheetProblems = 0;
    let totalSheetSolved = 0;

    const topicsData = topics.map(topic => {
      const topicSubtopics = subtopics.filter(st => st.topicId === topic.id);
      let topicTotalProblems = 0;
      let topicSolvedProblems = 0;

      const subtopicsList = topicSubtopics.map(subtopic => {
        const subProblems = problems.filter(p => p.subtopicId === subtopic.id);
        let subSolvedCount = 0;

        const problemsList = subProblems.map(p => {
          const prog = progressMap.get(p.id);
          const status = prog?.status || "unsolved";
          if (status === "solved") subSolvedCount++;

          const spec = getProblemDetailsSpec(p.title);

          return {
            id: p.id,
            title: p.title,
            platform: p.platform,
            problemUrl: p.problemUrl,
            difficulty: p.difficulty,
            judge0ProblemId: p.judge0ProblemId,
            orderIndex: p.orderIndex,
            status,
            description: p.description || spec.description,
            sampleInput: p.sampleInput || spec.sampleInput,
            sampleOutput: p.sampleOutput || spec.sampleOutput,
            explanation: p.explanation || spec.explanation,
            testCases: p.testCases && (p.testCases as any[]).length > 0 ? p.testCases : spec.testCases,
            starterCode: p.starterCode && Object.keys(p.starterCode as any).length > 0 ? p.starterCode : spec.starterCode,
            savedCode: prog?.code || null,
            savedLanguage: prog?.language || null,
            timeSpent: prog?.timeSpent || 0,
            solvedAt: prog?.solvedAt || null,
          };
        });

        const subTotal = problemsList.length;
        topicTotalProblems += subTotal;
        topicSolvedProblems += subSolvedCount;

        const subProgress = subTotal > 0 ? Number(((subSolvedCount / subTotal) * 100).toFixed(1)) : 0;

        return {
          id: subtopic.id,
          title: subtopic.title,
          description: subtopic.description,
          orderIndex: subtopic.orderIndex,
          totalProblems: subTotal,
          solvedProblems: subSolvedCount,
          progress: subProgress,
          problems: problemsList,
        };
      });

      const topicProgress = topicTotalProblems > 0 ? Number(((topicSolvedProblems / topicTotalProblems) * 100).toFixed(1)) : 0;
      totalSheetProblems += topicTotalProblems;
      totalSheetSolved += topicSolvedProblems;

      return {
        id: topic.id,
        title: topic.title,
        description: topic.description,
        orderIndex: topic.orderIndex,
        totalProblems: topicTotalProblems,
        solvedProblems: topicSolvedProblems,
        progress: topicProgress,
        subtopics: subtopicsList,
      };
    });

    const overallProgress = totalSheetProblems > 0 ? Number(((totalSheetSolved / totalSheetProblems) * 100).toFixed(1)) : 0;

    res.json({
      overall: {
        totalProblems: totalSheetProblems,
        solvedProblems: totalSheetSolved,
        progress: overallProgress,
      },
      topics: topicsData,
    });
  } catch (error) {
    console.error("Error fetching DSA modules:", error);
    res.status(500).json({ error: "Failed to fetch DSA modules." });
  }
});

// ── 2. POST /api/dsa/problems/:id/status ──────────────────────────────
router.post("/dsa/problems/:id/status", async (req: any, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated() || !req.user) {
    return res.status(401).json({ error: "Authentication required. Please log in." });
  }

  const problemId = parseInt(req.params.id, 10);
  if (isNaN(problemId)) {
    return res.status(400).json({ error: "Invalid problem ID" });
  }

  const { status, code, language, timeSpent, notes } = req.body;
  const allowedStatuses = ["unsolved", "attempted", "solved"];
  if (!status || !allowedStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${allowedStatuses.join(", ")}` });
  }

  try {
    const userId = req.user.id;

    // Check if problem exists
    const [problem] = await db.select().from(dsaProblems).where(eq(dsaProblems.id, problemId)).limit(1);
    if (!problem) {
      return res.status(404).json({ error: "DSA problem not found" });
    }

    const [existing] = await db.select().from(userDsaProgress)
      .where(and(eq(userDsaProgress.userId, userId), eq(userDsaProgress.problemId, problemId)))
      .limit(1);

    const now = new Date();
    const solvedAtDate = status === "solved" ? (existing?.solvedAt || now) : null;
    const newTimeSpent = (existing?.timeSpent || 0) + (timeSpent || 0);

    let updatedRecord: any;
    if (existing) {
      [updatedRecord] = await db.update(userDsaProgress)
        .set({
          status,
          code: code !== undefined ? code : existing.code,
          language: language !== undefined ? language : existing.language,
          timeSpent: newTimeSpent,
          notes: notes !== undefined ? notes : existing.notes,
          solvedAt: solvedAtDate,
          updatedAt: now,
        } as any)
        .where(eq(userDsaProgress.id, existing.id))
        .returning();
    } else {
      [updatedRecord] = await db.insert(userDsaProgress)
        .values({
          userId,
          problemId,
          status,
          code: code || null,
          language: language || null,
          timeSpent: newTimeSpent,
          notes: notes || null,
          solvedAt: solvedAtDate,
          updatedAt: now,
        } as any)
        .returning();
    }

    res.json({
      success: true,
      problemId,
      status: updatedRecord.status,
      code: updatedRecord.code,
      language: updatedRecord.language,
      solvedAt: updatedRecord.solvedAt,
      updatedAt: updatedRecord.updatedAt,
    });
  } catch (error) {
    console.error("Error updating DSA problem status:", error);
    res.status(500).json({ error: "Failed to update problem status." });
  }
});

// ── 3. POST /api/dsa/problems/:id/run — In-App IDE Run Code ───────────
router.post("/dsa/problems/:id/run", async (req: any, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated() || !req.user) {
    return res.status(401).json({ error: "Authentication required. Please log in." });
  }

  const problemId = parseInt(req.params.id, 10);
  if (isNaN(problemId)) {
    return res.status(400).json({ error: "Invalid problem ID" });
  }

  const { code, language, stdin } = req.body;
  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  try {
    const userId = req.user.id;

    // Execute code using CodeArena execution engine
    const executionResult = await executeCode(code, language.toLowerCase(), stdin || "");

    // Update user status to attempted if currently unsolved
    const [existing] = await db.select().from(userDsaProgress)
      .where(and(eq(userDsaProgress.userId, userId), eq(userDsaProgress.problemId, problemId)))
      .limit(1);

    const now = new Date();
    const newStatus = existing?.status === "solved" ? "solved" : "attempted";

    if (existing) {
      await db.update(userDsaProgress)
        .set({
          status: newStatus,
          code,
          language,
          updatedAt: now,
        } as any)
        .where(eq(userDsaProgress.id, existing.id));
    } else {
      await db.insert(userDsaProgress)
        .values({
          userId,
          problemId,
          status: "attempted",
          code,
          language,
          updatedAt: now,
        } as any);
    }

    res.json({
      success: true,
      result: executionResult,
      status: newStatus,
    });
  } catch (error: any) {
    console.error("Error executing code in IDE:", error);
    res.status(500).json({ error: error.message || "Failed to execute code." });
  }
});

// ── 4. POST /api/dsa/problems/:id/submit — In-App IDE Submit Code ─────
router.post("/dsa/problems/:id/submit", async (req: any, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated() || !req.user) {
    return res.status(401).json({ error: "Authentication required. Please log in." });
  }

  const problemId = parseInt(req.params.id, 10);
  if (isNaN(problemId)) {
    return res.status(400).json({ error: "Invalid problem ID" });
  }

  const { code, language, stdin, expectedOutput, timeSpent, sessionId } = req.body;
  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  try {
    const userId = req.user.id;

    // Run execution against test cases or input
    const executionResult = await executeCode(code, language.toLowerCase(), stdin || "", expectedOutput);
    const isAccepted = executionResult.status === "Accepted";

    const [existing] = await db.select().from(userDsaProgress)
      .where(and(eq(userDsaProgress.userId, userId), eq(userDsaProgress.problemId, problemId)))
      .limit(1);

    const now = new Date();
    const finalStatus = isAccepted ? "solved" : "attempted";
    const solvedAtDate = isAccepted ? (existing?.solvedAt || now) : existing?.solvedAt || null;
    const accumulatedTime = (existing?.timeSpent || 0) + (timeSpent || 0);

    let updatedRecord: any;
    if (existing) {
      [updatedRecord] = await db.update(userDsaProgress)
        .set({
          status: finalStatus,
          code,
          language,
          timeSpent: accumulatedTime,
          solvedAt: solvedAtDate,
          updatedAt: now,
        } as any)
        .where(eq(userDsaProgress.id, existing.id))
        .returning();
    } else {
      [updatedRecord] = await db.insert(userDsaProgress)
        .values({
          userId,
          problemId,
          status: finalStatus,
          code,
          language,
          timeSpent: accumulatedTime,
          solvedAt: solvedAtDate,
          updatedAt: now,
        } as any)
        .returning();
    }

    if (sessionId) {
      import("../services/integrity/integrityEngine").then(({ runIntegrityAnalysis }) => {
        runIntegrityAnalysis({
          userId,
          problemId: String(problemId),
          code,
          language,
          sessionId,
          userDsaProgressId: updatedRecord.id,
        }).catch((err) => console.error("Error running DSA integrity analysis:", err));
      });
    }

    res.json({
      success: true,
      isAccepted,
      status: updatedRecord.status,
      result: executionResult,
      solvedAt: updatedRecord.solvedAt,
      updatedAt: updatedRecord.updatedAt,
    });
  } catch (error: any) {
    console.error("Error submitting code in IDE:", error);
    res.status(500).json({ error: error.message || "Failed to submit solution." });
  }
});

// ── 5. GET /api/admin/students/progress ──────────────────────────────
router.get("/admin/students/progress", async (req: any, res) => {
  if (!isAdmin(req)) {
    return res.status(403).json({ error: "Access denied. Admin privileges required." });
  }

  try {
    const [rawStudents, allProblems, allProgress] = await Promise.all([
      db.select().from(users),
      db.select().from(dsaProblems),
      db.select().from(userDsaProgress),
    ]);

    const isDummyAccount = (u: string) => {
      const lower = u.toLowerCase();
      return (
        lower.startsWith("test") ||
        lower.includes("tester") ||
        lower.includes("dummy") ||
        lower.includes("operative") ||
        lower.includes("streaktester") ||
        lower === "code" ||
        lower === "hc21"
      );
    };

    const allStudents = rawStudents.filter(s => s.username && !isDummyAccount(s.username));

    const totalProblems = allProblems.length;

    // Group progress by user
    const userProgressMap = new Map<string, typeof allProgress>();
    for (const prog of allProgress) {
      const list = userProgressMap.get(prog.userId) || [];
      list.push(prog);
      userProgressMap.set(prog.userId, list);
    }

    let totalSolvedAggregate = 0;
    let activeStudentsCount = 0;

    const studentsData = allStudents.map(student => {
      const userProgress = userProgressMap.get(student.id) || [];
      const solvedList = userProgress.filter(p => p.status === "solved");
      const attemptedList = userProgress.filter(p => p.status === "attempted");

      const solvedCount = solvedList.length;
      const attemptedCount = attemptedList.length;
      totalSolvedAggregate += solvedCount;

      if (solvedCount > 0 || attemptedCount > 0) {
        activeStudentsCount++;
      }

      const completionPercentage = totalProblems > 0 ? Number(((solvedCount / totalProblems) * 100).toFixed(1)) : 0;
      const streak = calculateStreak(userProgress);

      // Latest activity
      let lastActivity: Date | null = null;
      for (const p of userProgress) {
        const actDate = p.updatedAt || p.solvedAt;
        if (actDate && (!lastActivity || actDate > lastActivity)) {
          lastActivity = actDate;
        }
      }

      return {
        userId: student.id,
        name: student.username || "Student",
        email: student.googleId ? `google_${student.googleId.slice(0, 6)}` : `${student.username}@codearena.local`,
        username: student.username,
        role: student.role,
        totalProblems,
        solvedProblems: solvedCount,
        attemptedProblems: attemptedCount,
        completionPercentage,
        streak,
        lastActivity: lastActivity ? lastActivity.toISOString() : null,
      };
    });

    const averageCompletion = studentsData.length > 0
      ? Number((studentsData.reduce((acc, curr) => acc + curr.completionPercentage, 0) / studentsData.length).toFixed(1))
      : 0;

    res.json({
      summary: {
        totalStudents: studentsData.length,
        totalSolved: totalSolvedAggregate,
        averageCompletion,
        activeStudents: activeStudentsCount,
        totalProblems,
      },
      students: studentsData,
    });
  } catch (error) {
    console.error("Error fetching admin student progress:", error);
    res.status(500).json({ error: "Failed to fetch student progress analytics." });
  }
});

// ── 6. GET /api/admin/students/:userId/progress ──────────────────────
router.get("/admin/students/:userId/progress", async (req: any, res) => {
  if (!isAdmin(req)) {
    return res.status(403).json({ error: "Access denied. Admin privileges required." });
  }

  const { userId } = req.params;

  try {
    const [targetUser] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!targetUser) {
      return res.status(404).json({ error: "Student user not found" });
    }

    const [topics, subtopics, problems, userProgress] = await Promise.all([
      db.select().from(dsaTopics).orderBy(asc(dsaTopics.orderIndex), asc(dsaTopics.id)),
      db.select().from(dsaSubtopics).orderBy(asc(dsaSubtopics.orderIndex), asc(dsaSubtopics.id)),
      db.select().from(dsaProblems).orderBy(asc(dsaProblems.orderIndex), asc(dsaProblems.id)),
      db.select().from(userDsaProgress).where(eq(userDsaProgress.userId, userId)),
    ]);

    const progressMap = new Map<number, typeof userProgress[0]>();
    let lastActivity: Date | null = null;
    let totalTimeSpent = 0;

    for (const p of userProgress) {
      progressMap.set(p.problemId, p);
      totalTimeSpent += p.timeSpent || 0;
      const actDate = p.updatedAt || p.solvedAt;
      if (actDate && (!lastActivity || actDate > lastActivity)) {
        lastActivity = actDate;
      }
    }

    let overallTotal = 0;
    let overallSolved = 0;
    let overallAttempted = 0;
    const submissionsList: any[] = [];

    const topicsBreakdown = topics.map(topic => {
      const topicSubtopics = subtopics.filter(st => st.topicId === topic.id);
      let topicTotal = 0;
      let topicSolved = 0;

      const subtopicsBreakdown = topicSubtopics.map(subtopic => {
        const subProblems = problems.filter(p => p.subtopicId === subtopic.id);
        let subSolved = 0;

        for (const p of subProblems) {
          const prog = progressMap.get(p.id);
          const st = prog?.status || "unsolved";
          if (st === "solved") {
            subSolved++;
          } else if (st === "attempted") {
            overallAttempted++;
          }

          if (prog && prog.code) {
            submissionsList.push({
              problemId: p.id,
              problemTitle: p.title,
              topicTitle: topic.title,
              difficulty: p.difficulty,
              status: prog.status,
              code: prog.code,
              language: prog.language || "javascript",
              timeSpent: prog.timeSpent || 0,
              updatedAt: prog.updatedAt,
              solvedAt: prog.solvedAt,
            });
          }
        }

        const subTotal = subProblems.length;
        topicTotal += subTotal;
        topicSolved += subSolved;

        return {
          id: subtopic.id,
          title: subtopic.title,
          total: subTotal,
          solved: subSolved,
          percentage: subTotal > 0 ? Number(((subSolved / subTotal) * 100).toFixed(1)) : 0,
        };
      });

      overallTotal += topicTotal;
      overallSolved += topicSolved;

      return {
        id: topic.id,
        title: topic.title,
        description: topic.description,
        total: topicTotal,
        solved: topicSolved,
        percentage: topicTotal > 0 ? Number(((topicSolved / topicTotal) * 100).toFixed(1)) : 0,
        subtopics: subtopicsBreakdown,
      };
    });

    const streak = calculateStreak(userProgress);
    const overallPercentage = overallTotal > 0 ? Number(((overallSolved / overallTotal) * 100).toFixed(1)) : 0;

    res.json({
      student: {
        id: targetUser.id,
        name: targetUser.username || "Student",
        username: targetUser.username,
        email: targetUser.googleId ? `google_${targetUser.googleId.slice(0, 6)}` : `${targetUser.username}@codearena.local`,
        role: targetUser.role,
      },
      overall: {
        total: overallTotal,
        solved: overallSolved,
        attempted: overallAttempted,
        percentage: overallPercentage,
        streak,
        totalTimeSpent,
        lastActivity: lastActivity ? lastActivity.toISOString() : null,
      },
      topics: topicsBreakdown,
      submissions: submissionsList.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    });
  } catch (error) {
    console.error("Error fetching admin student detail progress:", error);
    res.status(500).json({ error: "Failed to fetch student detailed progress." });
  }
});

export default router;
