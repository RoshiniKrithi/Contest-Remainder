// Auto-generated Frontend DSA Problem Details Catalog
export interface ProblemSpec {
  description: string;
  sampleInput: string;
  sampleOutput: string;
  explanation: string;
  testCases: Array<{ input: string; output: string }>;
  starterCode: Record<string, string>;
}

export const CLIENT_DSA_CATALOG: Record<string, ProblemSpec> = {
  "Two Sum": {
    "description": "Implement an optimal solution for Two Sum (Array - Two-Pointer) using proper algorithms and data structures.",
    "sampleInput": "nums = [3, 8, 12, 5], target = 17",
    "sampleOutput": "[2, 3]",
    "explanation": "nums[2] + nums[3] = 12 + 5 = 17, so indices [2, 3] are returned.",
    "testCases": [
        {
            "input": "nums = [10, -3, 7, 2, 15], target = 4",
            "output": "[1, 2]"
        },
        {
            "input": "nums = [4, 4], target = 8",
            "output": "[0, 1]"
        },
        {
            "input": "nums = [100, 250, 300, 50, 400], target = 350",
            "output": "[0, 1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Two Sum\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void twoSum() {\n        // Implementation for Two Sum\n    }\n};\n",
        "python": "# Problem: Two Sum\nclass Solution:\n    def twoSum(self):\n        pass\n",
        "javascript": "/**\n * Problem: Two Sum\n */\nfunction twoSum() {\n}\n",
        "java": "// Problem: Two Sum\npublic class Solution {\n    public void twoSum() {\n    }\n}\n"
    }
},
  "3Sum": {
    "description": "Implement an optimal solution for 3Sum (Array - Two-Pointer) using proper algorithms and data structures.",
    "sampleInput": "nums = [-2, 0, 1, 1, 2, -1, -4]",
    "sampleOutput": "[[-2, 0, 2], [-2, 1, 1], [-1, 0, 1]]",
    "explanation": "Distinct triplets that sum up to 0 are (-2,0,2), (-2,1,1), and (-1,0,1).",
    "testCases": [
        {
            "input": "nums = [0, 0, 0, 0]",
            "output": "[[-0, 0, 0]]"
        },
        {
            "input": "nums = [-5, 2, 3, 1, 4, -4]",
            "output": "[[-5, 1, 4], [-5, 2, 3], [-4, 1, 3]]"
        },
        {
            "input": "nums = [1, 2, -2, -1]",
            "output": "[]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: 3Sum\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void 3Sum() {\n        // Implementation for 3Sum\n    }\n};\n",
        "python": "# Problem: 3Sum\nclass Solution:\n    def 3Sum(self):\n        pass\n",
        "javascript": "/**\n * Problem: 3Sum\n */\nfunction 3Sum() {\n}\n",
        "java": "// Problem: 3Sum\npublic class Solution {\n    public void 3Sum() {\n    }\n}\n"
    }
},
  "Container With Most Water": {
    "description": "Implement an optimal solution for Container With Most Water (Array - Two-Pointer) using proper algorithms and data structures.",
    "sampleInput": "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
    "sampleOutput": "49",
    "explanation": "The line at index 1 (height 8) and index 8 (height 7) gives area min(8, 7) * (8 - 1) = 7 * 7 = 49.",
    "testCases": [
        {
            "input": "height = [1, 1]",
            "output": "1"
        },
        {
            "input": "height = [4, 3, 2, 1, 4]",
            "output": "16"
        },
        {
            "input": "height = [1, 2, 1]",
            "output": "2"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Container With Most Water\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void containerWithMostWater() {\n        // Implementation for Container With Most Water\n    }\n};\n",
        "python": "# Problem: Container With Most Water\nclass Solution:\n    def containerWithMostWater(self):\n        pass\n",
        "javascript": "/**\n * Problem: Container With Most Water\n */\nfunction containerWithMostWater() {\n}\n",
        "java": "// Problem: Container With Most Water\npublic class Solution {\n    public void containerWithMostWater() {\n    }\n}\n"
    }
},
  "Valid Palindrome": {
    "description": "Implement an optimal solution for Valid Palindrome (Array - Two-Pointer) using proper algorithms and data structures.",
    "sampleInput": "s = \"A man, a plan, a canal: Panama\"",
    "sampleOutput": "true",
    "explanation": "After removing non-alphanumeric chars and lowercasing: \"amanaplanacanalpanama\", which is a palindrome.",
    "testCases": [
        {
            "input": "s = \"race a car\"",
            "output": "false"
        },
        {
            "input": "s = \" \"",
            "output": "true"
        },
        {
            "input": "s = \"No 'x' in Nixon\"",
            "output": "true"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Valid Palindrome\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void validPalindrome() {\n        // Implementation for Valid Palindrome\n    }\n};\n",
        "python": "# Problem: Valid Palindrome\nclass Solution:\n    def validPalindrome(self):\n        pass\n",
        "javascript": "/**\n * Problem: Valid Palindrome\n */\nfunction validPalindrome() {\n}\n",
        "java": "// Problem: Valid Palindrome\npublic class Solution {\n    public void validPalindrome() {\n    }\n}\n"
    }
},
  "Maximum Average Subarray I": {
    "description": "Implement an optimal solution for Maximum Average Subarray I (Array - Sliding Window) using proper algorithms and data structures.",
    "sampleInput": "nums = [1, 12, -5, -6, 50, 3], k = 4",
    "sampleOutput": "12.75000",
    "explanation": "Subarray [12, -5, -6, 50] has maximum sum 51, average = 51 / 4 = 12.75.",
    "testCases": [
        {
            "input": "nums = [5], k = 1",
            "output": "5.00000"
        },
        {
            "input": "nums = [0, 4, 0, 3, 2], k = 1",
            "output": "4.00000"
        },
        {
            "input": "nums = [-1, -2, -3, -4], k = 2",
            "output": "-1.50000"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Maximum Average Subarray I\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void maximumAverageSubarrayI() {\n        // Implementation for Maximum Average Subarray I\n    }\n};\n",
        "python": "# Problem: Maximum Average Subarray I\nclass Solution:\n    def maximumAverageSubarrayI(self):\n        pass\n",
        "javascript": "/**\n * Problem: Maximum Average Subarray I\n */\nfunction maximumAverageSubarrayI() {\n}\n",
        "java": "// Problem: Maximum Average Subarray I\npublic class Solution {\n    public void maximumAverageSubarrayI() {\n    }\n}\n"
    }
},
  "Longest Substring Without Repeating Characters": {
    "description": "Implement an optimal solution for Longest Substring Without Repeating Characters (Array - Sliding Window) using proper algorithms and data structures.",
    "sampleInput": "s = \"abcabcbb\"",
    "sampleOutput": "3",
    "explanation": "The answer is \"abc\", with the length of 3.",
    "testCases": [
        {
            "input": "s = \"bbbbb\"",
            "output": "1"
        },
        {
            "input": "s = \"pwwkew\"",
            "output": "3"
        },
        {
            "input": "s = \"tmmzuxt\"",
            "output": "5"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Longest Substring Without Repeating Characters\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void longestSubstringWithoutRepeatingCharacters() {\n        // Implementation for Longest Substring Without Repeating Characters\n    }\n};\n",
        "python": "# Problem: Longest Substring Without Repeating Characters\nclass Solution:\n    def longestSubstringWithoutRepeatingCharacters(self):\n        pass\n",
        "javascript": "/**\n * Problem: Longest Substring Without Repeating Characters\n */\nfunction longestSubstringWithoutRepeatingCharacters() {\n}\n",
        "java": "// Problem: Longest Substring Without Repeating Characters\npublic class Solution {\n    public void longestSubstringWithoutRepeatingCharacters() {\n    }\n}\n"
    }
},
  "Minimum Size Subarray Sum": {
    "description": "Implement an optimal solution for Minimum Size Subarray Sum (Array - Sliding Window) using proper algorithms and data structures.",
    "sampleInput": "target = 7, nums = [2, 3, 1, 2, 4, 3]",
    "sampleOutput": "2",
    "explanation": "Subarray [4, 3] has minimal length under the problem constraint with sum >= 7.",
    "testCases": [
        {
            "input": "target = 4, nums = [1, 4, 4]",
            "output": "1"
        },
        {
            "input": "target = 11, nums = [1, 1, 1, 1, 1, 1, 1, 1]",
            "output": "0"
        },
        {
            "input": "target = 15, nums = [1, 2, 3, 4, 5]",
            "output": "5"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Minimum Size Subarray Sum\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void minimumSizeSubarraySum() {\n        // Implementation for Minimum Size Subarray Sum\n    }\n};\n",
        "python": "# Problem: Minimum Size Subarray Sum\nclass Solution:\n    def minimumSizeSubarraySum(self):\n        pass\n",
        "javascript": "/**\n * Problem: Minimum Size Subarray Sum\n */\nfunction minimumSizeSubarraySum() {\n}\n",
        "java": "// Problem: Minimum Size Subarray Sum\npublic class Solution {\n    public void minimumSizeSubarraySum() {\n    }\n}\n"
    }
},
  "Permutation in String": {
    "description": "Implement an optimal solution for Permutation in String (Array - Sliding Window) using proper algorithms and data structures.",
    "sampleInput": "s1 = \"ab\", s2 = \"eidbaooo\"",
    "sampleOutput": "true",
    "explanation": "s2 contains one permutation of s1 (\"ba\").",
    "testCases": [
        {
            "input": "s1 = \"ab\", s2 = \"eidboaoo\"",
            "output": "false"
        },
        {
            "input": "s1 = \"adc\", s2 = \"dcda\"",
            "output": "true"
        },
        {
            "input": "s1 = \"hello\", s2 = \"ooolleoooleh\"",
            "output": "false"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Permutation in String\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void permutationinString() {\n        // Implementation for Permutation in String\n    }\n};\n",
        "python": "# Problem: Permutation in String\nclass Solution:\n    def permutationinString(self):\n        pass\n",
        "javascript": "/**\n * Problem: Permutation in String\n */\nfunction permutationinString() {\n}\n",
        "java": "// Problem: Permutation in String\npublic class Solution {\n    public void permutationinString() {\n    }\n}\n"
    }
},
  "Range Sum Query - Immutable": {
    "description": "Implement an optimal solution for Range Sum Query - Immutable (Array - Prefix Sum) using proper algorithms and data structures.",
    "sampleInput": "nums = [-2, 0, 3, -5, 2, -1], queries = [[0, 2], [2, 5], [0, 5]]",
    "sampleOutput": "[1, -1, -3]",
    "explanation": "sumRange(0, 2) = (-2)+0+3 = 1; sumRange(2, 5) = 3+(-5)+2+(-1) = -1; sumRange(0, 5) = -3.",
    "testCases": [
        {
            "input": "nums = [5, 10, 15, 20], queries = [[1, 3], [0, 0]]",
            "output": "[45, 5]"
        },
        {
            "input": "nums = [-10, 20, -30, 40], queries = [[0, 3], [1, 2]]",
            "output": "[20, -10]"
        },
        {
            "input": "nums = [7], queries = [[0, 0]]",
            "output": "[7]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Range Sum Query - Immutable\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void rangeSumQueryImmutable() {\n        // Implementation for Range Sum Query - Immutable\n    }\n};\n",
        "python": "# Problem: Range Sum Query - Immutable\nclass Solution:\n    def rangeSumQueryImmutable(self):\n        pass\n",
        "javascript": "/**\n * Problem: Range Sum Query - Immutable\n */\nfunction rangeSumQueryImmutable() {\n}\n",
        "java": "// Problem: Range Sum Query - Immutable\npublic class Solution {\n    public void rangeSumQueryImmutable() {\n    }\n}\n"
    }
},
  "Subarray Sum Equals K": {
    "description": "Implement an optimal solution for Subarray Sum Equals K (Array - Prefix Sum) using proper algorithms and data structures.",
    "sampleInput": "nums = [1, 1, 1], k = 2",
    "sampleOutput": "2",
    "explanation": "Subarrays [1, 1] at indices [0, 1] and [1, 2] sum to 2.",
    "testCases": [
        {
            "input": "nums = [1, 2, 3], k = 3",
            "output": "2"
        },
        {
            "input": "nums = [1, -1, 0], k = 0",
            "output": "3"
        },
        {
            "input": "nums = [3, 4, 7, 2, -3, 1, 4, 2], k = 7",
            "output": "4"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Subarray Sum Equals K\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void subarraySumEqualsK() {\n        // Implementation for Subarray Sum Equals K\n    }\n};\n",
        "python": "# Problem: Subarray Sum Equals K\nclass Solution:\n    def subarraySumEqualsK(self):\n        pass\n",
        "javascript": "/**\n * Problem: Subarray Sum Equals K\n */\nfunction subarraySumEqualsK() {\n}\n",
        "java": "// Problem: Subarray Sum Equals K\npublic class Solution {\n    public void subarraySumEqualsK() {\n    }\n}\n"
    }
},
  "Product of Array Except Self": {
    "description": "Implement an optimal solution for Product of Array Except Self (Array - Prefix Sum) using proper algorithms and data structures.",
    "sampleInput": "nums = [1, 2, 3, 4]",
    "sampleOutput": "[24, 12, 8, 6]",
    "explanation": "For index 0: 2*3*4=24; index 1: 1*3*4=12; index 2: 1*2*4=8; index 3: 1*2*3=6.",
    "testCases": [
        {
            "input": "nums = [-1, 1, 0, -3, 3]",
            "output": "[0, 0, 9, 0, 0]"
        },
        {
            "input": "nums = [2, 3, 4, 5]",
            "output": "[60, 40, 30, 24]"
        },
        {
            "input": "nums = [0, 0]",
            "output": "[0, 0]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Product of Array Except Self\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void productofArrayExceptSelf() {\n        // Implementation for Product of Array Except Self\n    }\n};\n",
        "python": "# Problem: Product of Array Except Self\nclass Solution:\n    def productofArrayExceptSelf(self):\n        pass\n",
        "javascript": "/**\n * Problem: Product of Array Except Self\n */\nfunction productofArrayExceptSelf() {\n}\n",
        "java": "// Problem: Product of Array Except Self\npublic class Solution {\n    public void productofArrayExceptSelf() {\n    }\n}\n"
    }
},
  "Maximum Subarray": {
    "description": "Implement an optimal solution for Maximum Subarray (Array - Kadane's Algorithm) using proper algorithms and data structures.",
    "sampleInput": "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
    "sampleOutput": "6",
    "explanation": "Subarray [4, -1, 2, 1] has the largest sum = 6.",
    "testCases": [
        {
            "input": "nums = [1]",
            "output": "1"
        },
        {
            "input": "nums = [5, 4, -1, 7, 8]",
            "output": "23"
        },
        {
            "input": "nums = [-5, -2, -8, -1]",
            "output": "-1"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Maximum Subarray\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void maximumSubarray() {\n        // Implementation for Maximum Subarray\n    }\n};\n",
        "python": "# Problem: Maximum Subarray\nclass Solution:\n    def maximumSubarray(self):\n        pass\n",
        "javascript": "/**\n * Problem: Maximum Subarray\n */\nfunction maximumSubarray() {\n}\n",
        "java": "// Problem: Maximum Subarray\npublic class Solution {\n    public void maximumSubarray() {\n    }\n}\n"
    }
},
  "Maximum Product Subarray": {
    "description": "Implement an optimal solution for Maximum Product Subarray (Array - Kadane's Algorithm) using proper algorithms and data structures.",
    "sampleInput": "nums = [2, 3, -2, 4]",
    "sampleOutput": "6",
    "explanation": "Subarray [2, 3] has the largest product = 6.",
    "testCases": [
        {
            "input": "nums = [-2, 0, -1]",
            "output": "0"
        },
        {
            "input": "nums = [-2, 3, -4]",
            "output": "24"
        },
        {
            "input": "nums = [-2]",
            "output": "-2"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Maximum Product Subarray\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void maximumProductSubarray() {\n        // Implementation for Maximum Product Subarray\n    }\n};\n",
        "python": "# Problem: Maximum Product Subarray\nclass Solution:\n    def maximumProductSubarray(self):\n        pass\n",
        "javascript": "/**\n * Problem: Maximum Product Subarray\n */\nfunction maximumProductSubarray() {\n}\n",
        "java": "// Problem: Maximum Product Subarray\npublic class Solution {\n    public void maximumProductSubarray() {\n    }\n}\n"
    }
},
  "Valid Palindrome II": {
    "description": "Implement an optimal solution for Valid Palindrome II (Strings - Two-Pointer (Palindrome)) using proper algorithms and data structures.",
    "sampleInput": "s = \"abca\"",
    "sampleOutput": "true",
    "explanation": "Deleting character 'c' results in \"aba\", which is a valid palindrome.",
    "testCases": [
        {
            "input": "s = \"aba\"",
            "output": "true"
        },
        {
            "input": "s = \"abc\"",
            "output": "false"
        },
        {
            "input": "s = \"deeee\"",
            "output": "true"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Valid Palindrome II\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void validPalindromeII() {\n        // Implementation for Valid Palindrome II\n    }\n};\n",
        "python": "# Problem: Valid Palindrome II\nclass Solution:\n    def validPalindromeII(self):\n        pass\n",
        "javascript": "/**\n * Problem: Valid Palindrome II\n */\nfunction validPalindromeII() {\n}\n",
        "java": "// Problem: Valid Palindrome II\npublic class Solution {\n    public void validPalindromeII() {\n    }\n}\n"
    }
},
  "Longest Palindromic Substring": {
    "description": "Implement an optimal solution for Longest Palindromic Substring (Strings - Two-Pointer (Palindrome)) using proper algorithms and data structures.",
    "sampleInput": "s = \"babad\"",
    "sampleOutput": "\"bab\"",
    "explanation": "\"bab\" (or \"aba\") is the longest palindromic substring.",
    "testCases": [
        {
            "input": "s = \"cbbd\"",
            "output": "\"bb\""
        },
        {
            "input": "s = \"a\"",
            "output": "\"a\""
        },
        {
            "input": "s = \"ac\"",
            "output": "\"a\""
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Longest Palindromic Substring\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void longestPalindromicSubstring() {\n        // Implementation for Longest Palindromic Substring\n    }\n};\n",
        "python": "# Problem: Longest Palindromic Substring\nclass Solution:\n    def longestPalindromicSubstring(self):\n        pass\n",
        "javascript": "/**\n * Problem: Longest Palindromic Substring\n */\nfunction longestPalindromicSubstring() {\n}\n",
        "java": "// Problem: Longest Palindromic Substring\npublic class Solution {\n    public void longestPalindromicSubstring() {\n    }\n}\n"
    }
},
  "Palindromic Substrings": {
    "description": "Implement an optimal solution for Palindromic Substrings (Strings - Two-Pointer (Palindrome)) using proper algorithms and data structures.",
    "sampleInput": "s = \"aaa\"",
    "sampleOutput": "6",
    "explanation": "Six palindromic substrings: \"a\", \"a\", \"a\", \"aa\", \"aa\", \"aaa\".",
    "testCases": [
        {
            "input": "s = \"abc\"",
            "output": "3"
        },
        {
            "input": "s = \"xkxxk\"",
            "output": "7"
        },
        {
            "input": "s = \"z\"",
            "output": "1"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Palindromic Substrings\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void palindromicSubstrings() {\n        // Implementation for Palindromic Substrings\n    }\n};\n",
        "python": "# Problem: Palindromic Substrings\nclass Solution:\n    def palindromicSubstrings(self):\n        pass\n",
        "javascript": "/**\n * Problem: Palindromic Substrings\n */\nfunction palindromicSubstrings() {\n}\n",
        "java": "// Problem: Palindromic Substrings\npublic class Solution {\n    public void palindromicSubstrings() {\n    }\n}\n"
    }
},
  "Shortest Palindrome": {
    "description": "Implement an optimal solution for Shortest Palindrome (Strings - Two-Pointer (Palindrome)) using proper algorithms and data structures.",
    "sampleInput": "s = \"aacecaaa\"",
    "sampleOutput": "\"aaacecaaa\"",
    "explanation": "Prepend \"a\" to s to form the shortest palindrome.",
    "testCases": [
        {
            "input": "s = \"abcd\"",
            "output": "\"dcbabcd\""
        },
        {
            "input": "s = \"a\"",
            "output": "\"a\""
        },
        {
            "input": "s = \"abacaba\"",
            "output": "\"abacaba\""
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Shortest Palindrome\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void shortestPalindrome() {\n        // Implementation for Shortest Palindrome\n    }\n};\n",
        "python": "# Problem: Shortest Palindrome\nclass Solution:\n    def shortestPalindrome(self):\n        pass\n",
        "javascript": "/**\n * Problem: Shortest Palindrome\n */\nfunction shortestPalindrome() {\n}\n",
        "java": "// Problem: Shortest Palindrome\npublic class Solution {\n    public void shortestPalindrome() {\n    }\n}\n"
    }
},
  "Valid Anagram": {
    "description": "Implement an optimal solution for Valid Anagram (Strings - Two-Pointer (Palindrome)) using proper algorithms and data structures.",
    "sampleInput": "s = \"anagram\", t = \"nagaram\"",
    "sampleOutput": "true",
    "explanation": "Both strings contain exact same frequency of all constituent characters.",
    "testCases": [
        {
            "input": "s = \"rat\", t = \"car\"",
            "output": "false"
        },
        {
            "input": "s = \"listen\", t = \"silent\"",
            "output": "true"
        },
        {
            "input": "s = \"a\", t = \"ab\"",
            "output": "false"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Valid Anagram\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void validAnagram() {\n        // Implementation for Valid Anagram\n    }\n};\n",
        "python": "# Problem: Valid Anagram\nclass Solution:\n    def validAnagram(self):\n        pass\n",
        "javascript": "/**\n * Problem: Valid Anagram\n */\nfunction validAnagram() {\n}\n",
        "java": "// Problem: Valid Anagram\npublic class Solution {\n    public void validAnagram() {\n    }\n}\n"
    }
},
  "Find All Anagrams in a String": {
    "description": "Implement an optimal solution for Find All Anagrams in a String (Strings - Sliding Window (String)) using proper algorithms and data structures.",
    "sampleInput": "s = \"cbaebabacd\", p = \"abc\"",
    "sampleOutput": "[0, 6]",
    "explanation": "Anagrams of \"abc\" start at index 0 (\"cba\") and index 6 (\"bac\").",
    "testCases": [
        {
            "input": "s = \"abab\", p = \"ab\"",
            "output": "[0, 1, 2]"
        },
        {
            "input": "s = \"af\", p = \"be\"",
            "output": "[]"
        },
        {
            "input": "s = \"aaaaaaaaaa\", p = \"aaaaaaaaa\"",
            "output": "[0, 1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Find All Anagrams in a String\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void findAllAnagramsinaString() {\n        // Implementation for Find All Anagrams in a String\n    }\n};\n",
        "python": "# Problem: Find All Anagrams in a String\nclass Solution:\n    def findAllAnagramsinaString(self):\n        pass\n",
        "javascript": "/**\n * Problem: Find All Anagrams in a String\n */\nfunction findAllAnagramsinaString() {\n}\n",
        "java": "// Problem: Find All Anagrams in a String\npublic class Solution {\n    public void findAllAnagramsinaString() {\n    }\n}\n"
    }
},
  "Minimum Window Substring": {
    "description": "Implement an optimal solution for Minimum Window Substring (Strings - Sliding Window (String)) using proper algorithms and data structures.",
    "sampleInput": "s = \"ADOBECODEBANC\", t = \"ABC\"",
    "sampleOutput": "\"BANC\"",
    "explanation": "The minimum window substring \"BANC\" includes 'A', 'B', 'C' from string t.",
    "testCases": [
        {
            "input": "s = \"a\", t = \"a\"",
            "output": "\"a\""
        },
        {
            "input": "s = \"a\", t = \"aa\"",
            "output": "\"\""
        },
        {
            "input": "s = \"bba\", t = \"ab\"",
            "output": "\"ba\""
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Minimum Window Substring\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void minimumWindowSubstring() {\n        // Implementation for Minimum Window Substring\n    }\n};\n",
        "python": "# Problem: Minimum Window Substring\nclass Solution:\n    def minimumWindowSubstring(self):\n        pass\n",
        "javascript": "/**\n * Problem: Minimum Window Substring\n */\nfunction minimumWindowSubstring() {\n}\n",
        "java": "// Problem: Minimum Window Substring\npublic class Solution {\n    public void minimumWindowSubstring() {\n    }\n}\n"
    }
},
  "Longest Repeating Character Replacement": {
    "description": "Implement an optimal solution for Longest Repeating Character Replacement (Strings - Sliding Window (String)) using proper algorithms and data structures.",
    "sampleInput": "s = \"ABAB\", k = 2",
    "sampleOutput": "4",
    "explanation": "Replace the two 'A's with 'B's or vice versa to get \"BBBB\" or \"AAAA\".",
    "testCases": [
        {
            "input": "s = \"AABABBA\", k = 1",
            "output": "4"
        },
        {
            "input": "s = \"AAAA\", k = 2",
            "output": "4"
        },
        {
            "input": "s = \"BAAA\", k = 0",
            "output": "3"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Longest Repeating Character Replacement\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void longestRepeatingCharacterReplacement() {\n        // Implementation for Longest Repeating Character Replacement\n    }\n};\n",
        "python": "# Problem: Longest Repeating Character Replacement\nclass Solution:\n    def longestRepeatingCharacterReplacement(self):\n        pass\n",
        "javascript": "/**\n * Problem: Longest Repeating Character Replacement\n */\nfunction longestRepeatingCharacterReplacement() {\n}\n",
        "java": "// Problem: Longest Repeating Character Replacement\npublic class Solution {\n    public void longestRepeatingCharacterReplacement() {\n    }\n}\n"
    }
},
  "Group Anagrams": {
    "description": "Implement an optimal solution for Group Anagrams (Strings - Sliding Window (String)) using proper algorithms and data structures.",
    "sampleInput": "strs = [\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]",
    "sampleOutput": "[[\"bat\"], [\"nat\", \"tan\"], [\"ate\", \"eat\", \"tea\"]]",
    "explanation": "Strings with identical character counts are grouped together.",
    "testCases": [
        {
            "input": "strs = [\"\"]",
            "output": "[[\"\"]]"
        },
        {
            "input": "strs = [\"a\"]",
            "output": "[[\"a\"]]"
        },
        {
            "input": "strs = [\"bdddddddddd\", \"bbbbbbbbbbc\"]",
            "output": "[[\"bdddddddddd\"], [\"bbbbbbbbbbc\"]]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Group Anagrams\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void groupAnagrams() {\n        // Implementation for Group Anagrams\n    }\n};\n",
        "python": "# Problem: Group Anagrams\nclass Solution:\n    def groupAnagrams(self):\n        pass\n",
        "javascript": "/**\n * Problem: Group Anagrams\n */\nfunction groupAnagrams() {\n}\n",
        "java": "// Problem: Group Anagrams\npublic class Solution {\n    public void groupAnagrams() {\n    }\n}\n"
    }
},
  "String Compression": {
    "description": "Implement an optimal solution for String Compression (Strings - Sliding Window (String)) using proper algorithms and data structures.",
    "sampleInput": "chars = [\"a\", \"a\", \"b\", \"b\", \"c\", \"c\", \"c\"]",
    "sampleOutput": "6, chars = [\"a\", \"2\", \"b\", \"2\", \"c\", \"3\"]",
    "explanation": "Compressed string is \"a2b2c3\" of length 6.",
    "testCases": [
        {
            "input": "chars = [\"a\"]",
            "output": "1, chars = [\"a\"]"
        },
        {
            "input": "chars = [\"a\", \"b\", \"b\", \"b\", \"b\", \"b\", \"b\", \"b\", \"b\", \"b\", \"b\", \"b\", \"b\"]",
            "output": "4, chars = [\"a\", \"b\", \"1\", \"2\"]"
        },
        {
            "input": "chars = [\"a\", \"a\", \"a\", \"b\", \"b\", \"a\", \"a\"]",
            "output": "6, chars = [\"a\", \"3\", \"b\", \"2\", \"a\", \"2\"]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: String Compression\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void stringCompression() {\n        // Implementation for String Compression\n    }\n};\n",
        "python": "# Problem: String Compression\nclass Solution:\n    def stringCompression(self):\n        pass\n",
        "javascript": "/**\n * Problem: String Compression\n */\nfunction stringCompression() {\n}\n",
        "java": "// Problem: String Compression\npublic class Solution {\n    public void stringCompression() {\n    }\n}\n"
    }
},
  "Encode and Decode Strings": {
    "description": "Implement an optimal solution for Encode and Decode Strings (Strings - Sliding Window (String)) using proper algorithms and data structures.",
    "sampleInput": "strs = [\"lint\", \"code\", \"love\", \"you\"]",
    "sampleOutput": "encoded = \"4#lint4#code4#love3#you\", decoded = [\"lint\", \"code\", \"love\", \"you\"]",
    "explanation": "Length-prefix encoding allows lossless round-trip decoding.",
    "testCases": [
        {
            "input": "strs = [\"\"]",
            "output": "encoded = \"0#\", decoded = [\"\"]"
        },
        {
            "input": "strs = [\"#\", \"##\"]",
            "output": "encoded = \"1##2###\", decoded = [\"#\", \"##\"]"
        },
        {
            "input": "strs = [\"hello\", \"world\"]",
            "output": "encoded = \"5#hello5#world\", decoded = [\"hello\", \"world\"]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Encode and Decode Strings\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void encodeandDecodeStrings() {\n        // Implementation for Encode and Decode Strings\n    }\n};\n",
        "python": "# Problem: Encode and Decode Strings\nclass Solution:\n    def encodeandDecodeStrings(self):\n        pass\n",
        "javascript": "/**\n * Problem: Encode and Decode Strings\n */\nfunction encodeandDecodeStrings() {\n}\n",
        "java": "// Problem: Encode and Decode Strings\npublic class Solution {\n    public void encodeandDecodeStrings() {\n    }\n}\n"
    }
},
  "Binary Search": {
    "description": "Implement an optimal solution for Binary Search (Binary Search - Classic Binary Search) using proper algorithms and data structures.",
    "sampleInput": "nums = [-1, 0, 3, 5, 9, 12], target = 9",
    "sampleOutput": "4",
    "explanation": "9 exists in nums and its index is 4.",
    "testCases": [
        {
            "input": "nums = [-1, 0, 3, 5, 9, 12], target = 2",
            "output": "-1"
        },
        {
            "input": "nums = [5], target = 5",
            "output": "0"
        },
        {
            "input": "nums = [2, 5], target = 5",
            "output": "1"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Binary Search\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void binarySearch() {\n        // Implementation for Binary Search\n    }\n};\n",
        "python": "# Problem: Binary Search\nclass Solution:\n    def binarySearch(self):\n        pass\n",
        "javascript": "/**\n * Problem: Binary Search\n */\nfunction binarySearch() {\n}\n",
        "java": "// Problem: Binary Search\npublic class Solution {\n    public void binarySearch() {\n    }\n}\n"
    }
},
  "Search in Rotated Sorted Array": {
    "description": "Implement an optimal solution for Search in Rotated Sorted Array (Binary Search - Classic Binary Search) using proper algorithms and data structures.",
    "sampleInput": "nums = [4, 5, 6, 7, 0, 1, 2], target = 0",
    "sampleOutput": "4",
    "explanation": "Target 0 is present at index 4.",
    "testCases": [
        {
            "input": "nums = [4, 5, 6, 7, 0, 1, 2], target = 3",
            "output": "-1"
        },
        {
            "input": "nums = [1], target = 0",
            "output": "-1"
        },
        {
            "input": "nums = [5, 1, 3], target = 3",
            "output": "2"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Search in Rotated Sorted Array\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void searchinRotatedSortedArray() {\n        // Implementation for Search in Rotated Sorted Array\n    }\n};\n",
        "python": "# Problem: Search in Rotated Sorted Array\nclass Solution:\n    def searchinRotatedSortedArray(self):\n        pass\n",
        "javascript": "/**\n * Problem: Search in Rotated Sorted Array\n */\nfunction searchinRotatedSortedArray() {\n}\n",
        "java": "// Problem: Search in Rotated Sorted Array\npublic class Solution {\n    public void searchinRotatedSortedArray() {\n    }\n}\n"
    }
},
  "Search in Rotated Sorted Array II": {
    "description": "Implement an optimal solution for Search in Rotated Sorted Array II (Binary Search - Classic Binary Search) using proper algorithms and data structures.",
    "sampleInput": "nums = [2, 5, 6, 0, 0, 1, 2], target = 0",
    "sampleOutput": "true",
    "explanation": "Target 0 is present in array containing duplicates.",
    "testCases": [
        {
            "input": "nums = [2, 5, 6, 0, 0, 1, 2], target = 3",
            "output": "false"
        },
        {
            "input": "nums = [1, 0, 1, 1, 1], target = 0",
            "output": "true"
        },
        {
            "input": "nums = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1], target = 2",
            "output": "true"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Search in Rotated Sorted Array II\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void searchinRotatedSortedArrayII() {\n        // Implementation for Search in Rotated Sorted Array II\n    }\n};\n",
        "python": "# Problem: Search in Rotated Sorted Array II\nclass Solution:\n    def searchinRotatedSortedArrayII(self):\n        pass\n",
        "javascript": "/**\n * Problem: Search in Rotated Sorted Array II\n */\nfunction searchinRotatedSortedArrayII() {\n}\n",
        "java": "// Problem: Search in Rotated Sorted Array II\npublic class Solution {\n    public void searchinRotatedSortedArrayII() {\n    }\n}\n"
    }
},
  "Find Minimum in Rotated Sorted Array": {
    "description": "Implement an optimal solution for Find Minimum in Rotated Sorted Array (Binary Search - Classic Binary Search) using proper algorithms and data structures.",
    "sampleInput": "nums = [3, 4, 5, 1, 2]",
    "sampleOutput": "1",
    "explanation": "The original sorted array was [1, 2, 3, 4, 5] rotated 3 times.",
    "testCases": [
        {
            "input": "nums = [4, 5, 6, 7, 0, 1, 2]",
            "output": "0"
        },
        {
            "input": "nums = [11, 13, 15, 17]",
            "output": "11"
        },
        {
            "input": "nums = [2, 1]",
            "output": "1"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Find Minimum in Rotated Sorted Array\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void findMinimuminRotatedSortedArray() {\n        // Implementation for Find Minimum in Rotated Sorted Array\n    }\n};\n",
        "python": "# Problem: Find Minimum in Rotated Sorted Array\nclass Solution:\n    def findMinimuminRotatedSortedArray(self):\n        pass\n",
        "javascript": "/**\n * Problem: Find Minimum in Rotated Sorted Array\n */\nfunction findMinimuminRotatedSortedArray() {\n}\n",
        "java": "// Problem: Find Minimum in Rotated Sorted Array\npublic class Solution {\n    public void findMinimuminRotatedSortedArray() {\n    }\n}\n"
    }
},
  "Find Peak Element": {
    "description": "Implement an optimal solution for Find Peak Element (Binary Search - Classic Binary Search) using proper algorithms and data structures.",
    "sampleInput": "nums = [1, 2, 3, 1]",
    "sampleOutput": "2",
    "explanation": "3 is a peak element and your function should return its index 2.",
    "testCases": [
        {
            "input": "nums = [1, 2, 1, 3, 5, 6, 4]",
            "output": "5"
        },
        {
            "input": "nums = [1]",
            "output": "0"
        },
        {
            "input": "nums = [1, 2, 3, 4, 5]",
            "output": "4"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Find Peak Element\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void findPeakElement() {\n        // Implementation for Find Peak Element\n    }\n};\n",
        "python": "# Problem: Find Peak Element\nclass Solution:\n    def findPeakElement(self):\n        pass\n",
        "javascript": "/**\n * Problem: Find Peak Element\n */\nfunction findPeakElement() {\n}\n",
        "java": "// Problem: Find Peak Element\npublic class Solution {\n    public void findPeakElement() {\n    }\n}\n"
    }
},
  "Single Element in a Sorted Array": {
    "description": "Implement an optimal solution for Single Element in a Sorted Array (Binary Search - Classic Binary Search) using proper algorithms and data structures.",
    "sampleInput": "nums = [1, 1, 2, 3, 3, 4, 4, 8, 8]",
    "sampleOutput": "2",
    "explanation": "Every element appears twice except 2, which appears once.",
    "testCases": [
        {
            "input": "nums = [3, 3, 7, 7, 10, 11, 11]",
            "output": "10"
        },
        {
            "input": "nums = [1]",
            "output": "1"
        },
        {
            "input": "nums = [1, 1, 2]",
            "output": "2"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Single Element in a Sorted Array\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void singleElementinaSortedArray() {\n        // Implementation for Single Element in a Sorted Array\n    }\n};\n",
        "python": "# Problem: Single Element in a Sorted Array\nclass Solution:\n    def singleElementinaSortedArray(self):\n        pass\n",
        "javascript": "/**\n * Problem: Single Element in a Sorted Array\n */\nfunction singleElementinaSortedArray() {\n}\n",
        "java": "// Problem: Single Element in a Sorted Array\npublic class Solution {\n    public void singleElementinaSortedArray() {\n    }\n}\n"
    }
},
  "Search Insert Position": {
    "description": "Implement an optimal solution for Search Insert Position (Binary Search - Lower / Upper Bound) using proper algorithms and data structures.",
    "sampleInput": "nums = [1, 3, 5, 6], target = 5",
    "sampleOutput": "2",
    "explanation": "Target 5 is found at index 2.",
    "testCases": [
        {
            "input": "nums = [1, 3, 5, 6], target = 2",
            "output": "1"
        },
        {
            "input": "nums = [1, 3, 5, 6], target = 7",
            "output": "4"
        },
        {
            "input": "nums = [1, 3, 5, 6], target = 0",
            "output": "0"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Search Insert Position\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void searchInsertPosition() {\n        // Implementation for Search Insert Position\n    }\n};\n",
        "python": "# Problem: Search Insert Position\nclass Solution:\n    def searchInsertPosition(self):\n        pass\n",
        "javascript": "/**\n * Problem: Search Insert Position\n */\nfunction searchInsertPosition() {\n}\n",
        "java": "// Problem: Search Insert Position\npublic class Solution {\n    public void searchInsertPosition() {\n    }\n}\n"
    }
},
  "Find First and Last Position of Element in Sorted Array": {
    "description": "Implement an optimal solution for Find First and Last Position of Element in Sorted Array (Binary Search - Lower / Upper Bound) using proper algorithms and data structures.",
    "sampleInput": "nums = [5, 7, 7, 8, 8, 10], target = 8",
    "sampleOutput": "[3, 4]",
    "explanation": "Target 8 starts at index 3 and ends at index 4.",
    "testCases": [
        {
            "input": "nums = [5, 7, 7, 8, 8, 10], target = 6",
            "output": "[-1, -1]"
        },
        {
            "input": "nums = [], target = 0",
            "output": "[-1, -1]"
        },
        {
            "input": "nums = [1], target = 1",
            "output": "[0, 0]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Find First and Last Position of Element in Sorted Array\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void findFirstandLastPositionofElementinSortedArray() {\n        // Implementation for Find First and Last Position of Element in Sorted Array\n    }\n};\n",
        "python": "# Problem: Find First and Last Position of Element in Sorted Array\nclass Solution:\n    def findFirstandLastPositionofElementinSortedArray(self):\n        pass\n",
        "javascript": "/**\n * Problem: Find First and Last Position of Element in Sorted Array\n */\nfunction findFirstandLastPositionofElementinSortedArray() {\n}\n",
        "java": "// Problem: Find First and Last Position of Element in Sorted Array\npublic class Solution {\n    public void findFirstandLastPositionofElementinSortedArray() {\n    }\n}\n"
    }
},
  "First Bad Version": {
    "description": "Implement an optimal solution for First Bad Version (Binary Search - Lower / Upper Bound) using proper algorithms and data structures.",
    "sampleInput": "n = 5, bad = 4",
    "sampleOutput": "4",
    "explanation": "isBadVersion(3) -> false, isBadVersion(4) -> true, so version 4 is first bad version.",
    "testCases": [
        {
            "input": "n = 1, bad = 1",
            "output": "1"
        },
        {
            "input": "n = 10, bad = 7",
            "output": "7"
        },
        {
            "input": "n = 100, bad = 42",
            "output": "42"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: First Bad Version\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void firstBadVersion() {\n        // Implementation for First Bad Version\n    }\n};\n",
        "python": "# Problem: First Bad Version\nclass Solution:\n    def firstBadVersion(self):\n        pass\n",
        "javascript": "/**\n * Problem: First Bad Version\n */\nfunction firstBadVersion() {\n}\n",
        "java": "// Problem: First Bad Version\npublic class Solution {\n    public void firstBadVersion() {\n    }\n}\n"
    }
},
  "Arranging Coins": {
    "description": "Implement an optimal solution for Arranging Coins (Binary Search - Lower / Upper Bound) using proper algorithms and data structures.",
    "sampleInput": "n = 5",
    "sampleOutput": "2",
    "explanation": "Row 1 has 1 coin, row 2 has 2 coins, row 3 is incomplete (needs 3 coins, has 2).",
    "testCases": [
        {
            "input": "n = 8",
            "output": "3"
        },
        {
            "input": "n = 1",
            "output": "1"
        },
        {
            "input": "n = 2147483647",
            "output": "65535"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Arranging Coins\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void arrangingCoins() {\n        // Implementation for Arranging Coins\n    }\n};\n",
        "python": "# Problem: Arranging Coins\nclass Solution:\n    def arrangingCoins(self):\n        pass\n",
        "javascript": "/**\n * Problem: Arranging Coins\n */\nfunction arrangingCoins() {\n}\n",
        "java": "// Problem: Arranging Coins\npublic class Solution {\n    public void arrangingCoins() {\n    }\n}\n"
    }
},
  "Kth Missing Positive Number": {
    "description": "Implement an optimal solution for Kth Missing Positive Number (Binary Search - Lower / Upper Bound) using proper algorithms and data structures.",
    "sampleInput": "arr = [2, 3, 4, 7, 11], k = 5",
    "sampleOutput": "9",
    "explanation": "Missing positive numbers are [1, 5, 6, 8, 9, 10, ...]. The 5th missing number is 9.",
    "testCases": [
        {
            "input": "arr = [1, 2, 3, 4], k = 2",
            "output": "6"
        },
        {
            "input": "arr = [5, 6, 7, 8, 9], k = 1",
            "output": "1"
        },
        {
            "input": "arr = [2], k = 1",
            "output": "1"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Kth Missing Positive Number\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void kthMissingPositiveNumber() {\n        // Implementation for Kth Missing Positive Number\n    }\n};\n",
        "python": "# Problem: Kth Missing Positive Number\nclass Solution:\n    def kthMissingPositiveNumber(self):\n        pass\n",
        "javascript": "/**\n * Problem: Kth Missing Positive Number\n */\nfunction kthMissingPositiveNumber() {\n}\n",
        "java": "// Problem: Kth Missing Positive Number\npublic class Solution {\n    public void kthMissingPositiveNumber() {\n    }\n}\n"
    }
},
  "Next Greater Element I": {
    "description": "Implement an optimal solution for Next Greater Element I (Stack - Monotonic Stack) using proper algorithms and data structures.",
    "sampleInput": "nums1 = [4, 1, 2], nums2 = [1, 3, 4, 2]",
    "sampleOutput": "[-1, 3, -1]",
    "explanation": "For 4: no next greater in nums2 (-1). For 1: next greater is 3. For 2: no next greater (-1).",
    "testCases": [
        {
            "input": "nums1 = [2, 4], nums2 = [1, 2, 3, 4]",
            "output": "[3, -1]"
        },
        {
            "input": "nums1 = [1, 3, 5, 2, 4], nums2 = [6, 5, 4, 3, 2, 1, 7]",
            "output": "[7, 7, 7, 7, 7]"
        },
        {
            "input": "nums1 = [7], nums2 = [7]",
            "output": "[-1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Next Greater Element I\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void nextGreaterElementI() {\n        // Implementation for Next Greater Element I\n    }\n};\n",
        "python": "# Problem: Next Greater Element I\nclass Solution:\n    def nextGreaterElementI(self):\n        pass\n",
        "javascript": "/**\n * Problem: Next Greater Element I\n */\nfunction nextGreaterElementI() {\n}\n",
        "java": "// Problem: Next Greater Element I\npublic class Solution {\n    public void nextGreaterElementI() {\n    }\n}\n"
    }
},
  "Next Greater Element II": {
    "description": "Implement an optimal solution for Next Greater Element II (Stack - Monotonic Stack) using proper algorithms and data structures.",
    "sampleInput": "nums = [1, 2, 1]",
    "sampleOutput": "[2, -1, 2]",
    "explanation": "For first 1: next greater is 2. For 2: no greater element (-1). For second 1: wrapping around gives 2.",
    "testCases": [
        {
            "input": "nums = [1, 2, 3, 4, 3]",
            "output": "[2, 3, 4, -1, 4]"
        },
        {
            "input": "nums = [5, 4, 3, 2, 1]",
            "output": "[-1, 5, 5, 5, 5]"
        },
        {
            "input": "nums = [1, 1, 1]",
            "output": "[-1, -1, -1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Next Greater Element II\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void nextGreaterElementII() {\n        // Implementation for Next Greater Element II\n    }\n};\n",
        "python": "# Problem: Next Greater Element II\nclass Solution:\n    def nextGreaterElementII(self):\n        pass\n",
        "javascript": "/**\n * Problem: Next Greater Element II\n */\nfunction nextGreaterElementII() {\n}\n",
        "java": "// Problem: Next Greater Element II\npublic class Solution {\n    public void nextGreaterElementII() {\n    }\n}\n"
    }
},
  "Daily Temperatures": {
    "description": "Implement an optimal solution for Daily Temperatures (Stack - Monotonic Stack) using proper algorithms and data structures.",
    "sampleInput": "temperatures = [73, 74, 75, 71, 69, 72, 76, 73]",
    "sampleOutput": "[1, 1, 4, 2, 1, 1, 0, 0]",
    "explanation": "Days to wait for warmer temp: day 0->1 (74), day 1->1 (75), day 2->4 (76), etc.",
    "testCases": [
        {
            "input": "temperatures = [30, 40, 50, 60]",
            "output": "[1, 1, 1, 0]"
        },
        {
            "input": "temperatures = [30, 60, 90]",
            "output": "[1, 1, 0]"
        },
        {
            "input": "temperatures = [80, 80, 80]",
            "output": "[0, 0, 0]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Daily Temperatures\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void dailyTemperatures() {\n        // Implementation for Daily Temperatures\n    }\n};\n",
        "python": "# Problem: Daily Temperatures\nclass Solution:\n    def dailyTemperatures(self):\n        pass\n",
        "javascript": "/**\n * Problem: Daily Temperatures\n */\nfunction dailyTemperatures() {\n}\n",
        "java": "// Problem: Daily Temperatures\npublic class Solution {\n    public void dailyTemperatures() {\n    }\n}\n"
    }
},
  "Online Stock Span": {
    "description": "Implement an optimal solution for Online Stock Span (Stack - Monotonic Stack) using proper algorithms and data structures.",
    "sampleInput": "prices = [100, 80, 60, 70, 60, 75, 85]",
    "sampleOutput": "[1, 1, 1, 2, 1, 4, 6]",
    "explanation": "Consecutive days price was <= today's price: [1, 1, 1, 2, 1, 4, 6].",
    "testCases": [
        {
            "input": "prices = [31, 41, 59, 26, 53, 58, 97]",
            "output": "[1, 2, 3, 1, 2, 3, 7]"
        },
        {
            "input": "prices = [10, 20, 30, 40, 50]",
            "output": "[1, 2, 3, 4, 5]"
        },
        {
            "input": "prices = [50, 40, 30, 20, 10]",
            "output": "[1, 1, 1, 1, 1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Online Stock Span\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void onlineStockSpan() {\n        // Implementation for Online Stock Span\n    }\n};\n",
        "python": "# Problem: Online Stock Span\nclass Solution:\n    def onlineStockSpan(self):\n        pass\n",
        "javascript": "/**\n * Problem: Online Stock Span\n */\nfunction onlineStockSpan() {\n}\n",
        "java": "// Problem: Online Stock Span\npublic class Solution {\n    public void onlineStockSpan() {\n    }\n}\n"
    }
},
  "Largest Rectangle in Histogram": {
    "description": "Implement an optimal solution for Largest Rectangle in Histogram (Stack - Monotonic Stack) using proper algorithms and data structures.",
    "sampleInput": "heights = [2, 1, 5, 6, 2, 3]",
    "sampleOutput": "10",
    "explanation": "The largest rectangle is formed between heights 5 and 6 with area = 5 * 2 = 10.",
    "testCases": [
        {
            "input": "heights = [2, 4]",
            "output": "4"
        },
        {
            "input": "heights = [1, 1, 1, 1, 1]",
            "output": "5"
        },
        {
            "input": "heights = [6, 2, 5, 4, 5, 1, 6]",
            "output": "12"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Largest Rectangle in Histogram\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void largestRectangleinHistogram() {\n        // Implementation for Largest Rectangle in Histogram\n    }\n};\n",
        "python": "# Problem: Largest Rectangle in Histogram\nclass Solution:\n    def largestRectangleinHistogram(self):\n        pass\n",
        "javascript": "/**\n * Problem: Largest Rectangle in Histogram\n */\nfunction largestRectangleinHistogram() {\n}\n",
        "java": "// Problem: Largest Rectangle in Histogram\npublic class Solution {\n    public void largestRectangleinHistogram() {\n    }\n}\n"
    }
},
  "Maximal Rectangle": {
    "description": "Implement an optimal solution for Maximal Rectangle (Stack - Monotonic Stack) using proper algorithms and data structures.",
    "sampleInput": "matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
    "sampleOutput": "6",
    "explanation": "The maximal rectangle of '1's has area 6 (rows 1-2, cols 2-4).",
    "testCases": [
        {
            "input": "matrix = [[\"0\"]]",
            "output": "0"
        },
        {
            "input": "matrix = [[\"1\"]]",
            "output": "1"
        },
        {
            "input": "matrix = [[\"1\",\"1\"],[\"1\",\"1\"]]",
            "output": "4"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Maximal Rectangle\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void maximalRectangle() {\n        // Implementation for Maximal Rectangle\n    }\n};\n",
        "python": "# Problem: Maximal Rectangle\nclass Solution:\n    def maximalRectangle(self):\n        pass\n",
        "javascript": "/**\n * Problem: Maximal Rectangle\n */\nfunction maximalRectangle() {\n}\n",
        "java": "// Problem: Maximal Rectangle\npublic class Solution {\n    public void maximalRectangle() {\n    }\n}\n"
    }
},
  "Trapping Rain Water": {
    "description": "Implement an optimal solution for Trapping Rain Water (Stack - Monotonic Stack) using proper algorithms and data structures.",
    "sampleInput": "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
    "sampleOutput": "6",
    "explanation": "6 units of rain water are trapped between bars.",
    "testCases": [
        {
            "input": "height = [4, 2, 0, 3, 2, 5]",
            "output": "9"
        },
        {
            "input": "height = [3, 0, 2, 0, 4]",
            "output": "7"
        },
        {
            "input": "height = [1, 2, 3, 4, 5]",
            "output": "0"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Trapping Rain Water\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void trappingRainWater() {\n        // Implementation for Trapping Rain Water\n    }\n};\n",
        "python": "# Problem: Trapping Rain Water\nclass Solution:\n    def trappingRainWater(self):\n        pass\n",
        "javascript": "/**\n * Problem: Trapping Rain Water\n */\nfunction trappingRainWater() {\n}\n",
        "java": "// Problem: Trapping Rain Water\npublic class Solution {\n    public void trappingRainWater() {\n    }\n}\n"
    }
},
  "Valid Parentheses": {
    "description": "Implement an optimal solution for Valid Parentheses (Stack - Parenthesis & Scoring) using proper algorithms and data structures.",
    "sampleInput": "s = \"()[]{}\"",
    "sampleOutput": "true",
    "explanation": "All open brackets are closed by the same type of brackets in correct order.",
    "testCases": [
        {
            "input": "s = \"(]\"",
            "output": "false"
        },
        {
            "input": "s = \"([)]\"",
            "output": "false"
        },
        {
            "input": "s = \"{[]}\"",
            "output": "true"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Valid Parentheses\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void validParentheses() {\n        // Implementation for Valid Parentheses\n    }\n};\n",
        "python": "# Problem: Valid Parentheses\nclass Solution:\n    def validParentheses(self):\n        pass\n",
        "javascript": "/**\n * Problem: Valid Parentheses\n */\nfunction validParentheses() {\n}\n",
        "java": "// Problem: Valid Parentheses\npublic class Solution {\n    public void validParentheses() {\n    }\n}\n"
    }
},
  "Minimum Add to Make Parentheses Valid": {
    "description": "Implement an optimal solution for Minimum Add to Make Parentheses Valid (Stack - Parenthesis & Scoring) using proper algorithms and data structures.",
    "sampleInput": "s = \"())\"",
    "sampleOutput": "1",
    "explanation": "Add 1 '(' at the beginning to get \"()()\".",
    "testCases": [
        {
            "input": "s = \"(((\"",
            "output": "3"
        },
        {
            "input": "s = \"()\"",
            "output": "0"
        },
        {
            "input": "s = \"()))((\"",
            "output": "4"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Minimum Add to Make Parentheses Valid\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void minimumAddtoMakeParenthesesValid() {\n        // Implementation for Minimum Add to Make Parentheses Valid\n    }\n};\n",
        "python": "# Problem: Minimum Add to Make Parentheses Valid\nclass Solution:\n    def minimumAddtoMakeParenthesesValid(self):\n        pass\n",
        "javascript": "/**\n * Problem: Minimum Add to Make Parentheses Valid\n */\nfunction minimumAddtoMakeParenthesesValid() {\n}\n",
        "java": "// Problem: Minimum Add to Make Parentheses Valid\npublic class Solution {\n    public void minimumAddtoMakeParenthesesValid() {\n    }\n}\n"
    }
},
  "Score of Parentheses": {
    "description": "Implement an optimal solution for Score of Parentheses (Stack - Parenthesis & Scoring) using proper algorithms and data structures.",
    "sampleInput": "s = \"(())\"",
    "sampleOutput": "2",
    "explanation": "\"()\" has score 1, so \"(())\" has score 2 * 1 = 2.",
    "testCases": [
        {
            "input": "s = \"()\"",
            "output": "1"
        },
        {
            "input": "s = \"()()\"",
            "output": "2"
        },
        {
            "input": "s = \"(()(()))\"",
            "output": "6"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Score of Parentheses\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void scoreofParentheses() {\n        // Implementation for Score of Parentheses\n    }\n};\n",
        "python": "# Problem: Score of Parentheses\nclass Solution:\n    def scoreofParentheses(self):\n        pass\n",
        "javascript": "/**\n * Problem: Score of Parentheses\n */\nfunction scoreofParentheses() {\n}\n",
        "java": "// Problem: Score of Parentheses\npublic class Solution {\n    public void scoreofParentheses() {\n    }\n}\n"
    }
},
  "Longest Valid Parentheses": {
    "description": "Implement an optimal solution for Longest Valid Parentheses (Stack - Parenthesis & Scoring) using proper algorithms and data structures.",
    "sampleInput": "s = \")()())\"",
    "sampleOutput": "4",
    "explanation": "Longest valid substring is \"()()\", length 4.",
    "testCases": [
        {
            "input": "s = \"(()\"",
            "output": "2"
        },
        {
            "input": "s = \"\"",
            "output": "0"
        },
        {
            "input": "s = \"()(()\"",
            "output": "2"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Longest Valid Parentheses\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void longestValidParentheses() {\n        // Implementation for Longest Valid Parentheses\n    }\n};\n",
        "python": "# Problem: Longest Valid Parentheses\nclass Solution:\n    def longestValidParentheses(self):\n        pass\n",
        "javascript": "/**\n * Problem: Longest Valid Parentheses\n */\nfunction longestValidParentheses() {\n}\n",
        "java": "// Problem: Longest Valid Parentheses\npublic class Solution {\n    public void longestValidParentheses() {\n    }\n}\n"
    }
},
  "Majority Element": {
    "description": "Implement an optimal solution for Majority Element (HashMap - Frequency Map / Counting) using proper algorithms and data structures.",
    "sampleInput": "nums = [2, 2, 1, 1, 1, 2, 2]",
    "sampleOutput": "2",
    "explanation": "2 appears 4 times, which is > 7 / 2 = 3 times.",
    "testCases": [
        {
            "input": "nums = [3, 2, 3]",
            "output": "3"
        },
        {
            "input": "nums = [1]",
            "output": "1"
        },
        {
            "input": "nums = [6, 5, 5, 5, 5, 6, 5]",
            "output": "5"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Majority Element\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void majorityElement() {\n        // Implementation for Majority Element\n    }\n};\n",
        "python": "# Problem: Majority Element\nclass Solution:\n    def majorityElement(self):\n        pass\n",
        "javascript": "/**\n * Problem: Majority Element\n */\nfunction majorityElement() {\n}\n",
        "java": "// Problem: Majority Element\npublic class Solution {\n    public void majorityElement() {\n    }\n}\n"
    }
},
  "Delete Node in a Linked List": {
    "description": "Implement an optimal solution for Delete Node in a Linked List (Linked List - Basic Operations) using proper algorithms and data structures.",
    "sampleInput": "head = [4, 5, 1, 9], node = 5",
    "sampleOutput": "[4, 1, 9]",
    "explanation": "Node with value 5 is deleted without direct access to head.",
    "testCases": [
        {
            "input": "head = [4, 5, 1, 9], node = 1",
            "output": "[4, 5, 9]"
        },
        {
            "input": "head = [1, 2, 3, 4], node = 3",
            "output": "[1, 2, 4]"
        },
        {
            "input": "head = [0, 1], node = 0",
            "output": "[1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Delete Node in a Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void deleteNodeinaLinkedList() {\n        // Implementation for Delete Node in a Linked List\n    }\n};\n",
        "python": "# Problem: Delete Node in a Linked List\nclass Solution:\n    def deleteNodeinaLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Delete Node in a Linked List\n */\nfunction deleteNodeinaLinkedList() {\n}\n",
        "java": "// Problem: Delete Node in a Linked List\npublic class Solution {\n    public void deleteNodeinaLinkedList() {\n    }\n}\n"
    }
},
  "Insert into a Cyclic Sorted List": {
    "description": "Implement an optimal solution for Insert into a Cyclic Sorted List (Linked List - Basic Operations) using proper algorithms and data structures.",
    "sampleInput": "head = [3, 4, 1], insertVal = 2",
    "sampleOutput": "[3, 4, 1, 2]",
    "explanation": "2 is inserted between 1 and 3 to maintain sorted cyclic order.",
    "testCases": [
        {
            "input": "head = [], insertVal = 1",
            "output": "[1]"
        },
        {
            "input": "head = [1], insertVal = 0",
            "output": "[1, 0]"
        },
        {
            "input": "head = [3, 3, 3], insertVal = 0",
            "output": "[3, 3, 3, 0]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Insert into a Cyclic Sorted List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void insertintoaCyclicSortedList() {\n        // Implementation for Insert into a Cyclic Sorted List\n    }\n};\n",
        "python": "# Problem: Insert into a Cyclic Sorted List\nclass Solution:\n    def insertintoaCyclicSortedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Insert into a Cyclic Sorted List\n */\nfunction insertintoaCyclicSortedList() {\n}\n",
        "java": "// Problem: Insert into a Cyclic Sorted List\npublic class Solution {\n    public void insertintoaCyclicSortedList() {\n    }\n}\n"
    }
},
  "Remove Linked List Elements": {
    "description": "Implement an optimal solution for Remove Linked List Elements (Linked List - Basic Operations) using proper algorithms and data structures.",
    "sampleInput": "head = [1, 2, 6, 3, 4, 5, 6], val = 6",
    "sampleOutput": "[1, 2, 3, 4, 5]",
    "explanation": "All nodes with value 6 are removed.",
    "testCases": [
        {
            "input": "head = [], val = 1",
            "output": "[]"
        },
        {
            "input": "head = [7, 7, 7, 7], val = 7",
            "output": "[]"
        },
        {
            "input": "head = [1, 2, 2, 1], val = 2",
            "output": "[1, 1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Remove Linked List Elements\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void removeLinkedListElements() {\n        // Implementation for Remove Linked List Elements\n    }\n};\n",
        "python": "# Problem: Remove Linked List Elements\nclass Solution:\n    def removeLinkedListElements(self):\n        pass\n",
        "javascript": "/**\n * Problem: Remove Linked List Elements\n */\nfunction removeLinkedListElements() {\n}\n",
        "java": "// Problem: Remove Linked List Elements\npublic class Solution {\n    public void removeLinkedListElements() {\n    }\n}\n"
    }
},
  "Design Linked List": {
    "description": "Implement an optimal solution for Design Linked List (Linked List - Basic Operations) using proper algorithms and data structures.",
    "sampleInput": "ops = [\"MyLinkedList\", \"addAtHead\", \"addAtTail\", \"addAtIndex\", \"get\", \"deleteAtIndex\", \"get\"], params = [[], [1], [3], [1, 2], [1], [1], [1]]",
    "sampleOutput": "[null, null, null, null, 2, null, 3]",
    "explanation": "List becomes 1->2->3, get(1) returns 2, delete(1) leaves 1->3, get(1) returns 3.",
    "testCases": [
        {
            "input": "ops = [\"MyLinkedList\", \"addAtHead\", \"get\"], params = [[], [5], [0]]",
            "output": "[null, null, 5]"
        },
        {
            "input": "ops = [\"MyLinkedList\", \"addAtTail\", \"get\"], params = [[], [10], [0]]",
            "output": "[null, null, 10]"
        },
        {
            "input": "ops = [\"MyLinkedList\", \"addAtHead\", \"addAtHead\", \"deleteAtIndex\", \"get\"], params = [[], [2], [1], [0], [0]]",
            "output": "[null, null, null, null, 2]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Design Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void designLinkedList() {\n        // Implementation for Design Linked List\n    }\n};\n",
        "python": "# Problem: Design Linked List\nclass Solution:\n    def designLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Design Linked List\n */\nfunction designLinkedList() {\n}\n",
        "java": "// Problem: Design Linked List\npublic class Solution {\n    public void designLinkedList() {\n    }\n}\n"
    }
},
  "Node at a Given Index in Linked List": {
    "description": "Implement an optimal solution for Node at a Given Index in Linked List (Linked List - Basic Operations) using proper algorithms and data structures.",
    "sampleInput": "head = [1, 2, 8, 32, 65], index = 4",
    "sampleOutput": "65",
    "explanation": "0-indexed 4th node value is 65.",
    "testCases": [
        {
            "input": "head = [10, 20, 30, 40], index = 1",
            "output": "20"
        },
        {
            "input": "head = [5], index = 0",
            "output": "5"
        },
        {
            "input": "head = [100, 200, 300], index = 2",
            "output": "300"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Node at a Given Index in Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void nodeataGivenIndexinLinkedList() {\n        // Implementation for Node at a Given Index in Linked List\n    }\n};\n",
        "python": "# Problem: Node at a Given Index in Linked List\nclass Solution:\n    def nodeataGivenIndexinLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Node at a Given Index in Linked List\n */\nfunction nodeataGivenIndexinLinkedList() {\n}\n",
        "java": "// Problem: Node at a Given Index in Linked List\npublic class Solution {\n    public void nodeataGivenIndexinLinkedList() {\n    }\n}\n"
    }
},
  "Count Nodes of Linked List": {
    "description": "Implement an optimal solution for Count Nodes of Linked List (Linked List - Basic Operations) using proper algorithms and data structures.",
    "sampleInput": "head = [10, 20, 30, 40, 50, 60, 70]",
    "sampleOutput": "7",
    "explanation": "There are 7 nodes in the linked list.",
    "testCases": [
        {
            "input": "head = [10]",
            "output": "1"
        },
        {
            "input": "head = []",
            "output": "0"
        },
        {
            "input": "head = [2, 4, 6, 8, 10, 12]",
            "output": "6"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Count Nodes of Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void countNodesofLinkedList() {\n        // Implementation for Count Nodes of Linked List\n    }\n};\n",
        "python": "# Problem: Count Nodes of Linked List\nclass Solution:\n    def countNodesofLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Count Nodes of Linked List\n */\nfunction countNodesofLinkedList() {\n}\n",
        "java": "// Problem: Count Nodes of Linked List\npublic class Solution {\n    public void countNodesofLinkedList() {\n    }\n}\n"
    }
},
  "Middle of the Linked List": {
    "description": "Implement an optimal solution for Middle of the Linked List (Linked List - Fast and Slow Pointers) using proper algorithms and data structures.",
    "sampleInput": "head = [1, 3, 5, 7, 9, 11]",
    "sampleOutput": "[7, 9, 11]",
    "explanation": "Second middle node (even length 6) is 7, returning list from 7.",
    "testCases": [
        {
            "input": "head = [1, 2, 3, 4, 5]",
            "output": "[3, 4, 5]"
        },
        {
            "input": "head = [1]",
            "output": "[1]"
        },
        {
            "input": "head = [10, 20]",
            "output": "[20]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Middle of the Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void middleoftheLinkedList() {\n        // Implementation for Middle of the Linked List\n    }\n};\n",
        "python": "# Problem: Middle of the Linked List\nclass Solution:\n    def middleoftheLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Middle of the Linked List\n */\nfunction middleoftheLinkedList() {\n}\n",
        "java": "// Problem: Middle of the Linked List\npublic class Solution {\n    public void middleoftheLinkedList() {\n    }\n}\n"
    }
},
  "Linked List Cycle": {
    "description": "Implement an optimal solution for Linked List Cycle (Linked List - Fast and Slow Pointers) using proper algorithms and data structures.",
    "sampleInput": "head = [3, 2, 0, -4], pos = 1",
    "sampleOutput": "true",
    "explanation": "Tail connects to node index 1 (value 2), forming a cycle.",
    "testCases": [
        {
            "input": "head = [1, 2], pos = 0",
            "output": "true"
        },
        {
            "input": "head = [1], pos = -1",
            "output": "false"
        },
        {
            "input": "head = [1, 3, 5, 7], pos = -1",
            "output": "false"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Linked List Cycle\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void linkedListCycle() {\n        // Implementation for Linked List Cycle\n    }\n};\n",
        "python": "# Problem: Linked List Cycle\nclass Solution:\n    def linkedListCycle(self):\n        pass\n",
        "javascript": "/**\n * Problem: Linked List Cycle\n */\nfunction linkedListCycle() {\n}\n",
        "java": "// Problem: Linked List Cycle\npublic class Solution {\n    public void linkedListCycle() {\n    }\n}\n"
    }
},
  "Linked List Cycle II": {
    "description": "Implement an optimal solution for Linked List Cycle II (Linked List - Fast and Slow Pointers) using proper algorithms and data structures.",
    "sampleInput": "head = [1, 4, 7, 10, 13], pos = 2",
    "sampleOutput": "tail connects to node index 2",
    "explanation": "Cycle begins at node with index 2 (value 7).",
    "testCases": [
        {
            "input": "head = [1, 2], pos = 0",
            "output": "tail connects to node index 0"
        },
        {
            "input": "head = [1], pos = -1",
            "output": "no cycle"
        },
        {
            "input": "head = [5, 10, 15], pos = -1",
            "output": "no cycle"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Linked List Cycle II\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void linkedListCycleII() {\n        // Implementation for Linked List Cycle II\n    }\n};\n",
        "python": "# Problem: Linked List Cycle II\nclass Solution:\n    def linkedListCycleII(self):\n        pass\n",
        "javascript": "/**\n * Problem: Linked List Cycle II\n */\nfunction linkedListCycleII() {\n}\n",
        "java": "// Problem: Linked List Cycle II\npublic class Solution {\n    public void linkedListCycleII() {\n    }\n}\n"
    }
},
  "Find the Duplicate Number": {
    "description": "Implement an optimal solution for Find the Duplicate Number (Linked List - Fast and Slow Pointers) using proper algorithms and data structures.",
    "sampleInput": "nums = [1, 3, 4, 2, 2]",
    "sampleOutput": "2",
    "explanation": "2 appears twice in the array.",
    "testCases": [
        {
            "input": "nums = [3, 1, 3, 4, 2]",
            "output": "3"
        },
        {
            "input": "nums = [3, 3, 3, 3, 3]",
            "output": "3"
        },
        {
            "input": "nums = [2, 5, 9, 6, 9, 3, 8, 9, 7, 1]",
            "output": "9"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Find the Duplicate Number\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void findtheDuplicateNumber() {\n        // Implementation for Find the Duplicate Number\n    }\n};\n",
        "python": "# Problem: Find the Duplicate Number\nclass Solution:\n    def findtheDuplicateNumber(self):\n        pass\n",
        "javascript": "/**\n * Problem: Find the Duplicate Number\n */\nfunction findtheDuplicateNumber() {\n}\n",
        "java": "// Problem: Find the Duplicate Number\npublic class Solution {\n    public void findtheDuplicateNumber() {\n    }\n}\n"
    }
},
  "Reverse Linked List": {
    "description": "Implement an optimal solution for Reverse Linked List (Linked List - Reversal Pattern) using proper algorithms and data structures.",
    "sampleInput": "head = [2, 4, 6, 8, 10]",
    "sampleOutput": "[10, 8, 6, 4, 2]",
    "explanation": "Reversing pointers yields [10, 8, 6, 4, 2].",
    "testCases": [
        {
            "input": "head = [1, 2]",
            "output": "[2, 1]"
        },
        {
            "input": "head = []",
            "output": "[]"
        },
        {
            "input": "head = [10]",
            "output": "[10]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Reverse Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reverseLinkedList() {\n        // Implementation for Reverse Linked List\n    }\n};\n",
        "python": "# Problem: Reverse Linked List\nclass Solution:\n    def reverseLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Reverse Linked List\n */\nfunction reverseLinkedList() {\n}\n",
        "java": "// Problem: Reverse Linked List\npublic class Solution {\n    public void reverseLinkedList() {\n    }\n}\n"
    }
},
  "Reverse Linked List II": {
    "description": "Implement an optimal solution for Reverse Linked List II (Linked List - Reversal Pattern) using proper algorithms and data structures.",
    "sampleInput": "head = [1, 2, 3, 4, 5], left = 2, right = 4",
    "sampleOutput": "[1, 4, 3, 2, 5]",
    "explanation": "Nodes from position 2 to 4 ([2,3,4]) are reversed to [4,3,2].",
    "testCases": [
        {
            "input": "head = [5], left = 1, right = 1",
            "output": "[5]"
        },
        {
            "input": "head = [3, 5], left = 1, right = 2",
            "output": "[5, 3]"
        },
        {
            "input": "head = [1, 2, 3, 4, 5, 6], left = 3, right = 5",
            "output": "[1, 2, 5, 4, 3, 6]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Reverse Linked List II\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reverseLinkedListII() {\n        // Implementation for Reverse Linked List II\n    }\n};\n",
        "python": "# Problem: Reverse Linked List II\nclass Solution:\n    def reverseLinkedListII(self):\n        pass\n",
        "javascript": "/**\n * Problem: Reverse Linked List II\n */\nfunction reverseLinkedListII() {\n}\n",
        "java": "// Problem: Reverse Linked List II\npublic class Solution {\n    public void reverseLinkedListII() {\n    }\n}\n"
    }
},
  "Reverse Nodes in k-Group": {
    "description": "Implement an optimal solution for Reverse Nodes in k-Group (Linked List - Reversal Pattern) using proper algorithms and data structures.",
    "sampleInput": "head = [1, 2, 3, 4, 5], k = 2",
    "sampleOutput": "[2, 1, 4, 3, 5]",
    "explanation": "Groups of k=2 nodes are reversed. Node 5 remains as is.",
    "testCases": [
        {
            "input": "head = [1, 2, 3, 4, 5], k = 3",
            "output": "[3, 2, 1, 4, 5]"
        },
        {
            "input": "head = [1, 2, 3, 4, 5], k = 1",
            "output": "[1, 2, 3, 4, 5]"
        },
        {
            "input": "head = [1], k = 1",
            "output": "[1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Reverse Nodes in k-Group\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reverseNodesinkGroup() {\n        // Implementation for Reverse Nodes in k-Group\n    }\n};\n",
        "python": "# Problem: Reverse Nodes in k-Group\nclass Solution:\n    def reverseNodesinkGroup(self):\n        pass\n",
        "javascript": "/**\n * Problem: Reverse Nodes in k-Group\n */\nfunction reverseNodesinkGroup() {\n}\n",
        "java": "// Problem: Reverse Nodes in k-Group\npublic class Solution {\n    public void reverseNodesinkGroup() {\n    }\n}\n"
    }
},
  "Swap Nodes in Pairs": {
    "description": "Implement an optimal solution for Swap Nodes in Pairs (Linked List - Reversal Pattern) using proper algorithms and data structures.",
    "sampleInput": "head = [1, 2, 3, 4, 5, 6]",
    "sampleOutput": "[2, 1, 4, 3, 6, 5]",
    "explanation": "Adjacent pairs (1,2), (3,4), and (5,6) are swapped.",
    "testCases": [
        {
            "input": "head = []",
            "output": "[]"
        },
        {
            "input": "head = [1]",
            "output": "[1]"
        },
        {
            "input": "head = [1, 2, 3]",
            "output": "[2, 1, 3]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Swap Nodes in Pairs\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void swapNodesinPairs() {\n        // Implementation for Swap Nodes in Pairs\n    }\n};\n",
        "python": "# Problem: Swap Nodes in Pairs\nclass Solution:\n    def swapNodesinPairs(self):\n        pass\n",
        "javascript": "/**\n * Problem: Swap Nodes in Pairs\n */\nfunction swapNodesinPairs() {\n}\n",
        "java": "// Problem: Swap Nodes in Pairs\npublic class Solution {\n    public void swapNodesinPairs() {\n    }\n}\n"
    }
},
  "Reverse Nodes in Even Length Groups": {
    "description": "Implement an optimal solution for Reverse Nodes in Even Length Groups (Linked List - Reversal Pattern) using proper algorithms and data structures.",
    "sampleInput": "head = [5, 2, 6, 3, 9, 1, 7, 3, 8, 4]",
    "sampleOutput": "[5, 6, 2, 3, 9, 1, 4, 8, 3, 7]",
    "explanation": "Groups sizes 1, 2, 3, 4. Group 2 ([2,6]) and Group 4 ([7,3,8,4]) are even, so they reverse.",
    "testCases": [
        {
            "input": "head = [1, 1, 0, 6]",
            "output": "[1, 0, 1, 6]"
        },
        {
            "input": "head = [2, 1]",
            "output": "[2, 1]"
        },
        {
            "input": "head = [8]",
            "output": "[8]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Reverse Nodes in Even Length Groups\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reverseNodesinEvenLengthGroups() {\n        // Implementation for Reverse Nodes in Even Length Groups\n    }\n};\n",
        "python": "# Problem: Reverse Nodes in Even Length Groups\nclass Solution:\n    def reverseNodesinEvenLengthGroups(self):\n        pass\n",
        "javascript": "/**\n * Problem: Reverse Nodes in Even Length Groups\n */\nfunction reverseNodesinEvenLengthGroups() {\n}\n",
        "java": "// Problem: Reverse Nodes in Even Length Groups\npublic class Solution {\n    public void reverseNodesinEvenLengthGroups() {\n    }\n}\n"
    }
},
  "Reorder List": {
    "description": "Implement an optimal solution for Reorder List (Linked List - Reversal Pattern) using proper algorithms and data structures.",
    "sampleInput": "head = [10, 20, 30, 40, 50]",
    "sampleOutput": "[10, 50, 20, 40, 30]",
    "explanation": "Interleaving nodes from ends yields 10->50->20->40->30.",
    "testCases": [
        {
            "input": "head = [1, 2, 3, 4]",
            "output": "[1, 4, 2, 3]"
        },
        {
            "input": "head = [1]",
            "output": "[1]"
        },
        {
            "input": "head = [5, 15]",
            "output": "[5, 15]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Reorder List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reorderList() {\n        // Implementation for Reorder List\n    }\n};\n",
        "python": "# Problem: Reorder List\nclass Solution:\n    def reorderList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Reorder List\n */\nfunction reorderList() {\n}\n",
        "java": "// Problem: Reorder List\npublic class Solution {\n    public void reorderList() {\n    }\n}\n"
    }
},
  "Palindrome Linked List": {
    "description": "Implement an optimal solution for Palindrome Linked List (Linked List - Reversal Pattern) using proper algorithms and data structures.",
    "sampleInput": "head = [1, 2, 2, 1]",
    "sampleOutput": "true",
    "explanation": "List reads identical forwards and backwards.",
    "testCases": [
        {
            "input": "head = [1, 2]",
            "output": "false"
        },
        {
            "input": "head = [1, 2, 3, 2, 1]",
            "output": "true"
        },
        {
            "input": "head = [7]",
            "output": "true"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Palindrome Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void palindromeLinkedList() {\n        // Implementation for Palindrome Linked List\n    }\n};\n",
        "python": "# Problem: Palindrome Linked List\nclass Solution:\n    def palindromeLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Palindrome Linked List\n */\nfunction palindromeLinkedList() {\n}\n",
        "java": "// Problem: Palindrome Linked List\npublic class Solution {\n    public void palindromeLinkedList() {\n    }\n}\n"
    }
},
  "Merge Two Sorted Lists": {
    "description": "Implement an optimal solution for Merge Two Sorted Lists (Linked List - Merge / Sort) using proper algorithms and data structures.",
    "sampleInput": "list1 = [1, 2, 4], list2 = [1, 3, 4]",
    "sampleOutput": "[1, 1, 2, 3, 4, 4]",
    "explanation": "Merged sorted list combining both inputs.",
    "testCases": [
        {
            "input": "list1 = [], list2 = []",
            "output": "[]"
        },
        {
            "input": "list1 = [], list2 = [0]",
            "output": "[0]"
        },
        {
            "input": "list1 = [5, 10], list2 = [2, 4, 6, 8]",
            "output": "[2, 4, 5, 6, 8, 10]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Merge Two Sorted Lists\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void mergeTwoSortedLists() {\n        // Implementation for Merge Two Sorted Lists\n    }\n};\n",
        "python": "# Problem: Merge Two Sorted Lists\nclass Solution:\n    def mergeTwoSortedLists(self):\n        pass\n",
        "javascript": "/**\n * Problem: Merge Two Sorted Lists\n */\nfunction mergeTwoSortedLists() {\n}\n",
        "java": "// Problem: Merge Two Sorted Lists\npublic class Solution {\n    public void mergeTwoSortedLists() {\n    }\n}\n"
    }
},
  "Merge k Sorted Lists": {
    "description": "Implement an optimal solution for Merge k Sorted Lists (Linked List - Merge / Sort) using proper algorithms and data structures.",
    "sampleInput": "lists = [[1, 4, 5], [1, 3, 4], [2, 6]]",
    "sampleOutput": "[1, 1, 2, 3, 4, 4, 5, 6]",
    "explanation": "Merging all k sorted lists into one single sorted list.",
    "testCases": [
        {
            "input": "lists = []",
            "output": "[]"
        },
        {
            "input": "lists = [[]]",
            "output": "[]"
        },
        {
            "input": "lists = [[2], [1, 3], [0, 4, 8]]",
            "output": "[0, 1, 2, 3, 4, 8]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Merge k Sorted Lists\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void mergekSortedLists() {\n        // Implementation for Merge k Sorted Lists\n    }\n};\n",
        "python": "# Problem: Merge k Sorted Lists\nclass Solution:\n    def mergekSortedLists(self):\n        pass\n",
        "javascript": "/**\n * Problem: Merge k Sorted Lists\n */\nfunction mergekSortedLists() {\n}\n",
        "java": "// Problem: Merge k Sorted Lists\npublic class Solution {\n    public void mergekSortedLists() {\n    }\n}\n"
    }
},
  "Sort List": {
    "description": "Implement an optimal solution for Sort List (Linked List - Merge / Sort) using proper algorithms and data structures.",
    "sampleInput": "head = [4, 2, 1, 3, 9, 7]",
    "sampleOutput": "[1, 2, 3, 4, 7, 9]",
    "explanation": "Linked list sorted in O(n log n) time.",
    "testCases": [
        {
            "input": "head = [-1, 5, 3, 4, 0]",
            "output": "[-1, 0, 3, 4, 5]"
        },
        {
            "input": "head = []",
            "output": "[]"
        },
        {
            "input": "head = [9, 1]",
            "output": "[1, 9]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Sort List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void sortList() {\n        // Implementation for Sort List\n    }\n};\n",
        "python": "# Problem: Sort List\nclass Solution:\n    def sortList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Sort List\n */\nfunction sortList() {\n}\n",
        "java": "// Problem: Sort List\npublic class Solution {\n    public void sortList() {\n    }\n}\n"
    }
},
  "Insertion Sort List": {
    "description": "Implement an optimal solution for Insertion Sort List (Linked List - Merge / Sort) using proper algorithms and data structures.",
    "sampleInput": "head = [15, 3, 8, 1, 12]",
    "sampleOutput": "[1, 3, 8, 12, 15]",
    "explanation": "List sorted using insertion sort algorithm.",
    "testCases": [
        {
            "input": "head = [-1, 5, 3, 4, 0]",
            "output": "[-1, 0, 3, 4, 5]"
        },
        {
            "input": "head = [1]",
            "output": "[1]"
        },
        {
            "input": "head = [3, 2, 1]",
            "output": "[1, 2, 3]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Insertion Sort List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void insertionSortList() {\n        // Implementation for Insertion Sort List\n    }\n};\n",
        "python": "# Problem: Insertion Sort List\nclass Solution:\n    def insertionSortList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Insertion Sort List\n */\nfunction insertionSortList() {\n}\n",
        "java": "// Problem: Insertion Sort List\npublic class Solution {\n    public void insertionSortList() {\n    }\n}\n"
    }
},
  "Merge In Between Linked Lists": {
    "description": "Implement an optimal solution for Merge In Between Linked Lists (Linked List - Merge / Sort) using proper algorithms and data structures.",
    "sampleInput": "list1 = [10, 1, 13, 6, 9, 5], a = 3, b = 4, list2 = [1000000, 1000001, 1000002]",
    "sampleOutput": "[10, 1, 13, 1000000, 1000001, 1000002, 5]",
    "explanation": "Nodes from index 3 to 4 ([6, 9]) are spliced out and replaced by list2.",
    "testCases": [
        {
            "input": "list1 = [0, 1, 2, 3, 4, 5, 6], a = 2, b = 5, list2 = [100, 101, 102]",
            "output": "[0, 1, 100, 101, 102, 6]"
        },
        {
            "input": "list1 = [1, 2, 3], a = 1, b = 1, list2 = [99]",
            "output": "[1, 99, 3]"
        },
        {
            "input": "list1 = [5, 6, 7, 8], a = 1, b = 2, list2 = [20, 30]",
            "output": "[5, 20, 30, 8]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Merge In Between Linked Lists\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void mergeInBetweenLinkedLists() {\n        // Implementation for Merge In Between Linked Lists\n    }\n};\n",
        "python": "# Problem: Merge In Between Linked Lists\nclass Solution:\n    def mergeInBetweenLinkedLists(self):\n        pass\n",
        "javascript": "/**\n * Problem: Merge In Between Linked Lists\n */\nfunction mergeInBetweenLinkedLists() {\n}\n",
        "java": "// Problem: Merge In Between Linked Lists\npublic class Solution {\n    public void mergeInBetweenLinkedLists() {\n    }\n}\n"
    }
},
  "Add Two Numbers": {
    "description": "Implement an optimal solution for Add Two Numbers (Linked List - Merge / Sort) using proper algorithms and data structures.",
    "sampleInput": "l1 = [2, 4, 3], l2 = [5, 6, 4]",
    "sampleOutput": "[7, 0, 8]",
    "explanation": "342 + 465 = 807, represented in reverse digits as [7, 0, 8].",
    "testCases": [
        {
            "input": "l1 = [0], l2 = [0]",
            "output": "[0]"
        },
        {
            "input": "l1 = [9, 9, 9, 9, 9, 9, 9], l2 = [9, 9, 9, 9]",
            "output": "[8, 9, 9, 9, 0, 0, 0, 1]"
        },
        {
            "input": "l1 = [1], l2 = [9, 9]",
            "output": "[0, 0, 1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Add Two Numbers\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void addTwoNumbers() {\n        // Implementation for Add Two Numbers\n    }\n};\n",
        "python": "# Problem: Add Two Numbers\nclass Solution:\n    def addTwoNumbers(self):\n        pass\n",
        "javascript": "/**\n * Problem: Add Two Numbers\n */\nfunction addTwoNumbers() {\n}\n",
        "java": "// Problem: Add Two Numbers\npublic class Solution {\n    public void addTwoNumbers() {\n    }\n}\n"
    }
},
  "Add Two Numbers II": {
    "description": "Implement an optimal solution for Add Two Numbers II (Linked List - Merge / Sort) using proper algorithms and data structures.",
    "sampleInput": "l1 = [7, 2, 4, 3], l2 = [5, 6, 4]",
    "sampleOutput": "[7, 8, 0, 7]",
    "explanation": "7243 + 564 = 7807 (most significant digit first).",
    "testCases": [
        {
            "input": "l1 = [2, 4, 3], l2 = [5, 6, 4]",
            "output": "[8, 0, 7]"
        },
        {
            "input": "l1 = [0], l2 = [0]",
            "output": "[0]"
        },
        {
            "input": "l1 = [9, 9], l2 = [1]",
            "output": "[1, 0, 0]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Add Two Numbers II\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void addTwoNumbersII() {\n        // Implementation for Add Two Numbers II\n    }\n};\n",
        "python": "# Problem: Add Two Numbers II\nclass Solution:\n    def addTwoNumbersII(self):\n        pass\n",
        "javascript": "/**\n * Problem: Add Two Numbers II\n */\nfunction addTwoNumbersII() {\n}\n",
        "java": "// Problem: Add Two Numbers II\npublic class Solution {\n    public void addTwoNumbersII() {\n    }\n}\n"
    }
},
  "Copy List with Random Pointer": {
    "description": "Implement an optimal solution for Copy List with Random Pointer (Linked List - LinkedList with Stack/HashMap) using proper algorithms and data structures.",
    "sampleInput": "head = [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]",
    "sampleOutput": "[[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]",
    "explanation": "Deep copy constructed with identical values and random pointer connections.",
    "testCases": [
        {
            "input": "head = [[1, 1], [2, 1]]",
            "output": "[[1, 1], [2, 1]]"
        },
        {
            "input": "head = [[3, null], [3, 0], [3, null]]",
            "output": "[[3, null], [3, 0], [3, null]]"
        },
        {
            "input": "head = []",
            "output": "[]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Copy List with Random Pointer\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void copyListwithRandomPointer() {\n        // Implementation for Copy List with Random Pointer\n    }\n};\n",
        "python": "# Problem: Copy List with Random Pointer\nclass Solution:\n    def copyListwithRandomPointer(self):\n        pass\n",
        "javascript": "/**\n * Problem: Copy List with Random Pointer\n */\nfunction copyListwithRandomPointer() {\n}\n",
        "java": "// Problem: Copy List with Random Pointer\npublic class Solution {\n    public void copyListwithRandomPointer() {\n    }\n}\n"
    }
},
  "Next Greater Node In Linked List": {
    "description": "Implement an optimal solution for Next Greater Node In Linked List (Linked List - LinkedList with Stack/HashMap) using proper algorithms and data structures.",
    "sampleInput": "head = [2, 1, 5]",
    "sampleOutput": "[5, 5, 0]",
    "explanation": "For node 2 next greater is 5; for node 1 is 5; for node 5 there is none (0).",
    "testCases": [
        {
            "input": "head = [2, 7, 4, 3, 5]",
            "output": "[7, 0, 5, 5, 0]"
        },
        {
            "input": "head = [1, 7, 5, 1, 9, 2, 5, 1]",
            "output": "[7, 9, 9, 9, 0, 5, 0, 0]"
        },
        {
            "input": "head = [5]",
            "output": "[0]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Next Greater Node In Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void nextGreaterNodeInLinkedList() {\n        // Implementation for Next Greater Node In Linked List\n    }\n};\n",
        "python": "# Problem: Next Greater Node In Linked List\nclass Solution:\n    def nextGreaterNodeInLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Next Greater Node In Linked List\n */\nfunction nextGreaterNodeInLinkedList() {\n}\n",
        "java": "// Problem: Next Greater Node In Linked List\npublic class Solution {\n    public void nextGreaterNodeInLinkedList() {\n    }\n}\n"
    }
},
  "Flatten a Multilevel Doubly Linked List": {
    "description": "Implement an optimal solution for Flatten a Multilevel Doubly Linked List (Linked List - LinkedList with Stack/HashMap) using proper algorithms and data structures.",
    "sampleInput": "head = [1, 2, 3, 4, 5, 6, null, null, null, 7, 8, 9, 10, null, null, 11, 12]",
    "sampleOutput": "[1, 2, 3, 7, 8, 11, 12, 9, 10, 4, 5, 6]",
    "explanation": "Flattening child pointers depth-first yields a single-level doubly linked list.",
    "testCases": [
        {
            "input": "head = [1, 2, null, 3]",
            "output": "[1, 3, 2]"
        },
        {
            "input": "head = []",
            "output": "[]"
        },
        {
            "input": "head = [1]",
            "output": "[1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Flatten a Multilevel Doubly Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void flattenaMultilevelDoublyLinkedList() {\n        // Implementation for Flatten a Multilevel Doubly Linked List\n    }\n};\n",
        "python": "# Problem: Flatten a Multilevel Doubly Linked List\nclass Solution:\n    def flattenaMultilevelDoublyLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Flatten a Multilevel Doubly Linked List\n */\nfunction flattenaMultilevelDoublyLinkedList() {\n}\n",
        "java": "// Problem: Flatten a Multilevel Doubly Linked List\npublic class Solution {\n    public void flattenaMultilevelDoublyLinkedList() {\n    }\n}\n"
    }
},
  "Remove Zero Sum Consecutive Nodes from Linked List": {
    "description": "Implement an optimal solution for Remove Zero Sum Consecutive Nodes from Linked List (Linked List - LinkedList with Stack/HashMap) using proper algorithms and data structures.",
    "sampleInput": "head = [1, 2, -3, 3, 1]",
    "sampleOutput": "[3, 1]",
    "explanation": "[1, 2, -3] sums to 0, leaving [3, 1].",
    "testCases": [
        {
            "input": "head = [1, 2, 3, -3, 4]",
            "output": "[1, 2, 4]"
        },
        {
            "input": "head = [1, 2, 3, -3, -2]",
            "output": "[1]"
        },
        {
            "input": "head = [0]",
            "output": "[]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Remove Zero Sum Consecutive Nodes from Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void removeZeroSumConsecutiveNodesfromLinkedList() {\n        // Implementation for Remove Zero Sum Consecutive Nodes from Linked List\n    }\n};\n",
        "python": "# Problem: Remove Zero Sum Consecutive Nodes from Linked List\nclass Solution:\n    def removeZeroSumConsecutiveNodesfromLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Remove Zero Sum Consecutive Nodes from Linked List\n */\nfunction removeZeroSumConsecutiveNodesfromLinkedList() {\n}\n",
        "java": "// Problem: Remove Zero Sum Consecutive Nodes from Linked List\npublic class Solution {\n    public void removeZeroSumConsecutiveNodesfromLinkedList() {\n    }\n}\n"
    }
},
  "LRU Cache": {
    "description": "Implement an optimal solution for LRU Cache (Linked List - LinkedList with Stack/HashMap) using proper algorithms and data structures.",
    "sampleInput": "ops = [\"LRUCache\", \"put\", \"put\", \"get\", \"put\", \"get\", \"put\", \"get\", \"get\", \"get\"], params = [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]",
    "sampleOutput": "[null, null, null, 1, null, -1, null, -1, 3, 4]",
    "explanation": "Capacity 2 cache evicts key 2 when key 3 is added, and key 1 when key 4 is added.",
    "testCases": [
        {
            "input": "ops = [\"LRUCache\", \"put\", \"get\"], params = [[1], [2, 10], [2]]",
            "output": "[null, null, 10]"
        },
        {
            "input": "ops = [\"LRUCache\", \"get\"], params = [[1], [5]]",
            "output": "[null, -1]"
        },
        {
            "input": "ops = [\"LRUCache\", \"put\", \"put\", \"get\"], params = [[1], [1, 1], [1, 2], [1]]",
            "output": "[null, null, null, 2]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: LRU Cache\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void lRUCache() {\n        // Implementation for LRU Cache\n    }\n};\n",
        "python": "# Problem: LRU Cache\nclass Solution:\n    def lRUCache(self):\n        pass\n",
        "javascript": "/**\n * Problem: LRU Cache\n */\nfunction lRUCache() {\n}\n",
        "java": "// Problem: LRU Cache\npublic class Solution {\n    public void lRUCache() {\n    }\n}\n"
    }
},
  "Design Doubly Linked List": {
    "description": "Implement an optimal solution for Design Doubly Linked List (Double Linked List - Basic DLL Operations) using proper algorithms and data structures.",
    "sampleInput": "ops = [\"MyDLL\", \"addAtHead\", \"addAtTail\", \"get\"], params = [[], [10], [20], [1]]",
    "sampleOutput": "[null, null, null, 20]",
    "explanation": "Head added 10, tail added 20 -> list 10<->20. get(1) returns 20.",
    "testCases": [
        {
            "input": "ops = [\"MyDLL\", \"addAtHead\", \"deleteHead\", \"get\"], params = [[], [5], [], [0]]",
            "output": "[null, null, null, -1]"
        },
        {
            "input": "ops = [\"MyDLL\", \"addAtTail\", \"addAtTail\", \"get\"], params = [[], [1], [2], [0]]",
            "output": "[null, null, null, 1]"
        },
        {
            "input": "ops = [\"MyDLL\", \"addAtHead\", \"addAtTail\", \"deleteAtIndex\"], params = [[], [1], [2], [0]]",
            "output": "[null, null, null, null]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Design Doubly Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void designDoublyLinkedList() {\n        // Implementation for Design Doubly Linked List\n    }\n};\n",
        "python": "# Problem: Design Doubly Linked List\nclass Solution:\n    def designDoublyLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Design Doubly Linked List\n */\nfunction designDoublyLinkedList() {\n}\n",
        "java": "// Problem: Design Doubly Linked List\npublic class Solution {\n    public void designDoublyLinkedList() {\n    }\n}\n"
    }
},
  "Insert a node in Doubly Linked List": {
    "description": "Implement an optimal solution for Insert a node in Doubly Linked List (Double Linked List - Basic DLL Operations) using proper algorithms and data structures.",
    "sampleInput": "head = [2, 4, 5], pos = 2, data = 6",
    "sampleOutput": "[2, 4, 5, 6]",
    "explanation": "6 is inserted after 0-indexed position 2.",
    "testCases": [
        {
            "input": "head = [1, 2, 3, 4], pos = 0, data = 44",
            "output": "[1, 44, 2, 3, 4]"
        },
        {
            "input": "head = [10], pos = 0, data = 20",
            "output": "[10, 20]"
        },
        {
            "input": "head = [5, 15, 25], pos = 1, data = 99",
            "output": "[5, 15, 99, 25]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Insert a node in Doubly Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void insertanodeinDoublyLinkedList() {\n        // Implementation for Insert a node in Doubly Linked List\n    }\n};\n",
        "python": "# Problem: Insert a node in Doubly Linked List\nclass Solution:\n    def insertanodeinDoublyLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Insert a node in Doubly Linked List\n */\nfunction insertanodeinDoublyLinkedList() {\n}\n",
        "java": "// Problem: Insert a node in Doubly Linked List\npublic class Solution {\n    public void insertanodeinDoublyLinkedList() {\n    }\n}\n"
    }
},
  "Delete node in Doubly Linked List": {
    "description": "Implement an optimal solution for Delete node in Doubly Linked List (Double Linked List - Basic DLL Operations) using proper algorithms and data structures.",
    "sampleInput": "head = [1, 5, 2, 9], x = 2",
    "sampleOutput": "[1, 2, 9]",
    "explanation": "1-indexed 2nd node (val 5) is removed.",
    "testCases": [
        {
            "input": "head = [1, 3, 4], x = 3",
            "output": "[1, 3]"
        },
        {
            "input": "head = [10, 20], x = 1",
            "output": "[20]"
        },
        {
            "input": "head = [2, 4, 6, 8], x = 2",
            "output": "[2, 6, 8]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Delete node in Doubly Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void deletenodeinDoublyLinkedList() {\n        // Implementation for Delete node in Doubly Linked List\n    }\n};\n",
        "python": "# Problem: Delete node in Doubly Linked List\nclass Solution:\n    def deletenodeinDoublyLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Delete node in Doubly Linked List\n */\nfunction deletenodeinDoublyLinkedList() {\n}\n",
        "java": "// Problem: Delete node in Doubly Linked List\npublic class Solution {\n    public void deletenodeinDoublyLinkedList() {\n    }\n}\n"
    }
},
  "Reverse a Doubly Linked List": {
    "description": "Implement an optimal solution for Reverse a Doubly Linked List (Double Linked List - Basic DLL Operations) using proper algorithms and data structures.",
    "sampleInput": "head = [3, 4, 5]",
    "sampleOutput": "[5, 4, 3]",
    "explanation": "All next and prev pointers swapped.",
    "testCases": [
        {
            "input": "head = [75, 122, 59]",
            "output": "[59, 122, 75]"
        },
        {
            "input": "head = [1]",
            "output": "[1]"
        },
        {
            "input": "head = [1, 2, 3, 4, 5, 6]",
            "output": "[6, 5, 4, 3, 2, 1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Reverse a Doubly Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reverseaDoublyLinkedList() {\n        // Implementation for Reverse a Doubly Linked List\n    }\n};\n",
        "python": "# Problem: Reverse a Doubly Linked List\nclass Solution:\n    def reverseaDoublyLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Reverse a Doubly Linked List\n */\nfunction reverseaDoublyLinkedList() {\n}\n",
        "java": "// Problem: Reverse a Doubly Linked List\npublic class Solution {\n    public void reverseaDoublyLinkedList() {\n    }\n}\n"
    }
},
  "Find pairs with given sum in DLL": {
    "description": "Implement an optimal solution for Find pairs with given sum in DLL (Double Linked List - Basic DLL Operations) using proper algorithms and data structures.",
    "sampleInput": "head = [1, 2, 4, 5, 6, 8, 9], target = 7",
    "sampleOutput": "[(1, 6), (2, 5)]",
    "explanation": "Sorted DLL allowed two-pointer search from head and tail.",
    "testCases": [
        {
            "input": "head = [1, 5, 6], target = 6",
            "output": "[(1, 5)]"
        },
        {
            "input": "head = [1, 2, 3, 4, 5], target = 10",
            "output": "[]"
        },
        {
            "input": "head = [-3, -1, 0, 2, 5], target = 2",
            "output": "[(-3, 5), (0, 2)]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Find pairs with given sum in DLL\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void findpairswithgivensuminDLL() {\n        // Implementation for Find pairs with given sum in DLL\n    }\n};\n",
        "python": "# Problem: Find pairs with given sum in DLL\nclass Solution:\n    def findpairswithgivensuminDLL(self):\n        pass\n",
        "javascript": "/**\n * Problem: Find pairs with given sum in DLL\n */\nfunction findpairswithgivensuminDLL() {\n}\n",
        "java": "// Problem: Find pairs with given sum in DLL\npublic class Solution {\n    public void findpairswithgivensuminDLL() {\n    }\n}\n"
    }
},
  "Remove duplicates from sorted DLL": {
    "description": "Implement an optimal solution for Remove duplicates from sorted DLL (Double Linked List - Basic DLL Operations) using proper algorithms and data structures.",
    "sampleInput": "head = [1, 1, 1, 2, 3, 4, 4]",
    "sampleOutput": "[1, 2, 3, 4]",
    "explanation": "Duplicate nodes removed in-place.",
    "testCases": [
        {
            "input": "head = [1, 2, 2, 2, 3]",
            "output": "[1, 2, 3]"
        },
        {
            "input": "head = [5, 5, 5]",
            "output": "[5]"
        },
        {
            "input": "head = [1, 2, 3, 4]",
            "output": "[1, 2, 3, 4]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Remove duplicates from sorted DLL\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void removeduplicatesfromsortedDLL() {\n        // Implementation for Remove duplicates from sorted DLL\n    }\n};\n",
        "python": "# Problem: Remove duplicates from sorted DLL\nclass Solution:\n    def removeduplicatesfromsortedDLL(self):\n        pass\n",
        "javascript": "/**\n * Problem: Remove duplicates from sorted DLL\n */\nfunction removeduplicatesfromsortedDLL() {\n}\n",
        "java": "// Problem: Remove duplicates from sorted DLL\npublic class Solution {\n    public void removeduplicatesfromsortedDLL() {\n    }\n}\n"
    }
},
  "Merge Sort on Doubly Linked List": {
    "description": "Implement an optimal solution for Merge Sort on Doubly Linked List (Double Linked List - Merge / Sort / Reorder) using proper algorithms and data structures.",
    "sampleInput": "head = [7, 3, 5, 1, 9]",
    "sampleOutput": "[1, 3, 5, 7, 9]",
    "explanation": "Doubly linked list sorted using split and merge.",
    "testCases": [
        {
            "input": "head = [10, 4, -2, 8]",
            "output": "[-2, 4, 8, 10]"
        },
        {
            "input": "head = [1]",
            "output": "[1]"
        },
        {
            "input": "head = [4, 3, 2, 1]",
            "output": "[1, 2, 3, 4]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Merge Sort on Doubly Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void mergeSortonDoublyLinkedList() {\n        // Implementation for Merge Sort on Doubly Linked List\n    }\n};\n",
        "python": "# Problem: Merge Sort on Doubly Linked List\nclass Solution:\n    def mergeSortonDoublyLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Merge Sort on Doubly Linked List\n */\nfunction mergeSortonDoublyLinkedList() {\n}\n",
        "java": "// Problem: Merge Sort on Doubly Linked List\npublic class Solution {\n    public void mergeSortonDoublyLinkedList() {\n    }\n}\n"
    }
},
  "Flattening a Linked List": {
    "description": "Implement an optimal solution for Flattening a Linked List (Double Linked List - Merge / Sort / Reorder) using proper algorithms and data structures.",
    "sampleInput": "head = [5 -> 10 -> 19 -> 28, bottom of 5: [7, 8, 30], bottom of 10: [20], bottom of 19: [22, 50], bottom of 28: [35, 40, 45]]",
    "sampleOutput": "[5, 7, 8, 10, 19, 20, 22, 28, 30, 35, 40, 45, 50]",
    "explanation": "Sub-lists merged downwards into a single sorted vertical chain.",
    "testCases": [
        {
            "input": "head = [5 -> 10, bottom of 5: [1], bottom of 10: [2]]",
            "output": "[1, 2, 5, 10]"
        },
        {
            "input": "head = [3 -> 6, bottom of 3: [9]]",
            "output": "[3, 6, 9]"
        },
        {
            "input": "head = [1]",
            "output": "[1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Flattening a Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void flatteningaLinkedList() {\n        // Implementation for Flattening a Linked List\n    }\n};\n",
        "python": "# Problem: Flattening a Linked List\nclass Solution:\n    def flatteningaLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Flattening a Linked List\n */\nfunction flatteningaLinkedList() {\n}\n",
        "java": "// Problem: Flattening a Linked List\npublic class Solution {\n    public void flatteningaLinkedList() {\n    }\n}\n"
    }
},
  "Sort a k-sorted Doubly Linked List": {
    "description": "Implement an optimal solution for Sort a k-sorted Doubly Linked List (Double Linked List - Merge / Sort / Reorder) using proper algorithms and data structures.",
    "sampleInput": "head = [3, 6, 2, 12, 56, 8], k = 2",
    "sampleOutput": "[2, 3, 6, 8, 12, 56]",
    "explanation": "Min-heap of size k+1 used to sort k-sorted DLL in O(n log k) time.",
    "testCases": [
        {
            "input": "head = [2, 6, 3, 12, 56, 8], k = 3",
            "output": "[2, 3, 6, 8, 12, 56]"
        },
        {
            "input": "head = [1, 2, 3], k = 1",
            "output": "[1, 2, 3]"
        },
        {
            "input": "head = [5, 4, 3, 2, 1], k = 4",
            "output": "[1, 2, 3, 4, 5]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Sort a k-sorted Doubly Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void sortaksortedDoublyLinkedList() {\n        // Implementation for Sort a k-sorted Doubly Linked List\n    }\n};\n",
        "python": "# Problem: Sort a k-sorted Doubly Linked List\nclass Solution:\n    def sortaksortedDoublyLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Sort a k-sorted Doubly Linked List\n */\nfunction sortaksortedDoublyLinkedList() {\n}\n",
        "java": "// Problem: Sort a k-sorted Doubly Linked List\npublic class Solution {\n    public void sortaksortedDoublyLinkedList() {\n    }\n}\n"
    }
},
  "Binary Tree Preorder Traversal": {
    "description": "Implement an optimal solution for Binary Tree Preorder Traversal (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "root = [1, null, 2, 3]",
    "sampleOutput": "[1, 2, 3]",
    "explanation": "Preorder traversal (Root -> Left -> Right): 1 -> 2 -> 3.",
    "testCases": [
        {
            "input": "root = []",
            "output": "[]"
        },
        {
            "input": "root = [1]",
            "output": "[1]"
        },
        {
            "input": "root = [1, 4, 3, 2]",
            "output": "[1, 4, 2, 3]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Binary Tree Preorder Traversal\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void binaryTreePreorderTraversal() {\n        // Implementation for Binary Tree Preorder Traversal\n    }\n};\n",
        "python": "# Problem: Binary Tree Preorder Traversal\nclass Solution:\n    def binaryTreePreorderTraversal(self):\n        pass\n",
        "javascript": "/**\n * Problem: Binary Tree Preorder Traversal\n */\nfunction binaryTreePreorderTraversal() {\n}\n",
        "java": "// Problem: Binary Tree Preorder Traversal\npublic class Solution {\n    public void binaryTreePreorderTraversal() {\n    }\n}\n"
    }
},
  "Binary Tree Inorder Traversal": {
    "description": "Implement an optimal solution for Binary Tree Inorder Traversal (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "root = [4, 2, 6, 1, 3, 5, 7]",
    "sampleOutput": "[1, 2, 3, 4, 5, 6, 7]",
    "explanation": "Inorder traversal (Left -> Root -> Right): 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7.",
    "testCases": [
        {
            "input": "root = []",
            "output": "[]"
        },
        {
            "input": "root = [1]",
            "output": "[1]"
        },
        {
            "input": "root = [2, 1, 3]",
            "output": "[1, 2, 3]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Binary Tree Inorder Traversal\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void binaryTreeInorderTraversal() {\n        // Implementation for Binary Tree Inorder Traversal\n    }\n};\n",
        "python": "# Problem: Binary Tree Inorder Traversal\nclass Solution:\n    def binaryTreeInorderTraversal(self):\n        pass\n",
        "javascript": "/**\n * Problem: Binary Tree Inorder Traversal\n */\nfunction binaryTreeInorderTraversal() {\n}\n",
        "java": "// Problem: Binary Tree Inorder Traversal\npublic class Solution {\n    public void binaryTreeInorderTraversal() {\n    }\n}\n"
    }
},
  "Binary Tree Postorder Traversal": {
    "description": "Implement an optimal solution for Binary Tree Postorder Traversal (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "root = [1, null, 2, 4, null, 3]",
    "sampleOutput": "[3, 4, 2, 1]",
    "explanation": "Postorder traversal (Left -> Right -> Root): 3 -> 4 -> 2 -> 1.",
    "testCases": [
        {
            "input": "root = []",
            "output": "[]"
        },
        {
            "input": "root = [1]",
            "output": "[1]"
        },
        {
            "input": "root = [1, 2, 3, 4, 5]",
            "output": "[4, 5, 2, 3, 1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Binary Tree Postorder Traversal\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void binaryTreePostorderTraversal() {\n        // Implementation for Binary Tree Postorder Traversal\n    }\n};\n",
        "python": "# Problem: Binary Tree Postorder Traversal\nclass Solution:\n    def binaryTreePostorderTraversal(self):\n        pass\n",
        "javascript": "/**\n * Problem: Binary Tree Postorder Traversal\n */\nfunction binaryTreePostorderTraversal() {\n}\n",
        "java": "// Problem: Binary Tree Postorder Traversal\npublic class Solution {\n    public void binaryTreePostorderTraversal() {\n    }\n}\n"
    }
},
  "Maximum Depth of Binary Tree": {
    "description": "Implement an optimal solution for Maximum Depth of Binary Tree (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "root = [3, 9, 20, null, null, 15, 7]",
    "sampleOutput": "3",
    "explanation": "Longest root-to-leaf path is 3->20->15 (depth 3).",
    "testCases": [
        {
            "input": "root = [1, null, 2]",
            "output": "2"
        },
        {
            "input": "root = []",
            "output": "0"
        },
        {
            "input": "root = [0]",
            "output": "1"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Maximum Depth of Binary Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void maximumDepthofBinaryTree() {\n        // Implementation for Maximum Depth of Binary Tree\n    }\n};\n",
        "python": "# Problem: Maximum Depth of Binary Tree\nclass Solution:\n    def maximumDepthofBinaryTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Maximum Depth of Binary Tree\n */\nfunction maximumDepthofBinaryTree() {\n}\n",
        "java": "// Problem: Maximum Depth of Binary Tree\npublic class Solution {\n    public void maximumDepthofBinaryTree() {\n    }\n}\n"
    }
},
  "Minimum Depth of Binary Tree": {
    "description": "Implement an optimal solution for Minimum Depth of Binary Tree (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "root = [2, null, 3, null, 4, null, 5, null, 6]",
    "sampleOutput": "5",
    "explanation": "Shortest root-to-leaf path in right-skewed tree is depth 5.",
    "testCases": [
        {
            "input": "root = [3, 9, 20, null, null, 15, 7]",
            "output": "2"
        },
        {
            "input": "root = []",
            "output": "0"
        },
        {
            "input": "root = [1, 2]",
            "output": "2"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Minimum Depth of Binary Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void minimumDepthofBinaryTree() {\n        // Implementation for Minimum Depth of Binary Tree\n    }\n};\n",
        "python": "# Problem: Minimum Depth of Binary Tree\nclass Solution:\n    def minimumDepthofBinaryTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Minimum Depth of Binary Tree\n */\nfunction minimumDepthofBinaryTree() {\n}\n",
        "java": "// Problem: Minimum Depth of Binary Tree\npublic class Solution {\n    public void minimumDepthofBinaryTree() {\n    }\n}\n"
    }
},
  "Balanced Binary Tree": {
    "description": "Implement an optimal solution for Balanced Binary Tree (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "root = [1, 2, 2, 3, 3, null, null, 4, 4]",
    "sampleOutput": "false",
    "explanation": "Subtree rooted at node 2 has height difference > 1.",
    "testCases": [
        {
            "input": "root = [3, 9, 20, null, null, 15, 7]",
            "output": "true"
        },
        {
            "input": "root = []",
            "output": "true"
        },
        {
            "input": "root = [1, 2, null, 3]",
            "output": "false"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Balanced Binary Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void balancedBinaryTree() {\n        // Implementation for Balanced Binary Tree\n    }\n};\n",
        "python": "# Problem: Balanced Binary Tree\nclass Solution:\n    def balancedBinaryTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Balanced Binary Tree\n */\nfunction balancedBinaryTree() {\n}\n",
        "java": "// Problem: Balanced Binary Tree\npublic class Solution {\n    public void balancedBinaryTree() {\n    }\n}\n"
    }
},
  "Diameter of Binary Tree": {
    "description": "Implement an optimal solution for Diameter of Binary Tree (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "root = [1, 2, 3, 4, 5]",
    "sampleOutput": "3",
    "explanation": "Length of path [4, 2, 1, 3] or [5, 2, 1, 3] is 3 edges.",
    "testCases": [
        {
            "input": "root = [1, 2]",
            "output": "1"
        },
        {
            "input": "root = [1]",
            "output": "0"
        },
        {
            "input": "root = [4, -7, -3, null, null, -9, -3, 9, -7, -4, null, 6, null, -6, -6, null, null, 0, 6, 5, null, 9, null, null, -1, -4, null, null, null, -2]",
            "output": "8"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Diameter of Binary Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void diameterofBinaryTree() {\n        // Implementation for Diameter of Binary Tree\n    }\n};\n",
        "python": "# Problem: Diameter of Binary Tree\nclass Solution:\n    def diameterofBinaryTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Diameter of Binary Tree\n */\nfunction diameterofBinaryTree() {\n}\n",
        "java": "// Problem: Diameter of Binary Tree\npublic class Solution {\n    public void diameterofBinaryTree() {\n    }\n}\n"
    }
},
  "Same Tree": {
    "description": "Implement an optimal solution for Same Tree (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "p = [1, 2, 3], q = [1, 2, 3]",
    "sampleOutput": "true",
    "explanation": "Both trees are structurally identical and have the same node values.",
    "testCases": [
        {
            "input": "p = [1, 2], q = [1, null, 2]",
            "output": "false"
        },
        {
            "input": "p = [1, 2, 1], q = [1, 1, 2]",
            "output": "false"
        },
        {
            "input": "p = [], q = []",
            "output": "true"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Same Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void sameTree() {\n        // Implementation for Same Tree\n    }\n};\n",
        "python": "# Problem: Same Tree\nclass Solution:\n    def sameTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Same Tree\n */\nfunction sameTree() {\n}\n",
        "java": "// Problem: Same Tree\npublic class Solution {\n    public void sameTree() {\n    }\n}\n"
    }
},
  "Symmetric Tree": {
    "description": "Implement an optimal solution for Symmetric Tree (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "root = [1, 2, 2, 3, 4, 4, 3]",
    "sampleOutput": "true",
    "explanation": "Left subtree is the mirror image of the right subtree.",
    "testCases": [
        {
            "input": "root = [1, 2, 2, null, 3, null, 3]",
            "output": "false"
        },
        {
            "input": "root = [1]",
            "output": "true"
        },
        {
            "input": "root = [1, 2, 2, 3, null, null, 3]",
            "output": "true"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Symmetric Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void symmetricTree() {\n        // Implementation for Symmetric Tree\n    }\n};\n",
        "python": "# Problem: Symmetric Tree\nclass Solution:\n    def symmetricTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Symmetric Tree\n */\nfunction symmetricTree() {\n}\n",
        "java": "// Problem: Symmetric Tree\npublic class Solution {\n    public void symmetricTree() {\n    }\n}\n"
    }
},
  "Path Sum": {
    "description": "Implement an optimal solution for Path Sum (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], targetSum = 22",
    "sampleOutput": "true",
    "explanation": "Path 5->4->11->2 sums to 22.",
    "testCases": [
        {
            "input": "root = [1, 2, 3], targetSum = 5",
            "output": "false"
        },
        {
            "input": "root = [], targetSum = 0",
            "output": "false"
        },
        {
            "input": "root = [1, 2], targetSum = 1",
            "output": "false"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Path Sum\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void pathSum() {\n        // Implementation for Path Sum\n    }\n};\n",
        "python": "# Problem: Path Sum\nclass Solution:\n    def pathSum(self):\n        pass\n",
        "javascript": "/**\n * Problem: Path Sum\n */\nfunction pathSum() {\n}\n",
        "java": "// Problem: Path Sum\npublic class Solution {\n    public void pathSum() {\n    }\n}\n"
    }
},
  "Path Sum II": {
    "description": "Implement an optimal solution for Path Sum II (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], targetSum = 22",
    "sampleOutput": "[[5, 4, 11, 2], [5, 8, 4, 5]]",
    "explanation": "Two root-to-leaf paths sum to 22.",
    "testCases": [
        {
            "input": "root = [1, 2, 3], targetSum = 5",
            "output": "[]"
        },
        {
            "input": "root = [1, 2], targetSum = 0",
            "output": "[]"
        },
        {
            "input": "root = [7, 0, 0], targetSum = 7",
            "output": "[[7, 0], [7, 0]]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Path Sum II\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void pathSumII() {\n        // Implementation for Path Sum II\n    }\n};\n",
        "python": "# Problem: Path Sum II\nclass Solution:\n    def pathSumII(self):\n        pass\n",
        "javascript": "/**\n * Problem: Path Sum II\n */\nfunction pathSumII() {\n}\n",
        "java": "// Problem: Path Sum II\npublic class Solution {\n    public void pathSumII() {\n    }\n}\n"
    }
},
  "Path Sum III": {
    "description": "Implement an optimal solution for Path Sum III (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "root = [10, 5, -3, 3, 2, null, 11, 3, -2, null, 1], targetSum = 8",
    "sampleOutput": "3",
    "explanation": "Three paths sum to 8: [5,3], [5,2,1], [-3,11].",
    "testCases": [
        {
            "input": "root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], targetSum = 22",
            "output": "3"
        },
        {
            "input": "root = [1], targetSum = 0",
            "output": "0"
        },
        {
            "input": "root = [1, -2, -3], targetSum = -1",
            "output": "1"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Path Sum III\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void pathSumIII() {\n        // Implementation for Path Sum III\n    }\n};\n",
        "python": "# Problem: Path Sum III\nclass Solution:\n    def pathSumIII(self):\n        pass\n",
        "javascript": "/**\n * Problem: Path Sum III\n */\nfunction pathSumIII() {\n}\n",
        "java": "// Problem: Path Sum III\npublic class Solution {\n    public void pathSumIII() {\n    }\n}\n"
    }
},
  "Binary Tree Maximum Path Sum": {
    "description": "Implement an optimal solution for Binary Tree Maximum Path Sum (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "root = [-10, 9, 20, null, null, 15, 7]",
    "sampleOutput": "42",
    "explanation": "Maximum path is 15 -> 20 -> 7 with sum 15 + 20 + 7 = 42.",
    "testCases": [
        {
            "input": "root = [1, 2, 3]",
            "output": "6"
        },
        {
            "input": "root = [-3]",
            "output": "-3"
        },
        {
            "input": "root = [2, -1, -2]",
            "output": "2"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Binary Tree Maximum Path Sum\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void binaryTreeMaximumPathSum() {\n        // Implementation for Binary Tree Maximum Path Sum\n    }\n};\n",
        "python": "# Problem: Binary Tree Maximum Path Sum\nclass Solution:\n    def binaryTreeMaximumPathSum(self):\n        pass\n",
        "javascript": "/**\n * Problem: Binary Tree Maximum Path Sum\n */\nfunction binaryTreeMaximumPathSum() {\n}\n",
        "java": "// Problem: Binary Tree Maximum Path Sum\npublic class Solution {\n    public void binaryTreeMaximumPathSum() {\n    }\n}\n"
    }
},
  "Sum Root to Leaf Numbers": {
    "description": "Implement an optimal solution for Sum Root to Leaf Numbers (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "root = [1, 2, 3]",
    "sampleOutput": "25",
    "explanation": "Path 1->2 represents 12, path 1->3 represents 13. Sum = 12 + 13 = 25.",
    "testCases": [
        {
            "input": "root = [4, 9, 0, 5, 1]",
            "output": "1026"
        },
        {
            "input": "root = [0, 1]",
            "output": "1"
        },
        {
            "input": "root = [9]",
            "output": "9"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Sum Root to Leaf Numbers\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void sumRoottoLeafNumbers() {\n        // Implementation for Sum Root to Leaf Numbers\n    }\n};\n",
        "python": "# Problem: Sum Root to Leaf Numbers\nclass Solution:\n    def sumRoottoLeafNumbers(self):\n        pass\n",
        "javascript": "/**\n * Problem: Sum Root to Leaf Numbers\n */\nfunction sumRoottoLeafNumbers() {\n}\n",
        "java": "// Problem: Sum Root to Leaf Numbers\npublic class Solution {\n    public void sumRoottoLeafNumbers() {\n    }\n}\n"
    }
},
  "Count Good Nodes in Binary Tree": {
    "description": "Implement an optimal solution for Count Good Nodes in Binary Tree (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "root = [3, 1, 4, 3, null, 1, 5]",
    "sampleOutput": "4",
    "explanation": "Good nodes: Root (3), Node 4, Node 5, Node 3 (path 3->1->3). Total = 4.",
    "testCases": [
        {
            "input": "root = [3, 3, null, 4, 2]",
            "output": "3"
        },
        {
            "input": "root = [1]",
            "output": "1"
        },
        {
            "input": "root = [2, null, 4, 10, 8, null, null, 4]",
            "output": "4"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Count Good Nodes in Binary Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void countGoodNodesinBinaryTree() {\n        // Implementation for Count Good Nodes in Binary Tree\n    }\n};\n",
        "python": "# Problem: Count Good Nodes in Binary Tree\nclass Solution:\n    def countGoodNodesinBinaryTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Count Good Nodes in Binary Tree\n */\nfunction countGoodNodesinBinaryTree() {\n}\n",
        "java": "// Problem: Count Good Nodes in Binary Tree\npublic class Solution {\n    public void countGoodNodesinBinaryTree() {\n    }\n}\n"
    }
},
  "Subtree of Another Tree": {
    "description": "Implement an optimal solution for Subtree of Another Tree (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "root = [3, 4, 5, 1, 2], subRoot = [4, 1, 2]",
    "sampleOutput": "true",
    "explanation": "subRoot is identical to the left subtree of root.",
    "testCases": [
        {
            "input": "root = [3, 4, 5, 1, 2, null, null, null, null, 0], subRoot = [4, 1, 2]",
            "output": "false"
        },
        {
            "input": "root = [1, 1], subRoot = [1]",
            "output": "true"
        },
        {
            "input": "root = [1], subRoot = [1]",
            "output": "true"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Subtree of Another Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void subtreeofAnotherTree() {\n        // Implementation for Subtree of Another Tree\n    }\n};\n",
        "python": "# Problem: Subtree of Another Tree\nclass Solution:\n    def subtreeofAnotherTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Subtree of Another Tree\n */\nfunction subtreeofAnotherTree() {\n}\n",
        "java": "// Problem: Subtree of Another Tree\npublic class Solution {\n    public void subtreeofAnotherTree() {\n    }\n}\n"
    }
},
  "Invert Binary Tree": {
    "description": "Implement an optimal solution for Invert Binary Tree (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "root = [4, 2, 7, 1, 3, 6, 9]",
    "sampleOutput": "[4, 7, 2, 9, 6, 3, 1]",
    "explanation": "Left and right children are swapped recursively.",
    "testCases": [
        {
            "input": "root = [2, 1, 3]",
            "output": "[2, 3, 1]"
        },
        {
            "input": "root = []",
            "output": "[]"
        },
        {
            "input": "root = [1, 2]",
            "output": "[1, null, 2]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Invert Binary Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void invertBinaryTree() {\n        // Implementation for Invert Binary Tree\n    }\n};\n",
        "python": "# Problem: Invert Binary Tree\nclass Solution:\n    def invertBinaryTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Invert Binary Tree\n */\nfunction invertBinaryTree() {\n}\n",
        "java": "// Problem: Invert Binary Tree\npublic class Solution {\n    public void invertBinaryTree() {\n    }\n}\n"
    }
},
  "House Robber III": {
    "description": "Implement an optimal solution for House Robber III (Binary Tree - DFS Traversals) using proper algorithms and data structures.",
    "sampleInput": "root = [3, 2, 3, null, 3, null, 1]",
    "sampleOutput": "7",
    "explanation": "Rob node 3 + 3 + 1 = 7.",
    "testCases": [
        {
            "input": "root = [3, 4, 5, 1, 3, null, 1]",
            "output": "9"
        },
        {
            "input": "root = [4, 1, null, 2, null, 3]",
            "output": "7"
        },
        {
            "input": "root = [5]",
            "output": "5"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: House Robber III\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void houseRobberIII() {\n        // Implementation for House Robber III\n    }\n};\n",
        "python": "# Problem: House Robber III\nclass Solution:\n    def houseRobberIII(self):\n        pass\n",
        "javascript": "/**\n * Problem: House Robber III\n */\nfunction houseRobberIII() {\n}\n",
        "java": "// Problem: House Robber III\npublic class Solution {\n    public void houseRobberIII() {\n    }\n}\n"
    }
},
  "Binary Tree Level Order Traversal": {
    "description": "Implement an optimal solution for Binary Tree Level Order Traversal (Binary Tree - BFS / Level-Order) using proper algorithms and data structures.",
    "sampleInput": "root = [10, 20, 30, 40, 50]",
    "sampleOutput": "[[10], [20, 30], [40, 50]]",
    "explanation": "Level order values grouped level by level.",
    "testCases": [
        {
            "input": "root = [1]",
            "output": "[[1]]"
        },
        {
            "input": "root = []",
            "output": "[]"
        },
        {
            "input": "root = [3, 9, 20, null, null, 15, 7]",
            "output": "[[3], [9, 20], [15, 7]]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Binary Tree Level Order Traversal\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void binaryTreeLevelOrderTraversal() {\n        // Implementation for Binary Tree Level Order Traversal\n    }\n};\n",
        "python": "# Problem: Binary Tree Level Order Traversal\nclass Solution:\n    def binaryTreeLevelOrderTraversal(self):\n        pass\n",
        "javascript": "/**\n * Problem: Binary Tree Level Order Traversal\n */\nfunction binaryTreeLevelOrderTraversal() {\n}\n",
        "java": "// Problem: Binary Tree Level Order Traversal\npublic class Solution {\n    public void binaryTreeLevelOrderTraversal() {\n    }\n}\n"
    }
},
  "Binary Tree Level Order Traversal II": {
    "description": "Implement an optimal solution for Binary Tree Level Order Traversal II (Binary Tree - BFS / Level-Order) using proper algorithms and data structures.",
    "sampleInput": "root = [5, 3, 8, 1, 4, 7, 9]",
    "sampleOutput": "[[1, 4, 7, 9], [3, 8], [5]]",
    "explanation": "Bottom-up level order traversal.",
    "testCases": [
        {
            "input": "root = [1]",
            "output": "[[1]]"
        },
        {
            "input": "root = []",
            "output": "[]"
        },
        {
            "input": "root = [1, 2, 3]",
            "output": "[[2, 3], [1]]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Binary Tree Level Order Traversal II\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void binaryTreeLevelOrderTraversalII() {\n        // Implementation for Binary Tree Level Order Traversal II\n    }\n};\n",
        "python": "# Problem: Binary Tree Level Order Traversal II\nclass Solution:\n    def binaryTreeLevelOrderTraversalII(self):\n        pass\n",
        "javascript": "/**\n * Problem: Binary Tree Level Order Traversal II\n */\nfunction binaryTreeLevelOrderTraversalII() {\n}\n",
        "java": "// Problem: Binary Tree Level Order Traversal II\npublic class Solution {\n    public void binaryTreeLevelOrderTraversalII() {\n    }\n}\n"
    }
},
  "Binary Tree Zigzag Level Order Traversal": {
    "description": "Implement an optimal solution for Binary Tree Zigzag Level Order Traversal (Binary Tree - BFS / Level-Order) using proper algorithms and data structures.",
    "sampleInput": "root = [10, 6, 15, 3, 8, 12, 18]",
    "sampleOutput": "[[10], [15, 6], [3, 8, 12, 18]]",
    "explanation": "Level 0 L-to-R [10], Level 1 R-to-L [15, 6], Level 2 L-to-R [3, 8, 12, 18].",
    "testCases": [
        {
            "input": "root = [1]",
            "output": "[[1]]"
        },
        {
            "input": "root = []",
            "output": "[]"
        },
        {
            "input": "root = [3, 9, 20, null, null, 15, 7]",
            "output": "[[3], [20, 9], [15, 7]]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Binary Tree Zigzag Level Order Traversal\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void binaryTreeZigzagLevelOrderTraversal() {\n        // Implementation for Binary Tree Zigzag Level Order Traversal\n    }\n};\n",
        "python": "# Problem: Binary Tree Zigzag Level Order Traversal\nclass Solution:\n    def binaryTreeZigzagLevelOrderTraversal(self):\n        pass\n",
        "javascript": "/**\n * Problem: Binary Tree Zigzag Level Order Traversal\n */\nfunction binaryTreeZigzagLevelOrderTraversal() {\n}\n",
        "java": "// Problem: Binary Tree Zigzag Level Order Traversal\npublic class Solution {\n    public void binaryTreeZigzagLevelOrderTraversal() {\n    }\n}\n"
    }
},
  "Binary Tree Right Side View": {
    "description": "Implement an optimal solution for Binary Tree Right Side View (Binary Tree - BFS / Level-Order) using proper algorithms and data structures.",
    "sampleInput": "root = [1, 2, 3, null, 5, null, 4]",
    "sampleOutput": "[1, 3, 4]",
    "explanation": "Visible nodes from right side top-to-bottom.",
    "testCases": [
        {
            "input": "root = [1, null, 3]",
            "output": "[1, 3]"
        },
        {
            "input": "root = []",
            "output": "[]"
        },
        {
            "input": "root = [1, 2, 3, 4]",
            "output": "[1, 3, 4]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Binary Tree Right Side View\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void binaryTreeRightSideView() {\n        // Implementation for Binary Tree Right Side View\n    }\n};\n",
        "python": "# Problem: Binary Tree Right Side View\nclass Solution:\n    def binaryTreeRightSideView(self):\n        pass\n",
        "javascript": "/**\n * Problem: Binary Tree Right Side View\n */\nfunction binaryTreeRightSideView() {\n}\n",
        "java": "// Problem: Binary Tree Right Side View\npublic class Solution {\n    public void binaryTreeRightSideView() {\n    }\n}\n"
    }
},
  "Binary Tree Left Side View": {
    "description": "Implement an optimal solution for Binary Tree Left Side View (Binary Tree - BFS / Level-Order) using proper algorithms and data structures.",
    "sampleInput": "root = [1, 2, 3, 4, 5, null, 6]",
    "sampleOutput": "[1, 2, 4]",
    "explanation": "Visible nodes from left side top-to-bottom.",
    "testCases": [
        {
            "input": "root = [1, 2, 3, null, 5, 6]",
            "output": "[1, 2, 5]"
        },
        {
            "input": "root = [10]",
            "output": "[10]"
        },
        {
            "input": "root = []",
            "output": "[]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Binary Tree Left Side View\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void binaryTreeLeftSideView() {\n        // Implementation for Binary Tree Left Side View\n    }\n};\n",
        "python": "# Problem: Binary Tree Left Side View\nclass Solution:\n    def binaryTreeLeftSideView(self):\n        pass\n",
        "javascript": "/**\n * Problem: Binary Tree Left Side View\n */\nfunction binaryTreeLeftSideView() {\n}\n",
        "java": "// Problem: Binary Tree Left Side View\npublic class Solution {\n    public void binaryTreeLeftSideView() {\n    }\n}\n"
    }
},
  "Average of Levels in Binary Tree": {
    "description": "Implement an optimal solution for Average of Levels in Binary Tree (Binary Tree - BFS / Level-Order) using proper algorithms and data structures.",
    "sampleInput": "root = [3, 9, 20, 15, 7]",
    "sampleOutput": "[3.00000, 14.50000, 11.00000]",
    "explanation": "Level 0 avg = 3, level 1 avg = (9+20)/2 = 14.5, level 2 avg = (15+7)/2 = 11.",
    "testCases": [
        {
            "input": "root = [3, 9, 20, null, null, 15, 7]",
            "output": "[3.00000, 14.50000, 11.00000]"
        },
        {
            "input": "root = [10]",
            "output": "[10.00000]"
        },
        {
            "input": "root = [1, 2, 3, 4, 5, 6, 7]",
            "output": "[1.00000, 2.50000, 5.50000]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Average of Levels in Binary Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void averageofLevelsinBinaryTree() {\n        // Implementation for Average of Levels in Binary Tree\n    }\n};\n",
        "python": "# Problem: Average of Levels in Binary Tree\nclass Solution:\n    def averageofLevelsinBinaryTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Average of Levels in Binary Tree\n */\nfunction averageofLevelsinBinaryTree() {\n}\n",
        "java": "// Problem: Average of Levels in Binary Tree\npublic class Solution {\n    public void averageofLevelsinBinaryTree() {\n    }\n}\n"
    }
},
  "Find Largest Value in Each Tree Row": {
    "description": "Implement an optimal solution for Find Largest Value in Each Tree Row (Binary Tree - BFS / Level-Order) using proper algorithms and data structures.",
    "sampleInput": "root = [1, 3, 2, 5, 3, null, 9]",
    "sampleOutput": "[1, 3, 9]",
    "explanation": "Maximum value in level 0 is 1, level 1 is 3, level 2 is 9.",
    "testCases": [
        {
            "input": "root = [1, 2, 3]",
            "output": "[1, 3]"
        },
        {
            "input": "root = [1]",
            "output": "[1]"
        },
        {
            "input": "root = [-1, -2, -3]",
            "output": "[-1, -2]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Find Largest Value in Each Tree Row\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void findLargestValueinEachTreeRow() {\n        // Implementation for Find Largest Value in Each Tree Row\n    }\n};\n",
        "python": "# Problem: Find Largest Value in Each Tree Row\nclass Solution:\n    def findLargestValueinEachTreeRow(self):\n        pass\n",
        "javascript": "/**\n * Problem: Find Largest Value in Each Tree Row\n */\nfunction findLargestValueinEachTreeRow() {\n}\n",
        "java": "// Problem: Find Largest Value in Each Tree Row\npublic class Solution {\n    public void findLargestValueinEachTreeRow() {\n    }\n}\n"
    }
},
  "Populating Next Right Pointers in Each Node": {
    "description": "Implement an optimal solution for Populating Next Right Pointers in Each Node (Binary Tree - BFS / Level-Order) using proper algorithms and data structures.",
    "sampleInput": "root = [1, 2, 3, 4, 5, 6, 7]",
    "sampleOutput": "[1, #, 2, 3, #, 4, 5, 6, 7, #]",
    "explanation": "Next pointers link nodes across each level, '#' indicates end of level.",
    "testCases": [
        {
            "input": "root = []",
            "output": "[]"
        },
        {
            "input": "root = [1]",
            "output": "[1, #]"
        },
        {
            "input": "root = [1, 2, 3]",
            "output": "[1, #, 2, 3, #]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Populating Next Right Pointers in Each Node\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void populatingNextRightPointersinEachNode() {\n        // Implementation for Populating Next Right Pointers in Each Node\n    }\n};\n",
        "python": "# Problem: Populating Next Right Pointers in Each Node\nclass Solution:\n    def populatingNextRightPointersinEachNode(self):\n        pass\n",
        "javascript": "/**\n * Problem: Populating Next Right Pointers in Each Node\n */\nfunction populatingNextRightPointersinEachNode() {\n}\n",
        "java": "// Problem: Populating Next Right Pointers in Each Node\npublic class Solution {\n    public void populatingNextRightPointersinEachNode() {\n    }\n}\n"
    }
},
  "Populating Next Right Pointers in Each Node II": {
    "description": "Implement an optimal solution for Populating Next Right Pointers in Each Node II (Binary Tree - BFS / Level-Order) using proper algorithms and data structures.",
    "sampleInput": "root = [1, 2, 3, 4, 5, null, 7]",
    "sampleOutput": "[1, #, 2, 3, #, 4, 5, 7, #]",
    "explanation": "Handles non-perfect binary tree level links.",
    "testCases": [
        {
            "input": "root = []",
            "output": "[]"
        },
        {
            "input": "root = [1]",
            "output": "[1, #]"
        },
        {
            "input": "root = [1, 2, 3, 4, null, null, 5]",
            "output": "[1, #, 2, 3, #, 4, 5, #]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Populating Next Right Pointers in Each Node II\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void populatingNextRightPointersinEachNodeII() {\n        // Implementation for Populating Next Right Pointers in Each Node II\n    }\n};\n",
        "python": "# Problem: Populating Next Right Pointers in Each Node II\nclass Solution:\n    def populatingNextRightPointersinEachNodeII(self):\n        pass\n",
        "javascript": "/**\n * Problem: Populating Next Right Pointers in Each Node II\n */\nfunction populatingNextRightPointersinEachNodeII() {\n}\n",
        "java": "// Problem: Populating Next Right Pointers in Each Node II\npublic class Solution {\n    public void populatingNextRightPointersinEachNodeII() {\n    }\n}\n"
    }
},
  "Cousins in Binary Tree": {
    "description": "Implement an optimal solution for Cousins in Binary Tree (Binary Tree - BFS / Level-Order) using proper algorithms and data structures.",
    "sampleInput": "root = [1, 2, 3, 4], x = 4, y = 3",
    "sampleOutput": "false",
    "explanation": "4 is at depth 2 (parent 2), 3 is at depth 1 (parent 1). Not same depth.",
    "testCases": [
        {
            "input": "root = [1, 2, 3, null, 4, null, 5], x = 5, y = 4",
            "output": "true"
        },
        {
            "input": "root = [1, 2, 3, null, 4], x = 2, y = 3",
            "output": "false"
        },
        {
            "input": "root = [1, 2, 3, 4, 5, 6, 7], x = 4, y = 7",
            "output": "true"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Cousins in Binary Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void cousinsinBinaryTree() {\n        // Implementation for Cousins in Binary Tree\n    }\n};\n",
        "python": "# Problem: Cousins in Binary Tree\nclass Solution:\n    def cousinsinBinaryTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Cousins in Binary Tree\n */\nfunction cousinsinBinaryTree() {\n}\n",
        "java": "// Problem: Cousins in Binary Tree\npublic class Solution {\n    public void cousinsinBinaryTree() {\n    }\n}\n"
    }
},
  "Maximum Width of Binary Tree": {
    "description": "Implement an optimal solution for Maximum Width of Binary Tree (Binary Tree - BFS / Level-Order) using proper algorithms and data structures.",
    "sampleInput": "root = [1, 3, 2, 5, null, null, 9, 6, null, 7]",
    "sampleOutput": "7",
    "explanation": "Level 3 has width 7 between node 6 and node 7.",
    "testCases": [
        {
            "input": "root = [1, 3, 2, 5]",
            "output": "2"
        },
        {
            "input": "root = [1]",
            "output": "1"
        },
        {
            "input": "root = [1, 3, 2, 5, 3, null, 9]",
            "output": "4"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Maximum Width of Binary Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void maximumWidthofBinaryTree() {\n        // Implementation for Maximum Width of Binary Tree\n    }\n};\n",
        "python": "# Problem: Maximum Width of Binary Tree\nclass Solution:\n    def maximumWidthofBinaryTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Maximum Width of Binary Tree\n */\nfunction maximumWidthofBinaryTree() {\n}\n",
        "java": "// Problem: Maximum Width of Binary Tree\npublic class Solution {\n    public void maximumWidthofBinaryTree() {\n    }\n}\n"
    }
},
  "Lowest Common Ancestor of a Binary Tree": {
    "description": "Implement an optimal solution for Lowest Common Ancestor of a Binary Tree (Binary Tree - Lowest Common Ancestor) using proper algorithms and data structures.",
    "sampleInput": "root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 1",
    "sampleOutput": "3",
    "explanation": "LCA of nodes 5 and 1 is root 3.",
    "testCases": [
        {
            "input": "root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 4",
            "output": "5"
        },
        {
            "input": "root = [1, 2], p = 1, q = 2",
            "output": "1"
        },
        {
            "input": "root = [6, 2, 8, 0, 4, 7, 9], p = 2, q = 4",
            "output": "2"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Lowest Common Ancestor of a Binary Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void lowestCommonAncestorofaBinaryTree() {\n        // Implementation for Lowest Common Ancestor of a Binary Tree\n    }\n};\n",
        "python": "# Problem: Lowest Common Ancestor of a Binary Tree\nclass Solution:\n    def lowestCommonAncestorofaBinaryTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Lowest Common Ancestor of a Binary Tree\n */\nfunction lowestCommonAncestorofaBinaryTree() {\n}\n",
        "java": "// Problem: Lowest Common Ancestor of a Binary Tree\npublic class Solution {\n    public void lowestCommonAncestorofaBinaryTree() {\n    }\n}\n"
    }
},
  "Lowest Common Ancestor of Deepest Leaves": {
    "description": "Implement an optimal solution for Lowest Common Ancestor of Deepest Leaves (Binary Tree - Lowest Common Ancestor) using proper algorithms and data structures.",
    "sampleInput": "root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]",
    "sampleOutput": "[2, 7, 4]",
    "explanation": "Deepest leaves are 7 and 4, their lowest common ancestor is node 2.",
    "testCases": [
        {
            "input": "root = [1]",
            "output": "[1]"
        },
        {
            "input": "root = [0, 1, 3, null, 2]",
            "output": "[2]"
        },
        {
            "input": "root = [1, 2, 3]",
            "output": "[1, 2, 3]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Lowest Common Ancestor of Deepest Leaves\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void lowestCommonAncestorofDeepestLeaves() {\n        // Implementation for Lowest Common Ancestor of Deepest Leaves\n    }\n};\n",
        "python": "# Problem: Lowest Common Ancestor of Deepest Leaves\nclass Solution:\n    def lowestCommonAncestorofDeepestLeaves(self):\n        pass\n",
        "javascript": "/**\n * Problem: Lowest Common Ancestor of Deepest Leaves\n */\nfunction lowestCommonAncestorofDeepestLeaves() {\n}\n",
        "java": "// Problem: Lowest Common Ancestor of Deepest Leaves\npublic class Solution {\n    public void lowestCommonAncestorofDeepestLeaves() {\n    }\n}\n"
    }
},
  "Lowest Common Ancestor of a Binary Search Tree": {
    "description": "Implement an optimal solution for Lowest Common Ancestor of a Binary Search Tree (Binary Tree - Lowest Common Ancestor) using proper algorithms and data structures.",
    "sampleInput": "root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p = 2, q = 8",
    "sampleOutput": "6",
    "explanation": "LCA of 2 and 8 in BST is root 6.",
    "testCases": [
        {
            "input": "root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p = 2, q = 4",
            "output": "2"
        },
        {
            "input": "root = [2, 1], p = 2, q = 1",
            "output": "2"
        },
        {
            "input": "root = [5, 3, 6, 2, 4], p = 2, q = 4",
            "output": "3"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Lowest Common Ancestor of a Binary Search Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void lowestCommonAncestorofaBinarySearchTree() {\n        // Implementation for Lowest Common Ancestor of a Binary Search Tree\n    }\n};\n",
        "python": "# Problem: Lowest Common Ancestor of a Binary Search Tree\nclass Solution:\n    def lowestCommonAncestorofaBinarySearchTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Lowest Common Ancestor of a Binary Search Tree\n */\nfunction lowestCommonAncestorofaBinarySearchTree() {\n}\n",
        "java": "// Problem: Lowest Common Ancestor of a Binary Search Tree\npublic class Solution {\n    public void lowestCommonAncestorofaBinarySearchTree() {\n    }\n}\n"
    }
},
  "Construct Binary Tree from Preorder and Inorder Traversal": {
    "description": "Implement an optimal solution for Construct Binary Tree from Preorder and Inorder Traversal (Binary Tree - Serialization / Construction) using proper algorithms and data structures.",
    "sampleInput": "preorder = [3, 9, 20, 15, 7], inorder = [9, 3, 15, 20, 7]",
    "sampleOutput": "[3, 9, 20, null, null, 15, 7]",
    "explanation": "Reconstructed binary tree level-order representation.",
    "testCases": [
        {
            "input": "preorder = [-1], inorder = [-1]",
            "output": "[-1]"
        },
        {
            "input": "preorder = [1, 2, 3], inorder = [2, 1, 3]",
            "output": "[1, 2, 3]"
        },
        {
            "input": "preorder = [1, 2], inorder = [1, 2]",
            "output": "[1, null, 2]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Construct Binary Tree from Preorder and Inorder Traversal\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void constructBinaryTreefromPreorderandInorderTraversal() {\n        // Implementation for Construct Binary Tree from Preorder and Inorder Traversal\n    }\n};\n",
        "python": "# Problem: Construct Binary Tree from Preorder and Inorder Traversal\nclass Solution:\n    def constructBinaryTreefromPreorderandInorderTraversal(self):\n        pass\n",
        "javascript": "/**\n * Problem: Construct Binary Tree from Preorder and Inorder Traversal\n */\nfunction constructBinaryTreefromPreorderandInorderTraversal() {\n}\n",
        "java": "// Problem: Construct Binary Tree from Preorder and Inorder Traversal\npublic class Solution {\n    public void constructBinaryTreefromPreorderandInorderTraversal() {\n    }\n}\n"
    }
},
  "Construct Binary Tree from Inorder and Postorder Traversal": {
    "description": "Implement an optimal solution for Construct Binary Tree from Inorder and Postorder Traversal (Binary Tree - Serialization / Construction) using proper algorithms and data structures.",
    "sampleInput": "inorder = [9, 3, 15, 20, 7], postorder = [9, 15, 7, 20, 3]",
    "sampleOutput": "[3, 9, 20, null, null, 15, 7]",
    "explanation": "Root is last element of postorder (3). Left/right subtrees reconstructed from inorder.",
    "testCases": [
        {
            "input": "inorder = [-1], postorder = [-1]",
            "output": "[-1]"
        },
        {
            "input": "inorder = [2, 1], postorder = [2, 1]",
            "output": "[1, 2]"
        },
        {
            "input": "inorder = [1, 2, 3], postorder = [1, 3, 2]",
            "output": "[2, 1, 3]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Construct Binary Tree from Inorder and Postorder Traversal\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void constructBinaryTreefromInorderandPostorderTraversal() {\n        // Implementation for Construct Binary Tree from Inorder and Postorder Traversal\n    }\n};\n",
        "python": "# Problem: Construct Binary Tree from Inorder and Postorder Traversal\nclass Solution:\n    def constructBinaryTreefromInorderandPostorderTraversal(self):\n        pass\n",
        "javascript": "/**\n * Problem: Construct Binary Tree from Inorder and Postorder Traversal\n */\nfunction constructBinaryTreefromInorderandPostorderTraversal() {\n}\n",
        "java": "// Problem: Construct Binary Tree from Inorder and Postorder Traversal\npublic class Solution {\n    public void constructBinaryTreefromInorderandPostorderTraversal() {\n    }\n}\n"
    }
},
  "Construct Binary Tree from Preorder and Postorder Traversal": {
    "description": "Implement an optimal solution for Construct Binary Tree from Preorder and Postorder Traversal (Binary Tree - Serialization / Construction) using proper algorithms and data structures.",
    "sampleInput": "preorder = [1, 2, 4, 5, 3, 6, 7], postorder = [4, 5, 2, 6, 7, 3, 1]",
    "sampleOutput": "[1, 2, 3, 4, 5, 6, 7]",
    "explanation": "Full binary tree reconstructed from preorder and postorder.",
    "testCases": [
        {
            "input": "preorder = [1], postorder = [1]",
            "output": "[1]"
        },
        {
            "input": "preorder = [1, 2, 3], postorder = [2, 3, 1]",
            "output": "[1, 2, 3]"
        },
        {
            "input": "preorder = [2, 1], postorder = [1, 2]",
            "output": "[2, 1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Construct Binary Tree from Preorder and Postorder Traversal\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void constructBinaryTreefromPreorderandPostorderTraversal() {\n        // Implementation for Construct Binary Tree from Preorder and Postorder Traversal\n    }\n};\n",
        "python": "# Problem: Construct Binary Tree from Preorder and Postorder Traversal\nclass Solution:\n    def constructBinaryTreefromPreorderandPostorderTraversal(self):\n        pass\n",
        "javascript": "/**\n * Problem: Construct Binary Tree from Preorder and Postorder Traversal\n */\nfunction constructBinaryTreefromPreorderandPostorderTraversal() {\n}\n",
        "java": "// Problem: Construct Binary Tree from Preorder and Postorder Traversal\npublic class Solution {\n    public void constructBinaryTreefromPreorderandPostorderTraversal() {\n    }\n}\n"
    }
},
  "Serialize and Deserialize Binary Tree": {
    "description": "Implement an optimal solution for Serialize and Deserialize Binary Tree (Binary Tree - Serialization / Construction) using proper algorithms and data structures.",
    "sampleInput": "root = [1, 2, 3, null, null, 4, 5]",
    "sampleOutput": "serialized = \"1,2,X,X,3,4,X,X,5,X,X\", deserialized = [1, 2, 3, null, null, 4, 5]",
    "explanation": "Lossless serialization/deserialization cycle.",
    "testCases": [
        {
            "input": "root = []",
            "output": "serialized = \"X\", deserialized = []"
        },
        {
            "input": "root = [1]",
            "output": "serialized = \"1,X,X\", deserialized = [1]"
        },
        {
            "input": "root = [1, 2]",
            "output": "serialized = \"1,2,X,X,X\", deserialized = [1, 2]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Serialize and Deserialize Binary Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void serializeandDeserializeBinaryTree() {\n        // Implementation for Serialize and Deserialize Binary Tree\n    }\n};\n",
        "python": "# Problem: Serialize and Deserialize Binary Tree\nclass Solution:\n    def serializeandDeserializeBinaryTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Serialize and Deserialize Binary Tree\n */\nfunction serializeandDeserializeBinaryTree() {\n}\n",
        "java": "// Problem: Serialize and Deserialize Binary Tree\npublic class Solution {\n    public void serializeandDeserializeBinaryTree() {\n    }\n}\n"
    }
},
  "Flatten Binary Tree to Linked List": {
    "description": "Implement an optimal solution for Flatten Binary Tree to Linked List (Binary Tree - Serialization / Construction) using proper algorithms and data structures.",
    "sampleInput": "root = [1, 2, 5, 3, 4, null, 6]",
    "sampleOutput": "[1, null, 2, null, 3, null, 4, null, 5, null, 6]",
    "explanation": "Flattened in-place following preorder traversal order.",
    "testCases": [
        {
            "input": "root = []",
            "output": "[]"
        },
        {
            "input": "root = [0]",
            "output": "[0]"
        },
        {
            "input": "root = [1, 2, 3]",
            "output": "[1, null, 2, null, 3]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Flatten Binary Tree to Linked List\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void flattenBinaryTreetoLinkedList() {\n        // Implementation for Flatten Binary Tree to Linked List\n    }\n};\n",
        "python": "# Problem: Flatten Binary Tree to Linked List\nclass Solution:\n    def flattenBinaryTreetoLinkedList(self):\n        pass\n",
        "javascript": "/**\n * Problem: Flatten Binary Tree to Linked List\n */\nfunction flattenBinaryTreetoLinkedList() {\n}\n",
        "java": "// Problem: Flatten Binary Tree to Linked List\npublic class Solution {\n    public void flattenBinaryTreetoLinkedList() {\n    }\n}\n"
    }
},
  "Verify Preorder Serialization of a Binary Tree": {
    "description": "Implement an optimal solution for Verify Preorder Serialization of a Binary Tree (Binary Tree - Serialization / Construction) using proper algorithms and data structures.",
    "sampleInput": "preorder = \"9,3,4,#,#,1,#,#,2,#,6,#,#\"",
    "sampleOutput": "true",
    "explanation": "Degree count tracking confirms valid null-terminated preorder serialization.",
    "testCases": [
        {
            "input": "preorder = \"1,#\"",
            "output": "false"
        },
        {
            "input": "preorder = \"9,#,#,1\"",
            "output": "false"
        },
        {
            "input": "preorder = \"#\"",
            "output": "true"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Verify Preorder Serialization of a Binary Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void verifyPreorderSerializationofaBinaryTree() {\n        // Implementation for Verify Preorder Serialization of a Binary Tree\n    }\n};\n",
        "python": "# Problem: Verify Preorder Serialization of a Binary Tree\nclass Solution:\n    def verifyPreorderSerializationofaBinaryTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Verify Preorder Serialization of a Binary Tree\n */\nfunction verifyPreorderSerializationofaBinaryTree() {\n}\n",
        "java": "// Problem: Verify Preorder Serialization of a Binary Tree\npublic class Solution {\n    public void verifyPreorderSerializationofaBinaryTree() {\n    }\n}\n"
    }
},
  "Search in a Binary Search Tree": {
    "description": "Implement an optimal solution for Search in a Binary Search Tree (Binary Tree - BST) using proper algorithms and data structures.",
    "sampleInput": "root = [4, 2, 7, 1, 3], val = 2",
    "sampleOutput": "[2, 1, 3]",
    "explanation": "Subtree rooted at node with value 2.",
    "testCases": [
        {
            "input": "root = [4, 2, 7, 1, 3], val = 5",
            "output": "[]"
        },
        {
            "input": "root = [18, 11, 29], val = 18",
            "output": "[18, 11, 29]"
        },
        {
            "input": "root = [10], val = 10",
            "output": "[10]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Search in a Binary Search Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void searchinaBinarySearchTree() {\n        // Implementation for Search in a Binary Search Tree\n    }\n};\n",
        "python": "# Problem: Search in a Binary Search Tree\nclass Solution:\n    def searchinaBinarySearchTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Search in a Binary Search Tree\n */\nfunction searchinaBinarySearchTree() {\n}\n",
        "java": "// Problem: Search in a Binary Search Tree\npublic class Solution {\n    public void searchinaBinarySearchTree() {\n    }\n}\n"
    }
},
  "Insert into a Binary Search Tree": {
    "description": "Implement an optimal solution for Insert into a Binary Search Tree (Binary Tree - BST) using proper algorithms and data structures.",
    "sampleInput": "root = [4, 2, 7, 1, 3], val = 5",
    "sampleOutput": "[4, 2, 7, 1, 3, 5]",
    "explanation": "5 inserted as left child of 7.",
    "testCases": [
        {
            "input": "root = [40, 20, 60, 10, 30, 50, 70], val = 25",
            "output": "[40, 20, 60, 10, 30, 50, 70, null, null, 25]"
        },
        {
            "input": "root = [], val = 5",
            "output": "[5]"
        },
        {
            "input": "root = [4, 2, 7], val = 1",
            "output": "[4, 2, 7, 1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Insert into a Binary Search Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void insertintoaBinarySearchTree() {\n        // Implementation for Insert into a Binary Search Tree\n    }\n};\n",
        "python": "# Problem: Insert into a Binary Search Tree\nclass Solution:\n    def insertintoaBinarySearchTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Insert into a Binary Search Tree\n */\nfunction insertintoaBinarySearchTree() {\n}\n",
        "java": "// Problem: Insert into a Binary Search Tree\npublic class Solution {\n    public void insertintoaBinarySearchTree() {\n    }\n}\n"
    }
},
  "Delete Node in a BST": {
    "description": "Implement an optimal solution for Delete Node in a BST (Binary Tree - BST) using proper algorithms and data structures.",
    "sampleInput": "root = [5, 3, 6, 2, 4, null, 7], key = 3",
    "sampleOutput": "[5, 4, 6, 2, null, null, 7]",
    "explanation": "Node 3 deleted, replaced by its inorder successor 4.",
    "testCases": [
        {
            "input": "root = [5, 3, 6, 2, 4, null, 7], key = 0",
            "output": "[5, 3, 6, 2, 4, null, 7]"
        },
        {
            "input": "root = [], key = 0",
            "output": "[]"
        },
        {
            "input": "root = [5], key = 5",
            "output": "[]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Delete Node in a BST\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void deleteNodeinaBST() {\n        // Implementation for Delete Node in a BST\n    }\n};\n",
        "python": "# Problem: Delete Node in a BST\nclass Solution:\n    def deleteNodeinaBST(self):\n        pass\n",
        "javascript": "/**\n * Problem: Delete Node in a BST\n */\nfunction deleteNodeinaBST() {\n}\n",
        "java": "// Problem: Delete Node in a BST\npublic class Solution {\n    public void deleteNodeinaBST() {\n    }\n}\n"
    }
},
  "Validate Binary Search Tree": {
    "description": "Implement an optimal solution for Validate Binary Search Tree (Binary Tree - BST) using proper algorithms and data structures.",
    "sampleInput": "root = [2, 1, 3]",
    "sampleOutput": "true",
    "explanation": "Left child 1 < 2 < Right child 3.",
    "testCases": [
        {
            "input": "root = [5, 1, 4, null, null, 3, 6]",
            "output": "false"
        },
        {
            "input": "root = [10, 5, 15, null, null, 6, 20]",
            "output": "false"
        },
        {
            "input": "root = [2147483647]",
            "output": "true"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Validate Binary Search Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void validateBinarySearchTree() {\n        // Implementation for Validate Binary Search Tree\n    }\n};\n",
        "python": "# Problem: Validate Binary Search Tree\nclass Solution:\n    def validateBinarySearchTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Validate Binary Search Tree\n */\nfunction validateBinarySearchTree() {\n}\n",
        "java": "// Problem: Validate Binary Search Tree\npublic class Solution {\n    public void validateBinarySearchTree() {\n    }\n}\n"
    }
},
  "Kth Smallest Element in a BST": {
    "description": "Implement an optimal solution for Kth Smallest Element in a BST (Binary Tree - BST) using proper algorithms and data structures.",
    "sampleInput": "root = [3, 1, 4, null, 2], k = 1",
    "sampleOutput": "1",
    "explanation": "Inorder traversal is [1, 2, 3, 4], 1st smallest is 1.",
    "testCases": [
        {
            "input": "root = [5, 3, 6, 2, 4, null, null, 1], k = 3",
            "output": "3"
        },
        {
            "input": "root = [1], k = 1",
            "output": "1"
        },
        {
            "input": "root = [4, 2, 5, 1, 3], k = 4",
            "output": "4"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Kth Smallest Element in a BST\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void kthSmallestElementinaBST() {\n        // Implementation for Kth Smallest Element in a BST\n    }\n};\n",
        "python": "# Problem: Kth Smallest Element in a BST\nclass Solution:\n    def kthSmallestElementinaBST(self):\n        pass\n",
        "javascript": "/**\n * Problem: Kth Smallest Element in a BST\n */\nfunction kthSmallestElementinaBST() {\n}\n",
        "java": "// Problem: Kth Smallest Element in a BST\npublic class Solution {\n    public void kthSmallestElementinaBST() {\n    }\n}\n"
    }
},
  "Two Sum IV - Input is a BST": {
    "description": "Implement an optimal solution for Two Sum IV - Input is a BST (Binary Tree - BST) using proper algorithms and data structures.",
    "sampleInput": "root = [5, 3, 6, 2, 4, null, 7], k = 9",
    "sampleOutput": "true",
    "explanation": "Nodes 2 + 7 = 9 (or 3 + 6 = 9).",
    "testCases": [
        {
            "input": "root = [5, 3, 6, 2, 4, null, 7], k = 28",
            "output": "false"
        },
        {
            "input": "root = [2, 1, 3], k = 4",
            "output": "true"
        },
        {
            "input": "root = [1], k = 2",
            "output": "false"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Two Sum IV - Input is a BST\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void twoSumIVInputisaBST() {\n        // Implementation for Two Sum IV - Input is a BST\n    }\n};\n",
        "python": "# Problem: Two Sum IV - Input is a BST\nclass Solution:\n    def twoSumIVInputisaBST(self):\n        pass\n",
        "javascript": "/**\n * Problem: Two Sum IV - Input is a BST\n */\nfunction twoSumIVInputisaBST() {\n}\n",
        "java": "// Problem: Two Sum IV - Input is a BST\npublic class Solution {\n    public void twoSumIVInputisaBST() {\n    }\n}\n"
    }
},
  "Lowest Common Ancestor of a BST": {
    "description": "Implement an optimal solution for Lowest Common Ancestor of a BST (Binary Tree - BST) using proper algorithms and data structures.",
    "sampleInput": "root = [10, 5, 15, 3, 7, 12, 18], p = 3, q = 7",
    "sampleOutput": "5",
    "explanation": "Both nodes 3 and 7 lie under left child 5, so LCA is 5.",
    "testCases": [
        {
            "input": "root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p = 2, q = 4",
            "output": "2"
        },
        {
            "input": "root = [2, 1], p = 2, q = 1",
            "output": "2"
        },
        {
            "input": "root = [3, 1, 4, null, 2], p = 2, q = 4",
            "output": "3"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Lowest Common Ancestor of a BST\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void lowestCommonAncestorofaBST() {\n        // Implementation for Lowest Common Ancestor of a BST\n    }\n};\n",
        "python": "# Problem: Lowest Common Ancestor of a BST\nclass Solution:\n    def lowestCommonAncestorofaBST(self):\n        pass\n",
        "javascript": "/**\n * Problem: Lowest Common Ancestor of a BST\n */\nfunction lowestCommonAncestorofaBST() {\n}\n",
        "java": "// Problem: Lowest Common Ancestor of a BST\npublic class Solution {\n    public void lowestCommonAncestorofaBST() {\n    }\n}\n"
    }
},
  "Construct Binary Search Tree from Preorder Traversal": {
    "description": "Implement an optimal solution for Construct Binary Search Tree from Preorder Traversal (Binary Tree - BST) using proper algorithms and data structures.",
    "sampleInput": "preorder = [8, 5, 1, 7, 10, 12]",
    "sampleOutput": "[8, 5, 10, 1, 7, null, 12]",
    "explanation": "BST constructed respecting preorder node insertion bounds.",
    "testCases": [
        {
            "input": "preorder = [1, 3]",
            "output": "[1, null, 3]"
        },
        {
            "input": "preorder = [4, 2]",
            "output": "[4, 2]"
        },
        {
            "input": "preorder = [10]",
            "output": "[10]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Construct Binary Search Tree from Preorder Traversal\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void constructBinarySearchTreefromPreorderTraversal() {\n        // Implementation for Construct Binary Search Tree from Preorder Traversal\n    }\n};\n",
        "python": "# Problem: Construct Binary Search Tree from Preorder Traversal\nclass Solution:\n    def constructBinarySearchTreefromPreorderTraversal(self):\n        pass\n",
        "javascript": "/**\n * Problem: Construct Binary Search Tree from Preorder Traversal\n */\nfunction constructBinarySearchTreefromPreorderTraversal() {\n}\n",
        "java": "// Problem: Construct Binary Search Tree from Preorder Traversal\npublic class Solution {\n    public void constructBinarySearchTreefromPreorderTraversal() {\n    }\n}\n"
    }
},
  "Convert Sorted Array to Binary Search Tree": {
    "description": "Implement an optimal solution for Convert Sorted Array to Binary Search Tree (Binary Tree - BST) using proper algorithms and data structures.",
    "sampleInput": "nums = [-10, -3, 0, 5, 9]",
    "sampleOutput": "[0, -3, 9, -10, null, 5]",
    "explanation": "Height-balanced BST created using middle elements as roots.",
    "testCases": [
        {
            "input": "nums = [1, 3]",
            "output": "[3, 1]"
        },
        {
            "input": "nums = [0]",
            "output": "[0]"
        },
        {
            "input": "nums = [1, 2, 3, 4, 5, 6, 7]",
            "output": "[4, 2, 6, 1, 3, 5, 7]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Convert Sorted Array to Binary Search Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void convertSortedArraytoBinarySearchTree() {\n        // Implementation for Convert Sorted Array to Binary Search Tree\n    }\n};\n",
        "python": "# Problem: Convert Sorted Array to Binary Search Tree\nclass Solution:\n    def convertSortedArraytoBinarySearchTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Convert Sorted Array to Binary Search Tree\n */\nfunction convertSortedArraytoBinarySearchTree() {\n}\n",
        "java": "// Problem: Convert Sorted Array to Binary Search Tree\npublic class Solution {\n    public void convertSortedArraytoBinarySearchTree() {\n    }\n}\n"
    }
},
  "Convert Sorted List to Binary Search Tree": {
    "description": "Implement an optimal solution for Convert Sorted List to Binary Search Tree (Binary Tree - BST) using proper algorithms and data structures.",
    "sampleInput": "head = [-10, -3, 0, 5, 9]",
    "sampleOutput": "[0, -3, 9, -10, null, 5]",
    "explanation": "Middle node of sorted linked list selected as root recursively.",
    "testCases": [
        {
            "input": "head = []",
            "output": "[]"
        },
        {
            "input": "head = [0]",
            "output": "[0]"
        },
        {
            "input": "head = [1, 2, 3]",
            "output": "[2, 1, 3]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Convert Sorted List to Binary Search Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void convertSortedListtoBinarySearchTree() {\n        // Implementation for Convert Sorted List to Binary Search Tree\n    }\n};\n",
        "python": "# Problem: Convert Sorted List to Binary Search Tree\nclass Solution:\n    def convertSortedListtoBinarySearchTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Convert Sorted List to Binary Search Tree\n */\nfunction convertSortedListtoBinarySearchTree() {\n}\n",
        "java": "// Problem: Convert Sorted List to Binary Search Tree\npublic class Solution {\n    public void convertSortedListtoBinarySearchTree() {\n    }\n}\n"
    }
},
  "BST Iterator": {
    "description": "Implement an optimal solution for BST Iterator (Binary Tree - BST) using proper algorithms and data structures.",
    "sampleInput": "ops = [\"BSTIterator\", \"next\", \"next\", \"hasNext\", \"next\", \"hasNext\", \"next\", \"hasNext\", \"next\", \"hasNext\"], params = [[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]",
    "sampleOutput": "[null, 3, 7, true, 9, true, 15, true, 20, false]",
    "explanation": "Inorder traversal over BST with O(1) average time and O(h) memory.",
    "testCases": [
        {
            "input": "ops = [\"BSTIterator\", \"hasNext\", \"next\"], params = [[[1]], [], []]",
            "output": "[null, true, 1]"
        },
        {
            "input": "ops = [\"BSTIterator\", \"next\", \"hasNext\"], params = [[[2, 1, 3]], [], []]",
            "output": "[null, 1, true]"
        },
        {
            "input": "ops = [\"BSTIterator\", \"next\", \"next\"], params = [[[5, 3, null]], [], []]",
            "output": "[null, 3, 5]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: BST Iterator\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void bSTIterator() {\n        // Implementation for BST Iterator\n    }\n};\n",
        "python": "# Problem: BST Iterator\nclass Solution:\n    def bSTIterator(self):\n        pass\n",
        "javascript": "/**\n * Problem: BST Iterator\n */\nfunction bSTIterator() {\n}\n",
        "java": "// Problem: BST Iterator\npublic class Solution {\n    public void bSTIterator() {\n    }\n}\n"
    }
},
  "Range Sum of BST": {
    "description": "Implement an optimal solution for Range Sum of BST (Binary Tree - BST) using proper algorithms and data structures.",
    "sampleInput": "root = [10, 5, 15, 3, 7, null, 18], low = 7, high = 15",
    "sampleOutput": "32",
    "explanation": "Nodes in range [7, 15]: 7 + 10 + 15 = 32.",
    "testCases": [
        {
            "input": "root = [10, 5, 15, 3, 7, 13, 18, 1, null, 6], low = 6, high = 10",
            "output": "23"
        },
        {
            "input": "root = [1], low = 1, high = 1",
            "output": "1"
        },
        {
            "input": "root = [8, 4, 12], low = 1, high = 3",
            "output": "0"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Range Sum of BST\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void rangeSumofBST() {\n        // Implementation for Range Sum of BST\n    }\n};\n",
        "python": "# Problem: Range Sum of BST\nclass Solution:\n    def rangeSumofBST(self):\n        pass\n",
        "javascript": "/**\n * Problem: Range Sum of BST\n */\nfunction rangeSumofBST() {\n}\n",
        "java": "// Problem: Range Sum of BST\npublic class Solution {\n    public void rangeSumofBST() {\n    }\n}\n"
    }
},
  "Trim a Binary Search Tree": {
    "description": "Implement an optimal solution for Trim a Binary Search Tree (Binary Tree - BST) using proper algorithms and data structures.",
    "sampleInput": "root = [1, 0, 2], low = 1, high = 2",
    "sampleOutput": "[1, null, 2]",
    "explanation": "Node 0 trimmed out since 0 < low (1).",
    "testCases": [
        {
            "input": "root = [3, 0, 4, null, 2, null, null, 1], low = 1, high = 3",
            "output": "[3, 2, null, 1]"
        },
        {
            "input": "root = [1], low = 1, high = 2",
            "output": "[1]"
        },
        {
            "input": "root = [1, null, 2], low = 1, high = 3",
            "output": "[1, null, 2]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Trim a Binary Search Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void trimaBinarySearchTree() {\n        // Implementation for Trim a Binary Search Tree\n    }\n};\n",
        "python": "# Problem: Trim a Binary Search Tree\nclass Solution:\n    def trimaBinarySearchTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Trim a Binary Search Tree\n */\nfunction trimaBinarySearchTree() {\n}\n",
        "java": "// Problem: Trim a Binary Search Tree\npublic class Solution {\n    public void trimaBinarySearchTree() {\n    }\n}\n"
    }
},
  "Recover Binary Search Tree": {
    "description": "Implement an optimal solution for Recover Binary Search Tree (Binary Tree - BST) using proper algorithms and data structures.",
    "sampleInput": "root = [1, 3, null, null, 2]",
    "sampleOutput": "[3, 1, null, null, 2]",
    "explanation": "Swapped nodes 1 and 3 restored to correct BST positions.",
    "testCases": [
        {
            "input": "root = [3, 1, 4, null, null, 2]",
            "output": "[2, 1, 4, null, null, 3]"
        },
        {
            "input": "root = [2, 3, 1]",
            "output": "[2, 1, 3]"
        },
        {
            "input": "root = [10, 5, 15, 20, null, null, 12]",
            "output": "[10, 5, 15, 12, null, null, 20]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Recover Binary Search Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void recoverBinarySearchTree() {\n        // Implementation for Recover Binary Search Tree\n    }\n};\n",
        "python": "# Problem: Recover Binary Search Tree\nclass Solution:\n    def recoverBinarySearchTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Recover Binary Search Tree\n */\nfunction recoverBinarySearchTree() {\n}\n",
        "java": "// Problem: Recover Binary Search Tree\npublic class Solution {\n    public void recoverBinarySearchTree() {\n    }\n}\n"
    }
},
  "Balance a Binary Search Tree": {
    "description": "Implement an optimal solution for Balance a Binary Search Tree (Binary Tree - BST) using proper algorithms and data structures.",
    "sampleInput": "root = [1, null, 2, null, 3, null, 4, null, null]",
    "sampleOutput": "[2, 1, 3, null, null, null, 4]",
    "explanation": "Left-skewed BST rebuilt into a height-balanced BST.",
    "testCases": [
        {
            "input": "root = [2, 1, 3]",
            "output": "[2, 1, 3]"
        },
        {
            "input": "root = [1, null, 2, null, 3]",
            "output": "[2, 1, 3]"
        },
        {
            "input": "root = [4, 3, null, 2, null, 1]",
            "output": "[2, 1, 3, null, null, null, 4]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Balance a Binary Search Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void balanceaBinarySearchTree() {\n        // Implementation for Balance a Binary Search Tree\n    }\n};\n",
        "python": "# Problem: Balance a Binary Search Tree\nclass Solution:\n    def balanceaBinarySearchTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Balance a Binary Search Tree\n */\nfunction balanceaBinarySearchTree() {\n}\n",
        "java": "// Problem: Balance a Binary Search Tree\npublic class Solution {\n    public void balanceaBinarySearchTree() {\n    }\n}\n"
    }
},
  "Minimum Absolute Difference in BST": {
    "description": "Implement an optimal solution for Minimum Absolute Difference in BST (Binary Tree - BST) using proper algorithms and data structures.",
    "sampleInput": "root = [4, 2, 6, 1, 3]",
    "sampleOutput": "1",
    "explanation": "Inorder values: [1, 2, 3, 4, 6]. Min diff = 2 - 1 = 1.",
    "testCases": [
        {
            "input": "root = [1, 0, 48, null, null, 12, 49]",
            "output": "1"
        },
        {
            "input": "root = [236, 104, 701, null, 227, null, 911]",
            "output": "9"
        },
        {
            "input": "root = [5, 1, 7]",
            "output": "2"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Minimum Absolute Difference in BST\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void minimumAbsoluteDifferenceinBST() {\n        // Implementation for Minimum Absolute Difference in BST\n    }\n};\n",
        "python": "# Problem: Minimum Absolute Difference in BST\nclass Solution:\n    def minimumAbsoluteDifferenceinBST(self):\n        pass\n",
        "javascript": "/**\n * Problem: Minimum Absolute Difference in BST\n */\nfunction minimumAbsoluteDifferenceinBST() {\n}\n",
        "java": "// Problem: Minimum Absolute Difference in BST\npublic class Solution {\n    public void minimumAbsoluteDifferenceinBST() {\n    }\n}\n"
    }
},
  "Number of Islands": {
    "description": "Implement an optimal solution for Number of Islands (Graph - BFS (Unweighted Path)) using proper algorithms and data structures.",
    "sampleInput": "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
    "sampleOutput": "1",
    "explanation": "All connected '1's form a single island.",
    "testCases": [
        {
            "input": "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
            "output": "3"
        },
        {
            "input": "grid = [[\"0\"]]",
            "output": "0"
        },
        {
            "input": "grid = [[\"1\"]]",
            "output": "1"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Number of Islands\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void numberofIslands() {\n        // Implementation for Number of Islands\n    }\n};\n",
        "python": "# Problem: Number of Islands\nclass Solution:\n    def numberofIslands(self):\n        pass\n",
        "javascript": "/**\n * Problem: Number of Islands\n */\nfunction numberofIslands() {\n}\n",
        "java": "// Problem: Number of Islands\npublic class Solution {\n    public void numberofIslands() {\n    }\n}\n"
    }
},
  "Rotting Oranges": {
    "description": "Implement an optimal solution for Rotting Oranges (Graph - BFS (Unweighted Path)) using proper algorithms and data structures.",
    "sampleInput": "grid = [[2,1,1],[1,1,0],[0,1,1]]",
    "sampleOutput": "4",
    "explanation": "Multisource BFS rots all fresh oranges in 4 minutes.",
    "testCases": [
        {
            "input": "grid = [[2,1,1],[0,1,1],[1,0,1]]",
            "output": "-1"
        },
        {
            "input": "grid = [[0,2]]",
            "output": "0"
        },
        {
            "input": "grid = [[1,2]]",
            "output": "1"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Rotting Oranges\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void rottingOranges() {\n        // Implementation for Rotting Oranges\n    }\n};\n",
        "python": "# Problem: Rotting Oranges\nclass Solution:\n    def rottingOranges(self):\n        pass\n",
        "javascript": "/**\n * Problem: Rotting Oranges\n */\nfunction rottingOranges() {\n}\n",
        "java": "// Problem: Rotting Oranges\npublic class Solution {\n    public void rottingOranges() {\n    }\n}\n"
    }
},
  "Word Ladder": {
    "description": "Implement an optimal solution for Word Ladder (Graph - BFS (Unweighted Path)) using proper algorithms and data structures.",
    "sampleInput": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
    "sampleOutput": "5",
    "explanation": "Shortest transformation sequence: \"hit\" -> \"hot\" -> \"dot\" -> \"dog\" -> \"cog\" (length 5).",
    "testCases": [
        {
            "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]",
            "output": "0"
        },
        {
            "input": "beginWord = \"a\", endWord = \"c\", wordList = [\"a\",\"b\",\"c\"]",
            "output": "2"
        },
        {
            "input": "beginWord = \"red\", endWord = \"tax\", wordList = [\"ted\",\"tex\",\"red\",\"tax\",\"tad\",\"den\",\"rex\",\"pee\"]",
            "output": "4"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Word Ladder\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void wordLadder() {\n        // Implementation for Word Ladder\n    }\n};\n",
        "python": "# Problem: Word Ladder\nclass Solution:\n    def wordLadder(self):\n        pass\n",
        "javascript": "/**\n * Problem: Word Ladder\n */\nfunction wordLadder() {\n}\n",
        "java": "// Problem: Word Ladder\npublic class Solution {\n    public void wordLadder() {\n    }\n}\n"
    }
},
  "01 Matrix": {
    "description": "Implement an optimal solution for 01 Matrix (Graph - BFS (Unweighted Path)) using proper algorithms and data structures.",
    "sampleInput": "mat = [[0,0,0],[0,1,0],[0,0,0]]",
    "sampleOutput": "[[0,0,0],[0,1,0],[0,0,0]]",
    "explanation": "Distance from each cell to nearest 0.",
    "testCases": [
        {
            "input": "mat = [[0,0,0],[0,1,0],[1,1,1]]",
            "output": "[[0,0,0],[0,1,0],[1,2,1]]"
        },
        {
            "input": "mat = [[0]]",
            "output": "[[0]]"
        },
        {
            "input": "mat = [[1,1,1],[1,1,1],[1,1,0]]",
            "output": "[[4,3,2],[3,2,1],[2,1,0]]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: 01 Matrix\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void 01Matrix() {\n        // Implementation for 01 Matrix\n    }\n};\n",
        "python": "# Problem: 01 Matrix\nclass Solution:\n    def 01Matrix(self):\n        pass\n",
        "javascript": "/**\n * Problem: 01 Matrix\n */\nfunction 01Matrix() {\n}\n",
        "java": "// Problem: 01 Matrix\npublic class Solution {\n    public void 01Matrix() {\n    }\n}\n"
    }
},
  "Shortest Path in Binary Matrix": {
    "description": "Implement an optimal solution for Shortest Path in Binary Matrix (Graph - BFS (Unweighted Path)) using proper algorithms and data structures.",
    "sampleInput": "grid = [[0,1],[1,0]]",
    "sampleOutput": "2",
    "explanation": "Diagonal path (0,0) -> (1,1) has length 2.",
    "testCases": [
        {
            "input": "grid = [[0,0,0],[1,1,0],[1,1,0]]",
            "output": "4"
        },
        {
            "input": "grid = [[1,0,0],[0,1,0],[0,0,0]]",
            "output": "-1"
        },
        {
            "input": "grid = [[0]]",
            "output": "1"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Shortest Path in Binary Matrix\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void shortestPathinBinaryMatrix() {\n        // Implementation for Shortest Path in Binary Matrix\n    }\n};\n",
        "python": "# Problem: Shortest Path in Binary Matrix\nclass Solution:\n    def shortestPathinBinaryMatrix(self):\n        pass\n",
        "javascript": "/**\n * Problem: Shortest Path in Binary Matrix\n */\nfunction shortestPathinBinaryMatrix() {\n}\n",
        "java": "// Problem: Shortest Path in Binary Matrix\npublic class Solution {\n    public void shortestPathinBinaryMatrix() {\n    }\n}\n"
    }
},
  "Minimum Genetic Mutation": {
    "description": "Implement an optimal solution for Minimum Genetic Mutation (Graph - BFS (Unweighted Path)) using proper algorithms and data structures.",
    "sampleInput": "startGene = \"AACCGGTT\", endGene = \"AACCGGTA\", bank = [\"AACCGGTA\"]",
    "sampleOutput": "1",
    "explanation": "Single valid gene mutation required.",
    "testCases": [
        {
            "input": "startGene = \"AACCGGTT\", endGene = \"AAACGGTA\", bank = [\"AACCGGTA\",\"AACCGCTA\",\"AAACGGTA\"]",
            "output": "2"
        },
        {
            "input": "startGene = \"AAAAACCC\", endGene = \"AACCCCCC\", bank = [\"AAAACCCC\",\"AAACCCCC\",\"AACCCCCC\"]",
            "output": "3"
        },
        {
            "input": "startGene = \"AACCGGTT\", endGene = \"AACCGGTA\", bank = []",
            "output": "-1"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Minimum Genetic Mutation\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void minimumGeneticMutation() {\n        // Implementation for Minimum Genetic Mutation\n    }\n};\n",
        "python": "# Problem: Minimum Genetic Mutation\nclass Solution:\n    def minimumGeneticMutation(self):\n        pass\n",
        "javascript": "/**\n * Problem: Minimum Genetic Mutation\n */\nfunction minimumGeneticMutation() {\n}\n",
        "java": "// Problem: Minimum Genetic Mutation\npublic class Solution {\n    public void minimumGeneticMutation() {\n    }\n}\n"
    }
},
  "Number of Provinces": {
    "description": "Implement an optimal solution for Number of Provinces (Graph - DFS (Connectivity)) using proper algorithms and data structures.",
    "sampleInput": "isConnected = [[1,1,0],[1,1,0],[0,0,1]]",
    "sampleOutput": "2",
    "explanation": "Cities 0 and 1 belong to Province 1; city 2 belongs to Province 2.",
    "testCases": [
        {
            "input": "isConnected = [[1,0,0],[0,1,0],[0,0,1]]",
            "output": "3"
        },
        {
            "input": "isConnected = [[1]]",
            "output": "1"
        },
        {
            "input": "isConnected = [[1,1,1],[1,1,1],[1,1,1]]",
            "output": "1"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Number of Provinces\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void numberofProvinces() {\n        // Implementation for Number of Provinces\n    }\n};\n",
        "python": "# Problem: Number of Provinces\nclass Solution:\n    def numberofProvinces(self):\n        pass\n",
        "javascript": "/**\n * Problem: Number of Provinces\n */\nfunction numberofProvinces() {\n}\n",
        "java": "// Problem: Number of Provinces\npublic class Solution {\n    public void numberofProvinces() {\n    }\n}\n"
    }
},
  "Max Area of Island": {
    "description": "Implement an optimal solution for Max Area of Island (Graph - DFS (Connectivity)) using proper algorithms and data structures.",
    "sampleInput": "grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]",
    "sampleOutput": "6",
    "explanation": "The maximum island area is 6.",
    "testCases": [
        {
            "input": "grid = [[0,0,0,0,0,0,0,0]]",
            "output": "0"
        },
        {
            "input": "grid = [[1,1],[1,0]]",
            "output": "3"
        },
        {
            "input": "grid = [[1]]",
            "output": "1"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Max Area of Island\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void maxAreaofIsland() {\n        // Implementation for Max Area of Island\n    }\n};\n",
        "python": "# Problem: Max Area of Island\nclass Solution:\n    def maxAreaofIsland(self):\n        pass\n",
        "javascript": "/**\n * Problem: Max Area of Island\n */\nfunction maxAreaofIsland() {\n}\n",
        "java": "// Problem: Max Area of Island\npublic class Solution {\n    public void maxAreaofIsland() {\n    }\n}\n"
    }
},
  "Surrounding Regions": {
    "description": "Implement an optimal solution for Surrounding Regions (Graph - DFS (Connectivity)) using proper algorithms and data structures.",
    "sampleInput": "board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
    "sampleOutput": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
    "explanation": "Surrounded 'O's captured; boundary-connected 'O' at (3,1) remains.",
    "testCases": [
        {
            "input": "board = [[\"X\"]]",
            "output": "[[\"X\"]]"
        },
        {
            "input": "board = [[\"O\",\"O\"],[\"O\",\"O\"]]",
            "output": "[[\"O\",\"O\"],[\"O\",\"O\"]]"
        },
        {
            "input": "board = [[\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\"]]",
            "output": "[[\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\"]]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Surrounding Regions\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void surroundingRegions() {\n        // Implementation for Surrounding Regions\n    }\n};\n",
        "python": "# Problem: Surrounding Regions\nclass Solution:\n    def surroundingRegions(self):\n        pass\n",
        "javascript": "/**\n * Problem: Surrounding Regions\n */\nfunction surroundingRegions() {\n}\n",
        "java": "// Problem: Surrounding Regions\npublic class Solution {\n    public void surroundingRegions() {\n    }\n}\n"
    }
},
  "Pacific Atlantic Water Flow": {
    "description": "Implement an optimal solution for Pacific Atlantic Water Flow (Graph - DFS (Connectivity)) using proper algorithms and data structures.",
    "sampleInput": "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
    "sampleOutput": "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
    "explanation": "Cells where water can flow to both Pacific and Atlantic oceans.",
    "testCases": [
        {
            "input": "heights = [[1]]",
            "output": "[[0,0]]"
        },
        {
            "input": "heights = [[2,1],[1,2]]",
            "output": "[[0,0],[0,1],[1,0],[1,1]]"
        },
        {
            "input": "heights = [[1,2,3],[8,9,4],[7,6,5]]",
            "output": "[[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Pacific Atlantic Water Flow\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void pacificAtlanticWaterFlow() {\n        // Implementation for Pacific Atlantic Water Flow\n    }\n};\n",
        "python": "# Problem: Pacific Atlantic Water Flow\nclass Solution:\n    def pacificAtlanticWaterFlow(self):\n        pass\n",
        "javascript": "/**\n * Problem: Pacific Atlantic Water Flow\n */\nfunction pacificAtlanticWaterFlow() {\n}\n",
        "java": "// Problem: Pacific Atlantic Water Flow\npublic class Solution {\n    public void pacificAtlanticWaterFlow() {\n    }\n}\n"
    }
},
  "Clone Graph": {
    "description": "Implement an optimal solution for Clone Graph (Graph - DFS (Connectivity)) using proper algorithms and data structures.",
    "sampleInput": "adjList = [[2,4],[1,3],[2,4],[1,3]]",
    "sampleOutput": "[[2,4],[1,3],[2,4],[1,3]]",
    "explanation": "Deep clone of undirected connected graph.",
    "testCases": [
        {
            "input": "adjList = [[]]",
            "output": "[[]]"
        },
        {
            "input": "adjList = []",
            "output": "[]"
        },
        {
            "input": "adjList = [[2],[1]]",
            "output": "[[2],[1]]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Clone Graph\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void cloneGraph() {\n        // Implementation for Clone Graph\n    }\n};\n",
        "python": "# Problem: Clone Graph\nclass Solution:\n    def cloneGraph(self):\n        pass\n",
        "javascript": "/**\n * Problem: Clone Graph\n */\nfunction cloneGraph() {\n}\n",
        "java": "// Problem: Clone Graph\npublic class Solution {\n    public void cloneGraph() {\n    }\n}\n"
    }
},
  "Graph Valid Tree": {
    "description": "Implement an optimal solution for Graph Valid Tree (Graph - DFS (Connectivity)) using proper algorithms and data structures.",
    "sampleInput": "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
    "sampleOutput": "true",
    "explanation": "Graph is fully connected and contains no cycles (n-1 edges).",
    "testCases": [
        {
            "input": "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]",
            "output": "false"
        },
        {
            "input": "n = 1, edges = []",
            "output": "true"
        },
        {
            "input": "n = 4, edges = [[0,1],[2,3]]",
            "output": "false"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Graph Valid Tree\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void graphValidTree() {\n        // Implementation for Graph Valid Tree\n    }\n};\n",
        "python": "# Problem: Graph Valid Tree\nclass Solution:\n    def graphValidTree(self):\n        pass\n",
        "javascript": "/**\n * Problem: Graph Valid Tree\n */\nfunction graphValidTree() {\n}\n",
        "java": "// Problem: Graph Valid Tree\npublic class Solution {\n    public void graphValidTree() {\n    }\n}\n"
    }
},
  "Number of Connected Components in an Undirected Graph": {
    "description": "Implement an optimal solution for Number of Connected Components in an Undirected Graph (Graph - DFS (Connectivity)) using proper algorithms and data structures.",
    "sampleInput": "n = 5, edges = [[0,1],[1,2],[3,4]]",
    "sampleOutput": "2",
    "explanation": "Components: {0,1,2} and {3,4}.",
    "testCases": [
        {
            "input": "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]",
            "output": "1"
        },
        {
            "input": "n = 4, edges = []",
            "output": "4"
        },
        {
            "input": "n = 3, edges = [[0,1],[0,2],[1,2]]",
            "output": "1"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Number of Connected Components in an Undirected Graph\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void numberofConnectedComponentsinanUndirectedGraph() {\n        // Implementation for Number of Connected Components in an Undirected Graph\n    }\n};\n",
        "python": "# Problem: Number of Connected Components in an Undirected Graph\nclass Solution:\n    def numberofConnectedComponentsinanUndirectedGraph(self):\n        pass\n",
        "javascript": "/**\n * Problem: Number of Connected Components in an Undirected Graph\n */\nfunction numberofConnectedComponentsinanUndirectedGraph() {\n}\n",
        "java": "// Problem: Number of Connected Components in an Undirected Graph\npublic class Solution {\n    public void numberofConnectedComponentsinanUndirectedGraph() {\n    }\n}\n"
    }
},
  "Is Graph Bipartite?": {
    "description": "Implement an optimal solution for Is Graph Bipartite? (Graph - DFS (Connectivity)) using proper algorithms and data structures.",
    "sampleInput": "graph = [[1,2,3],[0,2],[0,1,3],[0,2]]",
    "sampleOutput": "false",
    "explanation": "Contains odd-length cycle (0-1-2-0), cannot be 2-colored.",
    "testCases": [
        {
            "input": "graph = [[1,3],[0,2],[1,3],[0,2]]",
            "output": "true"
        },
        {
            "input": "graph = [[]]",
            "output": "true"
        },
        {
            "input": "graph = [[4],[4],[4],[4],[0,1,2,3]]",
            "output": "true"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Is Graph Bipartite?\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void isGraphBipartite() {\n        // Implementation for Is Graph Bipartite?\n    }\n};\n",
        "python": "# Problem: Is Graph Bipartite?\nclass Solution:\n    def isGraphBipartite(self):\n        pass\n",
        "javascript": "/**\n * Problem: Is Graph Bipartite?\n */\nfunction isGraphBipartite() {\n}\n",
        "java": "// Problem: Is Graph Bipartite?\npublic class Solution {\n    public void isGraphBipartite() {\n    }\n}\n"
    }
},
  "Keys and Rooms": {
    "description": "Implement an optimal solution for Keys and Rooms (Graph - DFS (Connectivity)) using proper algorithms and data structures.",
    "sampleInput": "rooms = [[1],[2],[3],[]]",
    "sampleOutput": "true",
    "explanation": "Start at room 0 -> get key 1 -> room 1 -> key 2 -> room 2 -> key 3 -> room 3. All rooms visited.",
    "testCases": [
        {
            "input": "rooms = [[1,3],[3,0,1],[2],[0]]",
            "output": "false"
        },
        {
            "input": "rooms = [[]]",
            "output": "true"
        },
        {
            "input": "rooms = [[1,2],[],[]]",
            "output": "true"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Keys and Rooms\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void keysandRooms() {\n        // Implementation for Keys and Rooms\n    }\n};\n",
        "python": "# Problem: Keys and Rooms\nclass Solution:\n    def keysandRooms(self):\n        pass\n",
        "javascript": "/**\n * Problem: Keys and Rooms\n */\nfunction keysandRooms() {\n}\n",
        "java": "// Problem: Keys and Rooms\npublic class Solution {\n    public void keysandRooms() {\n    }\n}\n"
    }
},
  "Reconstruct Itinerary": {
    "description": "Implement an optimal solution for Reconstruct Itinerary (Graph - DFS (Connectivity)) using proper algorithms and data structures.",
    "sampleInput": "tickets = [[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]",
    "sampleOutput": "[\"JFK\", \"MUC\", \"LHR\", \"SFO\", \"SJC\"]",
    "explanation": "Valid Eulerian path starting at JFK.",
    "testCases": [
        {
            "input": "tickets = [[\"JFK\",\"SFO\"],[\"JFK\",\"ATL\"],[\"SFO\",\"ATL\"],[\"ATL\",\"JFK\"],[\"ATL\",\"SFO\"]]",
            "output": "[\"JFK\", \"ATL\", \"JFK\", \"SFO\", \"ATL\", \"SFO\"]"
        },
        {
            "input": "tickets = [[\"JFK\",\"A\"],[\"A\",\"JFK\"],[\"JFK\",\"B\"]]",
            "output": "[\"JFK\", \"A\", \"JFK\", \"B\"]"
        },
        {
            "input": "tickets = [[\"JFK\",\"KUL\"]]",
            "output": "[\"JFK\", \"KUL\"]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Reconstruct Itinerary\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reconstructItinerary() {\n        // Implementation for Reconstruct Itinerary\n    }\n};\n",
        "python": "# Problem: Reconstruct Itinerary\nclass Solution:\n    def reconstructItinerary(self):\n        pass\n",
        "javascript": "/**\n * Problem: Reconstruct Itinerary\n */\nfunction reconstructItinerary() {\n}\n",
        "java": "// Problem: Reconstruct Itinerary\npublic class Solution {\n    public void reconstructItinerary() {\n    }\n}\n"
    }
},
  "All Paths From Source to Target": {
    "description": "Implement an optimal solution for All Paths From Source to Target (Graph - DFS (Connectivity)) using proper algorithms and data structures.",
    "sampleInput": "graph = [[1,2],[3],[3],[]]",
    "sampleOutput": "[[0,1,3],[0,2,3]]",
    "explanation": "Two distinct paths from node 0 to node 3.",
    "testCases": [
        {
            "input": "graph = [[4,3,1],[3,2,4],[3],[4],[]]",
            "output": "[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]"
        },
        {
            "input": "graph = [[1],[]]",
            "output": "[[0,1]]"
        },
        {
            "input": "graph = [[1,2,3],[2,3],[3],[]]",
            "output": "[[0,1,2,3],[0,1,3],[0,2,3],[0,3]]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: All Paths From Source to Target\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void allPathsFromSourcetoTarget() {\n        // Implementation for All Paths From Source to Target\n    }\n};\n",
        "python": "# Problem: All Paths From Source to Target\nclass Solution:\n    def allPathsFromSourcetoTarget(self):\n        pass\n",
        "javascript": "/**\n * Problem: All Paths From Source to Target\n */\nfunction allPathsFromSourcetoTarget() {\n}\n",
        "java": "// Problem: All Paths From Source to Target\npublic class Solution {\n    public void allPathsFromSourcetoTarget() {\n    }\n}\n"
    }
},
  "Detect Cycle in Undirected Graph": {
    "description": "Implement an optimal solution for Detect Cycle in Undirected Graph (Graph - DFS (Connectivity)) using proper algorithms and data structures.",
    "sampleInput": "V = 5, E = 5, adj = [[1],[0,2,4],[1,3],[2,4],[1,3]]",
    "sampleOutput": "1",
    "explanation": "Cycle exists (1-2-3-4-1).",
    "testCases": [
        {
            "input": "V = 4, E = 3, adj = [[1],[0,2],[1,3],[2]]",
            "output": "0"
        },
        {
            "input": "V = 3, E = 3, adj = [[1,2],[0,2],[0,1]]",
            "output": "1"
        },
        {
            "input": "V = 1, E = 0, adj = [[]]",
            "output": "0"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Detect Cycle in Undirected Graph\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void detectCycleinUndirectedGraph() {\n        // Implementation for Detect Cycle in Undirected Graph\n    }\n};\n",
        "python": "# Problem: Detect Cycle in Undirected Graph\nclass Solution:\n    def detectCycleinUndirectedGraph(self):\n        pass\n",
        "javascript": "/**\n * Problem: Detect Cycle in Undirected Graph\n */\nfunction detectCycleinUndirectedGraph() {\n}\n",
        "java": "// Problem: Detect Cycle in Undirected Graph\npublic class Solution {\n    public void detectCycleinUndirectedGraph() {\n    }\n}\n"
    }
},
  "Course Schedule": {
    "description": "Implement an optimal solution for Course Schedule (Graph - Topological Sort) using proper algorithms and data structures.",
    "sampleInput": "numCourses = 2, prerequisites = [[1,0]]",
    "sampleOutput": "true",
    "explanation": "Take course 0 first, then course 1.",
    "testCases": [
        {
            "input": "numCourses = 2, prerequisites = [[1,0],[0,1]]",
            "output": "false"
        },
        {
            "input": "numCourses = 3, prerequisites = [[1,0],[2,1]]",
            "output": "true"
        },
        {
            "input": "numCourses = 1, prerequisites = []",
            "output": "true"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Course Schedule\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void courseSchedule() {\n        // Implementation for Course Schedule\n    }\n};\n",
        "python": "# Problem: Course Schedule\nclass Solution:\n    def courseSchedule(self):\n        pass\n",
        "javascript": "/**\n * Problem: Course Schedule\n */\nfunction courseSchedule() {\n}\n",
        "java": "// Problem: Course Schedule\npublic class Solution {\n    public void courseSchedule() {\n    }\n}\n"
    }
},
  "Course Schedule II": {
    "description": "Implement an optimal solution for Course Schedule II (Graph - Topological Sort) using proper algorithms and data structures.",
    "sampleInput": "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
    "sampleOutput": "[0, 1, 2, 3]",
    "explanation": "Valid topological ordering of courses.",
    "testCases": [
        {
            "input": "numCourses = 2, prerequisites = [[1,0]]",
            "output": "[0, 1]"
        },
        {
            "input": "numCourses = 1, prerequisites = []",
            "output": "[0]"
        },
        {
            "input": "numCourses = 2, prerequisites = [[1,0],[0,1]]",
            "output": "[]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Course Schedule II\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void courseScheduleII() {\n        // Implementation for Course Schedule II\n    }\n};\n",
        "python": "# Problem: Course Schedule II\nclass Solution:\n    def courseScheduleII(self):\n        pass\n",
        "javascript": "/**\n * Problem: Course Schedule II\n */\nfunction courseScheduleII() {\n}\n",
        "java": "// Problem: Course Schedule II\npublic class Solution {\n    public void courseScheduleII() {\n    }\n}\n"
    }
},
  "Course Schedule IV": {
    "description": "Implement an optimal solution for Course Schedule IV (Graph - Topological Sort) using proper algorithms and data structures.",
    "sampleInput": "numCourses = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]",
    "sampleOutput": "[false, true]",
    "explanation": "Course 0 is a prerequisite for course 1.",
    "testCases": [
        {
            "input": "numCourses = 2, prerequisites = [], queries = [[1,0],[0,1]]",
            "output": "[false, false]"
        },
        {
            "input": "numCourses = 3, prerequisites = [[1,2],[1,0],[2,0]], queries = [[1,0],[1,2]]",
            "output": "[true, true]"
        },
        {
            "input": "numCourses = 3, prerequisites = [[0,1],[1,2]], queries = [[0,2]]",
            "output": "[true]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Course Schedule IV\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void courseScheduleIV() {\n        // Implementation for Course Schedule IV\n    }\n};\n",
        "python": "# Problem: Course Schedule IV\nclass Solution:\n    def courseScheduleIV(self):\n        pass\n",
        "javascript": "/**\n * Problem: Course Schedule IV\n */\nfunction courseScheduleIV() {\n}\n",
        "java": "// Problem: Course Schedule IV\npublic class Solution {\n    public void courseScheduleIV() {\n    }\n}\n"
    }
},
  "Alien Dictionary": {
    "description": "Implement an optimal solution for Alien Dictionary (Graph - Topological Sort) using proper algorithms and data structures.",
    "sampleInput": "words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]",
    "sampleOutput": "\"wertf\"",
    "explanation": "Topological order of alien alphabet derived from lexicographical word comparisons.",
    "testCases": [
        {
            "input": "words = [\"z\",\"x\"]",
            "output": "\"zx\""
        },
        {
            "input": "words = [\"z\",\"x\",\"z\"]",
            "output": "\"\""
        },
        {
            "input": "words = [\"abc\",\"ab\"]",
            "output": "\"\""
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Alien Dictionary\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void alienDictionary() {\n        // Implementation for Alien Dictionary\n    }\n};\n",
        "python": "# Problem: Alien Dictionary\nclass Solution:\n    def alienDictionary(self):\n        pass\n",
        "javascript": "/**\n * Problem: Alien Dictionary\n */\nfunction alienDictionary() {\n}\n",
        "java": "// Problem: Alien Dictionary\npublic class Solution {\n    public void alienDictionary() {\n    }\n}\n"
    }
},
  "Minimum Height Trees": {
    "description": "Implement an optimal solution for Minimum Height Trees (Graph - Topological Sort) using proper algorithms and data structures.",
    "sampleInput": "n = 4, edges = [[1,0],[1,2],[1,3]]",
    "sampleOutput": "[1]",
    "explanation": "Node 1 is the unique root minimizing tree height.",
    "testCases": [
        {
            "input": "n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]",
            "output": "[3, 4]"
        },
        {
            "input": "n = 1, edges = []",
            "output": "[0]"
        },
        {
            "input": "n = 2, edges = [[0,1]]",
            "output": "[0, 1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Minimum Height Trees\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void minimumHeightTrees() {\n        // Implementation for Minimum Height Trees\n    }\n};\n",
        "python": "# Problem: Minimum Height Trees\nclass Solution:\n    def minimumHeightTrees(self):\n        pass\n",
        "javascript": "/**\n * Problem: Minimum Height Trees\n */\nfunction minimumHeightTrees() {\n}\n",
        "java": "// Problem: Minimum Height Trees\npublic class Solution {\n    public void minimumHeightTrees() {\n    }\n}\n"
    }
},
  "Sequence Reconstruction": {
    "description": "Implement an optimal solution for Sequence Reconstruction (Graph - Topological Sort) using proper algorithms and data structures.",
    "sampleInput": "nums = [1,2,3], sequences = [[1,2],[1,3]]",
    "sampleOutput": "false",
    "explanation": "[1,2,3] cannot be uniquely reconstructed because relative order of 2 and 3 is ambiguous.",
    "testCases": [
        {
            "input": "nums = [1,2,3], sequences = [[1,2],[1,3],[2,3]]",
            "output": "true"
        },
        {
            "input": "nums = [1,2,3], sequences = [[1,2]]",
            "output": "false"
        },
        {
            "input": "nums = [1], sequences = [[1]]",
            "output": "true"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Sequence Reconstruction\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void sequenceReconstruction() {\n        // Implementation for Sequence Reconstruction\n    }\n};\n",
        "python": "# Problem: Sequence Reconstruction\nclass Solution:\n    def sequenceReconstruction(self):\n        pass\n",
        "javascript": "/**\n * Problem: Sequence Reconstruction\n */\nfunction sequenceReconstruction() {\n}\n",
        "java": "// Problem: Sequence Reconstruction\npublic class Solution {\n    public void sequenceReconstruction() {\n    }\n}\n"
    }
},
  "Find Eventual Safe States": {
    "description": "Implement an optimal solution for Find Eventual Safe States (Graph - Topological Sort) using proper algorithms and data structures.",
    "sampleInput": "graph = [[1,2],[2,3],[5],[0],[5],[],[]]",
    "sampleOutput": "[2, 4, 5, 6]",
    "explanation": "Nodes 2, 4, 5, 6 lead strictly to terminal nodes without entering cycles.",
    "testCases": [
        {
            "input": "graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]",
            "output": "[4]"
        },
        {
            "input": "graph = [[]]",
            "output": "[0]"
        },
        {
            "input": "graph = [[1],[2],[0]]",
            "output": "[]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Find Eventual Safe States\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void findEventualSafeStates() {\n        // Implementation for Find Eventual Safe States\n    }\n};\n",
        "python": "# Problem: Find Eventual Safe States\nclass Solution:\n    def findEventualSafeStates(self):\n        pass\n",
        "javascript": "/**\n * Problem: Find Eventual Safe States\n */\nfunction findEventualSafeStates() {\n}\n",
        "java": "// Problem: Find Eventual Safe States\npublic class Solution {\n    public void findEventualSafeStates() {\n    }\n}\n"
    }
},
  "Redundant Connection": {
    "description": "Implement an optimal solution for Redundant Connection (Graph - MST / Union-Find) using proper algorithms and data structures.",
    "sampleInput": "edges = [[1,2],[1,3],[2,3]]",
    "sampleOutput": "[2, 3]",
    "explanation": "Edge [2,3] introduces a cycle in the tree.",
    "testCases": [
        {
            "input": "edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]",
            "output": "[1, 4]"
        },
        {
            "input": "edges = [[1,2],[2,3],[1,3]]",
            "output": "[1, 3]"
        },
        {
            "input": "edges = [[3,4],[1,2],[2,4],[3,5],[2,5]]",
            "output": "[2, 5]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Redundant Connection\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void redundantConnection() {\n        // Implementation for Redundant Connection\n    }\n};\n",
        "python": "# Problem: Redundant Connection\nclass Solution:\n    def redundantConnection(self):\n        pass\n",
        "javascript": "/**\n * Problem: Redundant Connection\n */\nfunction redundantConnection() {\n}\n",
        "java": "// Problem: Redundant Connection\npublic class Solution {\n    public void redundantConnection() {\n    }\n}\n"
    }
},
  "Number of Operations to Make Network Connected": {
    "description": "Implement an optimal solution for Number of Operations to Make Network Connected (Graph - MST / Union-Find) using proper algorithms and data structures.",
    "sampleInput": "n = 4, connections = [[0,1],[0,2],[1,2]]",
    "sampleOutput": "1",
    "explanation": "Use redundant cable [1,2] to connect component {3}.",
    "testCases": [
        {
            "input": "n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]",
            "output": "2"
        },
        {
            "input": "n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]",
            "output": "-1"
        },
        {
            "input": "n = 5, connections = [[0,1],[2,3]]",
            "output": "-1"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Number of Operations to Make Network Connected\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void numberofOperationstoMakeNetworkConnected() {\n        // Implementation for Number of Operations to Make Network Connected\n    }\n};\n",
        "python": "# Problem: Number of Operations to Make Network Connected\nclass Solution:\n    def numberofOperationstoMakeNetworkConnected(self):\n        pass\n",
        "javascript": "/**\n * Problem: Number of Operations to Make Network Connected\n */\nfunction numberofOperationstoMakeNetworkConnected() {\n}\n",
        "java": "// Problem: Number of Operations to Make Network Connected\npublic class Solution {\n    public void numberofOperationstoMakeNetworkConnected() {\n    }\n}\n"
    }
},
  "Min Cost to Connect All Points": {
    "description": "Implement an optimal solution for Min Cost to Connect All Points (Graph - MST / Union-Find) using proper algorithms and data structures.",
    "sampleInput": "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]",
    "sampleOutput": "20",
    "explanation": "Kruskal/Prim algorithm MST weight sum = 20.",
    "testCases": [
        {
            "input": "points = [[3,12],[-2,5],[-4,1]]",
            "output": "18"
        },
        {
            "input": "points = [[0,0]]",
            "output": "0"
        },
        {
            "input": "points = [[0,0],[1,1],[1,0],[0,1]]",
            "output": "3"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Min Cost to Connect All Points\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void minCosttoConnectAllPoints() {\n        // Implementation for Min Cost to Connect All Points\n    }\n};\n",
        "python": "# Problem: Min Cost to Connect All Points\nclass Solution:\n    def minCosttoConnectAllPoints(self):\n        pass\n",
        "javascript": "/**\n * Problem: Min Cost to Connect All Points\n */\nfunction minCosttoConnectAllPoints() {\n}\n",
        "java": "// Problem: Min Cost to Connect All Points\npublic class Solution {\n    public void minCosttoConnectAllPoints() {\n    }\n}\n"
    }
},
  "Accounts Merge": {
    "description": "Implement an optimal solution for Accounts Merge (Graph - MST / Union-Find) using proper algorithms and data structures.",
    "sampleInput": "accounts = [[\"John\",\"johnsmith@mail.com\",\"john_newyork@mail.com\"],[\"John\",\"johnsmith@mail.com\",\"john00@mail.com\"],[\"Mary\",\"mary@mail.com\"],[\"John\",\"johnnybravo@mail.com\"]]",
    "sampleOutput": "[[\"John\",\"john00@mail.com\",\"john_newyork@mail.com\",\"johnsmith@mail.com\"],[\"Mary\",\"mary@mail.com\"],[\"John\",\"johnnybravo@mail.com\"]]",
    "explanation": "First two accounts merged via shared email johnsmith@mail.com.",
    "testCases": [
        {
            "input": "accounts = [[\"Gabe\",\"Gabe0@m.co\",\"Gabe3@m.co\"],[\"Gabe\",\"Gabe1@m.co\",\"Gabe2@m.co\"],[\"Gabe\",\"Gabe0@m.co\",\"Gabe2@m.co\"]]",
            "output": "[[\"Gabe\",\"Gabe0@m.co\",\"Gabe1@m.co\",\"Gabe2@m.co\",\"Gabe3@m.co\"]]"
        },
        {
            "input": "accounts = [[\"A\",\"a@m.co\"]]",
            "output": "[[\"A\",\"a@m.co\"]]"
        },
        {
            "input": "accounts = [[\"A\",\"a@m.co\"],[\"B\",\"b@m.co\"]]",
            "output": "[[\"A\",\"a@m.co\"],[\"B\",\"b@m.co\"]]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Accounts Merge\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void accountsMerge() {\n        // Implementation for Accounts Merge\n    }\n};\n",
        "python": "# Problem: Accounts Merge\nclass Solution:\n    def accountsMerge(self):\n        pass\n",
        "javascript": "/**\n * Problem: Accounts Merge\n */\nfunction accountsMerge() {\n}\n",
        "java": "// Problem: Accounts Merge\npublic class Solution {\n    public void accountsMerge() {\n    }\n}\n"
    }
},
  "Most Stones Removed with Same Row or Column": {
    "description": "Implement an optimal solution for Most Stones Removed with Same Row or Column (Graph - MST / Union-Find) using proper algorithms and data structures.",
    "sampleInput": "stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]",
    "sampleOutput": "5",
    "explanation": "5 stones can be removed leaving 1 stone in connected component.",
    "testCases": [
        {
            "input": "stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]",
            "output": "3"
        },
        {
            "input": "stones = [[0,0]]",
            "output": "0"
        },
        {
            "input": "stones = [[0,0],[1,1],[2,2]]",
            "output": "0"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Most Stones Removed with Same Row or Column\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void mostStonesRemovedwithSameRoworColumn() {\n        // Implementation for Most Stones Removed with Same Row or Column\n    }\n};\n",
        "python": "# Problem: Most Stones Removed with Same Row or Column\nclass Solution:\n    def mostStonesRemovedwithSameRoworColumn(self):\n        pass\n",
        "javascript": "/**\n * Problem: Most Stones Removed with Same Row or Column\n */\nfunction mostStonesRemovedwithSameRoworColumn() {\n}\n",
        "java": "// Problem: Most Stones Removed with Same Row or Column\npublic class Solution {\n    public void mostStonesRemovedwithSameRoworColumn() {\n    }\n}\n"
    }
},
  "Smallest String With Swaps": {
    "description": "Implement an optimal solution for Smallest String With Swaps (Graph - MST / Union-Find) using proper algorithms and data structures.",
    "sampleInput": "s = \"dcab\", pairs = [[0,3],[1,2]]",
    "sampleOutput": "\"bacd\"",
    "explanation": "Sort characters independently within Union-Find connected indices {0,3} and {1,2}.",
    "testCases": [
        {
            "input": "s = \"dcab\", pairs = [[0,3],[1,2],[0,2]]",
            "output": "\"abcd\""
        },
        {
            "input": "s = \"cba\", pairs = [[0,1],[1,2]]",
            "output": "\"abc\""
        },
        {
            "input": "s = \"hello\", pairs = []",
            "output": "\"hello\""
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Smallest String With Swaps\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void smallestStringWithSwaps() {\n        // Implementation for Smallest String With Swaps\n    }\n};\n",
        "python": "# Problem: Smallest String With Swaps\nclass Solution:\n    def smallestStringWithSwaps(self):\n        pass\n",
        "javascript": "/**\n * Problem: Smallest String With Swaps\n */\nfunction smallestStringWithSwaps() {\n}\n",
        "java": "// Problem: Smallest String With Swaps\npublic class Solution {\n    public void smallestStringWithSwaps() {\n    }\n}\n"
    }
},
  "Satisfiability of Equality Equations": {
    "description": "Implement an optimal solution for Satisfiability of Equality Equations (Graph - MST / Union-Find) using proper algorithms and data structures.",
    "sampleInput": "equations = [\"a==b\",\"b!=a\"]",
    "sampleOutput": "false",
    "explanation": "a==b implies a and b in same component, so b!=a creates a contradiction.",
    "testCases": [
        {
            "input": "equations = [\"b==a\",\"a==b\"]",
            "output": "true"
        },
        {
            "input": "equations = [\"a==b\",\"b==c\",\"a==c\"]",
            "output": "true"
        },
        {
            "input": "equations = [\"a==b\",\"b!=c\",\"c==a\"]",
            "output": "false"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Satisfiability of Equality Equations\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void satisfiabilityofEqualityEquations() {\n        // Implementation for Satisfiability of Equality Equations\n    }\n};\n",
        "python": "# Problem: Satisfiability of Equality Equations\nclass Solution:\n    def satisfiabilityofEqualityEquations(self):\n        pass\n",
        "javascript": "/**\n * Problem: Satisfiability of Equality Equations\n */\nfunction satisfiabilityofEqualityEquations() {\n}\n",
        "java": "// Problem: Satisfiability of Equality Equations\npublic class Solution {\n    public void satisfiabilityofEqualityEquations() {\n    }\n}\n"
    }
},
  "Network Delay Time": {
    "description": "Implement an optimal solution for Network Delay Time (Graph - Dijkstra (Weighted)) using proper algorithms and data structures.",
    "sampleInput": "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2",
    "sampleOutput": "2",
    "explanation": "Signal reaches node 1 at t=1, node 3 at t=1, node 4 at t=2. Max time = 2.",
    "testCases": [
        {
            "input": "times = [[1,2,1]], n = 2, k = 1",
            "output": "1"
        },
        {
            "input": "times = [[1,2,1]], n = 2, k = 2",
            "output": "-1"
        },
        {
            "input": "times = [[1,2,1],[2,3,2],[1,3,4]], n = 3, k = 1",
            "output": "3"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Network Delay Time\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void networkDelayTime() {\n        // Implementation for Network Delay Time\n    }\n};\n",
        "python": "# Problem: Network Delay Time\nclass Solution:\n    def networkDelayTime(self):\n        pass\n",
        "javascript": "/**\n * Problem: Network Delay Time\n */\nfunction networkDelayTime() {\n}\n",
        "java": "// Problem: Network Delay Time\npublic class Solution {\n    public void networkDelayTime() {\n    }\n}\n"
    }
},
  "Path with Maximum Probability": {
    "description": "Implement an optimal solution for Path with Maximum Probability (Graph - Dijkstra (Weighted)) using proper algorithms and data structures.",
    "sampleInput": "n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2",
    "sampleOutput": "0.25000",
    "explanation": "Path 0 -> 1 -> 2 has probability 0.5 * 0.5 = 0.25 > direct path 0.2.",
    "testCases": [
        {
            "input": "n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2",
            "output": "0.30000"
        },
        {
            "input": "n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2",
            "output": "0.00000"
        },
        {
            "input": "n = 1, edges = [], succProb = [], start = 0, end = 0",
            "output": "1.00000"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Path with Maximum Probability\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void pathwithMaximumProbability() {\n        // Implementation for Path with Maximum Probability\n    }\n};\n",
        "python": "# Problem: Path with Maximum Probability\nclass Solution:\n    def pathwithMaximumProbability(self):\n        pass\n",
        "javascript": "/**\n * Problem: Path with Maximum Probability\n */\nfunction pathwithMaximumProbability() {\n}\n",
        "java": "// Problem: Path with Maximum Probability\npublic class Solution {\n    public void pathwithMaximumProbability() {\n    }\n}\n"
    }
},
  "Path With Minimum Effort": {
    "description": "Implement an optimal solution for Path With Minimum Effort (Graph - Dijkstra (Weighted)) using proper algorithms and data structures.",
    "sampleInput": "heights = [[1,2,2],[3,8,2],[5,3,5]]",
    "sampleOutput": "2",
    "explanation": "Path [1,2,2,2,5] has maximum height difference of 2.",
    "testCases": [
        {
            "input": "heights = [[1,2,3],[3,8,4],[5,3,5]]",
            "output": "1"
        },
        {
            "input": "heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]",
            "output": "0"
        },
        {
            "input": "heights = [[10]]",
            "output": "0"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Path With Minimum Effort\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void pathWithMinimumEffort() {\n        // Implementation for Path With Minimum Effort\n    }\n};\n",
        "python": "# Problem: Path With Minimum Effort\nclass Solution:\n    def pathWithMinimumEffort(self):\n        pass\n",
        "javascript": "/**\n * Problem: Path With Minimum Effort\n */\nfunction pathWithMinimumEffort() {\n}\n",
        "java": "// Problem: Path With Minimum Effort\npublic class Solution {\n    public void pathWithMinimumEffort() {\n    }\n}\n"
    }
},
  "Cheapest Flights Within K Stops": {
    "description": "Implement an optimal solution for Cheapest Flights Within K Stops (Graph - Dijkstra (Weighted)) using proper algorithms and data structures.",
    "sampleInput": "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1",
    "sampleOutput": "700",
    "explanation": "Cheapest path with <= 1 stop is 0 -> 1 -> 3 (cost 100 + 600 = 700).",
    "testCases": [
        {
            "input": "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1",
            "output": "200"
        },
        {
            "input": "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0",
            "output": "500"
        },
        {
            "input": "n = 2, flights = [[0,1,500]], src = 0, dst = 1, k = 0",
            "output": "500"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Cheapest Flights Within K Stops\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void cheapestFlightsWithinKStops() {\n        // Implementation for Cheapest Flights Within K Stops\n    }\n};\n",
        "python": "# Problem: Cheapest Flights Within K Stops\nclass Solution:\n    def cheapestFlightsWithinKStops(self):\n        pass\n",
        "javascript": "/**\n * Problem: Cheapest Flights Within K Stops\n */\nfunction cheapestFlightsWithinKStops() {\n}\n",
        "java": "// Problem: Cheapest Flights Within K Stops\npublic class Solution {\n    public void cheapestFlightsWithinKStops() {\n    }\n}\n"
    }
},
  "Swim in Rising Water": {
    "description": "Implement an optimal solution for Swim in Rising Water (Graph - Dijkstra (Weighted)) using proper algorithms and data structures.",
    "sampleInput": "grid = [[0,2],[1,3]]",
    "sampleOutput": "3",
    "explanation": "At t=3, water level is 3, allowing swim from (0,0) to (1,1).",
    "testCases": [
        {
            "input": "grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]",
            "output": "16"
        },
        {
            "input": "grid = [[0]]",
            "output": "0"
        },
        {
            "input": "grid = [[3,2],[0,1]]",
            "output": "3"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Swim in Rising Water\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void swiminRisingWater() {\n        // Implementation for Swim in Rising Water\n    }\n};\n",
        "python": "# Problem: Swim in Rising Water\nclass Solution:\n    def swiminRisingWater(self):\n        pass\n",
        "javascript": "/**\n * Problem: Swim in Rising Water\n */\nfunction swiminRisingWater() {\n}\n",
        "java": "// Problem: Swim in Rising Water\npublic class Solution {\n    public void swiminRisingWater() {\n    }\n}\n"
    }
},
  "Shortest Path Visiting All Nodes": {
    "description": "Implement an optimal solution for Shortest Path Visiting All Nodes (Graph - Dijkstra (Weighted)) using proper algorithms and data structures.",
    "sampleInput": "graph = [[1,2,3],[0],[0],[0]]",
    "sampleOutput": "4",
    "explanation": "BFS/Dijkstra with bitmask state (node, visitedMask): 1->0->2->0->3 (4 edges).",
    "testCases": [
        {
            "input": "graph = [[1],[0,2,4],[1,3,4],[2],[1,2]]",
            "output": "4"
        },
        {
            "input": "graph = [[]]",
            "output": "0"
        },
        {
            "input": "graph = [[1],[0]]",
            "output": "1"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Shortest Path Visiting All Nodes\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void shortestPathVisitingAllNodes() {\n        // Implementation for Shortest Path Visiting All Nodes\n    }\n};\n",
        "python": "# Problem: Shortest Path Visiting All Nodes\nclass Solution:\n    def shortestPathVisitingAllNodes(self):\n        pass\n",
        "javascript": "/**\n * Problem: Shortest Path Visiting All Nodes\n */\nfunction shortestPathVisitingAllNodes() {\n}\n",
        "java": "// Problem: Shortest Path Visiting All Nodes\npublic class Solution {\n    public void shortestPathVisitingAllNodes() {\n    }\n}\n"
    }
},
  "Minimum Cost to Make at Least One Valid Path in a Grid": {
    "description": "Implement an optimal solution for Minimum Cost to Make at Least One Valid Path in a Grid (Graph - Dijkstra (Weighted)) using proper algorithms and data structures.",
    "sampleInput": "grid = [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]",
    "sampleOutput": "3",
    "explanation": "0-1 BFS or Dijkstra to change arrow directions with minimum cost.",
    "testCases": [
        {
            "input": "grid = [[1,1,3],[3,2,2],[1,1,4]]",
            "output": "0"
        },
        {
            "input": "grid = [[1,2],[4,3]]",
            "output": "1"
        },
        {
            "input": "grid = [[2,2,2],[2,2,2]]",
            "output": "3"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Minimum Cost to Make at Least One Valid Path in a Grid\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void minimumCosttoMakeatLeastOneValidPathinaGrid() {\n        // Implementation for Minimum Cost to Make at Least One Valid Path in a Grid\n    }\n};\n",
        "python": "# Problem: Minimum Cost to Make at Least One Valid Path in a Grid\nclass Solution:\n    def minimumCosttoMakeatLeastOneValidPathinaGrid(self):\n        pass\n",
        "javascript": "/**\n * Problem: Minimum Cost to Make at Least One Valid Path in a Grid\n */\nfunction minimumCosttoMakeatLeastOneValidPathinaGrid() {\n}\n",
        "java": "// Problem: Minimum Cost to Make at Least One Valid Path in a Grid\npublic class Solution {\n    public void minimumCosttoMakeatLeastOneValidPathinaGrid() {\n    }\n}\n"
    }
},
  "Distance from the Source (Bellman-Ford Algorithm)": {
    "description": "Implement an optimal solution for Distance from the Source (Bellman-Ford Algorithm) (Graph - Bellman-Ford) using proper algorithms and data structures.",
    "sampleInput": "V = 3, edges = [[0,1,5],[1,0,3],[1,2,-1],[2,0,1]], S = 2",
    "sampleOutput": "[1, 4, 0]",
    "explanation": "Distances from source node 2: to 0 is 1, to 1 is 4, to 2 is 0.",
    "testCases": [
        {
            "input": "V = 2, edges = [[0,1,9]], S = 0",
            "output": "[0, 9]"
        },
        {
            "input": "V = 3, edges = [[0,1,-2],[1,2,-1],[2,0,-2]], S = 0",
            "output": "[-1]"
        },
        {
            "input": "V = 4, edges = [[0,1,1],[1,2,2],[2,3,3]], S = 0",
            "output": "[0, 1, 3, 6]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Distance from the Source (Bellman-Ford Algorithm)\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void distancefromtheSourceBellmanFordAlgorithm() {\n        // Implementation for Distance from the Source (Bellman-Ford Algorithm)\n    }\n};\n",
        "python": "# Problem: Distance from the Source (Bellman-Ford Algorithm)\nclass Solution:\n    def distancefromtheSourceBellmanFordAlgorithm(self):\n        pass\n",
        "javascript": "/**\n * Problem: Distance from the Source (Bellman-Ford Algorithm)\n */\nfunction distancefromtheSourceBellmanFordAlgorithm() {\n}\n",
        "java": "// Problem: Distance from the Source (Bellman-Ford Algorithm)\npublic class Solution {\n    public void distancefromtheSourceBellmanFordAlgorithm() {\n    }\n}\n"
    }
},
  "Shortest Path with Negative Edge Weights": {
    "description": "Implement an optimal solution for Shortest Path with Negative Edge Weights (Graph - Bellman-Ford) using proper algorithms and data structures.",
    "sampleInput": "V = 4, edges = [[0,1,4],[0,2,5],[1,3,2],[2,1,-3],[3,2,1]], S = 0",
    "sampleOutput": "[0, 2, 5, 4]",
    "explanation": "Path 0 -> 2 -> 1 gives distance 5 - 3 = 2 to node 1.",
    "testCases": [
        {
            "input": "V = 3, edges = [[0,1,-1],[1,2,-2],[2,0,-3]], S = 0",
            "output": "[-1]"
        },
        {
            "input": "V = 2, edges = [[0,1,-5]], S = 0",
            "output": "[0, -5]"
        },
        {
            "input": "V = 3, edges = [[0,1,3],[1,2,-4]], S = 0",
            "output": "[0, 3, -1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Shortest Path with Negative Edge Weights\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void shortestPathwithNegativeEdgeWeights() {\n        // Implementation for Shortest Path with Negative Edge Weights\n    }\n};\n",
        "python": "# Problem: Shortest Path with Negative Edge Weights\nclass Solution:\n    def shortestPathwithNegativeEdgeWeights(self):\n        pass\n",
        "javascript": "/**\n * Problem: Shortest Path with Negative Edge Weights\n */\nfunction shortestPathwithNegativeEdgeWeights() {\n}\n",
        "java": "// Problem: Shortest Path with Negative Edge Weights\npublic class Solution {\n    public void shortestPathwithNegativeEdgeWeights() {\n    }\n}\n"
    }
},
  "Find if there is a negative weight cycle in a graph": {
    "description": "Implement an optimal solution for Find if there is a negative weight cycle in a graph (Graph - Bellman-Ford) using proper algorithms and data structures.",
    "sampleInput": "n = 4, edges = [[0,1,1],[1,2,-2],[2,3,-3],[3,1,1]]",
    "sampleOutput": "1",
    "explanation": "Cycle 1 -> 2 -> 3 -> 1 has total weight -2 - 3 + 1 = -4 < 0.",
    "testCases": [
        {
            "input": "n = 3, edges = [[0,1,2],[1,2,3],[2,0,1]]",
            "output": "0"
        },
        {
            "input": "n = 2, edges = [[0,1,-1],[1,0,-1]]",
            "output": "1"
        },
        {
            "input": "n = 1, edges = []",
            "output": "0"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Find if there is a negative weight cycle in a graph\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void findifthereisanegativeweightcycleinagraph() {\n        // Implementation for Find if there is a negative weight cycle in a graph\n    }\n};\n",
        "python": "# Problem: Find if there is a negative weight cycle in a graph\nclass Solution:\n    def findifthereisanegativeweightcycleinagraph(self):\n        pass\n",
        "javascript": "/**\n * Problem: Find if there is a negative weight cycle in a graph\n */\nfunction findifthereisanegativeweightcycleinagraph() {\n}\n",
        "java": "// Problem: Find if there is a negative weight cycle in a graph\npublic class Solution {\n    public void findifthereisanegativeweightcycleinagraph() {\n    }\n}\n"
    }
},
  "Find the City With the Smallest Number of Neighbors at a Threshold Distance": {
    "description": "Implement an optimal solution for Find the City With the Smallest Number of Neighbors at a Threshold Distance (Graph - Floyd-Warshall) using proper algorithms and data structures.",
    "sampleInput": "n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4",
    "sampleOutput": "3",
    "explanation": "Reachable cities within distance 4: City 0 -> {1,2}, City 1 -> {0,2,3}, City 2 -> {0,1,3}, City 3 -> {1,2}. City 3 has smallest index among min count cities.",
    "testCases": [
        {
            "input": "n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2",
            "output": "0"
        },
        {
            "input": "n = 2, edges = [[0,1,5]], distanceThreshold = 4",
            "output": "1"
        },
        {
            "input": "n = 3, edges = [[0,1,1],[1,2,1],[0,2,3]], distanceThreshold = 1",
            "output": "2"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Find the City With the Smallest Number of Neighbors at a Threshold Distance\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void findtheCityWiththeSmallestNumberofNeighborsataThresholdDistance() {\n        // Implementation for Find the City With the Smallest Number of Neighbors at a Threshold Distance\n    }\n};\n",
        "python": "# Problem: Find the City With the Smallest Number of Neighbors at a Threshold Distance\nclass Solution:\n    def findtheCityWiththeSmallestNumberofNeighborsataThresholdDistance(self):\n        pass\n",
        "javascript": "/**\n * Problem: Find the City With the Smallest Number of Neighbors at a Threshold Distance\n */\nfunction findtheCityWiththeSmallestNumberofNeighborsataThresholdDistance() {\n}\n",
        "java": "// Problem: Find the City With the Smallest Number of Neighbors at a Threshold Distance\npublic class Solution {\n    public void findtheCityWiththeSmallestNumberofNeighborsataThresholdDistance() {\n    }\n}\n"
    }
},
  "All Pairs Shortest Path (Floyd Warshall)": {
    "description": "Implement an optimal solution for All Pairs Shortest Path (Floyd Warshall) (Graph - Floyd-Warshall) using proper algorithms and data structures.",
    "sampleInput": "matrix = [[0,1,43],[1,0,6],[INF,INF,0]]",
    "sampleOutput": "[[0,1,7],[1,0,6],[INF,INF,0]]",
    "explanation": "Floyd-Warshall updates shortest paths matrix in-place.",
    "testCases": [
        {
            "input": "matrix = [[0,5,INF,10],[INF,0,3,INF],[INF,INF,0,1],[INF,INF,INF,0]]",
            "output": "[[0,5,8,9],[INF,0,3,4],[INF,INF,0,1],[INF,INF,INF,0]]"
        },
        {
            "input": "matrix = [[0]]",
            "output": "[[0]]"
        },
        {
            "input": "matrix = [[0,2],[2,0]]",
            "output": "[[0,2],[2,0]]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: All Pairs Shortest Path (Floyd Warshall)\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void allPairsShortestPathFloydWarshall() {\n        // Implementation for All Pairs Shortest Path (Floyd Warshall)\n    }\n};\n",
        "python": "# Problem: All Pairs Shortest Path (Floyd Warshall)\nclass Solution:\n    def allPairsShortestPathFloydWarshall(self):\n        pass\n",
        "javascript": "/**\n * Problem: All Pairs Shortest Path (Floyd Warshall)\n */\nfunction allPairsShortestPathFloydWarshall() {\n}\n",
        "java": "// Problem: All Pairs Shortest Path (Floyd Warshall)\npublic class Solution {\n    public void allPairsShortestPathFloydWarshall() {\n    }\n}\n"
    }
},
  "Evaluate Division": {
    "description": "Implement an optimal solution for Evaluate Division (Graph - Floyd-Warshall) using proper algorithms and data structures.",
    "sampleInput": "equations = [[\"a\",\"b\"],[\"b\",\"c\"]], values = [2.0,3.0], queries = [[\"a\",\"c\"],[\"b\",\"a\"],[\"a\",\"e\"],[\"a\",\"a\"],[\"x\",\"x\"]]",
    "sampleOutput": "[6.00000, 0.50000, -1.00000, 1.00000, -1.00000]",
    "explanation": "a/b=2, b/c=3 => a/c=6, b/a=0.5. Undefined variables return -1.0.",
    "testCases": [
        {
            "input": "equations = [[\"a\",\"b\"],[\"b\",\"c\"],[\"bc\",\"cd\"]], values = [1.5,2.5,5.0], queries = [[\"a\",\"c\"],[\"c\",\"b\"]]",
            "output": "[3.75000, 0.40000]"
        },
        {
            "input": "equations = [[\"a\",\"b\"]], values = [0.5], queries = [[\"a\",\"b\"],[\"b\",\"a\"]]",
            "output": "[0.50000, 2.00000]"
        },
        {
            "input": "equations = [[\"x1\",\"x2\"],[\"x2\",\"x3\"]], values = [3.0,4.0], queries = [[\"x1\",\"x3\"]]",
            "output": "[12.00000]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Evaluate Division\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void evaluateDivision() {\n        // Implementation for Evaluate Division\n    }\n};\n",
        "python": "# Problem: Evaluate Division\nclass Solution:\n    def evaluateDivision(self):\n        pass\n",
        "javascript": "/**\n * Problem: Evaluate Division\n */\nfunction evaluateDivision() {\n}\n",
        "java": "// Problem: Evaluate Division\npublic class Solution {\n    public void evaluateDivision() {\n    }\n}\n"
    }
},
  "Kth Largest Element in an Array": {
    "description": "Implement an optimal solution for Kth Largest Element in an Array (Heap - Top-K Elements) using proper algorithms and data structures.",
    "sampleInput": "nums = [3, 2, 1, 5, 6, 4], k = 2",
    "sampleOutput": "5",
    "explanation": "2nd largest element in sorted order [6, 5, 4, 3, 2, 1] is 5.",
    "testCases": [
        {
            "input": "nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4",
            "output": "4"
        },
        {
            "input": "nums = [1], k = 1",
            "output": "1"
        },
        {
            "input": "nums = [7, 10, 4, 3, 20, 15], k = 3",
            "output": "10"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Kth Largest Element in an Array\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void kthLargestElementinanArray() {\n        // Implementation for Kth Largest Element in an Array\n    }\n};\n",
        "python": "# Problem: Kth Largest Element in an Array\nclass Solution:\n    def kthLargestElementinanArray(self):\n        pass\n",
        "javascript": "/**\n * Problem: Kth Largest Element in an Array\n */\nfunction kthLargestElementinanArray() {\n}\n",
        "java": "// Problem: Kth Largest Element in an Array\npublic class Solution {\n    public void kthLargestElementinanArray() {\n    }\n}\n"
    }
},
  "Top K Frequent Elements": {
    "description": "Implement an optimal solution for Top K Frequent Elements (Heap - Top-K Elements) using proper algorithms and data structures.",
    "sampleInput": "nums = [1, 1, 1, 2, 2, 3], k = 2",
    "sampleOutput": "[1, 2]",
    "explanation": "1 appears 3 times, 2 appears 2 times. Most frequent 2 elements are 1 and 2.",
    "testCases": [
        {
            "input": "nums = [1], k = 1",
            "output": "[1]"
        },
        {
            "input": "nums = [4, 4, 4, 6, 6, 7, 7, 7, 7], k = 1",
            "output": "[7]"
        },
        {
            "input": "nums = [-1, -1, 2, 2, 3], k = 2",
            "output": "[-1, 2]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Top K Frequent Elements\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void topKFrequentElements() {\n        // Implementation for Top K Frequent Elements\n    }\n};\n",
        "python": "# Problem: Top K Frequent Elements\nclass Solution:\n    def topKFrequentElements(self):\n        pass\n",
        "javascript": "/**\n * Problem: Top K Frequent Elements\n */\nfunction topKFrequentElements() {\n}\n",
        "java": "// Problem: Top K Frequent Elements\npublic class Solution {\n    public void topKFrequentElements() {\n    }\n}\n"
    }
},
  "Kth Smallest Element in a Sorted Matrix": {
    "description": "Implement an optimal solution for Kth Smallest Element in a Sorted Matrix (Heap - Top-K Elements) using proper algorithms and data structures.",
    "sampleInput": "matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8",
    "sampleOutput": "13",
    "explanation": "Matrix elements in sorted order: [1, 5, 9, 10, 11, 12, 13, 13, 15]. 8th smallest is 13.",
    "testCases": [
        {
            "input": "matrix = [[-5]], k = 1",
            "output": "-5"
        },
        {
            "input": "matrix = [[1,2],[1,3]], k = 2",
            "output": "1"
        },
        {
            "input": "matrix = [[1,3,5],[6,7,12],[11,14,14]], k = 6",
            "output": "11"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Kth Smallest Element in a Sorted Matrix\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void kthSmallestElementinaSortedMatrix() {\n        // Implementation for Kth Smallest Element in a Sorted Matrix\n    }\n};\n",
        "python": "# Problem: Kth Smallest Element in a Sorted Matrix\nclass Solution:\n    def kthSmallestElementinaSortedMatrix(self):\n        pass\n",
        "javascript": "/**\n * Problem: Kth Smallest Element in a Sorted Matrix\n */\nfunction kthSmallestElementinaSortedMatrix() {\n}\n",
        "java": "// Problem: Kth Smallest Element in a Sorted Matrix\npublic class Solution {\n    public void kthSmallestElementinaSortedMatrix() {\n    }\n}\n"
    }
},
  "K Closest Points to Origin": {
    "description": "Implement an optimal solution for K Closest Points to Origin (Heap - Top-K Elements) using proper algorithms and data structures.",
    "sampleInput": "points = [[1,3],[-2,2]], k = 1",
    "sampleOutput": "[[-2, 2]]",
    "explanation": "Distance of (1,3)^2 = 10, (-2,2)^2 = 8. (-2,2) is closer to origin.",
    "testCases": [
        {
            "input": "points = [[3,3],[5,-1],[-2,4]], k = 2",
            "output": "[[3, 3], [-2, 4]]"
        },
        {
            "input": "points = [[0,1],[1,0]], k = 2",
            "output": "[[0, 1], [1, 0]]"
        },
        {
            "input": "points = [[2,2]], k = 1",
            "output": "[[2, 2]]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: K Closest Points to Origin\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void kClosestPointstoOrigin() {\n        // Implementation for K Closest Points to Origin\n    }\n};\n",
        "python": "# Problem: K Closest Points to Origin\nclass Solution:\n    def kClosestPointstoOrigin(self):\n        pass\n",
        "javascript": "/**\n * Problem: K Closest Points to Origin\n */\nfunction kClosestPointstoOrigin() {\n}\n",
        "java": "// Problem: K Closest Points to Origin\npublic class Solution {\n    public void kClosestPointstoOrigin() {\n    }\n}\n"
    }
},
  "Sort Characters By Frequency": {
    "description": "Implement an optimal solution for Sort Characters By Frequency (Heap - Top-K Elements) using proper algorithms and data structures.",
    "sampleInput": "s = \"tree\"",
    "sampleOutput": "\"eert\"",
    "explanation": "'e' appears 2 times, 'r' and 't' appear 1 time each.",
    "testCases": [
        {
            "input": "s = \"cccaaa\"",
            "output": "\"aaaccc\""
        },
        {
            "input": "s = \"Aabb\"",
            "output": "\"bbAa\""
        },
        {
            "input": "s = \"z\"",
            "output": "\"z\""
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Sort Characters By Frequency\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void sortCharactersByFrequency() {\n        // Implementation for Sort Characters By Frequency\n    }\n};\n",
        "python": "# Problem: Sort Characters By Frequency\nclass Solution:\n    def sortCharactersByFrequency(self):\n        pass\n",
        "javascript": "/**\n * Problem: Sort Characters By Frequency\n */\nfunction sortCharactersByFrequency() {\n}\n",
        "java": "// Problem: Sort Characters By Frequency\npublic class Solution {\n    public void sortCharactersByFrequency() {\n    }\n}\n"
    }
},
  "Reorganize String": {
    "description": "Implement an optimal solution for Reorganize String (Heap - Top-K Elements) using proper algorithms and data structures.",
    "sampleInput": "s = \"aab\"",
    "sampleOutput": "\"aba\"",
    "explanation": "Reorganized string so no two adjacent characters are identical.",
    "testCases": [
        {
            "input": "s = \"aaab\"",
            "output": "\"\""
        },
        {
            "input": "s = \"vvvlo\"",
            "output": "\"vlvov\""
        },
        {
            "input": "s = \"a\"",
            "output": "\"a\""
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Reorganize String\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reorganizeString() {\n        // Implementation for Reorganize String\n    }\n};\n",
        "python": "# Problem: Reorganize String\nclass Solution:\n    def reorganizeString(self):\n        pass\n",
        "javascript": "/**\n * Problem: Reorganize String\n */\nfunction reorganizeString() {\n}\n",
        "java": "// Problem: Reorganize String\npublic class Solution {\n    public void reorganizeString() {\n    }\n}\n"
    }
},
  "Smallest Range Covering Elements from K Lists": {
    "description": "Implement an optimal solution for Smallest Range Covering Elements from K Lists (Heap - Merge K Sorted) using proper algorithms and data structures.",
    "sampleInput": "nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]",
    "sampleOutput": "[20, 24]",
    "explanation": "Range [20, 24] includes 24 from list 1, 20 from list 2, 22 from list 3.",
    "testCases": [
        {
            "input": "nums = [[1,2,3],[1,2,3],[1,2,3]]",
            "output": "[1, 1]"
        },
        {
            "input": "nums = [[10],[11]]",
            "output": "[10, 11]"
        },
        {
            "input": "nums = [[2,5,8],[3,6,9]]",
            "output": "[2, 3]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Smallest Range Covering Elements from K Lists\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void smallestRangeCoveringElementsfromKLists() {\n        // Implementation for Smallest Range Covering Elements from K Lists\n    }\n};\n",
        "python": "# Problem: Smallest Range Covering Elements from K Lists\nclass Solution:\n    def smallestRangeCoveringElementsfromKLists(self):\n        pass\n",
        "javascript": "/**\n * Problem: Smallest Range Covering Elements from K Lists\n */\nfunction smallestRangeCoveringElementsfromKLists() {\n}\n",
        "java": "// Problem: Smallest Range Covering Elements from K Lists\npublic class Solution {\n    public void smallestRangeCoveringElementsfromKLists() {\n    }\n}\n"
    }
},
  "Find K Pairs with Smallest Sums": {
    "description": "Implement an optimal solution for Find K Pairs with Smallest Sums (Heap - Merge K Sorted) using proper algorithms and data structures.",
    "sampleInput": "nums1 = [1,7,11], nums2 = [2,4,6], k = 3",
    "sampleOutput": "[[1, 2], [1, 4], [1, 6]]",
    "explanation": "First 3 pairs with smallest sums: (1,2)=3, (1,4)=5, (1,6)=7.",
    "testCases": [
        {
            "input": "nums1 = [1,1,2], nums2 = [1,2,3], k = 2",
            "output": "[[1, 1], [1, 1]]"
        },
        {
            "input": "nums1 = [1,2], nums2 = [3], k = 3",
            "output": "[[1, 3], [2, 3]]"
        },
        {
            "input": "nums1 = [2,4,6], nums2 = [1,7,11], k = 1",
            "output": "[[2, 1]]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Find K Pairs with Smallest Sums\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void findKPairswithSmallestSums() {\n        // Implementation for Find K Pairs with Smallest Sums\n    }\n};\n",
        "python": "# Problem: Find K Pairs with Smallest Sums\nclass Solution:\n    def findKPairswithSmallestSums(self):\n        pass\n",
        "javascript": "/**\n * Problem: Find K Pairs with Smallest Sums\n */\nfunction findKPairswithSmallestSums() {\n}\n",
        "java": "// Problem: Find K Pairs with Smallest Sums\npublic class Solution {\n    public void findKPairswithSmallestSums() {\n    }\n}\n"
    }
},
  "Sliding Window Maximum": {
    "description": "Implement an optimal solution for Sliding Window Maximum (Heap - Heap with Sliding Window) using proper algorithms and data structures.",
    "sampleInput": "nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3",
    "sampleOutput": "[3, 3, 5, 5, 6, 7]",
    "explanation": "Max values for windows of size 3.",
    "testCases": [
        {
            "input": "nums = [1]",
            "output": "[1]"
        },
        {
            "input": "nums = [9, 11], k = 2",
            "output": "[11]"
        },
        {
            "input": "nums = [4, -2], k = 2",
            "output": "[4]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Sliding Window Maximum\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void slidingWindowMaximum() {\n        // Implementation for Sliding Window Maximum\n    }\n};\n",
        "python": "# Problem: Sliding Window Maximum\nclass Solution:\n    def slidingWindowMaximum(self):\n        pass\n",
        "javascript": "/**\n * Problem: Sliding Window Maximum\n */\nfunction slidingWindowMaximum() {\n}\n",
        "java": "// Problem: Sliding Window Maximum\npublic class Solution {\n    public void slidingWindowMaximum() {\n    }\n}\n"
    }
},
  "Sliding Window Median": {
    "description": "Implement an optimal solution for Sliding Window Median (Heap - Heap with Sliding Window) using proper algorithms and data structures.",
    "sampleInput": "nums = [-1, 5, 2, -3, 3, 1, 8, 4], k = 3",
    "sampleOutput": "[2.00000, 2.00000, 2.00000, 1.00000, 3.00000, 4.00000]",
    "explanation": "Medians for windows of size 3: [-1,5,2]->2, [5,2,-3]->2, [2,-3,3]->2, [-3,3,1]->1, [3,1,8]->3, [1,8,4]->4.",
    "testCases": [
        {
            "input": "nums = [1, 2, 3, 4, 2, 3, 1, 4, 2], k = 3",
            "output": "[2.00000, 3.00000, 3.00000, 3.00000, 2.00000, 3.00000, 2.00000]"
        },
        {
            "input": "nums = [5], k = 1",
            "output": "[5.00000]"
        },
        {
            "input": "nums = [1, 4, 2, 3], k = 4",
            "output": "[2.50000]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Sliding Window Median\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void slidingWindowMedian() {\n        // Implementation for Sliding Window Median\n    }\n};\n",
        "python": "# Problem: Sliding Window Median\nclass Solution:\n    def slidingWindowMedian(self):\n        pass\n",
        "javascript": "/**\n * Problem: Sliding Window Median\n */\nfunction slidingWindowMedian() {\n}\n",
        "java": "// Problem: Sliding Window Median\npublic class Solution {\n    public void slidingWindowMedian() {\n    }\n}\n"
    }
},
  "Find Median from Data Stream": {
    "description": "Implement an optimal solution for Find Median from Data Stream (Heap - Heap with Sliding Window) using proper algorithms and data structures.",
    "sampleInput": "ops = [\"MedianFinder\", \"addNum\", \"addNum\", \"findMedian\", \"addNum\", \"findMedian\"], params = [[], [1], [2], [], [3], []]",
    "sampleOutput": "[null, null, null, 1.5, null, 2.0]",
    "explanation": "Dual heap (max-heap + min-heap) maintains stream median in O(log n) insertion time.",
    "testCases": [
        {
            "input": "ops = [\"MedianFinder\", \"addNum\", \"findMedian\"], params = [[], [5], []]",
            "output": "[null, null, 5.0]"
        },
        {
            "input": "ops = [\"MedianFinder\", \"addNum\", \"addNum\", \"addNum\", \"findMedian\"], params = [[], [2], [3], [4], []]",
            "output": "[null, null, null, null, 3.0]"
        },
        {
            "input": "ops = [\"MedianFinder\", \"addNum\", \"addNum\", \"findMedian\"], params = [[], [-1], [-2], []]",
            "output": "[null, null, null, -1.5]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Find Median from Data Stream\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void findMedianfromDataStream() {\n        // Implementation for Find Median from Data Stream\n    }\n};\n",
        "python": "# Problem: Find Median from Data Stream\nclass Solution:\n    def findMedianfromDataStream(self):\n        pass\n",
        "javascript": "/**\n * Problem: Find Median from Data Stream\n */\nfunction findMedianfromDataStream() {\n}\n",
        "java": "// Problem: Find Median from Data Stream\npublic class Solution {\n    public void findMedianfromDataStream() {\n    }\n}\n"
    }
},
  "Kth Largest Element in a Stream": {
    "description": "Implement an optimal solution for Kth Largest Element in a Stream (Heap - Implementation of Heap) using proper algorithms and data structures.",
    "sampleInput": "ops = [\"KthLargest\", \"add\", \"add\", \"add\", \"add\", \"add\"], params = [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]",
    "sampleOutput": "[null, 4, 5, 5, 8, 8]",
    "explanation": "Min-heap of size k=3 maintains the 3rd largest element dynamically.",
    "testCases": [
        {
            "input": "ops = [\"KthLargest\", \"add\"], params = [[1, []], [-3]]",
            "output": "[null, -3]"
        },
        {
            "input": "ops = [\"KthLargest\", \"add\", \"add\"], params = [[2, [0]], [-1], [1]]",
            "output": "[null, -1, 0]"
        },
        {
            "input": "ops = [\"KthLargest\", \"add\"], params = [[1, [-2, 1, -5]], [0]]",
            "output": "[null, 1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Kth Largest Element in a Stream\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void kthLargestElementinaStream() {\n        // Implementation for Kth Largest Element in a Stream\n    }\n};\n",
        "python": "# Problem: Kth Largest Element in a Stream\nclass Solution:\n    def kthLargestElementinaStream(self):\n        pass\n",
        "javascript": "/**\n * Problem: Kth Largest Element in a Stream\n */\nfunction kthLargestElementinaStream() {\n}\n",
        "java": "// Problem: Kth Largest Element in a Stream\npublic class Solution {\n    public void kthLargestElementinaStream() {\n    }\n}\n"
    }
},
  "Design Twitter": {
    "description": "Implement an optimal solution for Design Twitter (Heap - Implementation of Heap) using proper algorithms and data structures.",
    "sampleInput": "ops = [\"Twitter\", \"postTweet\", \"getNewsFeed\", \"follow\", \"postTweet\", \"getNewsFeed\", \"unfollow\", \"getNewsFeed\"], params = [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]",
    "sampleOutput": "[null, null, [5], null, null, [6, 5], null, [5]]",
    "explanation": "Max-heap merges top 10 recent tweets from self and followed users.",
    "testCases": [
        {
            "input": "ops = [\"Twitter\", \"postTweet\", \"getNewsFeed\"], params = [[], [1, 101], [1]]",
            "output": "[null, null, [101]]"
        },
        {
            "input": "ops = [\"Twitter\", \"follow\", \"getNewsFeed\"], params = [[], [1, 2], [1]]",
            "output": "[null, null, []]"
        },
        {
            "input": "ops = [\"Twitter\", \"postTweet\", \"postTweet\", \"getNewsFeed\"], params = [[], [1, 1], [1, 2], [1]]",
            "output": "[null, null, null, [2, 1]]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Design Twitter\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void designTwitter() {\n        // Implementation for Design Twitter\n    }\n};\n",
        "python": "# Problem: Design Twitter\nclass Solution:\n    def designTwitter(self):\n        pass\n",
        "javascript": "/**\n * Problem: Design Twitter\n */\nfunction designTwitter() {\n}\n",
        "java": "// Problem: Design Twitter\npublic class Solution {\n    public void designTwitter() {\n    }\n}\n"
    }
},
  "Seat Reservation Manager": {
    "description": "Implement an optimal solution for Seat Reservation Manager (Heap - Implementation of Heap) using proper algorithms and data structures.",
    "sampleInput": "ops = [\"SeatManager\", \"reserve\", \"reserve\", \"unreserve\", \"reserve\", \"reserve\", \"reserve\", \"reserve\", \"unreserve\"], params = [[5], [], [], [2], [], [], [], [], [5]]",
    "sampleOutput": "[null, 1, 2, null, 2, 3, 4, 5, null]",
    "explanation": "Min-heap always reserves lowest available seat number.",
    "testCases": [
        {
            "input": "ops = [\"SeatManager\", \"reserve\"], params = [[1], []]",
            "output": "[null, 1]"
        },
        {
            "input": "ops = [\"SeatManager\", \"reserve\", \"reserve\", \"unreserve\", \"reserve\"], params = [[3], [], [], [1], []]",
            "output": "[null, 1, 2, null, 1]"
        },
        {
            "input": "ops = [\"SeatManager\", \"reserve\", \"unreserve\", \"reserve\"], params = [[10], [], [1], []]",
            "output": "[null, 1, null, 1]"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Seat Reservation Manager\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void seatReservationManager() {\n        // Implementation for Seat Reservation Manager\n    }\n};\n",
        "python": "# Problem: Seat Reservation Manager\nclass Solution:\n    def seatReservationManager(self):\n        pass\n",
        "javascript": "/**\n * Problem: Seat Reservation Manager\n */\nfunction seatReservationManager() {\n}\n",
        "java": "// Problem: Seat Reservation Manager\npublic class Solution {\n    public void seatReservationManager() {\n    }\n}\n"
    }
},
  "Minimum Cost to Connect Sticks": {
    "description": "Implement an optimal solution for Minimum Cost to Connect Sticks (Heap - Huffman pattern) using proper algorithms and data structures.",
    "sampleInput": "sticks = [2, 4, 3]",
    "sampleOutput": "14",
    "explanation": "Connect 2+3=5 (cost 5), then 5+4=9 (cost 9). Total cost = 5 + 9 = 14.",
    "testCases": [
        {
            "input": "sticks = [1, 8, 3, 5]",
            "output": "30"
        },
        {
            "input": "sticks = [5]",
            "output": "0"
        },
        {
            "input": "sticks = [2, 2, 3, 3]",
            "output": "20"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Minimum Cost to Connect Sticks\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void minimumCosttoConnectSticks() {\n        // Implementation for Minimum Cost to Connect Sticks\n    }\n};\n",
        "python": "# Problem: Minimum Cost to Connect Sticks\nclass Solution:\n    def minimumCosttoConnectSticks(self):\n        pass\n",
        "javascript": "/**\n * Problem: Minimum Cost to Connect Sticks\n */\nfunction minimumCosttoConnectSticks() {\n}\n",
        "java": "// Problem: Minimum Cost to Connect Sticks\npublic class Solution {\n    public void minimumCosttoConnectSticks() {\n    }\n}\n"
    }
},
  "Task Scheduler": {
    "description": "Implement an optimal solution for Task Scheduler (Heap - Huffman pattern) using proper algorithms and data structures.",
    "sampleInput": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2",
    "sampleOutput": "8",
    "explanation": "A -> B -> idle -> A -> B -> idle -> A -> B (8 units of time).",
    "testCases": [
        {
            "input": "tasks = [\"A\",\"C\",\"A\",\"B\",\"D\",\"B\"], n = 1",
            "output": "6"
        },
        {
            "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 0",
            "output": "6"
        },
        {
            "input": "tasks = [\"A\",\"A\",\"A\",\"A\",\"B\",\"C\",\"D\"], n = 2",
            "output": "10"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Task Scheduler\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void taskScheduler() {\n        // Implementation for Task Scheduler\n    }\n};\n",
        "python": "# Problem: Task Scheduler\nclass Solution:\n    def taskScheduler(self):\n        pass\n",
        "javascript": "/**\n * Problem: Task Scheduler\n */\nfunction taskScheduler() {\n}\n",
        "java": "// Problem: Task Scheduler\npublic class Solution {\n    public void taskScheduler() {\n    }\n}\n"
    }
},
  "Construct Target Array With Multiple Sums": {
    "description": "Implement an optimal solution for Construct Target Array With Multiple Sums (Heap - Huffman pattern) using proper algorithms and data structures.",
    "sampleInput": "target = [9, 3, 5]",
    "sampleOutput": "true",
    "explanation": "[1,1,1] -> [1,3,1] -> [1,3,5] -> [9,3,5]. Work backwards with max-heap.",
    "testCases": [
        {
            "input": "target = [1, 1, 1, 2]",
            "output": "false"
        },
        {
            "input": "target = [8, 5]",
            "output": "true"
        },
        {
            "input": "target = [1, 10]",
            "output": "true"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Construct Target Array With Multiple Sums\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void constructTargetArrayWithMultipleSums() {\n        // Implementation for Construct Target Array With Multiple Sums\n    }\n};\n",
        "python": "# Problem: Construct Target Array With Multiple Sums\nclass Solution:\n    def constructTargetArrayWithMultipleSums(self):\n        pass\n",
        "javascript": "/**\n * Problem: Construct Target Array With Multiple Sums\n */\nfunction constructTargetArrayWithMultipleSums() {\n}\n",
        "java": "// Problem: Construct Target Array With Multiple Sums\npublic class Solution {\n    public void constructTargetArrayWithMultipleSums() {\n    }\n}\n"
    }
},
  "Reduce Array Size to Half": {
    "description": "Implement an optimal solution for Reduce Array Size to Half (Heap - Huffman pattern) using proper algorithms and data structures.",
    "sampleInput": "arr = [3, 3, 3, 3, 5, 5, 5, 2, 2, 7]",
    "sampleOutput": "2",
    "explanation": "Removing frequencies of 3 (4 times) and 5 (3 times) eliminates 7/10 elements (>= half).",
    "testCases": [
        {
            "input": "arr = [7, 7, 7, 7, 7, 7]",
            "output": "1"
        },
        {
            "input": "arr = [1, 9]",
            "output": "1"
        },
        {
            "input": "arr = [1000, 1000, 3, 7]",
            "output": "1"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Reduce Array Size to Half\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reduceArraySizetoHalf() {\n        // Implementation for Reduce Array Size to Half\n    }\n};\n",
        "python": "# Problem: Reduce Array Size to Half\nclass Solution:\n    def reduceArraySizetoHalf(self):\n        pass\n",
        "javascript": "/**\n * Problem: Reduce Array Size to Half\n */\nfunction reduceArraySizetoHalf() {\n}\n",
        "java": "// Problem: Reduce Array Size to Half\npublic class Solution {\n    public void reduceArraySizetoHalf() {\n    }\n}\n"
    }
},
  "Last Stone Weight": {
    "description": "Implement an optimal solution for Last Stone Weight (Heap - Huffman pattern) using proper algorithms and data structures.",
    "sampleInput": "stones = [2, 7, 4, 1, 8, 1]",
    "sampleOutput": "1",
    "explanation": "Smash 7 & 8 -> 1 remaining. Smash 4 & 2 -> 2. Smash 2 & 1 -> 1. Smash 1 & 1 -> 0. Last stone = 1.",
    "testCases": [
        {
            "input": "stones = [1]",
            "output": "1"
        },
        {
            "input": "stones = [2, 2]",
            "output": "0"
        },
        {
            "input": "stones = [3, 7, 2]",
            "output": "2"
        }
    ],
    "starterCode": {
        "cpp": "// Problem: Last Stone Weight\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void lastStoneWeight() {\n        // Implementation for Last Stone Weight\n    }\n};\n",
        "python": "# Problem: Last Stone Weight\nclass Solution:\n    def lastStoneWeight(self):\n        pass\n",
        "javascript": "/**\n * Problem: Last Stone Weight\n */\nfunction lastStoneWeight() {\n}\n",
        "java": "// Problem: Last Stone Weight\npublic class Solution {\n    public void lastStoneWeight() {\n    }\n}\n"
    }
}
};

export function getClientProblemSpec(title: string): ProblemSpec {
  if (CLIENT_DSA_CATALOG[title]) return CLIENT_DSA_CATALOG[title];
  const clean = title.replace(/[^a-zA-Z0-9]/g, '');
  const fn = clean.length > 0 ? (clean.charAt(0).toLowerCase() + clean.slice(1)) : 'solve';
  return {
    description: `Implement an optimal algorithmic solution for ${title}.`,
    sampleInput: `nums = [1, 3, 5, 7, 9], target = 7`,
    sampleOutput: `Result for ${title}`,
    explanation: `Explanation for ${title}.`,
    testCases: [{ input: `Input for ${title}`, output: `Output for ${title}` }],
    starterCode: {
      cpp: `// Problem: ${title}\n#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}\n`,
      python: `# Problem: ${title}\ndef solve():\n    pass\n`,
      javascript: `/** Problem: ${title} */\nfunction solve() {\n}\n`,
      java: `// Problem: ${title}\npublic class Solution {\n    public static void main(String[] args) {\n    }\n}\n`
    }
  };
}
