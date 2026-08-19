import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const statements = [
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "account_status" text NOT NULL DEFAULT 'active';`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "banned_at" timestamp;`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "banned_by" varchar;`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "ban_reason" text;`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "revoked_at" timestamp;`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "revoked_by" varchar;`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "revocation_reason" text;`,
];

async function runMigration() {
  console.log("🚀 Starting database schema updates for Admin User Access Management...");
  
  for (const sql of statements) {
    try {
      await pool.query(sql);
      console.log(`✅ Executed: ${sql}`);
    } catch (err: any) {
      console.error(`❌ Error executing migration statement:`, err.message);
      process.exit(1);
    }
  }

  console.log("🎉 User Access columns migration completed successfully!");
  await pool.end();
}

runMigration().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
