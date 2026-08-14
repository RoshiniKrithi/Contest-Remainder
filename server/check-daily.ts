import { storage } from "./storage";
import { dbReady } from "./db";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

async function debugDaily() {
  await dbReady;
  const allProblems: any[] = [];
  const contests = await storage.getAllContests();
  await Promise.all(contests.map(async (contest) => {
    const problems = await storage.getProblemsByContest(contest.id);
    allProblems.push(...problems);
  }));

  console.log("📚 Total Problems Count:", allProblems.length);

  const today = new Date();
  const hash = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const problem = allProblems[hash % allProblems.length];
  console.log("🔥 Today's Daily Problem Title:", problem?.title, "ID:", problem?.id);

  // Let's query user 'admin'
  const user = await storage.getUserByUsername("admin");
  console.log("👤 User 'admin':", {
    id: user?.id,
    username: user?.username,
    streak: user?.streak,
    longestStreak: user?.longestStreak,
    lastDailySolve: user?.lastDailySolve
  });
}

debugDaily();
