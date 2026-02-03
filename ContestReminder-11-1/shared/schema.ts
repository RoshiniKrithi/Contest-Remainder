import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"), // user, admin
});

export const contests = pgTable("contests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  status: text("status").notNull().default("upcoming"), // upcoming, live, completed
  createdBy: varchar("created_by").notNull(),
  participants: integer("participants").default(0),
});

export const problems = pgTable("problems", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contestId: varchar("contest_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(), // easy, medium, hard
  points: integer("points").notNull().default(100),
  testCases: jsonb("test_cases").notNull(), // Array of {input, output}
  timeLimit: integer("time_limit").default(2000), // milliseconds
  memoryLimit: integer("memory_limit").default(256), // MB
});

export const submissions = pgTable("submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  problemId: varchar("problem_id").notNull(),
  contestId: varchar("contest_id").notNull(),
  code: text("code").notNull(),
  language: text("language").notNull(),
  status: text("status").notNull(), // pending, accepted, wrong_answer, time_limit, compilation_error
  score: integer("score").default(0),
  submittedAt: timestamp("submitted_at").default(sql`now()`),
});

export const leaderboard = pgTable("leaderboard", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contestId: varchar("contest_id").notNull(),
  userId: varchar("user_id").notNull(),
  username: text("username").notNull(),
  totalScore: integer("total_score").default(0),
  problemsSolved: integer("problems_solved").default(0),
  lastSubmission: timestamp("last_submission"),
  rank: integer("rank").default(0),
});


export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  level: text("level").notNull(), // beginner, intermediate, advanced
  duration: text("duration").notNull(), // e.g., "4 weeks", "2 months"
  difficulty: text("difficulty").notNull(), // easy, medium, hard
  topics: jsonb("topics").notNull(), // Array of topic strings
  prerequisites: text("prerequisites"), // Prerequisites description
  instructor: text("instructor").notNull(),
  rating: integer("rating").default(5), // 1-5 stars
  students: integer("students").default(0), // Number of enrolled students
  price: text("price").notNull(), // e.g., "Free", "$99", "Premium"
  thumbnail: text("thumbnail"), // Course thumbnail URL
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const lessons = pgTable("lessons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  courseId: varchar("course_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content").notNull(),
  order: integer("order").notNull(),
  duration: integer("duration").default(0), // Duration in minutes
  videoUrl: text("video_url"), // Optional video content
  quizData: jsonb("quiz_data"), // Array of {question, options[], correctAnswerIndex}
  type: text("type").default("video"), // video, quiz, theory
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const enrollments = pgTable("enrollments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  courseId: varchar("course_id").notNull(),
  enrolledAt: timestamp("enrolled_at").default(sql`now()`),
  completedAt: timestamp("completed_at"),
  progress: integer("progress").default(0), // Progress percentage (0-100)
  timeSpent: integer("time_spent").default(0), // Time spent in minutes
  status: text("status").default("active"), // active, completed, paused
  lastAccessedAt: timestamp("last_accessed_at").default(sql`now()`),
});

export const lessonProgress = pgTable("lesson_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  enrollmentId: varchar("enrollment_id").notNull(),
  lessonId: varchar("lesson_id").notNull(),
  userId: varchar("user_id").notNull(),
  completed: boolean("completed").default(false),
  timeSpent: integer("time_spent").default(0), // Time spent in minutes
  completedAt: timestamp("completed_at"),
  lastAccessedAt: timestamp("last_accessed_at").default(sql`now()`),
});

export const userActivity = pgTable("user_activity", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  date: timestamp("date").notNull().default(sql`CURRENT_DATE`),
  minutesActive: integer("minutes_active").default(0),
  questionsSolved: integer("questions_solved").default(0),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertContestSchema = createInsertSchema(contests).omit({ id: true, participants: true });
export const insertProblemSchema = createInsertSchema(problems).omit({ id: true });
export const insertSubmissionSchema = createInsertSchema(submissions).omit({ id: true, submittedAt: true, score: true });
export const insertLeaderboardSchema = createInsertSchema(leaderboard).omit({ id: true, rank: true });
export const insertCourseSchema = createInsertSchema(courses).omit({ id: true, createdAt: true, students: true });
export const insertLessonSchema = createInsertSchema(lessons).omit({ id: true, createdAt: true });
export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({ id: true, enrolledAt: true, lastAccessedAt: true });
export const insertLessonProgressSchema = createInsertSchema(lessonProgress).omit({ id: true, lastAccessedAt: true });
export const insertUserActivitySchema = createInsertSchema(userActivity).omit({ id: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Contest = typeof contests.$inferSelect;
export type InsertContest = z.infer<typeof insertContestSchema>;

export type Problem = typeof problems.$inferSelect;
export type InsertProblem = z.infer<typeof insertProblemSchema>;

export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;

export type LeaderboardEntry = typeof leaderboard.$inferSelect;
export type InsertLeaderboardEntry = z.infer<typeof insertLeaderboardSchema>;


export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;

export type LessonProgress = typeof lessonProgress.$inferSelect;
export type InsertLessonProgress = z.infer<typeof insertLessonProgressSchema>;

export type UserActivity = typeof userActivity.$inferSelect;
export type InsertUserActivity = z.infer<typeof insertUserActivitySchema>;
