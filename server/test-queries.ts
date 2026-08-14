import "dotenv/config";
import { db, pool, dbReady } from "./db";
import {
  users, participations, userActivity
} from "./shared/schema";
import { eq, sql, desc } from "drizzle-orm";

async function runTests() {
  console.log("Waiting for DB pool to initialize...");
  await dbReady;
  console.log("DB pool ready. Starting queries validation...\n");

  try {
    console.log("1. Testing Skipped Contests Query...");
    const skipped = await db.select({
      id: users.id,
      username: users.username,
      cfHandle: users.cfHandle,
      lcHandle: users.lcHandle,
      totalParticipations: sql<number>`count(${participations.id})`,
      skippedCount: sql<number>`count(CASE WHEN ${participations.attended} = false THEN 1 END)`,
      attendedCount: sql<number>`count(CASE WHEN ${participations.attended} = true THEN 1 END)`,
    })
    .from(users)
    .leftJoin(participations, eq(users.id, participations.userId))
    .where(eq(users.role, "user"))
    .groupBy(users.id, users.username, users.cfHandle, users.lcHandle)
    .orderBy(desc(sql`count(CASE WHEN ${participations.attended} = false THEN 1 END)`))
    .limit(5);

    console.log(`✅ Skipped Contests Query successful! Retrieved ${skipped.length} rows.`);
    console.log("Sample:", skipped[0] || "No data");

  } catch (err: any) {
    console.error("❌ Skipped Contests Query failed:", err.message);
  }

  try {
    console.log("\n2. Testing Performance Growth Query...");
    const growth = await db.select({
      id: users.id,
      username: users.username,
      streak: users.streak,
      longestStreak: users.longestStreak,
      totalRatingChange: sql<number>`COALESCE(sum(${participations.ratingChange}), 0)`,
      contestsPlayed: sql<number>`count(CASE WHEN ${participations.attended} = true THEN 1 END)`,
      totalProblemsSolved: sql<number>`COALESCE(sum(${participations.problemsSolved}), 0)`,
    })
    .from(users)
    .leftJoin(participations, eq(users.id, participations.userId))
    .where(eq(users.role, "user"))
    .groupBy(users.id, users.username, users.streak, users.longestStreak)
    .orderBy(desc(sql`COALESCE(sum(${participations.ratingChange}), 0)`))
    .limit(5);

    console.log(`✅ Performance Growth Query successful! Retrieved ${growth.length} rows.`);
    console.log("Sample:", growth[0] || "No data");

  } catch (err: any) {
    console.error("❌ Performance Growth Query failed:", err.message);
  }

  try {
    console.log("\n3. Testing Leaderboard - Activity Query...");
    const activityL = await db.select({
      id: users.id,
      username: users.username,
      cfHandle: users.cfHandle,
      lcHandle: users.lcHandle,
      totalSolved: sql<number>`COALESCE(sum(${userActivity.questionsSolved}), 0)`,
      totalMinutes: sql<number>`COALESCE(sum(${userActivity.minutesActive}), 0)`,
    })
    .from(users)
    .leftJoin(userActivity, eq(users.id, userActivity.userId))
    .where(eq(users.role, "user"))
    .groupBy(users.id, users.username, users.cfHandle, users.lcHandle)
    .orderBy(desc(sql`COALESCE(sum(${userActivity.questionsSolved}), 0)`))
    .limit(5);

    console.log(`✅ Leaderboard Activity Query successful! Retrieved ${activityL.length} rows.`);
    console.log("Sample:", activityL[0] || "No data");

  } catch (err: any) {
    console.error("❌ Leaderboard Activity Query failed:", err.message);
  }

  try {
    console.log("\n4. Testing Leaderboard - Overall Query...");
    const overallL = await db.select({
      id: users.id,
      username: users.username,
      streak: users.streak,
      cfHandle: users.cfHandle,
      lcHandle: users.lcHandle,
      totalRatingChange: sql<number>`COALESCE(sum(${participations.ratingChange}), 0)`,
      totalProblemsSolved: sql<number>`COALESCE(sum(${participations.problemsSolved}), 0)`,
      contestsAttended: sql<number>`count(CASE WHEN ${participations.attended} = true THEN 1 END)`,
    })
    .from(users)
    .leftJoin(participations, eq(users.id, participations.userId))
    .where(eq(users.role, "user"))
    .groupBy(users.id, users.username, users.streak, users.cfHandle, users.lcHandle)
    .orderBy(
      desc(sql`COALESCE(sum(${participations.ratingChange}), 0)`),
      desc(sql`COALESCE(sum(${participations.problemsSolved}), 0)`)
    )
    .limit(5);

    console.log(`✅ Leaderboard Overall Query successful! Retrieved ${overallL.length} rows.`);
    console.log("Sample:", overallL[0] || "No data");

  } catch (err: any) {
    console.error("❌ Leaderboard Overall Query failed:", err.message);
  }

  try {
    console.log("\n5. Testing Inactive Alerts Query...");
    const inactive = await db.select({
      id: users.id,
      username: users.username,
      streak: users.streak,
      cfHandle: users.cfHandle,
      lcHandle: users.lcHandle,
      lastActivity: sql<Date>`max(${userActivity.date})`
    })
    .from(users)
    .leftJoin(userActivity, eq(users.id, userActivity.userId))
    .where(eq(users.role, "user"))
    .groupBy(users.id, users.username, users.streak, users.cfHandle, users.lcHandle)
    .having(sql`max(${userActivity.date}) < NOW() - INTERVAL '7 days' OR max(${userActivity.date}) IS NULL`)
    .orderBy(sql`max(${userActivity.date}) ASC NULLS FIRST`)
    .limit(5);

    console.log(`✅ Inactive Alerts Query successful! Retrieved ${inactive.length} rows.`);
    console.log("Sample:", inactive[0] || "No data");

  } catch (err: any) {
    console.error("❌ Inactive Alerts Query failed:", err.message);
  }

  // End pool
  console.log("\nClosing DB connection...");
  await pool.end();
  console.log("Done.");
}

runTests();
