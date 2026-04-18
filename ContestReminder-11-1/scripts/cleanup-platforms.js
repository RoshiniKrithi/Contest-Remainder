import "dotenv/config";
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const ALLOWED = [
  "codeforces.com", "leetcode.com", "codechef.com", "atcoder.jp",
  "hackerrank.com", "geeksforgeeks.org", "topcoder.com",
  "hackerearth.com", "codingninjas.com",
  "Codeforces", "LeetCode", "CodeChef", "AtCoder",
  "HackerRank", "GeeksforGeeks", "TopCoder", "HackerEarth", "Coding Ninjas"
];

const placeholders = ALLOWED.map((_, i) => `$${i + 1}`).join(", ");

const result = await pool.query(
  `DELETE FROM contests WHERE platform NOT IN (${placeholders}) RETURNING title, platform`,
  ALLOWED
);

console.log(`✅ Removed ${result.rowCount} contests from non-allowed platforms:`);
result.rows.forEach(r => console.log(`  - [${r.platform}] ${r.title}`));

await pool.end();
