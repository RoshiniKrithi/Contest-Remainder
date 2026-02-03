import {
  type User,
  type InsertUser,
  type Contest,
  type InsertContest,
  type Problem,
  type InsertProblem,
  type Submission,
  type InsertSubmission,
  type Course,
  type InsertCourse,
  type Lesson,
  type InsertLesson,
  type Enrollment,
  type InsertEnrollment,
  type LessonProgress,
  type InsertLessonProgress,
  users,
  contests,
  problems,
  submissions,
  courses,
  lessons,
  enrollments,
  lessonProgress,
  userActivity,
  type UserActivity,
  type InsertUserActivity,
  typingChallenges,
  typingScores,
  quizQuestions,
  quizAttempts,
  brainTeasers,
  teaserAttempts,
  marathons,
  marathonParticipants
} from "@shared/schema";
import { randomUUID } from "crypto";
import { typingChallenges as typingSeed, quizQuestions as quizSeed, brainTeasers as teaserSeed } from "./challenge-seed-data";
import session from "express-session";
import createMemoryStore from "memorystore";
import { eq, and, desc, asc, sql } from "drizzle-orm";
import connectPgSimple from "connect-pg-simple";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  sessionStore: session.Store;

  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserStreak(userId: string, streak: number): Promise<User>;

  // Activity Report operations
  getUserActivity(userId: string): Promise<UserActivity[]>;
  trackUserActivity(userId: string, minutes: number, questions: number): Promise<void>;

  // Contest operations
  createContest(contest: InsertContest): Promise<Contest>;
  getContest(id: string): Promise<Contest | undefined>;
  getAllContests(): Promise<Contest[]>;
  updateContestStatus(id: string, status: string): Promise<Contest | undefined>;
  updateContestParticipants(id: string, participants: number): Promise<Contest | undefined>;

  // Problem operations
  createProblem(problem: InsertProblem): Promise<Problem>;
  getProblemsByContest(contestId: string): Promise<Problem[]>;
  getProblem(id: string): Promise<Problem | undefined>;

  // Submission operations
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  getSubmissionsByUser(userId: string, contestId?: string): Promise<Submission[]>;
  getSubmissionsByProblem(problemId: string): Promise<Submission[]>;
  updateSubmissionStatus(id: string, status: string, score?: number): Promise<Submission | undefined>;


  // Course operations
  createCourse(course: InsertCourse): Promise<Course>;
  getAllCourses(): Promise<Course[]>;
  getCoursesByLevel(level: string): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;

  // Lesson operations
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  getLessonsByCourse(courseId: string): Promise<Lesson[]>;
  getLesson(id: string): Promise<Lesson | undefined>;
  updateLesson(id: string, updates: Partial<InsertLesson>): Promise<Lesson | undefined>;

  // Enrollment operations
  enrollInCourse(userId: string, courseId: string): Promise<Enrollment>;
  getUserEnrollments(userId: string): Promise<Enrollment[]>;
  getEnrollment(userId: string, courseId: string): Promise<Enrollment | undefined>;
  updateEnrollmentProgress(userId: string, courseId: string, progress: number, timeSpent?: number): Promise<Enrollment | undefined>;
  completeEnrollment(userId: string, courseId: string): Promise<Enrollment | undefined>;

  // Lesson Progress operations
  updateLessonProgress(enrollmentId: string, lessonId: string, userId: string, completed: boolean, timeSpent?: number): Promise<LessonProgress>;
  getLessonProgress(userId: string, lessonId: string): Promise<LessonProgress | undefined>;
  getEnrollmentLessonProgress(enrollmentId: string): Promise<LessonProgress[]>;

  // Challenge operations
  getChallengeStats(userId: string): Promise<any>;
  getRandomTypingChallenge(difficulty: string, language: string): Promise<any>;
  submitTypingScore(data: any): Promise<any>;
  getTypingLeaderboard(): Promise<any[]>;
  getQuizQuestions(topic: string, difficulty: string, count: number): Promise<any[]>;
  submitQuizAttempt(data: any): Promise<any>;
  getQuizStats(userId: string): Promise<any>;
  getDailyBrainTeaser(): Promise<any>;
  getTeaserAttempt(userId: string, teaserId: string): Promise<any>;
  submitTeaserAnswer(userId: string, teaserId: string, answer: string): Promise<any>;
  recordHintUsed(userId: string, teaserId: string): Promise<void>;
  getTeaserCalendar(userId: string): Promise<any[]>;
  getBrainTeaserStats(userId: string): Promise<any>;
}

export class MemStorage implements IStorage {
  sessionStore: session.Store;
  private users: Map<string, User>;
  private contests: Map<string, Contest>;
  private problems: Map<string, Problem>;
  private submissions: Map<string, Submission>;
  private courses: Map<string, Course>;
  private lessons: Map<string, Lesson>;
  private enrollments: Map<string, Enrollment>;
  private lessonProgress: Map<string, LessonProgress>;
  private userActivity: Map<string, UserActivity>;
  private typingChallenges: Map<string, any>;
  private typingScores: Map<string, any>;
  private quizQuestions: Map<string, any>;
  private quizAttempts: Map<string, any>;
  private brainTeasers: Map<string, any>;
  private brainTeaserSolutions: Map<string, any>;

  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
    this.users = new Map();
    this.contests = new Map();
    this.problems = new Map();
    this.submissions = new Map();
    this.courses = new Map();
    this.lessons = new Map();
    this.enrollments = new Map();
    this.lessonProgress = new Map();
    this.userActivity = new Map();
    this.typingChallenges = new Map();
    this.typingScores = new Map();
    this.quizQuestions = new Map();
    this.quizAttempts = new Map();
    this.brainTeasers = new Map();
    this.brainTeaserSolutions = new Map();
    this.initializeSampleCourses();
    this.initializeSampleLessons();
    this.initializeSampleContests();
    this.initializeAdminUser();
    this.seedChallenges();
  }

  private seedChallenges() {
    typingSeed.forEach(c => this.typingChallenges.set(c.id, c));
    quizSeed.forEach(q => this.quizQuestions.set(q.id, q));
    teaserSeed.forEach(t => this.brainTeasers.set(t.id, t));
  }

  private async initializeSampleContests() {
    // Create a sample contest
    const contestId = randomUUID();
    const contest: Contest = {
      id: contestId,
      title: "Daily Coding Challenge",
      description: "Daily algorithmic challenges to test your skills.",
      startTime: new Date(),
      endTime: new Date(Date.now() + 86400000 * 365), // 1 year duration
      status: "live",
      participants: 0,
      createdBy: "system"
    };
    this.contests.set(contestId, contest);

    // Create sample problems
    const problems = [
      {
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
        difficulty: "easy",
        points: 100,
        timeLimit: 2000,
        memoryLimit: 256,
        testCases: [
          { input: "[2,7,11,15], 9", output: "[0,1]" },
          { input: "[3,2,4], 6", output: "[1,2]" }
        ]
      },
      {
        title: "Reverse String",
        description: "Write a function that reverses a string. The input string is given as an array of characters s.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
        difficulty: "medium",
        points: 200,
        timeLimit: 1000,
        memoryLimit: 128,
        testCases: [
          { input: '["h","e","l","l","o"]', output: '["o","l","l","e","h"]' }
        ]
      }
    ];

    for (const p of problems) {
      const pId = randomUUID();
      this.problems.set(pId, {
        id: pId,
        contestId,
        ...p
      });
    }
  }

  private async initializeAdminUser() {
    // Check if admin user already exists
    const existingAdmin = await this.getUserByUsername("admin");
    if (existingAdmin) {
      return; // Admin already exists, skip initialization
    }

    // Import crypto functions for password hashing (same as auth.ts)
    const { scrypt, randomBytes } = await import("crypto");
    const { promisify } = await import("util");
    const scryptAsync = promisify(scrypt);

    // Hash the password "admin123" using the same method as auth.ts
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync("admin123", salt, 64)) as Buffer;
    const hashedPassword = `${buf.toString("hex")}.${salt}`;

    // Create the admin user
    const id = randomUUID();
    const adminUser: User = {
      id,
      username: "admin",
      password: hashedPassword,
      role: "admin",
      streak: 0,
      lastDailySolve: null
    };

    this.users.set(id, adminUser);
    console.log("✅ Default admin user created (username: admin, password: admin123)");
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getUserActivity(userId: string): Promise<UserActivity[]> {
    return Array.from(this.userActivity.values())
      .filter(a => a.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async trackUserActivity(userId: string, minutes: number, questions: number): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find existing activity for today
    const existing = Array.from(this.userActivity.values()).find(
      a => a.userId === userId && new Date(a.date).getTime() === today.getTime()
    );

    if (existing) {
      const updated = {
        ...existing,
        minutesActive: (existing.minutesActive || 0) + minutes,
        questionsSolved: (existing.questionsSolved || 0) + questions
      };
      this.userActivity.set(existing.id, updated);
    } else {
      const id = randomUUID();
      const activity: UserActivity = {
        id,
        userId,
        date: today,
        minutesActive: minutes,
        questionsSolved: questions
      };
      this.userActivity.set(id, activity);
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      role: insertUser.username === "admin" ? "admin" : (insertUser.role || "user"),
      streak: 0,
      lastDailySolve: null
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserStreak(userId: string, streak: number): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    const updated = { ...user, streak, lastDailySolve: new Date() };
    this.users.set(userId, updated);
    return updated;
  }

  // Contest operations
  async createContest(insertContest: InsertContest): Promise<Contest> {
    const id = randomUUID();
    const contest: Contest = {
      ...insertContest,
      id,
      participants: 0,
      status: insertContest.status || "upcoming",
      description: insertContest.description || null
    };
    this.contests.set(id, contest);
    return contest;
  }

  async getContest(id: string): Promise<Contest | undefined> {
    return this.contests.get(id);
  }

  async getAllContests(): Promise<Contest[]> {
    return Array.from(this.contests.values()).sort((a, b) =>
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  }

  async updateContestStatus(id: string, status: string): Promise<Contest | undefined> {
    const contest = this.contests.get(id);
    if (contest) {
      const updated = { ...contest, status };
      this.contests.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async updateContestParticipants(id: string, participants: number): Promise<Contest | undefined> {
    const contest = this.contests.get(id);
    if (contest) {
      const updated = { ...contest, participants };
      this.contests.set(id, updated);
      return updated;
    }
    return undefined;
  }

  // Problem operations
  async createProblem(insertProblem: InsertProblem): Promise<Problem> {
    const id = randomUUID();
    const problem: Problem = {
      ...insertProblem,
      id,
      points: insertProblem.points || 100,
      timeLimit: insertProblem.timeLimit || null,
      memoryLimit: insertProblem.memoryLimit || null
    };
    this.problems.set(id, problem);
    return problem;
  }

  async getProblemsByContest(contestId: string): Promise<Problem[]> {
    return Array.from(this.problems.values()).filter(p => p.contestId === contestId);
  }

  async getProblem(id: string): Promise<Problem | undefined> {
    return this.problems.get(id);
  }

  // Submission operations
  async createSubmission(insertSubmission: InsertSubmission): Promise<Submission> {
    const id = randomUUID();
    const submission: Submission = {
      ...insertSubmission,
      id,
      submittedAt: new Date(),
      score: 0,
      status: "pending"
    };
    this.submissions.set(id, submission);
    return submission;
  }

  async getSubmissionsByUser(userId: string, contestId?: string): Promise<Submission[]> {
    return Array.from(this.submissions.values()).filter(s =>
      s.userId === userId && (!contestId || s.contestId === contestId)
    );
  }

  async getSubmissionsByProblem(problemId: string): Promise<Submission[]> {
    return Array.from(this.submissions.values()).filter(s => s.problemId === problemId);
  }

  async updateSubmissionStatus(id: string, status: string, score?: number): Promise<Submission | undefined> {
    const submission = this.submissions.get(id);
    if (submission) {
      const updated = { ...submission, status, ...(score !== undefined && { score }) };
      this.submissions.set(id, updated);
      return updated;
    }
    return undefined;
  }


  // Course operations
  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = {
      ...insertCourse,
      id,
      students: 0,
      createdAt: new Date(),
      isActive: insertCourse.isActive || true,
      thumbnail: insertCourse.thumbnail || null,
      prerequisites: insertCourse.prerequisites || null,
      rating: insertCourse.rating || null
    };
    this.courses.set(id, course);
    return course;
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values())
      .filter(c => c.isActive)
      .sort((a, b) => {
        const levelOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
        return (levelOrder[a.level as keyof typeof levelOrder] || 999) -
          (levelOrder[b.level as keyof typeof levelOrder] || 999);
      });
  }

  async getCoursesByLevel(level: string): Promise<Course[]> {
    return Array.from(this.courses.values())
      .filter(c => c.isActive && c.level === level)
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  // Lesson operations
  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const id = randomUUID();
    const lesson: Lesson = {
      ...insertLesson,
      id,
      createdAt: new Date(),
      description: insertLesson.description || null,
      isActive: insertLesson.isActive || true,
      duration: insertLesson.duration || null,
      videoUrl: insertLesson.videoUrl || null,
      quizData: insertLesson.quizData || null,
      type: insertLesson.type || "theory"
    };
    this.lessons.set(id, lesson);
    return lesson;
  }

  async getLessonsByCourse(courseId: string): Promise<Lesson[]> {
    return Array.from(this.lessons.values())
      .filter(l => l.courseId === courseId && l.isActive)
      .sort((a, b) => a.order - b.order);
  }

  async getLesson(id: string): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async updateLesson(id: string, updates: Partial<InsertLesson>): Promise<Lesson | undefined> {
    const lesson = this.lessons.get(id);
    if (lesson) {
      const updated = { ...lesson, ...updates };
      this.lessons.set(id, updated);
      return updated;
    }
    return undefined;
  }

  // Enrollment operations
  async enrollInCourse(userId: string, courseId: string): Promise<Enrollment> {
    const existing = Array.from(this.enrollments.values()).find(
      e => e.userId === userId && e.courseId === courseId
    );

    if (existing) {
      return existing;
    }

    const id = randomUUID();
    const enrollment: Enrollment = {
      id,
      userId,
      courseId,
      enrolledAt: new Date(),
      completedAt: null,
      progress: 0,
      timeSpent: 0,
      status: "active",
      lastAccessedAt: new Date()
    };
    this.enrollments.set(id, enrollment);

    // Update course student count
    const course = this.courses.get(courseId);
    if (course) {
      const updated = { ...course, students: (course.students || 0) + 1 };
      this.courses.set(courseId, updated);
    }

    return enrollment;
  }

  async getUserEnrollments(userId: string): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values())
      .filter(e => e.userId === userId)
      .sort((a, b) => new Date(b.lastAccessedAt || new Date()).getTime() - new Date(a.lastAccessedAt || new Date()).getTime());
  }

  async getEnrollment(userId: string, courseId: string): Promise<Enrollment | undefined> {
    return Array.from(this.enrollments.values()).find(
      e => e.userId === userId && e.courseId === courseId
    );
  }

  async updateEnrollmentProgress(userId: string, courseId: string, progress: number, timeSpent?: number): Promise<Enrollment | undefined> {
    const enrollment = Array.from(this.enrollments.values()).find(
      e => e.userId === userId && e.courseId === courseId
    );

    if (enrollment) {
      const updated = {
        ...enrollment,
        progress: Math.min(100, Math.max(0, progress)),
        ...(timeSpent !== undefined && { timeSpent: (enrollment.timeSpent || 0) + timeSpent }),
        lastAccessedAt: new Date()
      };
      this.enrollments.set(enrollment.id, updated);
      return updated;
    }
    return undefined;
  }

  async completeEnrollment(userId: string, courseId: string): Promise<Enrollment | undefined> {
    const enrollment = Array.from(this.enrollments.values()).find(
      e => e.userId === userId && e.courseId === courseId
    );

    if (enrollment) {
      const updated = {
        ...enrollment,
        progress: 100,
        status: "completed",
        completedAt: new Date(),
        lastAccessedAt: new Date()
      };
      this.enrollments.set(enrollment.id, updated);
      return updated;
    }
    return undefined;
  }

  // Lesson Progress operations
  async updateLessonProgress(enrollmentId: string, lessonId: string, userId: string, completed: boolean, timeSpent?: number): Promise<LessonProgress> {
    const existing = Array.from(this.lessonProgress.values()).find(
      p => p.enrollmentId === enrollmentId && p.lessonId === lessonId && p.userId === userId
    );

    if (existing) {
      const updated = {
        ...existing,
        completed,
        ...(timeSpent !== undefined && { timeSpent: (existing.timeSpent || 0) + timeSpent }),
        ...(completed && !existing.completed && { completedAt: new Date() }),
        lastAccessedAt: new Date()
      };
      this.lessonProgress.set(existing.id, updated);
      return updated;
    } else {
      const id = randomUUID();
      const progress: LessonProgress = {
        id,
        enrollmentId,
        lessonId,
        userId,
        completed,
        timeSpent: timeSpent || 0,
        completedAt: completed ? new Date() : null,
        lastAccessedAt: new Date()
      };
      this.lessonProgress.set(id, progress);
      return progress;
    }
  }

  async getLessonProgress(userId: string, lessonId: string): Promise<LessonProgress | undefined> {
    return Array.from(this.lessonProgress.values()).find(
      p => p.userId === userId && p.lessonId === lessonId
    );
  }

  async getEnrollmentLessonProgress(enrollmentId: string): Promise<LessonProgress[]> {
    return Array.from(this.lessonProgress.values())
      .filter(p => p.enrollmentId === enrollmentId)
      .sort((a, b) => new Date(b.lastAccessedAt || new Date()).getTime() - new Date(a.lastAccessedAt || new Date()).getTime());
  }

  // Challenge operations
  async getChallengeStats(userId: string): Promise<any> {
    const typing = Array.from(this.typingScores.values()).filter(s => s.userId === userId);
    const quizzes = Array.from(this.quizAttempts.values()).filter(a => a.userId === userId);
    const teasers = Array.from(this.brainTeaserSolutions.values()).filter(s => s.userId === userId && s.solved);

    return {
      typing: {
        completed: typing.length,
        avgWpm: typing.length ? Math.round(typing.reduce((acc, curr) => acc + curr.wpm, 0) / typing.length) : 0,
        bestWpm: typing.length ? Math.max(...typing.map(t => t.wpm)) : 0,
      },
      quizzes: {
        completed: quizzes.length,
        avgScore: quizzes.length ? Math.round(quizzes.reduce((acc, curr) => acc + curr.score, 0) / quizzes.length) : 0,
      },
      brainTeasers: {
        solved: teasers.length,
      }
    };
  }

  async getRandomTypingChallenge(difficulty: string, language: string): Promise<any> {
    const filtered = Array.from(this.typingChallenges.values()).filter(
      c => c.difficulty === difficulty && c.language === language
    );
    if (!filtered.length) return null;
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  async submitTypingScore(data: any): Promise<any> {
    const id = randomUUID();
    const score = { ...data, id, completedAt: new Date() };
    this.typingScores.set(id, score);
    return score;
  }

  async getTypingLeaderboard(): Promise<any[]> {
    return Array.from(this.typingScores.values())
      .sort((a, b) => b.wpm - a.wpm)
      .slice(0, 10)
      .map(s => {
        const user = Array.from(this.users.values()).find(u => u.id === s.userId);
        return { ...s, username: user?.username || "Unknown" };
      });
  }

  async getQuizQuestions(topic: string, difficulty: string, count: number): Promise<any[]> {
    const filtered = Array.from(this.quizQuestions.values()).filter(
      q => q.topic === topic && q.difficulty === difficulty
    );
    return filtered.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  async submitQuizAttempt(data: any): Promise<any> {
    const id = randomUUID();
    const attempt = { ...data, id, completedAt: new Date() };
    this.quizAttempts.set(id, attempt);
    return attempt;
  }

  async getQuizStats(userId: string): Promise<any> {
    const userAttempts = Array.from(this.quizAttempts.values()).filter(a => a.userId === userId);
    return {
      totalAttempts: userAttempts.length,
      avgScore: userAttempts.length ? Math.round(userAttempts.reduce((acc, curr) => acc + curr.score, 0) / userAttempts.length) : 0,
      bestScore: userAttempts.length ? Math.max(...userAttempts.map(a => a.score)) : 0,
    };
  }

  async getDailyBrainTeaser(): Promise<any> {
    const today = new Date().toISOString().split('T')[0];
    return Array.from(this.brainTeasers.values()).find(t => t.date.startsWith(today)) || null;
  }

  async getTeaserAttempt(userId: string, teaserId: string): Promise<any> {
    return Array.from(this.brainTeaserSolutions.values()).find(
      s => s.userId === userId && s.teaserId === teaserId
    ) || null;
  }

  async submitTeaserAnswer(userId: string, teaserId: string, answer: string): Promise<any> {
    const teaser = Array.from(this.brainTeasers.values()).find(t => t.id === teaserId);
    if (!teaser) throw new Error("Teaser not found");

    const correct = answer.toLowerCase().trim() === teaser.solution.toLowerCase().trim();
    const existing = await this.getTeaserAttempt(userId, teaserId);

    if (existing) {
      existing.attempts += 1;
      existing.solved = existing.solved || correct;
      existing.userAnswer = answer;
      if (correct && !existing.solvedAt) existing.solvedAt = new Date();
      return { correct, attempt: existing };
    } else {
      const id = randomUUID();
      const attempt = {
        id,
        userId,
        teaserId,
        solved: correct,
        hintsUsed: 0,
        attempts: 1,
        userAnswer: answer,
        attemptedAt: new Date(),
        solvedAt: correct ? new Date() : null
      };
      this.brainTeaserSolutions.set(id, attempt);
      return { correct, attempt };
    }
  }

  async recordHintUsed(userId: string, teaserId: string): Promise<void> {
    const existing = await this.getTeaserAttempt(userId, teaserId);
    if (existing) {
      existing.hintsUsed = (existing.hintsUsed || 0) + 1;
    } else {
      const id = randomUUID();
      const attempt = {
        id,
        userId,
        teaserId,
        solved: false,
        hintsUsed: 1,
        attempts: 0,
        attemptedAt: new Date(),
        solvedAt: null
      };
      this.brainTeaserSolutions.set(id, attempt);
    }
  }

  async getTeaserCalendar(userId: string): Promise<any[]> {
    return Array.from(this.brainTeaserSolutions.values())
      .filter(s => s.userId === userId)
      .map(a => ({ date: a.attemptedAt, solved: a.solved }));
  }

  async getBrainTeaserStats(userId: string): Promise<any> {
    const userSolutions = Array.from(this.brainTeaserSolutions.values()).filter(s => s.userId === userId);
    return {
      totalAttempts: userSolutions.length,
      solved: userSolutions.filter(s => s.solved).length,
    };
  }

  private initializeSampleCourses(): void {
    const sampleCourses = [
      {
        title: "Programming Fundamentals",
        description: "Learn the basics of programming with hands-on exercises covering variables, loops, functions, and problem-solving techniques.",
        level: "beginner",
        duration: "6 weeks",
        difficulty: "easy",
        topics: ["Variables", "Control Flow", "Functions", "Basic Data Structures"],
        prerequisites: "No prior programming experience required",
        instructor: "Dr. Sarah Chen",
        rating: 5,
        students: 1250,
        price: "Free",
        thumbnail: null,
        isActive: true
      },
      {
        title: "Data Structures Essentials",
        description: "Master fundamental data structures including arrays, linked lists, stacks, queues, trees, and hash tables with practical implementation.",
        level: "beginner",
        duration: "8 weeks",
        difficulty: "medium",
        topics: ["Arrays", "Linked Lists", "Stacks & Queues", "Trees", "Hash Tables"],
        prerequisites: "Basic programming knowledge in any language",
        instructor: "Prof. Michael Rodriguez",
        rating: 5,
        students: 980,
        price: "Free",
        thumbnail: null,
        isActive: true
      },
      {
        title: "Algorithms Design & Analysis",
        description: "Comprehensive course covering sorting, searching, graph algorithms, dynamic programming, and algorithm complexity analysis.",
        level: "intermediate",
        duration: "10 weeks",
        difficulty: "medium",
        topics: ["Sorting Algorithms", "Graph Algorithms", "Dynamic Programming", "Greedy Algorithms", "Complexity Analysis"],
        prerequisites: "Knowledge of basic data structures",
        instructor: "Dr. Elena Vasquez",
        rating: 5,
        students: 750,
        price: "$49",
        thumbnail: null,
        isActive: true
      },
      {
        title: "Advanced Problem Solving",
        description: "Tackle complex competitive programming problems with advanced techniques, optimization strategies, and mathematical concepts.",
        level: "intermediate",
        duration: "12 weeks",
        difficulty: "hard",
        topics: ["Advanced Graph Theory", "Number Theory", "String Algorithms", "Computational Geometry"],
        prerequisites: "Strong foundation in algorithms and data structures",
        instructor: "Alex Thompson",
        rating: 5,
        students: 420,
        price: "$99",
        thumbnail: null,
        isActive: true
      },
      {
        title: "Competitive Programming Mastery",
        description: "Elite-level training for international programming contests with advanced optimization, mathematical concepts, and contest strategies.",
        level: "advanced",
        duration: "16 weeks",
        difficulty: "hard",
        topics: ["Advanced Mathematics", "Complex Optimization", "Contest Strategy", "Advanced Data Structures"],
        prerequisites: "Extensive competitive programming experience",
        instructor: "International Grandmaster Chen Liu",
        rating: 5,
        students: 180,
        price: "$199",
        thumbnail: null,
        isActive: true
      },
      {
        title: "System Design for Coding Interviews",
        description: "Learn to design scalable systems with real-world case studies, distributed systems concepts, and interview preparation.",
        level: "advanced",
        duration: "8 weeks",
        difficulty: "hard",
        topics: ["Scalability", "Database Design", "Microservices", "Caching", "Load Balancing"],
        prerequisites: "Experience with software development and algorithms",
        instructor: "Senior Engineer Maria Santos",
        rating: 5,
        students: 320,
        price: "$149",
        thumbnail: null,
        isActive: true
      }
    ];

    sampleCourses.forEach(courseData => {
      const id = randomUUID();
      const course: Course = {
        ...courseData,
        id,
        createdAt: new Date()
      };
      this.courses.set(id, course);
    });
  }

  private initializeSampleLessons(): void {
    const courseIds = Array.from(this.courses.keys());

    courseIds.forEach(courseId => {
      const course = this.courses.get(courseId);
      if (!course) return;

      let lessons: Array<Omit<Lesson, 'id' | 'createdAt'>> = [];

      if (course.title.includes("Programming Fundamentals")) {
        lessons = [
          {
            courseId,
            title: "The Briefing: C++ Foundations",
            description: "Master the syntax and logic of C++ programming.",
            content: "Welcome to the front lines of software development. In this briefing, you'll learn the core syntax of C++, including headers, namespaces, and the main entry point of every tactical application.",
            order: 1,
            duration: 31,
            videoUrl: "https://www.youtube.com/embed/vLnPwxZdW4Y",
            type: "video",
            isActive: true,
            quizData: [
              {
                question: "What is the correct syntax to output 'Hello World' in C++?",
                options: ["system.out.println(\"Hello World\");", "console.log(\"Hello World\");", "cout << \"Hello World\";", "print(\"Hello World\");"],
                correctAnswerIndex: 2
              },
              {
                question: "Which directive is used to include the input-output stream library?",
                options: ["#include <iostream>", "#import <stream>", "using namespace std;", "void main()"],
                correctAnswerIndex: 0
              }
            ]
          },
          {
            courseId,
            title: "Mission: Data Types & Variables",
            description: "Learn how to store and manipulate mission-critical data.",
            content: "Variables are the storage containers of your code. In this segment, we explore integers, strings, and booleans, and how to allocate memory for your tactical operations.",
            order: 2,
            duration: 15,
            videoUrl: null,
            type: "theory",
            isActive: true,
            quizData: [
              {
                question: "Which data type is specifically used to store text sequences?",
                options: ["int", "char", "string", "double"],
                correctAnswerIndex: 2
              },
              {
                question: "What is the result of '5 / 2' in integer division in C++?",
                options: ["2.5", "2", "3", "Error"],
                correctAnswerIndex: 1
              }
            ]
          }
        ];
      } else if (course.title.includes("Data Structures Essentials")) {
        lessons = [
          {
            courseId,
            title: "Introduction to Data Structures",
            description: "Visualize how data is organized in physical memory.",
            content: "Data structures are the backbone of efficient software. We'll start with an overview of how computers store information and the basic categories of data organization.",
            order: 1,
            duration: 45,
            videoUrl: "https://www.youtube.com/embed/8hly31xKli0",
            type: "video",
            isActive: true,
            quizData: [
              {
                question: "What is the time complexity to insert an element at the beginning of an array?",
                options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
                correctAnswerIndex: 2
              }
            ]
          },
          {
            courseId,
            title: "Arrays and Lists",
            description: "Deep dive into contiguous memory and dynamic sizing.",
            content: "Arrays are the most fundamental data structure. We explore how they are indexed and how dynamic arrays (like vectors) handle resizing.",
            order: 2,
            duration: 30,
            videoUrl: "https://www.youtube.com/embed/Zv7vS_3K4h8",
            type: "video",
            isActive: true,
            quizData: []
          },
          {
            courseId,
            title: "Linked Lists",
            description: "Node-based data organization.",
            content: "Linked lists offer flexible memory management. We'll compare them to arrays and understand pointers.",
            order: 3,
            duration: 25,
            videoUrl: "https://www.youtube.com/embed/Hj_rUuM8Y_0",
            type: "video",
            isActive: true,
            quizData: []
          },
          {
            courseId,
            title: "Stacks and Queues",
            description: "LIFO and FIFO tactical data structures.",
            content: "Master the stack (Last-In-First-Out) and queue (First-In-First-Out) protocols.",
            order: 4,
            duration: 20,
            videoUrl: "https://www.youtube.com/embed/A3ZNCqZ0NoM",
            type: "video",
            isActive: true,
            quizData: []
          }
        ];
      }
      else if (course.title.includes("Algorithms Design & Analysis")) {
        lessons = [
          {
            courseId,
            title: "Strategy: Big O & Sorting",
            description: "Analyze the efficiency of your tactical maneuvers.",
            content: "In competitive programming, speed is everything. We use Big O notation to measure the time and space complexity of our algorithms. Today, we optimize our sorting strategies.",
            order: 1,
            duration: 52,
            videoUrl: "https://www.youtube.com/embed/RBSGKlAvoiM",
            type: "video",
            isActive: true,
            quizData: [
              {
                question: "What is the worst-case time complexity of Merge Sort?",
                options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
                correctAnswerIndex: 1
              },
              {
                question: "Big O notation describes what aspect of an algorithm?",
                options: ["Readability", "Memory usage only", "Upper bound of execution time", "The number of lines of code"],
                correctAnswerIndex: 2
              }
            ]
          }
        ];
      } else if (course.title.includes("Competitive Programming Mastery")) {
        lessons = [
          {
            courseId,
            title: "Combat Readiness: Starting Your CP Journey",
            description: "Set up your environment and solve your first problem.",
            content: "The road to Grandmaster starts here. Learn how to parse input, use the STL (Standard Template Library), and manage your time during intensive coding contests.",
            order: 1,
            duration: 25,
            videoUrl: "https://www.youtube.com/embed/09_LlHjoEiY",
            type: "video",
            isActive: true,
            quizData: [
              {
                question: "What does STL stand for in C++?",
                options: ["Standard Transmission Language", "Simple Teaching Level", "Standard Template Library", "Single Threaded Link"],
                correctAnswerIndex: 2
              }
            ]
          }
        ];
      } else if (course.title.includes("System Design")) {
        lessons = [
          {
            courseId,
            title: "Architecture: Scalable Systems",
            description: "Design systems that can handle millions of tactical requests.",
            content: "Building for scale requires understanding Load Balancers, Caching, and Database Sharding. We'll design a system from the ground up to handle high-traffic operations.",
            order: 1,
            duration: 40,
            videoUrl: "https://www.youtube.com/embed/m8Icp_Cid5o",
            type: "video",
            isActive: true,
            quizData: [
              {
                question: "Which component is used to distribute incoming traffic across multiple servers?",
                options: ["Database", "Cache", "Load Balancer", "Firewall"],
                correctAnswerIndex: 2
              }
            ]
          }
        ];
      } else {
        lessons = [
          {
            courseId,
            title: "Course Briefing",
            description: "Initial intel on the course objectives",
            content: "Standard operational procedure for this tactical module. Review the briefing carefully before proceeding to the extraction protocol.",
            order: 1,
            duration: 10,
            videoUrl: "https://www.youtube.com/embed/u6O62Wv-mD8",
            type: "video",
            isActive: true,
            quizData: [
              {
                question: "Are you ready to begin the mission?",
                options: ["Affirmative", "Negative"],
                correctAnswerIndex: 0
              }
            ]
          }
        ];
      }

      lessons.forEach(lessonData => {
        const id = randomUUID();
        const lesson: Lesson = {
          ...lessonData,
          id,
          createdAt: new Date(),
          quizData: lessonData.quizData || null,
          type: (lessonData.type as string | null) || "video"
        };
        this.lessons.set(id, lesson);
      });
    });
  }
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;
  private db: any;

  constructor(dbInstance: any) {
    this.db = dbInstance;

    const PgStore = connectPgSimple(session);
    this.sessionStore = new PgStore({
      conObject: {
        connectionString: process.env.DATABASE_URL!,
      },
      tableName: 'session',
    });
    this.autoPatchDatabase().catch(err => console.error("Auto-patch failed:", err));
  }

  async autoPatchDatabase() {
    try {
      console.log("📡 Intelligence Sync: Initializing...");
      // Small delay to ensure DB connection is stable
      await new Promise(resolve => setTimeout(resolve, 3000));

      const existingLessons = await this.db.select().from(lessons);
      console.log(`📡 Intelligence Sync: Found ${existingLessons.length} records.`);

      const patches = [
        {
          title: "Introduction to Data Structures",
          updates: {
            videoUrl: "https://www.youtube.com/embed/8hly31xKli0",
            type: "video",
            content: "Data structures are the backbone of efficient software. We'll start with an overview of how computers store information and the basic categories of data organization."
          }
        },
        {
          title: "Arrays and Lists",
          updates: {
            videoUrl: "https://www.youtube.com/embed/Zv7vS_3K4h8",
            type: "video",
            content: "Arrays are the most fundamental data structure. We explore how they are indexed and how dynamic arrays (like vectors) handle resizing."
          }
        },
        {
          title: "Linked Lists",
          updates: {
            videoUrl: "https://www.youtube.com/embed/Hj_rUuM8Y_0",
            type: "video",
            content: "Linked lists offer flexible memory management. We'll compare them to arrays and understand pointers."
          }
        },
        {
          title: "Stacks and Queues",
          updates: {
            videoUrl: "https://www.youtube.com/embed/A3ZNCqZ0NoM",
            type: "video",
            content: "Master the stack (Last-In-First-Out) and queue (First-In-First-Out) protocols."
          }
        },
        {
          title: "The Briefing: C++ Foundations",
          updates: {
            videoUrl: "https://www.youtube.com/embed/vLnPwxZdW4Y",
            type: "video"
          }
        }
      ];

      for (const patch of patches) {
        const matchingLesson = existingLessons.find((l: any) => l.title === patch.title);
        if (matchingLesson) {
          console.log(`📡 Intelligence Sync: Updating mission -> ${patch.title}`);
          await this.db.update(lessons)
            .set(patch.updates)
            .where(eq(lessons.id, matchingLesson.id));
        } else {
          console.log(`📡 Intelligence Sync: Mission not found -> ${patch.title}`);
        }
      }
      console.log("📡 Intelligence Sync: Complete.");
      await this.seedChallenges();
    } catch (error) {
      console.warn("Intelligence sync deferred: ", error);
    }
  }

  async seedChallenges() {
    try {
      console.log("🌱 Challenges Sync: Initializing...");

      // Seed Typing Challenges
      for (const challenge of typingSeed) {
        const existing = await this.db.select().from(typingChallenges).where(eq(typingChallenges.id, challenge.id)).limit(1);
        if (!existing.length) {
          await this.db.insert(typingChallenges).values(challenge);
        }
      }

      // Seed Quiz Questions
      for (const question of quizSeed) {
        const existing = await this.db.select().from(quizQuestions).where(eq(quizQuestions.id, question.id)).limit(1);
        if (!existing.length) {
          await this.db.insert(quizQuestions).values(question);
        }
      }

      // Seed Brain Teasers
      for (const teaser of teaserSeed) {
        const existing = await this.db.select().from(brainTeasers).where(eq(brainTeasers.id, teaser.id)).limit(1);
        if (!existing.length) {
          await this.db.insert(brainTeasers).values({
            ...teaser,
            date: new Date(teaser.date)
          });
        }
      }

      console.log("🌱 Challenges Sync: Complete.");
    } catch (error) {
      console.warn("Challenges sync deferred: ", error);
    }
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const role = insertUser.username === "admin" ? "admin" : (insertUser.role || "user");
    const result = await this.db.insert(users).values({ ...insertUser, role }).returning();
    return result[0];
  }

  async getAllUsers(): Promise<User[]> {
    return await this.db.select().from(users);
  }

  async updateUserStreak(userId: string, streak: number): Promise<User> {
    const result = await this.db.update(users)
      .set({ streak, lastDailySolve: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return result[0];
  }

  async getUserActivity(userId: string): Promise<UserActivity[]> {
    return await this.db.select().from(userActivity)
      .where(eq(userActivity.userId, userId))
      .orderBy(desc(userActivity.date));
  }

  async trackUserActivity(userId: string, minutes: number, questions: number): Promise<void> {
    // Current date (start of day)
    const result = await this.db.execute(sql`
      INSERT INTO user_activity (user_id, date, minutes_active, questions_solved)
      VALUES (${userId}, CURRENT_DATE, ${minutes}, ${questions})
      ON CONFLICT (id) DO UPDATE -- Logic for merge would need a unique constraint on (user_id, date). 
      -- Since we don't have unique constraint on (user_id, date) in schema yet, we should check existence manually or add constraint.
      -- Simple approach: Check first.
    `);

    // Better Drizzle approach:
    // First, find if exists
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // This is tricky with time zones. Let's use database CURRENT_DATE.

    // Simplest robust way without unique constraint:
    // We cannot easily do upsert without unique constraint. 
    // Let's modify schema to have unique index OR just doing Select then Insert/Update.
    // Given the complexity of modifying Constraints in schema on fly (migration), Select/Update is safer.

    const existing = await this.db.select().from(userActivity)
      .where(and(
        eq(userActivity.userId, userId),
        sql`date = CURRENT_DATE`
      ))
      .limit(1);

    if (existing && existing.length > 0) {
      await this.db.update(userActivity)
        .set({
          minutesActive: sql`minutes_active + ${minutes}`,
          questionsSolved: sql`questions_solved + ${questions}`
        })
        .where(eq(userActivity.id, existing[0].id));
    } else {
      await this.db.insert(userActivity).values({
        userId,
        minutesActive: minutes,
        questionsSolved: questions,
        date: new Date(), // It will default to CURRENT_DATE in DB but explicit is fine
      });
    }
  }

  // Contest operations
  async createContest(insertContest: InsertContest): Promise<Contest> {
    const result = await this.db.insert(contests).values(insertContest).returning();
    return result[0];
  }

  async getContest(id: string): Promise<Contest | undefined> {
    const result = await this.db.select().from(contests).where(eq(contests.id, id)).limit(1);
    return result[0];
  }

  async getAllContests(): Promise<Contest[]> {
    return await this.db.select().from(contests).orderBy(asc(contests.startTime));
  }

  async updateContestStatus(id: string, status: string): Promise<Contest | undefined> {
    const result = await this.db.update(contests)
      .set({ status })
      .where(eq(contests.id, id))
      .returning();
    return result[0];
  }

  async updateContestParticipants(id: string, participants: number): Promise<Contest | undefined> {
    const result = await this.db.update(contests)
      .set({ participants })
      .where(eq(contests.id, id))
      .returning();
    return result[0];
  }

  // Problem operations
  async createProblem(insertProblem: InsertProblem): Promise<Problem> {
    const result = await this.db.insert(problems).values(insertProblem).returning();
    return result[0];
  }

  async getProblemsByContest(contestId: string): Promise<Problem[]> {
    return await this.db.select().from(problems).where(eq(problems.contestId, contestId));
  }

  async getProblem(id: string): Promise<Problem | undefined> {
    const result = await this.db.select().from(problems).where(eq(problems.id, id)).limit(1);
    return result[0];
  }

  // Submission operations
  async createSubmission(insertSubmission: InsertSubmission): Promise<Submission> {
    const result = await this.db.insert(submissions).values(insertSubmission).returning();
    return result[0];
  }

  async getSubmissionsByUser(userId: string, contestId?: string): Promise<Submission[]> {
    if (contestId) {
      return await this.db.select().from(submissions)
        .where(and(eq(submissions.userId, userId), eq(submissions.contestId, contestId)))
        .orderBy(desc(submissions.submittedAt));
    }
    return await this.db.select().from(submissions)
      .where(eq(submissions.userId, userId))
      .orderBy(desc(submissions.submittedAt));
  }

  async getSubmissionsByProblem(problemId: string): Promise<Submission[]> {
    return await this.db.select().from(submissions)
      .where(eq(submissions.problemId, problemId))
      .orderBy(desc(submissions.submittedAt));
  }

  async updateSubmissionStatus(id: string, status: string, score?: number): Promise<Submission | undefined> {
    const updates: { status: string; score?: number } = { status };
    if (score !== undefined) {
      updates.score = score;
    }
    const result = await this.db.update(submissions)
      .set(updates)
      .where(eq(submissions.id, id))
      .returning();
    return result[0];
  }

  // Course operations
  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const result = await this.db.insert(courses).values(insertCourse).returning();
    return result[0];
  }

  async getAllCourses(): Promise<Course[]> {
    return await this.db.select().from(courses)
      .where(eq(courses.isActive, true))
      .orderBy(asc(courses.level), asc(courses.title));
  }

  async getCoursesByLevel(level: string): Promise<Course[]> {
    return await this.db.select().from(courses)
      .where(and(eq(courses.isActive, true), eq(courses.level, level)))
      .orderBy(asc(courses.title));
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const result = await this.db.select().from(courses).where(eq(courses.id, id)).limit(1);
    return result[0];
  }

  // Lesson operations
  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const result = await this.db.insert(lessons).values(insertLesson).returning();
    return result[0];
  }

  async getLessonsByCourse(courseId: string): Promise<Lesson[]> {
    return await this.db.select().from(lessons)
      .where(and(eq(lessons.courseId, courseId), eq(lessons.isActive, true)))
      .orderBy(asc(lessons.order));
  }

  async getLesson(id: string): Promise<Lesson | undefined> {
    const result = await this.db.select().from(lessons).where(eq(lessons.id, id)).limit(1);
    return result[0];
  }

  async updateLesson(id: string, updates: Partial<InsertLesson>): Promise<Lesson | undefined> {
    const result = await this.db.update(lessons)
      .set(updates)
      .where(eq(lessons.id, id))
      .returning();
    return result[0];
  }

  // Enrollment operations
  async enrollInCourse(userId: string, courseId: string): Promise<Enrollment> {
    // Check if already enrolled
    const existing = await this.getEnrollment(userId, courseId);
    if (existing) {
      return existing;
    }

    const result = await this.db.insert(enrollments).values({
      userId,
      courseId,
      progress: 0,
      timeSpent: 0,
      status: 'active',
    }).returning();

    // Update course student count
    const course = await this.getCourse(courseId);
    if (course) {
      await this.db.update(courses)
        .set({ students: (course.students || 0) + 1 })
        .where(eq(courses.id, courseId));
    }

    return result[0];
  }

  async getUserEnrollments(userId: string): Promise<Enrollment[]> {
    return await this.db.select().from(enrollments)
      .where(eq(enrollments.userId, userId))
      .orderBy(desc(enrollments.lastAccessedAt));
  }

  async getEnrollment(userId: string, courseId: string): Promise<Enrollment | undefined> {
    const result = await this.db.select().from(enrollments)
      .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)))
      .limit(1);
    return result[0];
  }

  async updateEnrollmentProgress(userId: string, courseId: string, progress: number, timeSpent?: number): Promise<Enrollment | undefined> {
    const enrollment = await this.getEnrollment(userId, courseId);
    if (!enrollment) return undefined;

    const updates: { progress: number; timeSpent?: number; lastAccessedAt: Date } = {
      progress: Math.min(100, Math.max(0, progress)),
      lastAccessedAt: new Date(),
    };

    if (timeSpent !== undefined) {
      updates.timeSpent = (enrollment.timeSpent || 0) + timeSpent;
    }

    const result = await this.db.update(enrollments)
      .set(updates)
      .where(eq(enrollments.id, enrollment.id))
      .returning();
    return result[0];
  }

  async completeEnrollment(userId: string, courseId: string): Promise<Enrollment | undefined> {
    const enrollment = await this.getEnrollment(userId, courseId);
    if (!enrollment) return undefined;

    const result = await this.db.update(enrollments)
      .set({
        progress: 100,
        status: 'completed',
        completedAt: new Date(),
        lastAccessedAt: new Date(),
      })
      .where(eq(enrollments.id, enrollment.id))
      .returning();
    return result[0];
  }

  // Lesson Progress operations
  async updateLessonProgress(enrollmentId: string, lessonId: string, userId: string, completed: boolean, timeSpent?: number): Promise<LessonProgress> {
    const existing = await this.db.select().from(lessonProgress)
      .where(and(
        eq(lessonProgress.enrollmentId, enrollmentId),
        eq(lessonProgress.lessonId, lessonId),
        eq(lessonProgress.userId, userId)
      ))
      .limit(1);

    if (existing[0]) {
      const updates: { completed: boolean; timeSpent?: number; completedAt?: Date | null; lastAccessedAt: Date } = {
        completed,
        lastAccessedAt: new Date(),
      };

      if (timeSpent !== undefined) {
        updates.timeSpent = (existing[0].timeSpent || 0) + timeSpent;
      }

      if (completed && !existing[0].completed) {
        updates.completedAt = new Date();
      }

      const result = await this.db.update(lessonProgress)
        .set(updates)
        .where(eq(lessonProgress.id, existing[0].id))
        .returning();
      return result[0];
    } else {
      const result = await this.db.insert(lessonProgress).values({
        enrollmentId,
        lessonId,
        userId,
        completed,
        timeSpent: timeSpent || 0,
        completedAt: completed ? new Date() : null,
      }).returning();
      return result[0];
    }
  }

  async getLessonProgress(userId: string, lessonId: string): Promise<LessonProgress | undefined> {
    const result = await this.db.select().from(lessonProgress)
      .where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.lessonId, lessonId)))
      .limit(1);
    return result[0];
  }

  async getEnrollmentLessonProgress(enrollmentId: string): Promise<LessonProgress[]> {
    return await this.db.select().from(lessonProgress)
      .where(eq(lessonProgress.enrollmentId, enrollmentId))
      .orderBy(desc(lessonProgress.lastAccessedAt));
  }

  // Challenge operations
  async getChallengeStats(userId: string): Promise<any> {
    const scores = await this.db.select().from(typingScores).where(eq(typingScores.userId, userId));
    const attempts = await this.db.select().from(quizAttempts).where(eq(quizAttempts.userId, userId));
    const teaserSolves = await this.db.select().from(teaserAttempts).where(
      and(eq(teaserAttempts.userId, userId), eq(teaserAttempts.solved, true))
    );

    return {
      typing: {
        completed: scores.length,
        avgWpm: scores.length ? Math.round(scores.reduce((acc: any, curr: any) => acc + curr.wpm, 0) / scores.length) : 0,
        bestWpm: scores.length ? Math.max(...scores.map((s: any) => s.wpm)) : 0,
      },
      quizzes: {
        completed: attempts.length,
        avgScore: attempts.length ? Math.round(attempts.reduce((acc: any, curr: any) => acc + curr.score, 0) / attempts.length) : 0,
      },
      brainTeasers: {
        solved: teaserSolves.length,
      }
    };
  }

  async getRandomTypingChallenge(difficulty: string, language: string): Promise<any> {
    const results = await this.db.select().from(typingChallenges).where(
      and(
        eq(typingChallenges.difficulty, difficulty),
        eq(typingChallenges.language, language)
      )
    );
    if (!results.length) return null;
    return results[Math.floor(Math.random() * results.length)];
  }

  async submitTypingScore(data: any): Promise<any> {
    const result = await this.db.insert(typingScores).values(data).returning();
    return result[0];
  }

  async getTypingLeaderboard(): Promise<any[]> {
    const scores = await this.db.select({
      userId: typingScores.userId,
      wpm: typingScores.wpm,
      accuracy: typingScores.accuracy,
      username: users.username,
      completedAt: typingScores.completedAt
    })
      .from(typingScores)
      .innerJoin(users, eq(typingScores.userId, users.id))
      .orderBy(desc(typingScores.wpm))
      .limit(10);
    return scores;
  }

  async getQuizQuestions(topic: string, difficulty: string, count: number): Promise<any[]> {
    const questions = await this.db.select().from(quizQuestions).where(
      and(
        eq(quizQuestions.topic, topic),
        eq(quizQuestions.difficulty, difficulty)
      )
    );
    return questions.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  async submitQuizAttempt(data: any): Promise<any> {
    const result = await this.db.insert(quizAttempts).values(data).returning();
    return result[0];
  }

  async getQuizStats(userId: string): Promise<any> {
    const attempts = await this.db.select().from(quizAttempts).where(eq(quizAttempts.userId, userId));
    return {
      totalAttempts: attempts.length,
      avgScore: attempts.length ? Math.round(attempts.reduce((acc: any, curr: any) => acc + curr.score, 0) / attempts.length) : 0,
      bestScore: attempts.length ? Math.max(...attempts.map((a: any) => a.score)) : 0,
    };
  }

  async getDailyBrainTeaser(): Promise<any> {
    // Select the brain teaser for today
    const teaser = await this.db.select().from(brainTeasers).where(
      sql`DATE(date) = CURRENT_DATE`
    ).limit(1);
    return teaser[0] || null;
  }

  async getTeaserAttempt(userId: string, teaserId: string): Promise<any> {
    const result = await this.db.select().from(teaserAttempts).where(
      and(eq(teaserAttempts.userId, userId), eq(teaserAttempts.teaserId, teaserId))
    ).limit(1);
    return result[0];
  }

  async submitTeaserAnswer(userId: string, teaserId: string, answer: string): Promise<any> {
    const teaser = await this.db.select().from(brainTeasers).where(eq(brainTeasers.id, teaserId)).limit(1);
    const teaserData = teaser[0];
    if (!teaserData) throw new Error("Teaser not found");

    const correct = answer.toLowerCase().trim() === teaserData.solution.toLowerCase().trim();
    const existing = await this.getTeaserAttempt(userId, teaserId);

    if (existing) {
      const result = await this.db.update(teaserAttempts).set({
        attempts: (existing.attempts || 0) + 1,
        solved: existing.solved || correct,
        userAnswer: answer,
        solvedAt: (existing.solved || correct) && !existing.solvedAt ? new Date() : existing.solvedAt
      }).where(eq(teaserAttempts.id, existing.id)).returning();
      return { correct, attempt: result[0] };
    } else {
      const result = await this.db.insert(teaserAttempts).values({
        userId,
        teaserId,
        solved: correct,
        userAnswer: answer,
        attempts: 1,
        solvedAt: correct ? new Date() : null
      }).returning();
      return { correct, attempt: result[0] };
    }
  }

  async recordHintUsed(userId: string, teaserId: string): Promise<void> {
    const existing = await this.getTeaserAttempt(userId, teaserId);
    if (existing) {
      await this.db.update(teaserAttempts).set({
        hintsUsed: (existing.hintsUsed || 0) + 1
      }).where(eq(teaserAttempts.id, existing.id));
    } else {
      await this.db.insert(teaserAttempts).values({
        userId,
        teaserId,
        hintsUsed: 1,
        attempts: 0
      });
    }
  }

  async getTeaserCalendar(userId: string): Promise<any[]> {
    const results = await this.db.select({
      date: teaserAttempts.attemptedAt,
      solved: teaserAttempts.solved
    }).from(teaserAttempts).where(eq(teaserAttempts.userId, userId)).orderBy(desc(teaserAttempts.attemptedAt));
    return results;
  }

  async getBrainTeaserStats(userId: string): Promise<any> {
    const attempts = await this.db.select().from(teaserAttempts).where(eq(teaserAttempts.userId, userId));
    return {
      totalAttempts: attempts.length,
      solved: attempts.filter((a: any) => a.solved).length,
    };
  }
}

// Use DatabaseStorage if DATABASE_URL is set, otherwise use MemStorage
let storageInstance: IStorage;
if (process.env.DATABASE_URL) {
  try {
    // Dynamic import to avoid errors if DATABASE_URL is not set
    const { db } = await import("./db");
    storageInstance = new DatabaseStorage(db);
  } catch (error) {
    console.warn("Failed to initialize database storage, falling back to memory storage:", error);
    storageInstance = new MemStorage();
  }
} else {
  storageInstance = new MemStorage();
}

export const storage = storageInstance;
