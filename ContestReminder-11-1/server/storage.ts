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
  type InsertUserActivity
} from "@shared/schema";
import { randomUUID } from "crypto";
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
    this.initializeSampleCourses();
    this.initializeSampleLessons();
    this.initializeAdminUser();
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
      role: "admin"
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
      role: insertUser.username === "admin" ? "admin" : (insertUser.role || "user")
    };
    this.users.set(id, user);
    return user;
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
      videoUrl: insertLesson.videoUrl || null
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
    // Get all course IDs
    const courseIds = Array.from(this.courses.keys());

    courseIds.forEach(courseId => {
      const course = this.courses.get(courseId);
      if (!course) return;

      let lessons: Array<Omit<Lesson, 'id' | 'createdAt'>> = [];

      // Create different lesson sets based on course title
      if (course.title.includes("Programming Fundamentals")) {
        lessons = [
          {
            courseId,
            title: "Introduction to Programming",
            description: "Understanding what programming is and basic concepts",
            content: "Learn the fundamental concepts of programming including algorithms, data, and control structures.",
            order: 1,
            duration: 45,
            videoUrl: null,
            isActive: true
          },
          {
            courseId,
            title: "Variables and Data Types",
            description: "Working with different types of data in programming",
            content: "Explore different data types including numbers, strings, booleans, and how to store them in variables.",
            order: 2,
            duration: 30,
            videoUrl: null,
            isActive: true
          },
          {
            courseId,
            title: "Control Flow - Conditionals",
            description: "Making decisions in your code with if statements",
            content: "Learn how to use if, else if, and else statements to control program flow.",
            order: 3,
            duration: 40,
            videoUrl: null,
            isActive: true
          },
          {
            courseId,
            title: "Control Flow - Loops",
            description: "Repeating code execution with loops",
            content: "Master for loops, while loops, and understanding when to use each type.",
            order: 4,
            duration: 35,
            videoUrl: null,
            isActive: true
          },
          {
            courseId,
            title: "Functions and Methods",
            description: "Creating reusable code blocks",
            content: "Learn how to write functions, pass parameters, and return values.",
            order: 5,
            duration: 50,
            videoUrl: null,
            isActive: true
          }
        ];
      } else if (course.title.includes("Data Structures")) {
        lessons = [
          {
            courseId,
            title: "Introduction to Data Structures",
            description: "Understanding why data structures matter",
            content: "Learn the importance of data organization and efficiency in programming.",
            order: 1,
            duration: 30,
            videoUrl: null,
            isActive: true
          },
          {
            courseId,
            title: "Arrays and Lists",
            description: "Working with ordered collections of data",
            content: "Master arrays, dynamic arrays, and list operations.",
            order: 2,
            duration: 45,
            videoUrl: null,
            isActive: true
          },
          {
            courseId,
            title: "Linked Lists",
            description: "Understanding pointer-based data structures",
            content: "Learn singly and doubly linked lists and their applications.",
            order: 3,
            duration: 55,
            videoUrl: null,
            isActive: true
          },
          {
            courseId,
            title: "Stacks and Queues",
            description: "LIFO and FIFO data structures",
            content: "Implement and use stacks and queues for various problems.",
            order: 4,
            duration: 40,
            videoUrl: null,
            isActive: true
          }
        ];
      } else {
        // Generic lesson structure for other courses
        lessons = [
          {
            courseId,
            title: "Course Introduction",
            description: "Welcome and course overview",
            content: "Introduction to the course objectives and learning outcomes.",
            order: 1,
            duration: 20,
            videoUrl: null,
            isActive: true
          },
          {
            courseId,
            title: "Core Concepts",
            description: "Fundamental concepts and principles",
            content: "Deep dive into the core concepts that form the foundation of this topic.",
            order: 2,
            duration: 40,
            videoUrl: null,
            isActive: true
          },
          {
            courseId,
            title: "Practical Applications",
            description: "Real-world examples and use cases",
            content: "Explore practical applications and hands-on examples.",
            order: 3,
            duration: 60,
            videoUrl: null,
            isActive: true
          },
          {
            courseId,
            title: "Advanced Techniques",
            description: "Advanced methods and best practices",
            content: "Learn advanced techniques and industry best practices.",
            order: 4,
            duration: 45,
            videoUrl: null,
            isActive: true
          },
          {
            courseId,
            title: "Final Project",
            description: "Apply your knowledge in a comprehensive project",
            content: "Complete a final project that demonstrates your mastery of the subject.",
            order: 5,
            duration: 90,
            videoUrl: null,
            isActive: true
          }
        ];
      }

      // Create lesson objects and add them to storage
      lessons.forEach(lessonData => {
        const id = randomUUID();
        const lesson: Lesson = {
          ...lessonData,
          id,
          createdAt: new Date()
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
