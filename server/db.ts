import "dotenv/config";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set.");
}

let _pool: InstanceType<typeof Pool> | null = null;
let _db: ReturnType<typeof drizzle> | null = null;
let _initialising = false;
let _ready = false;

let resolveDbReady: () => void;
export const dbReady = new Promise<void>((resolve) => {
  resolveDbReady = resolve;
});

async function initDb(retries = 20): Promise<void> {
  if (_ready) return;
  _initialising = true;
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 30000,
    });
    pool.on("error", (err) => console.error("❌ DB pool error:", err.message));
    
    await pool.query("SELECT 1");
    _pool = pool;
    _db = drizzle(_pool, { schema });
    _ready = true;
    _initialising = false;
    console.log("✅ DB connected successfully");
    resolveDbReady();
  } catch (err: any) {
    console.error(`❌ DB init failed: ${err.message}`);
    _pool = null;
    _db = null;
    _ready = false;
    _initialising = false;
    
    if (retries > 0) {
      console.log(`🔄 Retrying DB connection in 3s... (${retries} left)`);
      await new Promise(r => setTimeout(r, 3000));
      return initDb(retries - 1);
    } else {
      console.log(`⚠️ DB connection failed after retries. Starting indefinite background retries every 10s...`);
      setTimeout(() => initDb(5), 10000);
    }
  }
}

// Start connecting immediately
initDb();

export async function ensureDb(): Promise<ReturnType<typeof drizzle>> {
  if (_db) return _db;
  await dbReady;
  return _db!;
}

export async function getDb() { return ensureDb(); }

export async function getPool(): Promise<pg.Pool> {
  if (_pool) return _pool;
  await initDb();
  if (!_pool) throw new Error("DB pool unavailable");
  return _pool;
}

export const pool = new Proxy({} as pg.Pool, {
  get(_t, prop) {
    if (!_pool) {
      initDb();
      throw new Error("DB pool not ready");
    }
    return (_pool as any)[prop];
  }
});

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_t, prop) {
    if (!_db) {
      initDb();
      throw new Error("DB not ready");
    }
    return (_db as any)[prop];
  }
});

export function isDbReady() { return _ready; }
