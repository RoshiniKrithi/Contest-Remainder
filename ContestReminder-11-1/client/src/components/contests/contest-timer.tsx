import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ContestTimerProps {
  contest: {
    id: string;
    title: string;
    endTime: string;
    startTime: string;
  };
}

export default function ContestTimer({ contest }: ContestTimerProps) {
  const [timeLeft, setTimeLeft] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const end = new Date(contest.endTime).getTime();
      const start = new Date(contest.startTime).getTime();
      const total = end - start;
      const remaining = end - now;

      if (remaining <= 0) {
        setTimeLeft("00:00:00");
        setProgress(100);
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );

      const elapsed = now - start;
      const progressPercent = Math.min(Math.max((elapsed / total) * 100, 0), 100);
      setProgress(progressPercent);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [contest.endTime, contest.startTime]);

  const userStats = {
    solvedProblems: "2/4",
    rank: "#12",
    score: "285",
  };

  return (
    <Card>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Contest Timer
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {contest.title}
        </p>
      </div>
      <CardContent className="p-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2 contest-timer">
            {timeLeft}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Time Remaining</p>
          <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span>Started</span>
            <span>{Math.round(progress)}% Complete</span>
            <span>Ends</span>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Problems Solved:</span>
            <span className="font-medium">{userStats.solvedProblems}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Current Rank:</span>
            <span className="font-medium">{userStats.rank}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Score:</span>
            <span className="font-medium">{userStats.score}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
