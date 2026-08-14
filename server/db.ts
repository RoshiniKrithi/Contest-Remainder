import "dotenv/config";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import dns from "dns";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./shared/schema";

// Use native DNS resolution for Neon database instead of hardcoding a single, potentially unreachable IP address


neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set.");
}

let _pool: Pool | null = null;
let _db: ReturnType<typeof drizzle> | null = null;
let _initialising = false;
let _ready = false;

async function initDb(retries = 3): Promise<void> {
  if (_ready || _initialising) return;
  _initialising = true;
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 30000,
    });
    pool.on("error", (err) => console.error("❌ DB pool error:", err.message));
    
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

export async function ensureDb(): Promise<ReturnType<typeof drizzle>> {
  if (_db) return _db;
  await initDb();
  if (!_db) throw new Error("Database unavailable — please try again in a moment");
  return _db;
}

export async function getDb() { return ensureDb(); }

export async function getPool(): Promise<Pool> {
  if (_pool) return _pool;
  await initDb();
  if (!_pool) throw new Error("DB pool unavailable");
  return _pool;
}

export const pool = new Proxy({} as Pool, {
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
