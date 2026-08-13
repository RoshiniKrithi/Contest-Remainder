import React from "react";
import { DsaProblem } from "@/hooks/use-dsa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2, Circle, Clock, Code2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DsaProblemRowProps {
  problem: DsaProblem;
  onStatusChange: (problemId: number, status: "unsolved" | "attempted" | "solved") => void;
  onOpenIde?: (problem: DsaProblem) => void;
  isUpdating?: boolean;
}

export function DsaProblemRow({ problem, onStatusChange, onOpenIde, isUpdating }: DsaProblemRowProps) {
  const getDifficultyColor = (diff: string) => {
    const d = diff.toLowerCase();
    if (d === "easy") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    if (d === "medium") return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    if (d === "hard") return "bg-rose-500/10 text-rose-400 border-rose-500/30";
    return "bg-slate-500/10 text-slate-400 border-slate-500/30";
  };

  const handleCheckboxToggle = () => {
    const nextStatus = problem.status === "solved" ? "unsolved" : "solved";
    onStatusChange(problem.id, nextStatus);
  };

  return (
    <div
      className={`group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all duration-200 gap-3 ${
        problem.status === "solved"
          ? "bg-slate-900/40 border-emerald-500/20 hover:border-emerald-500/40"
          : problem.status === "attempted"
          ? "bg-slate-900/60 border-amber-500/20 hover:border-amber-500/40"
          : "bg-slate-900/80 border-white/5 hover:border-white/15 hover:bg-slate-850"
      }`}
    >
      {/* Left side: Status toggle & Title */}
      <div className="flex items-center gap-3.5 min-w-0">
        <button
          type="button"
          onClick={handleCheckboxToggle}
          disabled={isUpdating}
          className="flex-shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full transition-transform active:scale-95"
          title={`Click to mark as ${problem.status === "solved" ? "unsolved" : "solved"}`}
        >
          {problem.status === "solved" ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400 fill-emerald-500/20 transition-colors" />
          ) : problem.status === "attempted" ? (
            <Clock className="h-5 w-5 text-amber-400 transition-colors" />
          ) : (
            <Circle className="h-5 w-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
          )}
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-semibold truncate transition-colors ${
                problem.status === "solved" ? "text-slate-300 line-through decoration-emerald-500/50" : "text-white group-hover:text-cyan-300"
              }`}
            >
              {problem.title}
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Badges & Actions */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap justify-end flex-shrink-0">
        {/* Difficulty Badge */}
        <Badge variant="outline" className={`text-[11px] font-medium uppercase tracking-wider px-2.5 py-0.5 ${getDifficultyColor(problem.difficulty)}`}>
          {problem.difficulty}
        </Badge>

        {/* Status Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-400 hover:text-white hover:bg-slate-800">
              {problem.status === "solved" ? "Solved" : problem.status === "attempted" ? "Attempted" : "Unsolved"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-200">
            <DropdownMenuItem onClick={() => onStatusChange(problem.id, "unsolved")} className="cursor-pointer">
              <Circle className="h-3.5 w-3.5 mr-2 text-slate-400" /> Unsolved
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(problem.id, "attempted")} className="cursor-pointer text-amber-400">
              <Clock className="h-3.5 w-3.5 mr-2 text-amber-400" /> Attempted
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(problem.id, "solved")} className="cursor-pointer text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5 mr-2 text-emerald-400" /> Solved
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Primary Action: SOLVE IN IDE BUTTON */}
        <Button
          size="sm"
          onClick={() => onOpenIde && onOpenIde(problem)}
          className="h-8 text-xs gap-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold shadow-md shadow-cyan-500/20"
        >
          <Code2 className="h-3.5 w-3.5 text-cyan-200" />
          Solve in IDE
        </Button>

        {/* External Link */}
        {problem.problemUrl && (
          <a
            href={problem.problemUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center"
          >
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1 bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 border-white/10 hover:border-white/20 transition-all px-2.5"
              title="Open problem link"
            >
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
