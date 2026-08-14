import { useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import {
  ArrowLeft, Clock, Code, Trophy, Play, CheckCircle2,
  AlertCircle, Send, RotateCcw, Terminal, Maximize2, ChevronDown
} from "lucide-react";
import { Link } from "wouter";
import ParticlesBackground from "@/components/layout/particles-background";
import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/layout/page-transition";
import Editor from "@monaco-editor/react";

// ── Language config ────────────────────────────────────────────────────────
const LANGUAGES = [
  { id: "javascript", label: "JavaScript", monaco: "javascript" },
  { id: "python",     label: "Python",     monaco: "python" },
  { id: "cpp",        label: "C++",        monaco: "cpp" },
  { id: "java",       label: "Java",       monaco: "java" },
  { id: "c",          label: "C",          monaco: "c" },
];

const BOILERPLATE: Record<string, string> = {
  javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function solve(nums) {
  // Write your solution here
  
}

// Read input
const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
console.log(solve(lines[0].split(' ').map(Number)));`,

  python: `import sys
input = sys.stdin.readline

def solve():
    # Write your solution here
    data = list(map(int, input().split()))
    
    print()

solve()`,

  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    // Write your solution here
    
    return 0;
}`,

  java: `import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // Write your solution here
        
    }
}`,

  c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // Write your solution here
    
    return 0;
}`,
};

// ── Verdict badge ──────────────────────────────────────────────────────────
function VerdictBadge({ verdict }: { verdict: string }) {
  const cfg: Record<string, { color: string; bg: string; border: string }> = {
    "Accepted":              { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
    "Wrong Answer":          { color: "text-rose-400",    bg: "bg-rose-500/10",    border: "border-rose-500/30" },
    "Time Limit Exceeded":   { color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/30" },
    "Compilation Error":     { color: "text-orange-400",  bg: "bg-orange-500/10",  border: "border-orange-500/30" },
    "Runtime Error":         { color: "text-red-400",     bg: "bg-red-500/10",     border: "border-red-500/30" },
  };
  const key = Object.keys(cfg).find(k => verdict.startsWith(k)) || "Wrong Answer";
  const c = cfg[key];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest border ${c.color} ${c.bg} ${c.border}`}>
      {verdict === "Accepted" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
      {verdict}
    </span>
  );
}

interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  points: number;
  timeLimit: number;
  memoryLimit: number;
  contestId: string;
  constraints?: string;
  inputFormat?: string;
  outputFormat?: string;
  sampleInputs?: string[];
  sampleOutputs?: string[];
  explanations?: string[];
  starterCode?: Record<string, string>;
  testCases?: { input: string; output: string }[];
  tags?: string[];
}

interface ExecutionResult {
  status: string; stdout: string | null; stderr: string | null;
  compile_output: string | null; time: string | null; memory: number | null;
}

interface SubmitResult {
  verdict: string; passed: number; total: number;
  time: string; memory: number;
  results: { input: string; expected: string; actual: string | null; passed: boolean; status: string }[];
}

export default function ProblemDetail() {
  const [, params] = useRoute("/problems/:id");
  const id = params?.id;
  const { user } = useAuth();
  const { toast } = useToast();

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(BOILERPLATE.javascript);
  const [customInput, setCustomInput] = useState("");
  const [activeTab, setActiveTab] = useState<"testcase" | "output">("testcase");
  const [runResult, setRunResult] = useState<ExecutionResult | null>(null);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [inputInitialized, setInputInitialized] = useState(false);
  const [codeInitialized, setCodeInitialized] = useState(false);

  const { data: problem, isLoading } = useQuery<Problem>({
    queryKey: [`/api/problems/${id}`],
    enabled: !!id,
  });

  // Calculate visible samples safely with fallbacks
  const samples = useMemo(() => {
    if (problem?.sampleInputs && problem?.sampleInputs.length > 0) {
      return problem.sampleInputs.map((input, idx) => ({
        input,
        output: problem.sampleOutputs?.[idx] || "",
        explanation: problem.explanations?.[idx] || ""
      }));
    }
    return (problem?.testCases as any[] || []).slice(0, 2).map(tc => ({
      input: tc.input,
      output: tc.output,
      explanation: ""
    }));
  }, [problem]);

  // Load starter code once problem is fetched
  useEffect(() => {
    if (problem && !codeInitialized) {
      const startCode = problem.starterCode?.[language] || BOILERPLATE[language];
      if (startCode) {
        setCode(startCode);
        setCodeInitialized(true);
      }
    }
  }, [problem, language, codeInitialized]);

  // Auto-fill first sample test case once problem loads
  useEffect(() => {
    if (problem && !inputInitialized) {
      const firstSample = samples?.[0];
      if (firstSample?.input) {
        setCustomInput(firstSample.input);
        setInputInitialized(true);
      }
    }
  }, [problem, samples, inputInitialized]);

  const handleLanguageChange = useCallback((lang: string) => {
    setLanguage(lang);
    setCode(problem?.starterCode?.[lang] || BOILERPLATE[lang]);
    setRunResult(null);
    setSubmitResult(null);
  }, [problem]);

  // Run against custom input
  const runMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/execute", { code, language, stdin: customInput });
      return res.json();
    },
    onSuccess: (data: ExecutionResult) => {
      setRunResult(data);
      setActiveTab("output");
    },
    onError: (err: any) => toast({ title: "Execution failed", description: err.message, variant: "destructive" }),
  });

  // Submit against all test cases
  const submitMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/problems/${id}/submit`, { code, language });
      return res.json();
    },
    onSuccess: (data: SubmitResult) => {
      setSubmitResult(data);
      setActiveTab("output");
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      queryClient.invalidateQueries({ queryKey: ["/api/daily-challenge"] });
      if (data.verdict === "Accepted") {
        toast({ title: "✅ Accepted!", description: `Passed ${data.passed}/${data.total} test cases in ${data.time}s` });
      } else {
        toast({ title: `❌ ${data.verdict}`, description: `Passed ${data.passed}/${data.total} test cases`, variant: "destructive" });
      }
    },
    onError: (err: any) => toast({ title: "Submission failed", description: err.message, variant: "destructive" }),
  });

  const getDifficultyColor = (d: string) => ({
    easy:   "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    hard:   "text-rose-400 bg-rose-500/10 border-rose-500/20",
  }[d?.toLowerCase()] || "text-slate-400 bg-slate-500/10 border-slate-500/20");

  if (isLoading) return (
    <div className="container max-w-7xl mx-auto px-4 py-8 space-y-4">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-2 gap-6">
        <Skeleton className="h-[600px]" />
        <Skeleton className="h-[600px]" />
      </div>
    </div>
  );

  if (!problem) return (
    <div className="container max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-black text-white mb-4">Problem Not Found</h1>
      <Link href="/problems"><Button variant="outline">Return to Archives</Button></Link>
    </div>
  );

  const sampleTestCases = samples;

  return (
    <PageTransition>
      <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-slate-950" : "container max-w-7xl mx-auto px-4 py-6"} relative`}>
        {!isFullscreen && <ParticlesBackground />}

        {/* Header */}
        {!isFullscreen && (
          <div className="mb-6">
            <Link href="/problems">
              <Button variant="ghost" className="pl-0 text-slate-400 hover:text-white mb-3 text-xs">
                <ArrowLeft className="mr-2 h-3.5 w-3.5" /> Back to Archives
              </Button>
            </Link>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </Badge>
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Trophy className="h-3.5 w-3.5" />
                  <span className="text-xs font-black">{problem.points} PTS</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold">{problem.timeLimit}ms</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Code className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold">{problem.memoryLimit}MB</span>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">{problem.title}</h1>
            </div>
          </div>
        )}

        {/* Main layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 ${isFullscreen ? "h-screen p-4" : "h-[calc(100vh-220px)] min-h-[600px]"}`}>

          {/* Left — Problem description */}
          {!isFullscreen && (
            <div className="flex flex-col gap-4 overflow-hidden">
              <Card className="bg-slate-900/60 border-white/5 flex-1 overflow-hidden flex flex-col">
                <CardHeader className="pb-3 shrink-0">
                  <CardTitle className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-400" /> Problem Statement
                  </CardTitle>
                </CardHeader>
                <Separator className="bg-white/5" />
                <CardContent className="flex-1 overflow-y-auto p-5 space-y-6">
                  {/* Split description and hints */}
                  {(() => {
                    const desc = problem.description || "No problem description available.";
                    const hintIdx = desc.indexOf("Hints:");
                    const mainDesc = hintIdx > -1 ? desc.slice(0, hintIdx).trim() : desc;
                    
                    let hints: string[] = [];
                    if (Array.isArray(problem.hints) && problem.hints.length > 0) {
                      hints = problem.hints;
                    } else if (hintIdx > -1) {
                      const hintsText = desc.slice(hintIdx);
                      hints = hintsText.match(/💡 Hint \d+:[^\n💡]*/g)?.map(h => h.trim().replace(/^💡 Hint \d+:\s*/, "")) || [];
                    }

                    return (
                      <>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{mainDesc}</p>
                        </div>

                        {problem.inputFormat && (
                          <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Input Format</h3>
                            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{problem.inputFormat}</p>
                          </div>
                        )}

                        {problem.outputFormat && (
                          <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Output Format</h3>
                            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{problem.outputFormat}</p>
                          </div>
                        )}

                        {problem.constraints && (
                          <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Constraints</h3>
                            <pre className="text-slate-300 font-mono text-xs bg-slate-950/40 border border-white/5 rounded-xl p-3 leading-relaxed whitespace-pre-line">
                              {problem.constraints}
                            </pre>
                          </div>
                        )}

                        {samples.length > 0 && (
                          <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Sample Test Cases</h3>
                            {samples.map((sample, idx) => (
                              <div key={idx} className="bg-slate-950/60 border border-white/5 rounded-xl p-5 space-y-4">
                                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Sample Case {idx + 1}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sample Input</span>
                                    <pre className="text-emerald-400 font-mono text-xs mt-1.5 bg-slate-900/50 p-2.5 rounded-lg border border-white/5">{sample.input}</pre>
                                  </div>
                                  <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sample Output</span>
                                    <pre className="text-blue-400 font-mono text-xs mt-1.5 bg-slate-900/50 p-2.5 rounded-lg border border-white/5">{sample.output}</pre>
                                  </div>
                                </div>
                                {sample.explanation && (
                                  <div className="bg-slate-900/40 border-t border-white/5 pt-3">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Explanation</span>
                                    <p className="text-slate-300 text-xs mt-1 leading-relaxed">{sample.explanation}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {hints.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Hints</p>
                            {hints.map((hint, i) => (
                              <details key={i} className="group bg-slate-950/60 border border-white/5 rounded-xl overflow-hidden">
                                <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer text-xs font-black text-amber-400 hover:bg-white/5 transition-colors list-none">
                                  <span className="text-amber-400">💡</span>
                                  <span>Hint {i + 1}</span>
                                  <ChevronDown className="h-3.5 w-3.5 ml-auto group-open:rotate-180 transition-transform" />
                                </summary>
                                <div className="px-4 pb-3 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                                  {hint}
                                </div>
                              </details>
                            ))}
                          </div>
                        )}
                      </>
                    );
                  })()}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Right — Editor + Console */}
          <div className="flex flex-col gap-3 overflow-hidden">
            {/* Editor toolbar */}
            <div className="flex items-center justify-between gap-3 shrink-0">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-40 h-9 bg-slate-900/60 border-white/10 text-white text-xs font-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  {LANGUAGES.map(l => (
                    <SelectItem key={l.id} value={l.id} className="text-white text-xs font-bold hover:bg-white/5">
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost"
                  onClick={() => { setCode(BOILERPLATE[language]); setRunResult(null); setSubmitResult(null); }}
                  className="h-9 text-slate-400 hover:text-white text-xs border border-white/10 hover:bg-white/5">
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Reset
                </Button>
                <Button size="sm" variant="ghost"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="h-9 text-slate-400 hover:text-white border border-white/10 hover:bg-white/5">
                  <Maximize2 className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm"
                  onClick={() => runMutation.mutate()}
                  disabled={runMutation.isPending}
                  className="h-9 bg-slate-700 hover:bg-slate-600 text-white text-xs font-black border border-white/10">
                  <Play className="h-3.5 w-3.5 mr-1.5 fill-current" />
                  {runMutation.isPending ? "Running…" : "Run"}
                </Button>
                <Button size="sm"
                  onClick={() => submitMutation.mutate()}
                  disabled={submitMutation.isPending}
                  className="h-9 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black">
                  <Send className="h-3.5 w-3.5 mr-1.5" />
                  {submitMutation.isPending ? "Submitting…" : "Submit"}
                </Button>
              </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 rounded-xl overflow-hidden border border-white/5 bg-[#1e1e1e] min-h-0">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#252526] border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-[10px] text-slate-500 font-mono ml-2">
                  solution.{language === "javascript" ? "js" : language === "python" ? "py" : language === "java" ? "java" : language === "cpp" ? "cpp" : "c"}
                </span>
              </div>
              <Editor
                height="100%"
                language={LANGUAGES.find(l => l.id === language)?.monaco || "javascript"}
                value={code}
                onChange={(v) => setCode(v || "")}
                theme="vs-dark"
                options={{
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  lineNumbers: "on",
                  renderLineHighlight: "line",
                  tabSize: 2,
                  wordWrap: "on",
                  padding: { top: 12, bottom: 12 },
                  smoothScrolling: true,
                  cursorBlinking: "smooth",
                  formatOnPaste: true,
                }}
              />
            </div>

            {/* Console panel */}
            <div className="shrink-0 bg-slate-900/60 border border-white/5 rounded-xl overflow-hidden" style={{ height: "240px" }}>
              {/* Tabs */}
              <div className="flex items-center border-b border-white/5">
                {["testcase", "output"].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab as any)}
                    className={`px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === tab ? "text-white border-b-2 border-blue-500" : "text-slate-500 hover:text-slate-300"}`}>
                    {tab === "testcase" ? "Test Case" : "Output"}
                  </button>
                ))}
                {submitResult && (
                  <div className="ml-auto mr-3">
                    <VerdictBadge verdict={submitResult.verdict} />
                  </div>
                )}
              </div>

              <div className="p-3 h-[calc(100%-40px)] overflow-y-auto">
                {activeTab === "testcase" ? (
                  <div className="space-y-3">
                    {/* Sample test case tabs */}
                    {sampleTestCases.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {sampleTestCases.map((tc: any, i: number) => (
                          <button key={i}
                            onClick={() => setCustomInput(tc.input)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-colors ${customInput === tc.input ? "bg-blue-500/20 border-blue-500/40 text-blue-400" : "bg-white/5 border-white/10 text-slate-400 hover:text-white"}`}>
                            Case {i + 1}
                          </button>
                        ))}
                      </div>
                    )}
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Input</p>
                      <textarea
                        value={customInput}
                        onChange={e => setCustomInput(e.target.value)}
                        placeholder="Enter custom input here..."
                        className="w-full h-20 bg-slate-950/60 border border-white/5 rounded-lg p-3 text-xs font-mono text-slate-300 resize-none focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                    {/* Show expected output for selected sample */}
                    {sampleTestCases.find((tc: any) => tc.input === customInput) && (
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Expected Output</p>
                        <pre className="text-emerald-400 bg-slate-950/60 border border-white/5 rounded-lg p-3 text-xs">
                          {(sampleTestCases.find((tc: any) => tc.input === customInput) as any)?.output}
                        </pre>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 font-mono text-xs">
                    {/* Run result — LeetCode style */}
                    {runResult && !submitResult && (
                      <div className="space-y-3">
                        {/* Status bar */}
                        <div className="flex items-center gap-3">
                          <VerdictBadge verdict={runResult.status} />
                          {runResult.time && <span className="text-slate-500 text-[10px]">⏱ {runResult.time}s</span>}
                          {runResult.memory && <span className="text-slate-500 text-[10px]">💾 {(runResult.memory / 1024).toFixed(1)}MB</span>}
                        </div>

                        {/* Input / Output / Expected — 3 column layout like LeetCode */}
                        <div className="grid grid-cols-1 gap-2">
                          <div className="bg-slate-950/80 border border-white/5 rounded-lg p-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Input</p>
                            <pre className="text-slate-300 text-xs whitespace-pre-wrap">{customInput || "(no input)"}</pre>
                          </div>
                          <div className="bg-slate-950/80 border border-white/5 rounded-lg p-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Output</p>
                            <pre className={`text-xs whitespace-pre-wrap ${runResult.stdout ? "text-emerald-400" : "text-slate-600 italic"}`}>
                              {runResult.stdout?.trim() || "(no output)"}
                            </pre>
                          </div>
                          {(runResult.stderr || runResult.compile_output) && (
                            <div className="bg-rose-950/30 border border-rose-500/20 rounded-lg p-3">
                              <p className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-1.5">
                                {runResult.compile_output ? "Compilation Error" : "Runtime Error"}
                              </p>
                              <pre className="text-rose-400 text-xs whitespace-pre-wrap">{runResult.stderr || runResult.compile_output}</pre>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Submit result — test case breakdown */}
                    {submitResult && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <VerdictBadge verdict={submitResult.verdict} />
                          <span className="text-slate-400 text-[10px]">{submitResult.passed}/{submitResult.total} test cases passed</span>
                          <span className="text-slate-500 text-[10px]">⏱ {submitResult.time}s</span>
                          <span className="text-slate-500 text-[10px]">💾 {(submitResult.memory / 1024).toFixed(1)}MB</span>
                        </div>
                        <div className="space-y-2">
                          {submitResult.results.map((r, i) => (
                            <div key={i} className={`rounded-lg border overflow-hidden ${r.passed ? "border-emerald-500/20 bg-emerald-950/20" : "border-rose-500/20 bg-rose-950/20"}`}>
                              <div className={`flex items-center gap-2 px-3 py-2 text-[10px] font-black uppercase tracking-widest ${r.passed ? "text-emerald-400" : "text-rose-400"}`}>
                                {r.passed ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                                Test Case {i + 1} — {r.status}
                              </div>
                              {!r.passed && (
                                <div className="grid grid-cols-3 gap-2 px-3 pb-3 text-[10px]">
                                  <div>
                                    <p className="text-slate-500 uppercase tracking-widest mb-1">Input</p>
                                    <pre className="text-slate-300 bg-slate-950/60 p-1.5 rounded">{r.input}</pre>
                                  </div>
                                  <div>
                                    <p className="text-slate-500 uppercase tracking-widest mb-1">Expected</p>
                                    <pre className="text-emerald-400 bg-slate-950/60 p-1.5 rounded">{r.expected}</pre>
                                  </div>
                                  <div>
                                    <p className="text-slate-500 uppercase tracking-widest mb-1">Your Output</p>
                                    <pre className="text-rose-400 bg-slate-950/60 p-1.5 rounded">{r.actual ?? "(no output)"}</pre>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!runResult && !submitResult && (
                      <p className="text-slate-600 text-center py-4">Run your code to see output here</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
