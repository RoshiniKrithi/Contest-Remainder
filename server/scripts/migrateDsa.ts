import "dotenv/config";
import pkg from "pg";
const { Client } = pkg;

export async function runDsaMigration() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be defined");
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("⚡ Connected to database for DSA migration...");

    await client.query(`
      CREATE TABLE IF NOT EXISTS dsa_sheets (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS dsa_topics (
        id SERIAL PRIMARY KEY,
        sheet_id INTEGER REFERENCES dsa_sheets(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        order_index INTEGER NOT NULL DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS dsa_subtopics (
        id SERIAL PRIMARY KEY,
        topic_id INTEGER NOT NULL REFERENCES dsa_topics(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        order_index INTEGER NOT NULL DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS dsa_problems (
        id SERIAL PRIMARY KEY,
        subtopic_id INTEGER NOT NULL REFERENCES dsa_subtopics(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        platform TEXT NOT NULL,
        problem_url TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        judge0_problem_id INTEGER,
        order_index INTEGER NOT NULL DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS user_dsa_progress (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        problem_id INTEGER NOT NULL REFERENCES dsa_problems(id) ON DELETE CASCADE,
        status TEXT NOT NULL DEFAULT 'unsolved',
        code TEXT,
        language TEXT,
        time_spent INTEGER DEFAULT 0,
        notes TEXT,
        solved_at TIMESTAMP,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
        CONSTRAINT user_dsa_progress_user_problem_unique UNIQUE (user_id, problem_id)
      );

      ALTER TABLE user_dsa_progress ADD COLUMN IF NOT EXISTS code TEXT;
      ALTER TABLE user_dsa_progress ADD COLUMN IF NOT EXISTS language TEXT;
      ALTER TABLE user_dsa_progress ADD COLUMN IF NOT EXISTS time_spent INTEGER DEFAULT 0;

      CREATE INDEX IF NOT EXISTS idx_user_dsa_progress_user_id ON user_dsa_progress(user_id);
      CREATE INDEX IF NOT EXISTS idx_user_dsa_progress_problem_id ON user_dsa_progress(problem_id);
      CREATE INDEX IF NOT EXISTS idx_dsa_problems_subtopic_id ON dsa_problems(subtopic_id);
      CREATE INDEX IF NOT EXISTS idx_dsa_subtopics_topic_id ON dsa_subtopics(topic_id);
      CREATE INDEX IF NOT EXISTS idx_dsa_topics_sheet_id ON dsa_topics(sheet_id);
    `);

    console.log("✅ DSA Migration executed successfully!");
  } catch (error) {
    console.error("❌ DSA Migration failed:", error);
    throw error;
  } finally {
    await client.end();
  }
}

// Allow direct execution
if (process.argv[1]?.endsWith("migrateDsa.ts") || process.argv[1]?.endsWith("migrateDsa.js")) {
  runDsaMigration()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
