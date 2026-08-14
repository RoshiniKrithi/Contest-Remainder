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

const problems = [
  {
    title: "Valid Anagram",
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.

Constraints:
• 1 <= s.length, t.length <= 5 × 10⁴
• s and t consist of lowercase English letters only

Examples:

Example 1:
  Input:  s = "anagram", t = "nagaram"
  Output: true
  Explanation: Both strings contain the same characters with the same frequency.

Example 2:
  Input:  s = "rat", t = "car"
  Output: false
  Explanation: 'r','a','t' vs 'c','a','r' — different characters.

Example 3:
  Input:  s = "listen", t = "silent"
  Output: true

Hints:
💡 Hint 1: Sort both strings and compare them. If they are equal, they are anagrams. Time: O(n log n).
💡 Hint 2: Use a hash map (frequency counter). Count character frequencies in s, then decrement for t. If all counts reach 0, it's an anagram. Time: O(n).
💡 Hint 3: Since only lowercase letters are used, you can use a fixed-size array of 26 integers instead of a hash map for O(1) space.`,
    difficulty: "easy",
    points: 100,
    testCases: [
      { input: "anagram nagaram", output: "true" },
      { input: "rat car", output: "false" },
      { input: "listen silent", output: "true" },
      { input: "hello world", output: "false" },
    ]
  },
  {
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

Constraints:
• 2 <= nums.length <= 10⁴
• -10⁹ <= nums[i] <= 10⁹
• -10⁹ <= target <= 10⁹
• Only one valid answer exists.

Examples:

Example 1:
  Input:  nums = [2,7,11,15], target = 9
  Output: [0,1]
  Explanation: nums[0] + nums[1] = 2 + 7 = 9

Example 2:
  Input:  nums = [3,2,4], target = 6
  Output: [1,2]

Example 3:
  Input:  nums = [3,3], target = 6
  Output: [0,1]

Hints:
💡 Hint 1: A brute force approach uses two nested loops to check every pair. Time: O(n²), Space: O(1).
💡 Hint 2: Use a hash map to store each number and its index as you iterate. For each number, check if (target - number) already exists in the map. Time: O(n), Space: O(n).
💡 Hint 3: The key insight: for each element x, you need to find target - x. The hash map gives you O(1) lookup, reducing the overall complexity from O(n²) to O(n).`,
    difficulty: "easy",
    points: 100,
    testCases: [
      { input: "2 7 11 15\n9", output: "0 1" },
      { input: "3 2 4\n6", output: "1 2" },
      { input: "3 3\n6", output: "0 1" },
    ]
  },
  {
    title: "Maximum Subarray",
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous non-empty sequence of elements within an array.

Constraints:
• 1 <= nums.length <= 10⁵
• -10⁴ <= nums[i] <= 10⁴

Examples:

Example 1:
  Input:  nums = [-2,1,-3,4,-1,2,1,-5,4]
  Output: 6
  Explanation: The subarray [4,-1,2,1] has the largest sum = 6.

Example 2:
  Input:  nums = [1]
  Output: 1

Example 3:
  Input:  nums = [5,4,-1,7,8]
  Output: 23
  Explanation: The entire array [5,4,-1,7,8] has sum = 23.

Hints:
💡 Hint 1: Try a brute force approach: check all possible subarrays and track the maximum sum. Time: O(n²).
💡 Hint 2: Use Kadane's Algorithm. Maintain a running sum. At each position, decide: should you extend the current subarray or start fresh? currentSum = max(nums[i], currentSum + nums[i]).
💡 Hint 3: Kadane's key insight: if the running sum becomes negative, it can only hurt future subarrays — reset it to 0 (or the current element). Track the global maximum throughout. Time: O(n), Space: O(1).`,
    difficulty: "medium",
    points: 200,
    testCases: [
      { input: "-2 1 -3 4 -1 2 1 -5 4", output: "6" },
      { input: "1", output: "1" },
      { input: "5 4 -1 7 8", output: "23" },
    ]
  },
  {
    title: "Climbing Stairs",
    description: `You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Constraints:
• 1 <= n <= 45

Examples:

Example 1:
  Input:  n = 2
  Output: 2
  Explanation: Two ways: (1+1) or (2).

Example 2:
  Input:  n = 3
  Output: 3
  Explanation: Three ways: (1+1+1), (1+2), (2+1).

Example 3:
  Input:  n = 5
  Output: 8

Hints:
💡 Hint 1: Think recursively. To reach step n, you either came from step n-1 (took 1 step) or step n-2 (took 2 steps). So ways(n) = ways(n-1) + ways(n-2).
💡 Hint 2: Notice the pattern: 1, 2, 3, 5, 8, 13... This is the Fibonacci sequence! ways(n) = Fibonacci(n+1).
💡 Hint 3: Use dynamic programming with O(n) time and O(1) space. Keep only the last two values: prev2 = ways(n-2), prev1 = ways(n-1), current = prev1 + prev2.`,
    difficulty: "easy",
    points: 100,
    testCases: [
      { input: "2", output: "2" },
      { input: "3", output: "3" },
      { input: "5", output: "8" },
      { input: "10", output: "89" },
    ]
  },
  {
    title: "Reverse Linked List",
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.

Constraints:
• The number of nodes in the list is in the range [0, 5000].
• -5000 <= Node.val <= 5000

Examples:

Example 1:
  Input:  head = [1,2,3,4,5]
  Output: [5,4,3,2,1]

Example 2:
  Input:  head = [1,2]
  Output: [2,1]

Example 3:
  Input:  head = []
  Output: []

Hints:
💡 Hint 1: Iterative approach: use three pointers — prev (null), curr (head), next. At each step: save next = curr.next, point curr.next = prev, move prev = curr, move curr = next. Return prev.
💡 Hint 2: Recursive approach: reverse(head.next) gives you the reversed tail. Then make head.next.next = head and head.next = null to attach the original head at the end.
💡 Hint 3: The iterative approach is preferred in interviews — O(n) time, O(1) space. The recursive approach uses O(n) stack space due to recursion depth.`,
    difficulty: "easy",
    points: 100,
    testCases: [
      { input: "1 2 3 4 5", output: "5 4 3 2 1" },
      { input: "1 2", output: "2 1" },
      { input: "1", output: "1" },
    ]
  },
];

// Get all contests to find a valid contestId
const { rows: contests } = await pool.query("SELECT id FROM contests LIMIT 1");
if (!contests.length) { console.log("No contests found"); await pool.end(); process.exit(1); }
const contestId = contests[0].id;

// Update existing problems with rich descriptions
for (const p of problems) {
  const { rows: existing } = await pool.query(
    "SELECT id FROM problems WHERE title = $1 LIMIT 1", [p.title]
  );
  if (existing.length) {
    await pool.query(
      "UPDATE problems SET description = $1, test_cases = $2 WHERE id = $3",
      [p.description, JSON.stringify(p.testCases), existing[0].id]
    );
    console.log(`✅ Updated: ${p.title}`);
  } else {
    await pool.query(
      `INSERT INTO problems (contest_id, title, description, difficulty, points, test_cases, time_limit, memory_limit)
       VALUES ($1, $2, $3, $4, $5, $6, 2000, 256)`,
      [contestId, p.title, p.description, p.difficulty, p.points, JSON.stringify(p.testCases)]
    );
    console.log(`✅ Created: ${p.title}`);
  }
}

await pool.end();
console.log("Done!");
