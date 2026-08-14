import "dotenv/config";
import pg from 'pg';
const { Client } = pg;

async function main() {
  console.log("🚀 Starting raw SQL database seeding...");
  
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is missing!");
    process.exit(1);
  }

  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  try {
    // 1. Create a contest if it doesn't exist
    const contestTitle = "Daily Coding Challenge";
    const { rows: contests } = await client.query('SELECT id FROM contests WHERE title = $1', [contestTitle]);
    let contestId;

    if (contests.length === 0) {
      const { rows } = await client.query(
        'INSERT INTO contests (title, description, platform, start_time, end_time, status, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        [contestTitle, "Daily algorithmic challenges.", "System", new Date(), new Date(Date.now() + 86400000 * 365), "ongoing", "system"]
      );
      contestId = rows[0].id;
      console.log(`✅ Contest Created: ${contestTitle}`);
    } else {
      contestId = contests[0].id;
      console.log(`ℹ️ Contest Exists: ${contestTitle}`);
    }

    // 2. Add some problems
    const sampleProblems = [
      { title: "Two Sum", difficulty: "easy", points: 100 },
      { title: "Reverse String", difficulty: "medium", points: 200 },
      { title: "Valid Anagram", difficulty: "easy", points: 100 }
    ];

    for (const p of sampleProblems) {
      const { rows: problems } = await client.query('SELECT id FROM problems WHERE title = $1', [p.title]);
      if (problems.length === 0) {
        await client.query(
          'INSERT INTO problems (contest_id, title, description, difficulty, points, test_cases) VALUES ($1, $2, $3, $4, $5, $6)',
          [contestId, p.title, `Description for ${p.title}`, p.difficulty, p.points, '[]']
        );
        console.log(`   └─ Problem Created: ${p.title}`);
      }
    }

    console.log("🏁 Mission Accompished: Database synchronized with raw SQL.");
  } finally {
    await client.end();
  }
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Mission Failed: Seeding Error", err);
  process.exit(1);
});
