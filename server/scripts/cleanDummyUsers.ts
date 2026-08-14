import "dotenv/config";
import { db, dbReady } from "../db";
import { users } from "../shared/schema";
import { inArray } from "drizzle-orm";

async function cleanDummyUsers() {
  await dbReady;
  console.log("🧹 Cleaning up dummy test accounts from database...");

  const dummyUsernames = [
    "tester_123",
    "testuser",
    "tester",
    "streaktester",
    "operative99",
    "admin_user_unique",
    "admin_test_user",
    "Hc21",
    "Code",
    "roshini" // duplicate unused test account
  ];

  const deleted = await db.delete(users).where(inArray(users.username, dummyUsernames)).returning();
  console.log(`✅ Successfully deleted ${deleted.length} dummy test user accounts:`, deleted.map(u => u.username));
  process.exit(0);
}

cleanDummyUsers().catch(err => {
  console.error("❌ Failed to clean dummy users:", err);
  process.exit(1);
});
