import "dotenv/config";
import { db, dbReady } from "../db";
import { dsaSheets, dsaTopics, dsaSubtopics, dsaProblems } from "../shared/schema";
import { eq, and } from "drizzle-orm";
import { getProblemDetailsSpec } from "./dsaProblemCatalog";

export async function seedDsaSheet() {
  await dbReady;
  console.log("🌱 Starting Comprehensive DSA Sheet seed...");

  // 1. Main Sheet
  const sheetTitle = "Striver Style DSA Roadmap";
  let [sheet] = await db.select().from(dsaSheets).where(eq(dsaSheets.title, sheetTitle)).limit(1);

  if (!sheet) {
    const [inserted] = await db.insert(dsaSheets).values({
      title: sheetTitle,
      description: "Master Data Structures & Algorithms topic by topic and build strong problem-solving fundamentals.",
    } as any).returning();
    sheet = inserted;
    console.log(`✅ Created Sheet: ${sheet.title} (ID: ${sheet.id})`);
  } else {
    console.log(`ℹ️ Sheet already exists: ${sheet.title} (ID: ${sheet.id})`);
  }

  // 2. Complete Topics & Subtopics Data Structure
  const topicsData = [
    {
      title: "Array",
      description: "Fundamental collection of elements stored at contiguous memory locations.",
      orderIndex: 1,
      subtopics: [
        {
          title: "Two-Pointer",
          description: "Use two indices that move towards or away from each other to solve array problems efficiently.",
          orderIndex: 1,
          problems: [
            { title: "Two Sum", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/two-sum/", difficulty: "Easy", orderIndex: 1 },
            { title: "3Sum", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/3sum/", difficulty: "Medium", orderIndex: 2 },
            { title: "Container With Most Water", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/container-with-most-water/", difficulty: "Medium", orderIndex: 3 },
            { title: "Valid Palindrome", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/valid-palindrome/", difficulty: "Easy", orderIndex: 4 },
          ],
        },
        {
          title: "Sliding Window",
          description: "Maintain a dynamic range over an array while efficiently processing contiguous elements.",
          orderIndex: 2,
          problems: [
            { title: "Maximum Average Subarray I", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/maximum-average-subarray-i/", difficulty: "Easy", orderIndex: 1 },
            { title: "Longest Substring Without Repeating Characters", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "Medium", orderIndex: 2 },
            { title: "Minimum Size Subarray Sum", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/minimum-size-subarray-sum/", difficulty: "Medium", orderIndex: 3 },
            { title: "Permutation in String", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/permutation-in-string/", difficulty: "Medium", orderIndex: 4 },
          ],
        },
        {
          title: "Prefix Sum",
          description: "Precompute cumulative values to answer range-based calculations efficiently.",
          orderIndex: 3,
          problems: [
            { title: "Range Sum Query - Immutable", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/range-sum-query-immutable/", difficulty: "Easy", orderIndex: 1 },
            { title: "Subarray Sum Equals K", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/subarray-sum-equals-k/", difficulty: "Medium", orderIndex: 2 },
            { title: "Product of Array Except Self", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/product-of-array-except-self/", difficulty: "Medium", orderIndex: 3 },
          ],
        },
        {
          title: "Kadane's Algorithm",
          description: "Find the maximum sum contiguous subarray efficiently using dynamic programming principles.",
          orderIndex: 4,
          problems: [
            { title: "Maximum Subarray", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/maximum-subarray/", difficulty: "Easy", orderIndex: 1 },
            { title: "Maximum Product Subarray", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/maximum-product-subarray/", difficulty: "Medium", orderIndex: 2 },
          ],
        },
      ],
    },
    {
      title: "Strings",
      description: "Sequence of characters and common string manipulation patterns.",
      orderIndex: 2,
      subtopics: [
        {
          title: "Two-Pointer (Palindrome)",
          description: "Compare characters from both ends and move inward until the condition fails.",
          orderIndex: 1,
          problems: [
            { title: "Valid Palindrome II", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/valid-palindrome-ii/", difficulty: "Easy", orderIndex: 1 },
            { title: "Longest Palindromic Substring", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/longest-palindromic-substring/", difficulty: "Medium", orderIndex: 2 },
            { title: "Palindromic Substrings", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/palindromic-substrings/", difficulty: "Medium", orderIndex: 3 },
            { title: "Shortest Palindrome", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/shortest-palindrome/", difficulty: "Hard", orderIndex: 4 },
            { title: "Valid Anagram", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/valid-anagram/", difficulty: "Easy", orderIndex: 5 },
          ],
        },
        {
          title: "Sliding Window (String)",
          description: "Maintain a moving window and adjust its size to satisfy character constraints.",
          orderIndex: 2,
          problems: [
            { title: "Find All Anagrams in a String", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/find-all-anagrams-in-a-string/", difficulty: "Medium", orderIndex: 1 },
            { title: "Minimum Window Substring", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/minimum-window-substring/", difficulty: "Hard", orderIndex: 2 },
            { title: "Longest Repeating Character Replacement", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/longest-repeating-character-replacement/", difficulty: "Medium", orderIndex: 3 },
            { title: "Group Anagrams", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/group-anagrams/", difficulty: "Medium", orderIndex: 4 },
            { title: "String Compression", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/string-compression/", difficulty: "Medium", orderIndex: 5 },
            { title: "Encode and Decode Strings", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/encode-and-decode-strings/", difficulty: "Medium", orderIndex: 6 },
          ],
        },
      ],
    },
    {
      title: "Binary Search",
      description: "Efficient search algorithm that divides the search interval in half.",
      orderIndex: 3,
      subtopics: [
        {
          title: "Classic Binary Search",
          description: "Divide-and-conquer → narrow search space in sorted array.",
          orderIndex: 1,
          problems: [
            { title: "Binary Search", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/binary-search/", difficulty: "Easy", orderIndex: 1 },
            { title: "Search in Rotated Sorted Array", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/", difficulty: "Medium", orderIndex: 2 },
            { title: "Search in Rotated Sorted Array II", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/", difficulty: "Medium", orderIndex: 3 },
            { title: "Find Minimum in Rotated Sorted Array", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", difficulty: "Medium", orderIndex: 4 },
            { title: "Find Peak Element", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/find-peak-element/", difficulty: "Medium", orderIndex: 5 },
            { title: "Single Element in a Sorted Array", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/single-element-in-a-sorted-array/", difficulty: "Medium", orderIndex: 6 },
          ],
        },
        {
          title: "Lower / Upper Bound",
          description: "Find first/last occurrence or smallest/largest index satisfying a condition.",
          orderIndex: 2,
          problems: [
            { title: "Search Insert Position", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/search-insert-position/", difficulty: "Easy", orderIndex: 1 },
            { title: "Find First and Last Position of Element in Sorted Array", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", difficulty: "Medium", orderIndex: 2 },
            { title: "First Bad Version", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/first-bad-version/", difficulty: "Easy", orderIndex: 3 },
            { title: "Arranging Coins", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/arranging-coins/", difficulty: "Easy", orderIndex: 4 },
            { title: "Kth Missing Positive Number", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/kth-missing-positive-number/", difficulty: "Easy", orderIndex: 5 },
          ],
        },
      ],
    },
    {
      title: "Stack",
      description: "LIFO (Last In First Out) data structure patterns.",
      orderIndex: 4,
      subtopics: [
        {
          title: "Monotonic Stack",
          description: "Maintain a monotonic increasing/decreasing stack to find next/prev greater/smaller, histogram ranges, or collisions.",
          orderIndex: 1,
          problems: [
            { title: "Next Greater Element I", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/next-greater-element-i/", difficulty: "Easy", orderIndex: 1 },
            { title: "Next Greater Element II", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/next-greater-element-ii/", difficulty: "Medium", orderIndex: 2 },
            { title: "Daily Temperatures", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/daily-temperatures/", difficulty: "Medium", orderIndex: 3 },
            { title: "Online Stock Span", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/online-stock-span/", difficulty: "Medium", orderIndex: 4 },
            { title: "Largest Rectangle in Histogram", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/", difficulty: "Hard", orderIndex: 5 },
            { title: "Maximal Rectangle", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/maximal-rectangle/", difficulty: "Hard", orderIndex: 6 },
            { title: "Trapping Rain Water", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/trapping-rain-water/", difficulty: "Hard", orderIndex: 7 },
          ],
        },
        {
          title: "Parenthesis & Scoring",
          description: "Push opening symbols and validate closing ones; sometimes track count or score.",
          orderIndex: 2,
          problems: [
            { title: "Valid Parentheses", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/valid-parentheses/", difficulty: "Easy", orderIndex: 1 },
            { title: "Minimum Add to Make Parentheses Valid", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/", difficulty: "Medium", orderIndex: 2 },
            { title: "Score of Parentheses", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/score-of-parentheses/", difficulty: "Medium", orderIndex: 3 },
            { title: "Longest Valid Parentheses", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/longest-valid-parentheses/", difficulty: "Hard", orderIndex: 4 },
          ],
        },
      ],
    },
    {
      title: "Linked List",
      description: "Linear data structure where elements are not stored at contiguous memory locations.",
      orderIndex: 5,
      subtopics: [
        {
          title: "Basic Operations",
          description: "Directly manipulate pointers to insert, delete, traverse, and get length.",
          orderIndex: 1,
          problems: [
            { title: "Delete Node in a Linked List", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/delete-node-in-a-linked-list/", difficulty: "Easy", orderIndex: 1 },
            { title: "Insert into a Cyclic Sorted List", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/insert-into-a-cyclic-sorted-list/", difficulty: "Medium", orderIndex: 2 },
            { title: "Remove Linked List Elements", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/remove-linked-list-elements/", difficulty: "Easy", orderIndex: 3 },
            { title: "Design Linked List", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/design-linked-list/", difficulty: "Medium", orderIndex: 4 },
            { title: "Node at a Given Index in Linked List", platform: "CodeArena / GFG", problemUrl: "https://practice.geeksforgeeks.org/problems/node-at-a-given-index-in-linked-list/1", difficulty: "Easy", orderIndex: 5 },
            { title: "Count Nodes of Linked List", platform: "CodeArena / GFG", problemUrl: "https://practice.geeksforgeeks.org/problems/count-nodes-of-linked-list/1", difficulty: "Easy", orderIndex: 6 },
          ],
        },
        {
          title: "Fast and Slow Pointers",
          description: "Use two pointers at different speeds to detect cycles, middle node, or duplicates.",
          orderIndex: 2,
          problems: [
            { title: "Middle of the Linked List", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/middle-of-the-linked-list/", difficulty: "Easy", orderIndex: 1 },
            { title: "Linked List Cycle", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/linked-list-cycle/", difficulty: "Easy", orderIndex: 2 },
            { title: "Linked List Cycle II", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/linked-list-cycle-ii/", difficulty: "Medium", orderIndex: 3 },
            { title: "Find the Duplicate Number", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/find-the-duplicate-number/", difficulty: "Medium", orderIndex: 4 },
          ],
        },
        {
          title: "Reversal Pattern",
          description: "Reverse entire list, partial list, or groups to reorder nodes.",
          orderIndex: 3,
          problems: [
            { title: "Reverse Linked List", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "Easy", orderIndex: 1 },
            { title: "Reverse Linked List II", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/reverse-linked-list-ii/", difficulty: "Medium", orderIndex: 2 },
            { title: "Reverse Nodes in k-Group", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/reverse-nodes-in-k-group/", difficulty: "Hard", orderIndex: 3 },
            { title: "Swap Nodes in Pairs", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/swap-nodes-in-pairs/", difficulty: "Medium", orderIndex: 4 },
            { title: "Reverse Nodes in Even Length Groups", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/reverse-nodes-in-even-length-groups/", difficulty: "Medium", orderIndex: 5 },
            { title: "Reorder List", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/reorder-list/", difficulty: "Medium", orderIndex: 6 },
            { title: "Palindrome Linked List", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/palindrome-linked-list/", difficulty: "Easy", orderIndex: 7 },
          ],
        },
        {
          title: "Merge / Sort",
          description: "Merge sorted lists, sort list using merge sort, or reorder using middle + reverse + merge.",
          orderIndex: 4,
          problems: [
            { title: "Merge Two Sorted Lists", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/merge-two-sorted-lists/", difficulty: "Easy", orderIndex: 1 },
            { title: "Merge k Sorted Lists", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: "Hard", orderIndex: 2 },
            { title: "Sort List", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/sort-list/", difficulty: "Medium", orderIndex: 3 },
            { title: "Insertion Sort List", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/insertion-sort-list/", difficulty: "Medium", orderIndex: 4 },
            { title: "Merge In Between Linked Lists", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/merge-in-between-linked-lists/", difficulty: "Medium", orderIndex: 5 },
            { title: "Add Two Numbers", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/add-two-numbers/", difficulty: "Medium", orderIndex: 6 },
            { title: "Add Two Numbers II", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/add-two-numbers-ii/", difficulty: "Medium", orderIndex: 7 },
          ],
        },
        {
          title: "LinkedList with Stack/HashMap",
          description: "Use a stack to handle backward traversal, carry logic, or next greater node.",
          orderIndex: 5,
          problems: [
            { title: "Copy List with Random Pointer", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/copy-list-with-random-pointer/", difficulty: "Medium", orderIndex: 1 },
            { title: "Next Greater Node In Linked List", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/next-greater-node-in-linked-list/", difficulty: "Medium", orderIndex: 2 },
            { title: "Flatten a Multilevel Doubly Linked List", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/", difficulty: "Medium", orderIndex: 3 },
            { title: "Remove Zero Sum Consecutive Nodes from Linked List", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list/", difficulty: "Medium", orderIndex: 4 },
            { title: "LRU Cache", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/lru-cache/", difficulty: "Medium", orderIndex: 5 },
          ],
        },
      ],
    },
    {
      title: "Double Linked List",
      description: "Linked List with navigation in both forward and backward directions.",
      orderIndex: 6,
      subtopics: [
        {
          title: "Basic DLL Operations",
          description: "Maintain prev and next pointers carefully for insert, delete, traversal; use DLL + HashMap for O(1) cache operations.",
          orderIndex: 1,
          problems: [
            { title: "Design Doubly Linked List", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/design-linked-list/", difficulty: "Medium", orderIndex: 1 },
            { title: "Insert a node in Doubly Linked List", platform: "CodeArena / GFG", problemUrl: "https://practice.geeksforgeeks.org/problems/insert-a-node-in-doubly-linked-list/1", difficulty: "Easy", orderIndex: 2 },
            { title: "Delete node in Doubly Linked List", platform: "CodeArena / GFG", problemUrl: "https://practice.geeksforgeeks.org/problems/delete-node-in-doubly-linked-list/1", difficulty: "Easy", orderIndex: 3 },
            { title: "Reverse a Doubly Linked List", platform: "CodeArena / GFG", problemUrl: "https://practice.geeksforgeeks.org/problems/reverse-a-doubly-linked-list/1", difficulty: "Easy", orderIndex: 4 },
            { title: "Find pairs with given sum in DLL", platform: "CodeArena / GFG", problemUrl: "https://practice.geeksforgeeks.org/problems/find-pairs-with-given-sum-in-doubly-linked-list/1", difficulty: "Easy", orderIndex: 5 },
            { title: "Remove duplicates from sorted DLL", platform: "CodeArena / GFG", problemUrl: "https://practice.geeksforgeeks.org/problems/remove-duplicates-from-a-sorted-doubly-linked-list/1", difficulty: "Easy", orderIndex: 6 },
          ],
        },
        {
          title: "Merge / Sort / Reorder",
          description: "Use DLL properties (prev/next) to efficiently merge, sort, reorder, flatten, or perform pointer-based checks.",
          orderIndex: 2,
          problems: [
            { title: "Merge Sort on Doubly Linked List", platform: "CodeArena / GFG", problemUrl: "https://practice.geeksforgeeks.org/problems/merge-sort-on-doubly-linked-list/1", difficulty: "Medium", orderIndex: 1 },
            { title: "Flattening a Linked List", platform: "CodeArena / GFG", problemUrl: "https://practice.geeksforgeeks.org/problems/flattening-a-linked-list/1", difficulty: "Medium", orderIndex: 2 },
            { title: "Sort a k-sorted Doubly Linked List", platform: "CodeArena / GFG", problemUrl: "https://practice.geeksforgeeks.org/problems/sort-a-k-sorted-doubly-linked-list/1", difficulty: "Medium", orderIndex: 3 },
          ],
        },
      ],
    },
    {
      title: "HashMap",
      description: "Key-value pair data structure for O(1) average time complexity lookups.",
      orderIndex: 7,
      subtopics: [
        {
          title: "Frequency Map / Counting",
          description: "Count elements to find majority, top-k frequent, or sort by frequency.",
          orderIndex: 1,
          problems: [
            { title: "Majority Element", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/majority-element/", difficulty: "Easy", orderIndex: 1 },
            { title: "Top K Frequent Elements", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/top-k-frequent-elements/", difficulty: "Medium", orderIndex: 2 },
            { title: "Sort Characters By Frequency", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/sort-characters-by-frequency/", difficulty: "Medium", orderIndex: 3 },
            { title: "Find All Anagrams in a String", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/find-all-anagrams-in-a-string/", difficulty: "Medium", orderIndex: 4 },
          ],
        },
        {
          title: "Prefix-Sum with Map",
          description: "Track cumulative sums; map stores first occurrence → solve subarray sum problems.",
          orderIndex: 2,
          problems: [
            { title: "Subarray Sum Equals K", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/subarray-sum-equals-k/", difficulty: "Medium", orderIndex: 1 },
          ],
        },
      ],
    },
    {
      title: "Binary Tree",
      description: "Hierarchical data structure with a root value and subtrees of children.",
      orderIndex: 8,
      subtopics: [
        {
          title: "DFS Traversals",
          description: "Standard DFS → used for max depth, path sums, subtree calculations.",
          orderIndex: 1,
          problems: [
            { title: "Binary Tree Preorder Traversal", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/binary-tree-preorder-traversal/", difficulty: "Easy", orderIndex: 1 },
            { title: "Binary Tree Inorder Traversal", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/binary-tree-inorder-traversal/", difficulty: "Easy", orderIndex: 2 },
            { title: "Binary Tree Postorder Traversal", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/binary-tree-postorder-traversal/", difficulty: "Easy", orderIndex: 3 },
            { title: "Maximum Depth of Binary Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", difficulty: "Easy", orderIndex: 4 },
            { title: "Minimum Depth of Binary Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/minimum-depth-of-binary-tree/", difficulty: "Easy", orderIndex: 5 },
            { title: "Balanced Binary Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/balanced-binary-tree/", difficulty: "Easy", orderIndex: 6 },
            { title: "Diameter of Binary Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/diameter-of-binary-tree/", difficulty: "Easy", orderIndex: 7 },
            { title: "Same Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/same-tree/", difficulty: "Easy", orderIndex: 8 },
            { title: "Symmetric Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/symmetric-tree/", difficulty: "Easy", orderIndex: 9 },
            { title: "Path Sum", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/path-sum/", difficulty: "Easy", orderIndex: 10 },
            { title: "Path Sum II", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/path-sum-ii/", difficulty: "Medium", orderIndex: 11 },
            { title: "Path Sum III", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/path-sum-iii/", difficulty: "Medium", orderIndex: 12 },
            { title: "Binary Tree Maximum Path Sum", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", difficulty: "Hard", orderIndex: 13 },
            { title: "Sum Root to Leaf Numbers", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/sum-root-to-leaf-numbers/", difficulty: "Medium", orderIndex: 14 },
            { title: "Count Good Nodes in Binary Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/", difficulty: "Medium", orderIndex: 15 },
            { title: "Subtree of Another Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/subtree-of-another-tree/", difficulty: "Easy", orderIndex: 16 },
            { title: "Invert Binary Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/invert-binary-tree/", difficulty: "Easy", orderIndex: 17 },
            { title: "House Robber III", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/house-robber-iii/", difficulty: "Medium", orderIndex: 18 },
          ],
        },
        {
          title: "BFS / Level-Order",
          description: "Use queue → traverse level by level → calculate sums, averages, or side views.",
          orderIndex: 2,
          problems: [
            { title: "Binary Tree Level Order Traversal", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/", difficulty: "Medium", orderIndex: 1 },
            { title: "Binary Tree Level Order Traversal II", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal-ii/", difficulty: "Medium", orderIndex: 2 },
            { title: "Binary Tree Zigzag Level Order Traversal", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/", difficulty: "Medium", orderIndex: 3 },
            { title: "Binary Tree Right Side View", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/binary-tree-right-side-view/", difficulty: "Medium", orderIndex: 4 },
            { title: "Binary Tree Left Side View", platform: "CodeArena / GFG", problemUrl: "https://practice.geeksforgeeks.org/problems/left-view-of-binary-tree/1", difficulty: "Easy", orderIndex: 5 },
            { title: "Average of Levels in Binary Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/average-of-levels-in-binary-tree/", difficulty: "Easy", orderIndex: 6 },
            { title: "Find Largest Value in Each Tree Row", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/find-largest-value-in-each-tree-row/", difficulty: "Medium", orderIndex: 7 },
            { title: "Populating Next Right Pointers in Each Node", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/", difficulty: "Medium", orderIndex: 8 },
            { title: "Populating Next Right Pointers in Each Node II", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/", difficulty: "Medium", orderIndex: 9 },
            { title: "Cousins in Binary Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/cousins-in-binary-tree/", difficulty: "Easy", orderIndex: 10 },
            { title: "Maximum Width of Binary Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/maximum-width-of-binary-tree/", difficulty: "Medium", orderIndex: 11 },
          ],
        },
        {
          title: "Lowest Common Ancestor",
          description: "DFS recursion or parent-pointer mapping → find common ancestor efficiently.",
          orderIndex: 3,
          problems: [
            { title: "Lowest Common Ancestor of a Binary Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", difficulty: "Medium", orderIndex: 1 },
            { title: "Lowest Common Ancestor of Deepest Leaves", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/", difficulty: "Medium", orderIndex: 2 },
            { title: "Lowest Common Ancestor of a Binary Search Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", difficulty: "Medium", orderIndex: 3 },
          ],
        },
        {
          title: "Serialization / Construction",
          description: "Preorder / level-order encode-decode → reconstruct tree or flatten.",
          orderIndex: 4,
          problems: [
            { title: "Construct Binary Tree from Preorder and Inorder Traversal", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", difficulty: "Medium", orderIndex: 1 },
            { title: "Construct Binary Tree from Inorder and Postorder Traversal", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/", difficulty: "Medium", orderIndex: 2 },
            { title: "Construct Binary Tree from Preorder and Postorder Traversal", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/", difficulty: "Medium", orderIndex: 3 },
            { title: "Serialize and Deserialize Binary Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", difficulty: "Hard", orderIndex: 4 },
            { title: "Flatten Binary Tree to Linked List", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/", difficulty: "Medium", orderIndex: 5 },
            { title: "Verify Preorder Serialization of a Binary Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree/", difficulty: "Medium", orderIndex: 6 },
          ],
        },
        {
          title: "BST",
          description: "Leverage BST property (left < root < right) for search, insertion, deletion, and range queries.",
          orderIndex: 5,
          problems: [
            { title: "Search in a Binary Search Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/search-in-a-binary-search-tree/", difficulty: "Easy", orderIndex: 1 },
            { title: "Insert into a Binary Search Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/insert-into-a-binary-search-tree/", difficulty: "Medium", orderIndex: 2 },
            { title: "Delete Node in a BST", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/delete-node-in-a-bst/", difficulty: "Medium", orderIndex: 3 },
            { title: "Validate Binary Search Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/validate-binary-search-tree/", difficulty: "Medium", orderIndex: 4 },
            { title: "Kth Smallest Element in a BST", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", difficulty: "Medium", orderIndex: 5 },
            { title: "Two Sum IV - Input is a BST", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/", difficulty: "Easy", orderIndex: 6 },
            { title: "Lowest Common Ancestor of a BST", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", difficulty: "Medium", orderIndex: 7 },
            { title: "Construct Binary Search Tree from Preorder Traversal", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/", difficulty: "Medium", orderIndex: 8 },
            { title: "Convert Sorted Array to Binary Search Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/", difficulty: "Easy", orderIndex: 9 },
            { title: "Convert Sorted List to Binary Search Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/", difficulty: "Medium", orderIndex: 10 },
            { title: "BST Iterator", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/binary-search-tree-iterator/", difficulty: "Medium", orderIndex: 11 },
            { title: "Range Sum of BST", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/range-sum-of-bst/", difficulty: "Easy", orderIndex: 12 },
            { title: "Trim a Binary Search Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/trim-a-binary-search-tree/", difficulty: "Medium", orderIndex: 13 },
            { title: "Recover Binary Search Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/recover-binary-search-tree/", difficulty: "Medium", orderIndex: 14 },
            { title: "Balance a Binary Search Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/balance-a-binary-search-tree/", difficulty: "Medium", orderIndex: 15 },
            { title: "Minimum Absolute Difference in BST", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/minimum-absolute-difference-in-bst/", difficulty: "Easy", orderIndex: 16 },
          ],
        },
      ],
    },
    {
      title: "Graph",
      description: "Non-linear data structure consisting of nodes and edges.",
      orderIndex: 9,
      subtopics: [
        {
          title: "BFS (Unweighted Path)",
          description: "Standard BFS → track distance/levels → queue-based traversal → multi-source if needed.",
          orderIndex: 1,
          problems: [
            { title: "Number of Islands", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/number-of-islands/", difficulty: "Medium", orderIndex: 1 },
            { title: "Rotting Oranges", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/rotting-oranges/", difficulty: "Medium", orderIndex: 2 },
            { title: "Word Ladder", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/word-ladder/", difficulty: "Hard", orderIndex: 3 },
            { title: "01 Matrix", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/01-matrix/", difficulty: "Medium", orderIndex: 4 },
            { title: "Shortest Path in Binary Matrix", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/shortest-path-in-binary-matrix/", difficulty: "Medium", orderIndex: 5 },
            { title: "Minimum Genetic Mutation", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/minimum-genetic-mutation/", difficulty: "Medium", orderIndex: 6 },
          ],
        },
        {
          title: "DFS (Connectivity)",
          description: "DFS recursion or stack → track visited → identify connected components or detect cycles.",
          orderIndex: 2,
          problems: [
            { title: "Number of Provinces", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/number-of-provinces/", difficulty: "Medium", orderIndex: 1 },
            { title: "Max Area of Island", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/max-area-of-island/", difficulty: "Medium", orderIndex: 2 },
            { title: "Surrounding Regions", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/surrounded-regions/", difficulty: "Medium", orderIndex: 3 },
            { title: "Pacific Atlantic Water Flow", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/pacific-atlantic-water-flow/", difficulty: "Medium", orderIndex: 4 },
            { title: "Clone Graph", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/clone-graph/", difficulty: "Medium", orderIndex: 5 },
            { title: "Graph Valid Tree", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/graph-valid-tree/", difficulty: "Medium", orderIndex: 6 },
            { title: "Number of Connected Components in an Undirected Graph", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", difficulty: "Medium", orderIndex: 7 },
            { title: "Is Graph Bipartite?", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/is-graph-bipartite/", difficulty: "Medium", orderIndex: 8 },
            { title: "Keys and Rooms", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/keys-and-rooms/", difficulty: "Medium", orderIndex: 9 },
            { title: "Reconstruct Itinerary", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/reconstruct-itinerary/", difficulty: "Hard", orderIndex: 10 },
            { title: "All Paths From Source to Target", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/all-paths-from-source-to-target/", difficulty: "Medium", orderIndex: 11 },
            { title: "Detect Cycle in Undirected Graph", platform: "CodeArena / GFG", problemUrl: "https://practice.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1", difficulty: "Medium", orderIndex: 12 },
          ],
        },
        {
          title: "Topological Sort",
          description: "DFS postorder or BFS (Kahn's algorithm) → order nodes respecting dependencies.",
          orderIndex: 3,
          problems: [
            { title: "Course Schedule", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/course-schedule/", difficulty: "Medium", orderIndex: 1 },
            { title: "Course Schedule II", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/course-schedule-ii/", difficulty: "Medium", orderIndex: 2 },
            { title: "Course Schedule IV", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/course-schedule-iv/", difficulty: "Medium", orderIndex: 3 },
            { title: "Alien Dictionary", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/alien-dictionary/", difficulty: "Hard", orderIndex: 4 },
            { title: "Minimum Height Trees", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/minimum-height-trees/", difficulty: "Medium", orderIndex: 5 },
            { title: "Sequence Reconstruction", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/sequence-reconstruction/", difficulty: "Medium", orderIndex: 6 },
            { title: "Find Eventual Safe States", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/find-eventual-safe-states/", difficulty: "Medium", orderIndex: 7 },
          ],
        },
        {
          title: "MST / Union-Find",
          description: "Use Kruskal's / Prim's algorithm or Union-Find → find MST, minimum cost connections, or detect cycles.",
          orderIndex: 4,
          problems: [
            { title: "Redundant Connection", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/redundant-connection/", difficulty: "Medium", orderIndex: 1 },
            { title: "Number of Operations to Make Network Connected", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/number-of-operations-to-make-network-connected/", difficulty: "Medium", orderIndex: 2 },
            { title: "Min Cost to Connect All Points", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/min-cost-to-connect-all-points/", difficulty: "Medium", orderIndex: 3 },
            { title: "Accounts Merge", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/accounts-merge/", difficulty: "Medium", orderIndex: 4 },
            { title: "Most Stones Removed with Same Row or Column", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/", difficulty: "Medium", orderIndex: 5 },
            { title: "Smallest String With Swaps", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/smallest-string-with-swaps/", difficulty: "Medium", orderIndex: 6 },
            { title: "Satisfiability of Equality Equations", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/satisfiability-of-equality-equations/", difficulty: "Medium", orderIndex: 7 },
          ],
        },
        {
          title: "Dijkstra (Weighted)",
          description: "Use priority queue → relax edges → track shortest distances.",
          orderIndex: 5,
          problems: [
            { title: "Network Delay Time", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/network-delay-time/", difficulty: "Medium", orderIndex: 1 },
            { title: "Path with Maximum Probability", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/path-with-maximum-probability/", difficulty: "Medium", orderIndex: 2 },
            { title: "Path With Minimum Effort", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/path-with-minimum-effort/", difficulty: "Medium", orderIndex: 3 },
            { title: "Cheapest Flights Within K Stops", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", difficulty: "Medium", orderIndex: 4 },
            { title: "Swim in Rising Water", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/swim-in-rising-water/", difficulty: "Hard", orderIndex: 5 },
            { title: "Shortest Path Visiting All Nodes", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/shortest-path-visiting-all-nodes/", difficulty: "Hard", orderIndex: 6 },
            { title: "Minimum Cost to Make at Least One Valid Path in a Grid", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/", difficulty: "Hard", orderIndex: 7 },
          ],
        },
        {
          title: "Bellman-Ford",
          description: "Relax all edges V-1 times → detect negative cycles.",
          orderIndex: 6,
          problems: [
            { title: "Distance from the Source (Bellman-Ford Algorithm)", platform: "CodeArena / GFG", problemUrl: "https://practice.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1", difficulty: "Medium", orderIndex: 1 },
            { title: "Shortest Path with Negative Edge Weights", platform: "CodeArena / GFG", problemUrl: "https://practice.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1", difficulty: "Medium", orderIndex: 2 },
            { title: "Find if there is a negative weight cycle in a graph", platform: "CodeArena / GFG", problemUrl: "https://practice.geeksforgeeks.org/problems/negative-weight-cycle3504/1", difficulty: "Medium", orderIndex: 3 },
          ],
        },
        {
          title: "Floyd-Warshall",
          description: "DP over adjacency matrix → shortest paths between all pairs of nodes.",
          orderIndex: 7,
          problems: [
            { title: "Find the City With the Smallest Number of Neighbors at a Threshold Distance", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/", difficulty: "Medium", orderIndex: 1 },
            { title: "All Pairs Shortest Path (Floyd Warshall)", platform: "CodeArena / GFG", problemUrl: "https://practice.geeksforgeeks.org/problems/implementing-floyd-warshall2012/1", difficulty: "Medium", orderIndex: 2 },
            { title: "Evaluate Division", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/evaluate-division/", difficulty: "Medium", orderIndex: 3 },
          ],
        },
      ],
    },
    {
      title: "Heap",
      description: "Priority Queue data structure for efficient retrieval of highest/lowest priority elements.",
      orderIndex: 10,
      subtopics: [
        {
          title: "Top-K Elements",
          description: "Use min-heap for top-k largest, max-heap for top-k smallest → maintain heap of size k.",
          orderIndex: 1,
          problems: [
            { title: "Kth Largest Element in an Array", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "Medium", orderIndex: 1 },
            { title: "Top K Frequent Elements", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/top-k-frequent-elements/", difficulty: "Medium", orderIndex: 2 },
            { title: "Kth Smallest Element in a Sorted Matrix", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/", difficulty: "Medium", orderIndex: 3 },
            { title: "K Closest Points to Origin", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/k-closest-points-to-origin/", difficulty: "Medium", orderIndex: 4 },
            { title: "Sort Characters By Frequency", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/sort-characters-by-frequency/", difficulty: "Medium", orderIndex: 5 },
            { title: "Reorganize String", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/reorganize-string/", difficulty: "Medium", orderIndex: 6 },
          ],
        },
        {
          title: "Merge K Sorted",
          description: "Use min-heap to merge multiple sorted arrays/lists efficiently.",
          orderIndex: 2,
          problems: [
            { title: "Merge k Sorted Lists", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: "Hard", orderIndex: 1 },
            { title: "Smallest Range Covering Elements from K Lists", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/", difficulty: "Hard", orderIndex: 2 },
            { title: "Find K Pairs with Smallest Sums", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/", difficulty: "Medium", orderIndex: 3 },
          ],
        },
        {
          title: "Heap with Sliding Window",
          description: "Maintain a heap of elements in the window → pop outdated elements → track maximum.",
          orderIndex: 3,
          problems: [
            { title: "Sliding Window Maximum", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/sliding-window-maximum/", difficulty: "Hard", orderIndex: 1 },
            { title: "Sliding Window Median", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/sliding-window-median/", difficulty: "Hard", orderIndex: 2 },
            { title: "Find Median from Data Stream", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/find-median-from-data-stream/", difficulty: "Hard", orderIndex: 3 },
          ],
        },
        {
          title: "Implementation of Heap",
          description: "Design heap.",
          orderIndex: 4,
          problems: [
            { title: "Kth Largest Element in a Stream", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/kth-largest-element-in-a-stream/", difficulty: "Easy", orderIndex: 1 },
            { title: "Design Twitter", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/design-twitter/", difficulty: "Medium", orderIndex: 2 },
            { title: "Seat Reservation Manager", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/seat-reservation-manager/", difficulty: "Medium", orderIndex: 3 },
          ],
        },
        {
          title: "Huffman pattern",
          description: "Repeatedly combine the two smallest elements to minimize the total cost..",
          orderIndex: 5,
          problems: [
            { title: "Minimum Cost to Connect Sticks", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/minimum-cost-to-connect-sticks/", difficulty: "Medium", orderIndex: 1 },
            { title: "Task Scheduler", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/task-scheduler/", difficulty: "Medium", orderIndex: 2 },
            { title: "Construct Target Array With Multiple Sums", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/construct-target-array-with-multiple-sums/", difficulty: "Hard", orderIndex: 3 },
            { title: "Reduce Array Size to Half", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/reduce-array-size-to-half/", difficulty: "Medium", orderIndex: 4 },
            { title: "Last Stone Weight", platform: "CodeArena / LeetCode", problemUrl: "https://leetcode.com/problems/last-stone-weight/", difficulty: "Easy", orderIndex: 5 },
          ],
        },
      ],
    },
  ];

  // Seed topics, subtopics, and problems into database with upsert logic
  for (const topicItem of topicsData) {
    let [topic] = await db.select().from(dsaTopics).where(
      and(eq(dsaTopics.sheetId, sheet.id), eq(dsaTopics.title, topicItem.title))
    ).limit(1);

    if (!topic) {
      const [insertedTopic] = await db.insert(dsaTopics).values({
        sheetId: sheet.id,
        title: topicItem.title,
        description: topicItem.description,
        orderIndex: topicItem.orderIndex,
      } as any).returning();
      topic = insertedTopic;
      console.log(`✅ Created Topic: ${topic.title} (ID: ${topic.id})`);
    } else {
      await db.update(dsaTopics)
        .set({
          description: topicItem.description,
          orderIndex: topicItem.orderIndex,
        } as any)
        .where(eq(dsaTopics.id, topic.id));
      console.log(`ℹ️ Updated Topic: ${topic.title} (ID: ${topic.id})`);
    }

    for (const subItem of topicItem.subtopics) {
      let [subtopic] = await db.select().from(dsaSubtopics).where(
        and(eq(dsaSubtopics.topicId, topic.id), eq(dsaSubtopics.title, subItem.title))
      ).limit(1);

      if (!subtopic) {
        const [insertedSub] = await db.insert(dsaSubtopics).values({
          topicId: topic.id,
          title: subItem.title,
          description: subItem.description,
          orderIndex: subItem.orderIndex,
        } as any).returning();
        subtopic = insertedSub;
        console.log(`  ✅ Created Subtopic: ${subtopic.title}`);
      } else {
        await db.update(dsaSubtopics)
          .set({
            description: subItem.description,
            orderIndex: subItem.orderIndex,
          } as any)
          .where(eq(dsaSubtopics.id, subtopic.id));
        console.log(`  ℹ️ Updated Subtopic: ${subtopic.title}`);
      }

      for (const probItem of subItem.problems) {
        let [existingProb] = await db.select().from(dsaProblems).where(
          and(eq(dsaProblems.subtopicId, subtopic.id), eq(dsaProblems.title, probItem.title))
        ).limit(1);

        const spec = getProblemDetailsSpec(probItem.title);

        if (!existingProb) {
          await db.insert(dsaProblems).values({
            subtopicId: subtopic.id,
            title: probItem.title,
            platform: probItem.platform,
            problemUrl: probItem.problemUrl,
            difficulty: probItem.difficulty,
            orderIndex: probItem.orderIndex,
            description: spec.description,
            sampleInput: spec.sampleInput,
            sampleOutput: spec.sampleOutput,
            explanation: spec.explanation,
            testCases: spec.testCases,
            starterCode: spec.starterCode,
          } as any);
          console.log(`    └─ Created Problem: ${probItem.title} [${probItem.difficulty}]`);
        } else {
          await db.update(dsaProblems)
            .set({
              platform: probItem.platform,
              problemUrl: probItem.problemUrl,
              difficulty: probItem.difficulty,
              orderIndex: probItem.orderIndex,
              description: spec.description,
              sampleInput: spec.sampleInput,
              sampleOutput: spec.sampleOutput,
              explanation: spec.explanation,
              testCases: spec.testCases,
              starterCode: spec.starterCode,
            } as any)
            .where(eq(dsaProblems.id, existingProb.id));
        }
      }
    }
  }

  console.log("🎉 Comprehensive DSA Sheet seeding complete!");
}

if (process.argv[1]?.endsWith("seedDsaSheet.ts") || process.argv[1]?.endsWith("seedDsaSheet.js")) {
  seedDsaSheet()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("❌ Seeding failed:", err);
      process.exit(1);
    });
}
