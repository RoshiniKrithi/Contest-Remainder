import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Code, Clock, Trophy } from "lucide-react";
import { useState } from "react";

export default function Problems() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  // Mock problems data - in real app, this would come from API
  const problems = [
    {
      id: "1",
      title: "Two Sum",
      difficulty: "easy",
      points: 100,
      solved: true,
      timeLimit: 2000,
      memoryLimit: 256,
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    },
    {
      id: "2", 
      title: "Binary Search",
      difficulty: "medium",
      points: 200,
      solved: false,
      timeLimit: 1000,
      memoryLimit: 128,
      description: "Implement binary search algorithm to find a target value in a sorted array.",
    },
    {
      id: "3",
      title: "Maximum Subarray",
      difficulty: "medium", 
      points: 250,
      solved: true,
      timeLimit: 2000,
      memoryLimit: 256,
      description: "Find the contiguous subarray which has the largest sum and return its sum.",
    },
    {
      id: "4",
      title: "Merge Intervals",
      difficulty: "hard",
      points: 400,
      solved: false,
      timeLimit: 3000,
      memoryLimit: 512,
      description: "Given an array of intervals, merge all overlapping intervals.",
    },
  ];

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || problem.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300";
      case "medium": return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300";
      case "hard": return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300";
      default: return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300";
    }
  };

  const stats = {
    total: problems.length,
    solved: problems.filter(p => p.solved).length,
    easy: problems.filter(p => p.difficulty === "easy").length,
    medium: problems.filter(p => p.difficulty === "medium").length,
    hard: problems.filter(p => p.difficulty === "hard").length,
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Problems
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Practice your coding skills with our collection of programming problems
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">
              {stats.solved}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Solved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.easy}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Easy</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.medium}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Medium</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.hard}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Hard</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Problems List */}
      <div className="space-y-4">
        {filteredProblems.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No Problems Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredProblems.map((problem) => (
            <Card key={problem.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {problem.title}
                      </h3>
                      {problem.solved && (
                        <Badge variant="outline" className="text-secondary border-secondary">
                          ✓ Solved
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {problem.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getDifficultyColor(problem.difficulty)}>
                      {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                    </Badge>
                    <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                      <Trophy className="h-4 w-4" />
                      <span>{problem.points} pts</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{problem.timeLimit}ms</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Code className="h-4 w-4" />
                      <span>{problem.memoryLimit}MB</span>
                    </div>
                  </div>
                  <Button>
                    {problem.solved ? "Solve Again" : "Solve Problem"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
