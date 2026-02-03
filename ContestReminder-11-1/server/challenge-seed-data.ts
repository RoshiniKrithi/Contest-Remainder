// Mock seed data for challenges - to be integrated with database when ready

export const typingChallenges = [
    // JavaScript Challenges
    {
        id: "typing-js-1",
        title: "Array Map Function",
        code: `const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled);`,
        language: "javascript",
        difficulty: "easy",
        lineCount: 3,
    },
    {
        id: "typing-js-2",
        title: "Async/Await Example",
        code: `async function fetchData(url) {\n  const response = await fetch(url);\n  const data = await response.json();\n  return data;\n}\n\nfetchData('/api/users')\n  .then(console.log)\n  .catch(console.error);`,
        language: "javascript",
        difficulty: "medium",
        lineCount: 8,
    },
    {
        id: "typing-js-3",
        title: "Class with Methods",
        code: `class LinkedListNode {\n  constructor(value) {\n    this.value = value;\n    this.next = null;\n  }\n\n  append(value) {\n    const newNode = new LinkedListNode(value);\n    let current = this;\n    while (current.next !== null) {\n      current = current.next;\n    }\n    current.next = newNode;\n    return this;\n  }\n\n  find(value) {\n    let current = this;\n    while (current !== null) {\n      if (current.value === value) return current;\n      current = current.next;\n    }\n    return null;\n  }\n}`,
        language: "javascript",
        difficulty: "hard",
        lineCount: 24,
    },

    // Python Challenges
    {
        id: "typing-py-1",
        title: "List Comprehension",
        code: `numbers = [1, 2, 3, 4, 5]\nsquares = [n**2 for n in numbers]\nprint(squares)`,
        language: "python",
        difficulty: "easy",
        lineCount: 3,
    },
    {
        id: "typing-py-2",
        title: "Dictionary Operations",
        code: `def count_frequencies(items):\n    freq = {}\n    for item in items:\n        if item in freq:\n            freq[item] += 1\n        else:\n            freq[item] = 1\n    return freq\n\nresult = count_frequencies(['a', 'b', 'a', 'c', 'b', 'a'])\nprint(result)`,
        language: "python",
        difficulty: "medium",
        lineCount: 11,
    },
    {
        id: "typing-py-3",
        title: "Binary Search Tree",
        code: `class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\nclass BST:\n    def __init__(self):\n        self.root = None\n    \n    def insert(self, value):\n        if not self.root:\n            self.root = TreeNode(value)\n        else:\n            self._insert_recursive(self.root, value)\n    \n    def _insert_recursive(self, node, value):\n        if value < node.value:\n            if node.left is None:\n                node.left = TreeNode(value)\n            else:\n                self._insert_recursive(node.left, value)\n        else:\n            if node.right is None:\n                node.right = TreeNode(value)\n            else:\n                self._insert_recursive(node.right, value)`,
        language: "python",
        difficulty: "hard",
        lineCount: 27,
    },
];

export const quizQuestions = [
    // Arrays
    {
        id: "quiz-arr-1",
        question: "What is the time complexity of accessing an element in an array by index?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: 0,
        topic: "arrays",
        difficulty: "easy",
        explanation: "Arrays provide constant-time access to elements by index because they are stored in contiguous memory locations.",
        timeLimit: 30,
    },
    {
        id: "quiz-arr-2",
        question: "What will be the output of this code?",
        codeSnippet: "const arr = [1, 2, 3];\narr.push(4);\narr.pop();\nconsole.log(arr.length);",
        options: ["2", "3", "4", "undefined"],
        correctAnswer: 1,
        topic: "arrays",
        difficulty: "medium",
        explanation: "After push(4), array is [1,2,3,4]. pop() removes 4, leaving [1,2,3] with length 3.",
        timeLimit: 45,
    },

    // Graphs
    {
        id: "quiz-graph-1",
        question: "Which graph traversal uses a queue data structure?",
        options: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Dijkstra's Algorithm", "Prim's Algorithm"],
        correctAnswer: 1,
        topic: "graphs",
        difficulty: "medium",
        explanation: "BFS uses a queue to explore nodes level by level, while DFS uses a stack (or recursion).",
        timeLimit: 40,
    },
    {
        id: "quiz-graph-2",
        question: "What is the maximum number of edges in a simple undirected graph with n vertices?",
        options: ["n", "n(n-1)", "n(n-1)/2", "2^n"],
        correctAnswer: 2,
        topic: "graphs",
        difficulty: "hard",
        explanation: "In a complete simple undirected graph, each vertex connects to n-1 others, but each edge is counted twice, so it's n(n-1)/2.",
        timeLimit: 60,
    },

    // Dynamic Programming
    {
        id: "quiz-dp-1",
        question: "What is the main idea behind dynamic programming?",
        options: [
            "Divide and conquer",
            "Storing results of subproblems to avoid recomputation",
            "Using greedy choices",
            "Randomization"
        ],
        correctAnswer: 1,
        topic: "dp",
        difficulty: "easy",
        explanation: "Dynamic programming stores solutions to subproblems (memoization or tabulation) to avoid redundant calculations.",
        timeLimit: 35,
    },
    {
        id: "quiz-dp-2",
        question: "Which approach is typically faster for the Fibonacci sequence with memoization?",
        options: ["Top-down", "Bottom-up", "Both are equal", "Neither uses memoization"],
        correctAnswer: 2,
        topic: "dp",
        difficulty: "medium",
        explanation: "Both top-down (memoization) and bottom-up (tabulation) have similar time complexity when optimized.",
        timeLimit: 50,
    },

    // Trees
    {
        id: "quiz-tree-1",
        question: "In a binary search tree, where is the minimum value located?",
        options: ["Root", "Leftmost node", "Rightmost node", "Any leaf node"],
        correctAnswer: 1,
        topic: "trees",
        difficulty: "easy",
        explanation: "In a BST, smaller values are to the left, so the minimum is at the leftmost node.",
        timeLimit: 30,
    },
    {
        id: "quiz-tree-2",
        question: "What is the height of a balanced binary tree with n nodes?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correctAnswer: 1,
        topic: "trees",
        difficulty: "medium",
        explanation: "A balanced binary tree has O(log n) height, which is why operations are efficient.",
        timeLimit: 40,
    },

    // Strings
    {
        id: "quiz-str-1",
        question: "What is the time complexity of concatenating n strings of length m using the + operator in most languages?",
        options: ["O(n)", "O(m)", "O(nm)", "O(n²m)"],
        correctAnswer: 3,
        topic: "strings",
        difficulty: "medium",
        explanation: "Each concatenation creates a new string and copies all previous characters, leading to O(n²m) complexity.",
        timeLimit: 50,
    },
    {
        id: "quiz-str-2",
        question: "Which algorithm is commonly used for pattern matching in strings?",
        options: ["Binary Search", "KMP Algorithm", "Merge Sort", "Dijkstra's Algorithm"],
        correctAnswer: 1,
        topic: "strings",
        difficulty: "medium",
        explanation: "The Knuth-Morris-Pratt (KMP) algorithm efficiently finds pattern occurrences in strings.",
        timeLimit: 45,
    },
];

export const brainTeasers = [
    {
        id: "teaser-1",
        date: new Date().toISOString(),
        title: "The Two Egg Problem",
        puzzle: "You have two identical eggs and access to a 100-floor building. You want to find the highest floor from which an egg can be dropped without breaking. What is the minimum number of drops required in the worst case to guarantee you find this floor?",
        hint1: "Think about how to minimize the worst-case number of drops, not the average case.",
        hint2: "Consider starting from a floor that isn't too high or too low, and adjust your strategy based on whether the first egg breaks.",
        hint3: "The optimal strategy involves dropping from floor 14 first, then adjusting by decreasing intervals.",
        solution: "14",
        difficulty: "hard",
        explanation: "Start at floor 14. If it breaks, test floors 1-13 linearly (13 more drops max). If it doesn't break, go to floor 27 (14+13), then 39 (27+12), etc. This minimizes worst-case drops to 14.",
        category: "logic",
    },
    {
        id: "teaser-2",
        date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        title: "Missing Number",
        puzzle: "An array contains numbers from 1 to 100, but one number is missing. What's the fastest way to find the missing number?",
        hint1: "Think about mathematical properties of sequences.",
        hint2: "The sum of numbers from 1 to n has a formula: n(n+1)/2",
        hint3: "Calculate the expected sum and subtract the actual sum.",
        solution: "sum formula",
        difficulty: "easy",
        explanation: "Calculate the expected sum using n(n+1)/2 for n=100, which is 5050. Subtract the sum of array elements. The difference is the missing number. Time: O(n), Space: O(1).",
        category: "math",
    },
    {
        id: "teaser-3",
        date: new Date(Date.now() + 2 * 86400000).toISOString(), // Day after tomorrow
        title: "Clock Angle",
        puzzle: "At what time between 3 and 4 o'clock are the hour and minute hands of a clock exactly opposite to each other (180 degrees apart)?",
        hint1: "The minute hand moves 360° in 60 minutes (6° per minute).",
        hint2: "The hour hand moves 30° per hour (0.5° per minute).",
        hint3: "Set up an equation where the angle difference equals 180°.",
        solution: "3:49:05",
        difficulty: "medium",
        explanation: "At time 3:x, the hour hand is at 90 + 0.5x degrees, minute hand at 6x degrees. For 180° difference: |6x - (90 + 0.5x)| = 180. Solving gives x ≈ 49.09 minutes = 3:49:05.",
        category: "math",
    },
];

export const marathons = [
    {
        id: "marathon-1",
        title: "Weekly Coding Sprint #42",
        description: "Test your skills across multiple problem domains in this weekend marathon. Solve 8 challenging problems ranging from arrays to dynamic programming!",
        startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), //  2 days from now
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
        problemIds: ["prob-1", "prob-2", "prob-3", "prob-4", "prob-5", "prob-6", "prob-7", "prob-8"],
        status: "upcoming" as const,
        difficulty: "mixed",
        participantCount: 0,
    },
    {
        id: "marathon-2",
        title: "Beginner's Challenge Marathon",
        description: "Perfect for those just starting their competitive programming journey. 5 carefully selected easy to medium problems.",
        startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
        problemIds: ["prob-9", "prob-10", "prob-11", "prob-12", "prob-13"],
        status: "upcoming" as const,
        difficulty: "easy",
        participantCount: 0,
    },
];
