import React, { useState } from "react";
import { useDsaModules, useUpdateDsaProblemStatus, DsaProblem } from "@/hooks/use-dsa";
import { DsaTopicCard } from "@/components/dsa/DsaTopicCard";
import { DsaProgressBar } from "@/components/dsa/DsaProgressBar";
import { DsaIdeModal } from "@/components/dsa/DsaIdeModal";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Compass, Trophy, RefreshCw, AlertTriangle, CheckCircle, Code2, Lock, LogIn } from "lucide-react";
import { useLocation } from "wouter";

export default function DsaModulesPage() {
  const { data, isLoading, isError, error, refetch } = useDsaModules();
  const updateMutation = useUpdateDsaProblemStatus();
  const [selectedProblemForIde, setSelectedProblemForIde] = useState<DsaProblem | null>(null);
  const [, setLocation] = useLocation();

  const handleStatusChange = (problemId: number, status: "unsolved" | "attempted" | "solved") => {
    updateMutation.mutate({ problemId, status });
  };

  const handleOpenIde = (problem: DsaProblem) => {
    setSelectedProblemForIde(problem);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-10 w-64 bg-slate-800" />
          <Skeleton className="h-5 w-96 bg-slate-800" />
          <Skeleton className="h-24 w-full bg-slate-800 rounded-3xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-64 w-full bg-slate-800 rounded-3xl" />
          <Skeleton className="h-64 w-full bg-slate-800 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    const isAuthError = error?.message?.includes("401") || error?.message?.toLowerCase().includes("authentication") || error?.message?.toLowerCase().includes("log in");

    if (isAuthError) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl max-w-md mx-auto space-y-4 shadow-xl">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl w-fit mx-auto">
              <Lock className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-white">Authentication Required</h2>
            <p className="text-sm text-slate-400">
              You need to log in to access your personal DSA Sheet progress and solve interactive problems.
            </p>
            <Button onClick={() => setLocation("/auth")} className="gap-2 bg-cyan-600 hover:bg-cyan-500 font-bold w-full">
              <LogIn className="h-4 w-4" /> Log In / Register
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl max-w-md mx-auto space-y-4 shadow-xl">
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-2xl w-fit mx-auto">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-white">Unable to load DSA modules</h2>
          <p className="text-sm text-slate-400">
            There was a problem connecting to the server. Render backend may be starting up (15-30s on free tier).
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => refetch()} className="gap-2 bg-blue-600 hover:bg-blue-500">
              <RefreshCw className="h-4 w-4" /> Try Again
            </Button>
            <Button onClick={() => setLocation("/auth")} variant="outline" className="gap-2 border-slate-700 text-slate-300">
              <LogIn className="h-4 w-4" /> Re-login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { overall, topics } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1.5">
                <Code2 className="h-3.5 w-3.5" /> Interactive DSA IDE Tracker
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Master Data Structures & Algorithms
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Solve problems directly inside CodeArena's built-in Monaco IDE. Run test cases, submit code, and track your performance automatically.
            </p>
          </div>

          {/* Overall Sheet Progress Banner */}
          <div className="bg-slate-950/80 border border-white/10 p-6 rounded-2xl lg:w-96 flex flex-col gap-4 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-300 font-bold text-sm">
                <Trophy className="h-4 w-4 text-amber-400" />
                <span>Overall Progress</span>
              </div>
              <span className="font-mono font-bold text-white text-lg">
                <span className="text-emerald-400">{overall.solvedProblems}</span> / {overall.totalProblems}
              </span>
            </div>

            <DsaProgressBar value={overall.progress} showLabel />

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-white/5">
              <span>Status</span>
              <span className="font-medium text-emerald-400 flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" /> {overall.progress.toFixed(0)}% Completed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Topic List */}
      {topics.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 p-12 rounded-3xl text-center max-w-lg mx-auto space-y-4">
          <div className="p-4 bg-slate-800 rounded-2xl w-fit mx-auto text-slate-400">
            <Compass className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No DSA modules available yet</h3>
          <p className="text-sm text-slate-400">
            Ask an administrator to configure the DSA roadmap in the platform.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {topics.map((topic) => (
            <DsaTopicCard
              key={topic.id}
              topic={topic}
              onStatusChange={handleStatusChange}
              onOpenIde={handleOpenIde}
              isUpdatingProblemId={updateMutation.isPending ? updateMutation.variables?.problemId : null}
            />
          ))}
        </div>
      )}

      {/* In-App Code Arena IDE Modal */}
      <DsaIdeModal
        problem={selectedProblemForIde}
        isOpen={!!selectedProblemForIde}
        onClose={() => setSelectedProblemForIde(null)}
      />
    </div>
  );
}
