import "dotenv/config";
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const sql = `
  ALTER TABLE contests ADD COLUMN IF NOT EXISTS external_id TEXT UNIQUE;
  ALTER TABLE contests ADD COLUMN IF NOT EXISTS platform TEXT NOT NULL DEFAULT 'System';
  ALTER TABLE contests ADD COLUMN IF NOT EXISTS url TEXT;
  ALTER TABLE contests ADD COLUMN IF NOT EXISTS duration INTEGER NOT NULL DEFAULT 0;
  ALTER TABLE contests ADD COLUMN IF NOT EXISTS last_updated TIMESTAMP DEFAULT now();
  ALTER TABLE contests ADD COLUMN IF NOT EXISTS notified BOOLEAN DEFAULT false;
`;

try {
  await pool.query(sql);
  console.log("✅ Migration complete — missing columns added to contests table");
} catch (err) {
  console.error("❌ Migration error:", err.message, err.stack);
} finally {
  await pool.end();
}
