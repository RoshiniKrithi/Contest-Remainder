import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected to database. Adding columns...");
    
    // Check and add columns to contests table
    await client.query(`
      ALTER TABLE contests 
      ADD COLUMN IF NOT EXISTS platform TEXT,
      ADD COLUMN IF NOT EXISTS url TEXT,
      ADD COLUMN IF NOT EXISTS duration INTEGER,
      ADD COLUMN IF NOT EXISTS "externalId" TEXT;
    `);
    
    // Create bookmarks table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS bookmarks (
        id SERIAL PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "contestId" TEXT NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Migration successful!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}

migrate();
