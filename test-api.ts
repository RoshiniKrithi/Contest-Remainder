import { KontestsAPI } from "./server/contest-apis";

async function test() {
  console.log("Fetching contests from Kontests API...");
  const contests = await KontestsAPI.getAllContests();
  console.log(`Found ${contests.length} contests.`);
  
  const leetcode = contests.filter(c => c.platform.toLowerCase().includes("leetcode"));
  console.log(`Found ${leetcode.length} LeetCode contests.`);
  leetcode.forEach(c => {
    console.log(`- ${c.name} (${c.start_time})`);
  });
  process.exit(0);
}

test();
