import React from "react";
import { DsaTopic, DsaProblem } from "@/hooks/use-dsa";
import { DsaSubtopicAccordion } from "./DsaSubtopicAccordion";
import { DsaProgressBar } from "./DsaProgressBar";
import { Layers, Sparkles } from "lucide-react";

interface DsaTopicCardProps {
  topic: DsaTopic;
  onStatusChange: (problemId: number, status: "unsolved" | "attempted" | "solved") => void;
  onOpenIde?: (problem: DsaProblem) => void;
  isUpdatingProblemId?: number | null;
}

export function DsaTopicCard({ topic, onStatusChange, onOpenIde, isUpdatingProblemId }: DsaTopicCardProps) {
  return (
    <div className="space-y-6 bg-slate-900/60 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Category Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10 relative z-10">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white uppercase flex items-center gap-2">
                {topic.title}
                {topic.progress === 100 && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
                    <Sparkles className="h-3 w-3" /> Mastered
                  </span>
                )}
              </h2>
            </div>
          </div>
          {topic.description && (
            <p className="text-sm text-slate-400 leading-relaxed pl-1">
              {topic.description}
            </p>
          )}
        </div>

        {/* Topic Stats Box */}
        <div className="bg-slate-950/60 border border-white/10 p-5 rounded-2xl md:w-80 flex flex-col gap-3 shadow-inner flex-shrink-0">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-semibold">Topic Mastery</span>
            <span className="font-mono font-bold text-white text-base">
              <span className="text-blue-400">{topic.solvedProblems}</span> / {topic.totalProblems}
            </span>
          </div>

          <DsaProgressBar value={topic.progress} showLabel />
        </div>
      </div>

      {/* Subtopics Accordion List */}
      <div className="space-y-4 relative z-10">
        {topic.subtopics.map((subtopic) => (
          <DsaSubtopicAccordion
            key={subtopic.id}
            subtopic={subtopic}
            onStatusChange={onStatusChange}
            onOpenIde={onOpenIde}
            isUpdatingProblemId={isUpdatingProblemId}
          />
        ))}
      </div>
    </div>
  );
}
