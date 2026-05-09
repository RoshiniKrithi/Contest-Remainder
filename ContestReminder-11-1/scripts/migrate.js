import "dotenv/config";
import dns from "dns";
import pg from "pg";
const { Pool } = pg;

const dbUrl = new URL(process.env.DATABASE_URL);

function resolveWithGoogleDns(hostname) {
  return new Promise((resolve) => {
    const resolver = new dns.Resolver();
    resolver.setServers(["8.8.8.8", "1.1.1.1"]);
    resolver.resolve4(hostname, (err, addresses) => {
      if (err || !addresses?.length) {
        console.warn(`DNS fallback failed: ${err?.message}`);
        resolve(hostname);
      } else {
        console.log(`Resolved ${hostname} → ${addresses[0]}`);
        resolve(addresses[0]);
      }
    });
  });
}

const resolvedHost = await resolveWithGoogleDns(dbUrl.hostname);

const pool = new Pool({
  host: resolvedHost,
  port: parseInt(dbUrl.port) || 5432,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1),
  ssl: { rejectUnauthorized: false, servername: dbUrl.hostname },
});

const sql = `
  ALTER TABLE contests ADD COLUMN IF NOT EXISTS external_id TEXT UNIQUE;
  ALTER TABLE contests ADD COLUMN IF NOT EXISTS platform TEXT NOT NULL DEFAULT 'System';
  ALTER TABLE contests ADD COLUMN IF NOT EXISTS url TEXT;
  ALTER TABLE contests ADD COLUMN IF NOT EXISTS duration INTEGER NOT NULL DEFAULT 0;
  ALTER TABLE contests ADD COLUMN IF NOT EXISTS last_updated TIMESTAMP DEFAULT now();
  ALTER TABLE contests ADD COLUMN IF NOT EXISTS notified BOOLEAN DEFAULT false;
  ALTER TABLE users ADD COLUMN IF NOT EXISTS cf_handle TEXT;
  ALTER TABLE users ADD COLUMN IF NOT EXISTS lc_handle TEXT;
  ALTER TABLE users ADD COLUMN IF NOT EXISTS cc_handle TEXT;
  ALTER TABLE users ADD COLUMN IF NOT EXISTS at_handle TEXT;
  ALTER TABLE users ADD COLUMN IF NOT EXISTS hr_handle TEXT;
  ALTER TABLE users ADD COLUMN IF NOT EXISTS gfg_handle TEXT;
  CREATE TABLE IF NOT EXISTS groups (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    invite_code TEXT NOT NULL UNIQUE,
    created_by VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT now()
  );
  CREATE TABLE IF NOT EXISTS group_members (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id VARCHAR NOT NULL,
    user_id VARCHAR NOT NULL,
    cf_handle TEXT,
    lc_handle TEXT,
    cc_handle TEXT,
    joined_at TIMESTAMP DEFAULT now(),
    UNIQUE(group_id, user_id)
  );
`;

try {
  await pool.query(sql);
  console.log("✅ Migration complete");
} catch (err) {
  console.error("❌ Migration error:", err.message);
} finally {
  await pool.end();
}
