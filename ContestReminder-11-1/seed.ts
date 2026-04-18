import "dotenv/config";
import pg from 'pg';
const { Pool } = pg;
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "./server/shared/schema.ts";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

async function main() {
  console.log("🚀 Starting mission-critical database seeding...");
  
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is missing!");
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });

  // 1. Seed Courses and Lessons
  const sampleCourses = [
    {
      title: "Programming Fundamentals",
      description: "Learn the basics of programming with hands-on exercises.",
      level: "beginner",
      duration: "6 weeks",
      difficulty: "easy",
      topics: ["Variables", "Control Flow", "Functions"],
      instructor: "Dr. Sarah Chen",
      price: "Free"
    },
    {
      title: "Data Structures Essentials",
      description: "Master fundamental data structures.",
      level: "beginner",
      duration: "8 weeks",
      difficulty: "medium",
      topics: ["Arrays", "Linked Lists", "Stacks & Queues"],
      instructor: "Prof. Michael Rodriguez",
      price: "Free"
    }
  ];

  for (const courseData of sampleCourses) {
    const existing = await db.select().from(schema.courses).where(eq(schema.courses.title, courseData.title)).limit(1);
    if (existing.length === 0) {
      await db.insert(schema.courses).values({
        ...courseData,
        topics: courseData.topics as any,
        rating: 5,
        students: 100,
        isActive: true
      });
      console.log(`✅ Course Created: ${courseData.title}`);
    }
  }

  // 2. Seed Contests and Problems
  const contestTitle = "Daily Coding Challenge";
  const existingContest = await db.select().from(schema.contests).where(eq(schema.contests.title, contestTitle)).limit(1);
  let contestId: string;

  if (existingContest.length === 0) {
    const res = await db.insert(schema.contests).values({
      title: contestTitle,
      description: "Daily algorithmic challenges.",
      platform: "System",
      startTime: new Date(),
      endTime: new Date(Date.now() + 86400000 * 365),
      status: "ongoing",
      createdBy: "system",
    }).returning();
    contestId = res[0].id;
    console.log(`✅ Contest Created: ${contestTitle}`);
  } else {
    contestId = existingContest[0].id;
    console.log(`ℹ️ Contest Exists: ${contestTitle}`);
  }

  const sampleProblems = [
    { title: "Two Sum", difficulty: "easy", points: 100 },
    { title: "Reverse String", difficulty: "medium", points: 200 },
    { title: "Valid Anagram", difficulty: "easy", points: 100 }
  ];

  for (const p of sampleProblems) {
    const existingProb = await db.select().from(schema.problems).where(eq(schema.problems.title, p.title)).limit(1);
    if (existingProb.length === 0) {
      await db.insert(schema.problems).values({
        contestId,
        title: p.title,
        description: `Description for ${p.title}`,
        difficulty: p.difficulty,
        points: p.points,
        testCases: [] as any,
      });
      console.log(`   └─ Problem Created: ${p.title}`);
    }
  }

  // 3. Seed Typing Challenges, Quizzes, Brain Teasers
  const { typingChallenges, quizQuestions, brainTeasers } = await import("./server/challenge-seed-data.ts");
  
  for (const challenge of typingChallenges) {
    const existing = await db.select().from(schema.typingChallenges).where(eq(schema.typingChallenges.title, challenge.title)).limit(1);
    if (existing.length === 0) {
      await db.insert(schema.typingChallenges).values(challenge);
      console.log(`✅ Typing Challenge Created: ${challenge.title}`);
    }
  }

  for (const q of quizQuestions) {
    const existing = await db.select().from(schema.quizQuestions).where(eq(schema.quizQuestions.question, q.question)).limit(1);
    if (existing.length === 0) {
      await db.insert(schema.quizQuestions).values(q);
      console.log(`✅ Quiz Question Created: ${q.question.substring(0, 30)}...`);
    }
  }

  for (const t of brainTeasers) {
    const existing = await db.select().from(schema.brainTeasers).where(eq(schema.brainTeasers.date, new Date(t.date))).limit(1);
    if (existing.length === 0) {
      await db.insert(schema.brainTeasers).values({
        ...t,
        date: new Date(t.date)
      } as any);
      console.log(`✅ Brain Teaser Created: ${t.title}`);
    }
  }

  console.log("🏁 Mission Accompished: Database synchronized.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Mission Failed: Seeding Error", err);
  process.exit(1);
});
