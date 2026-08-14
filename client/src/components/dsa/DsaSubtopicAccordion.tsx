import React, { useState } from "react";
import { DsaSubtopic, DsaProblem } from "@/hooks/use-dsa";
import { DsaProblemRow } from "./DsaProblemRow";
import { DsaProgressBar } from "./DsaProgressBar";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface DsaSubtopicAccordionProps {
  subtopic: DsaSubtopic;
  onStatusChange: (problemId: number, status: "unsolved" | "attempted" | "solved") => void;
  onOpenIde?: (problem: DsaProblem) => void;
  isUpdatingProblemId?: number | null;
}

export function DsaSubtopicAccordion({ subtopic, onStatusChange, onOpenIde, isUpdatingProblemId }: DsaSubtopicAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isCompleted = subtopic.totalProblems > 0 && subtopic.solvedProblems === subtopic.totalProblems;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isCompleted
          ? "bg-slate-950/60 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
          : isOpen
          ? "bg-slate-950/80 border-blue-500/30 shadow-lg shadow-black/40"
          : "bg-slate-950/40 border-white/10 hover:border-white/20 hover:bg-slate-900/60"
      }`}
    >
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="w-full p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-2xl group"
        >
          <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
            <div className="p-2 rounded-xl bg-slate-900 border border-white/10 group-hover:border-blue-500/30 transition-colors flex-shrink-0 mt-0.5 sm:mt-0">
              <ChevronDown
                className={`h-4 w-4 text-slate-400 group-hover:text-white transition-transform duration-300 ${
                  isOpen ? "transform rotate-180 text-blue-400" : ""
                }`}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                  {subtopic.title}
                </h4>
                {isCompleted && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Completed
                  </span>
                )}
              </div>
              {subtopic.description && (
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {subtopic.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 sm:w-64 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Progress</span>
                <span className="font-mono font-bold text-white">
                  <span className={subtopic.solvedProblems > 0 ? "text-blue-400" : "text-slate-400"}>
                    {subtopic.solvedProblems}
                  </span>{" "}
                  / {subtopic.totalProblems}
                </span>
              </div>
              <DsaProgressBar value={subtopic.progress} />
            </div>
          </div>
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="px-5 pb-5 pt-1 space-y-2 border-t border-white/5 bg-slate-950/40">
        <div className="pt-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
          <span>Problems ({subtopic.problems.length})</span>
          <span>Status & Actions</span>
        </div>
        {subtopic.problems.map((problem) => (
          <DsaProblemRow
            key={problem.id}
            problem={problem}
            onStatusChange={onStatusChange}
            onOpenIde={onOpenIde}
            isUpdating={isUpdatingProblemId === problem.id}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
