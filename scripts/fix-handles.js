import "dotenv/config";
import dns from "dns";
import pg from "pg";
const { Pool } = pg;

const dbUrl = new URL(process.env.DATABASE_URL);
const resolver = new dns.Resolver();
resolver.setServers(["8.8.8.8"]);

const ip = await new Promise((res) =>
  resolver.resolve4(dbUrl.hostname, (e, a) => res(a?.[0] || dbUrl.hostname))
);

const pool = new Pool({
  host: ip, port: parseInt(dbUrl.port) || 5432,
  user: dbUrl.username, password: dbUrl.password,
  database: dbUrl.pathname.slice(1),
  ssl: { rejectUnauthorized: false, servername: dbUrl.hostname },
});

function extractUsername(val) {
  if (!val) return null;
  const v = val.trim();
  if (!v.includes("/")) return v; // already a plain handle
  // Remove trailing slash, take last path segment
  const clean = v.replace(/\/+$/, "");
  const parts = clean.split("/");
  return parts[parts.length - 1].split("?")[0] || v;
}

const { rows } = await pool.query(`
  SELECT id, cf_handle, lc_handle, cc_handle, at_handle, hr_handle, gfg_handle
  FROM users
  WHERE cf_handle IS NOT NULL OR lc_handle IS NOT NULL OR cc_handle IS NOT NULL
`);

for (const r of rows) {
  const cf  = extractUsername(r.cf_handle);
  const lc  = extractUsername(r.lc_handle);
  const cc  = extractUsername(r.cc_handle);
  const at  = extractUsername(r.at_handle);
  const hr  = extractUsername(r.hr_handle);
  const gfg = extractUsername(r.gfg_handle);

  await pool.query(
    `UPDATE users SET cf_handle=$1, lc_handle=$2, cc_handle=$3,
     at_handle=$4, hr_handle=$5, gfg_handle=$6 WHERE id=$7`,
    [cf, lc, cc, at, hr, gfg, r.id]
  );
  console.log(`✅ Fixed user ${r.id}:`);
  console.log(`   CF: ${r.cf_handle} → ${cf}`);
  console.log(`   LC: ${r.lc_handle} → ${lc}`);
  console.log(`   CC: ${r.cc_handle} → ${cc}`);
}

await pool.end();
console.log("Done");
