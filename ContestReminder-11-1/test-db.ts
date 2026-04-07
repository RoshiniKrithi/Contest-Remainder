import { db, pool } from "./server/db";
import { users } from "./server/shared/schema";

async function test() {
  try {
    console.log("Testing database connection...");
    const result = await db.select().from(users).limit(1);
    console.log("Connection successful! Found users:", result.length);
    process.exit(0);
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

test();
