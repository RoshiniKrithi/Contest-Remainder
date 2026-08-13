import "dotenv/config";
import { db, dbReady } from "../db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function seedDefaultUsers() {
  await dbReady;
  console.log("🔐 Checking default users in database...");

  // 1. Admin user
  let [admin] = await db.select().from(users).where(eq(users.username, "admin")).limit(1);
  if (!admin) {
    const hashedPassword = await hashPassword("admin123");
    const [inserted] = await db.insert(users).values({
      username: "admin",
      password: hashedPassword,
      role: "admin",
    } as any).returning();
    console.log(`✅ Default Admin user created: admin / admin123 (ID: ${inserted.id})`);
  } else {
    console.log(`ℹ️ Admin user already exists: ${admin.username} (Role: ${admin.role})`);
  }

  // 2. Student user
  let [student] = await db.select().from(users).where(eq(users.username, "student")).limit(1);
  if (!student) {
    const hashedPassword = await hashPassword("student123");
    const [inserted] = await db.insert(users).values({
      username: "student",
      password: hashedPassword,
      role: "user",
    } as any).returning();
    console.log(`✅ Default Student user created: student / student123 (ID: ${inserted.id})`);
  } else {
    console.log(`ℹ️ Student user already exists: ${student.username} (Role: ${student.role})`);
  }
}

if (process.argv[1]?.endsWith("seedUsers.ts") || process.argv[1]?.endsWith("seedUsers.js")) {
  seedDefaultUsers()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("❌ Failed to seed default users:", err);
      process.exit(1);
    });
}
