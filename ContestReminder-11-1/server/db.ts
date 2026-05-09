import "dotenv/config";
import dns from "dns";
import pg from "pg";
const { Pool } = pg;
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set.");
}

const dbUrl = new URL(process.env.DATABASE_URL);
const dbHost = dbUrl.hostname;

function resolveWithGoogleDns(hostname: string): Promise<string> {
  // On Render/production, system DNS works fine — skip custom resolver
  if (process.env.NODE_ENV === "production") {
    return Promise.resolve(hostname);
  }
  return new Promise((resolve) => {
    const resolver = new dns.Resolver();
    resolver.setServers(["8.8.8.8", "1.1.1.1"]);
    resolver.resolve4(hostname, (err, addresses) => {
      if (err || !addresses?.length) {
        console.warn(`⚠️  DNS resolve failed: ${err?.message} — using hostname directly`);
        resolve(hostname);
      } else {
        console.log(`📡 Resolved ${hostname} → ${addresses[0]}`);
        resolve(addresses[0]);
      }
    });
  });
}

function createPool(host: string): pg.Pool {
  const p = new Pool({
    host,
    port: parseInt(dbUrl.port) || 5432,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1),
    ssl: { rejectUnauthorized: false, servername: dbHost },
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 5,
  });
  p.on("error", (err) => {
    console.error("❌ DB pool error:", err.message);
    if (err.message.includes("EHOSTUNREACH") || err.message.includes("ECONNREFUSED") || err.message.includes("ENOTFOUND")) {
      _pool = null;
      _db = null;
      _initialising = false;
      console.log("🔄 Will reconnect on next request...");
    }
  });
  return p;
}

let _pool: pg.Pool | null = null;
let _db: ReturnType<typeof drizzle> | null = null;
let _initialising = false;
let _ready = false;

async function initDb(retries = 3): Promise<void> {
  if (_ready || _initialising) return;
  _initialising = true;
  try {
    let pool: pg.Pool;
    if (process.env.NODE_ENV === "production") {
      // On Render — use connection string directly, DNS works fine
      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 10000,
        idleTimeoutMillis: 30000,
        max: 5,
      });
      pool.on("error", (err) => console.error("❌ DB pool error:", err.message));
    } else {
      // Local dev — system DNS may not resolve Neon, use Google DNS
      const resolvedHost = await resolveWithGoogleDns(dbHost);
      pool = createPool(resolvedHost);
    }
    await pool.query("SELECT 1");
    _pool = pool;
    _db = drizzle(_pool, { schema });
    _ready = true;
    console.log("✅ DB connected");
  } catch (err: any) {
    console.error(`❌ DB init failed: ${err.message}`);
    _pool = null;
    _db = null;
    _ready = false;
    if (retries > 0) {
      console.log(`🔄 Retrying DB connection in 3s... (${retries} left)`);
      await new Promise(r => setTimeout(r, 3000));
      _initialising = false;
      return initDb(retries - 1);
    }
  } finally {
    _initialising = false;
  }
}

// Start connecting immediately
export const dbReady = initDb();

// Called by routes — waits for connection, retries if needed
export async function ensureDb(): Promise<ReturnType<typeof drizzle>> {
  if (_db) return _db;
  await initDb();
  if (!_db) throw new Error("Database unavailable — please try again in a moment");
  return _db;
}

export async function getDb() { return ensureDb(); }

export async function getPool(): Promise<pg.Pool> {
  if (_pool) return _pool;
  await initDb();
  if (!_pool) throw new Error("DB pool unavailable");
  return _pool;
}

// Synchronous proxy — safe to use after dbReady resolves
export const pool = new Proxy({} as pg.Pool, {
  get(_t, prop) {
    if (!_pool) throw new Error("DB pool not ready");
    return (_pool as any)[prop];
  }
});

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_t, prop) {
    if (!_db) throw new Error("DB not ready");
    return (_db as any)[prop];
  }
});

export function isDbReady() { return _ready; }
