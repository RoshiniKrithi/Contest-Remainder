import React, { useState } from "react";
import { useAdminStudentDetailedProgress } from "@/hooks/use-dsa";
import AdminLayout from "@/components/layout/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { DsaProgressBar } from "@/components/dsa/DsaProgressBar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, CheckCircle2, Clock, Flame, BarChart3, Layers, AlertTriangle, RefreshCw, ChevronDown, Code2, Eye, Terminal } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Editor from "@monaco-editor/react";

export default function AdminStudentProgressDetailPage() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/admin/students/:userId/progress");
  const userId = params?.userId || "";

  const { data, isLoading, isError, refetch } = useAdminStudentDetailedProgress(userId);
  const [inspectSubmission, setInspectSubmission] = useState<any | null>(null);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-10 w-48 bg-slate-800" />
          <Skeleton className="h-32 rounded-3xl bg-slate-800" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-28 rounded-2xl bg-slate-800" />
            ))}
          </div>
          <Skeleton className="h-96 rounded-3xl bg-slate-800" />
        </div>
      </AdminLayout>
    );
  }

  if (isError || !data) {
    return (
      <AdminLayout>
        <div className="max-w-7xl mx-auto py-16 text-center">
          <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl max-w-md mx-auto space-y-4 shadow-xl">
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-2xl w-fit mx-auto">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-white">Student not found</h2>
            <p className="text-sm text-slate-400">
              Could not fetch detailed progress for this student.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => setLocation("/admin/students/progress")}>
                Back to Students
              </Button>
              <Button onClick={() => refetch()} className="bg-blue-600 hover:bg-blue-500">
                <RefreshCw className="h-4 w-4 mr-2" /> Retry
              </Button>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const { student, overall, topics, submissions } = data;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Back Navigation */}
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocation("/admin/students/progress")}
            className="gap-2 bg-slate-900/80 text-slate-300 border-white/10 hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Students Directory
          </Button>
        </div>

        {/* Student Banner Header */}
        <div className="bg-slate-900/60 border border-white/10 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">{student.name}</h1>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                <span>@{student.username}</span>
                <span>•</span>
                <span className="font-mono">{student.email}</span>
                <span>•</span>
                <Badge variant="outline" className="text-[10px] uppercase bg-slate-800 text-slate-300 border-white/10">
                  {student.role}
                </Badge>
              </div>
            </div>
          </div>

          {overall.lastActivity && (
            <div className="text-right text-xs text-slate-400 bg-slate-950/60 border border-white/5 p-3 rounded-xl">
              <span className="block text-slate-500 font-semibold uppercase text-[10px]">Last Activity</span>
              <span className="font-medium text-white">{new Date(overall.lastActivity).toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* KPI Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-slate-900/60 border-white/10 text-white shadow-lg">
            <CardHeader className="p-4 pb-1">
              <CardTitle className="text-xs text-slate-400 font-bold uppercase">Total Problems</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <div className="text-2xl font-black text-white">{overall.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-white/10 text-white shadow-lg">
            <CardHeader className="p-4 pb-1">
              <CardTitle className="text-xs text-slate-400 font-bold uppercase">Solved</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <div className="text-2xl font-black text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-5 w-5" /> {overall.solved}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-white/10 text-white shadow-lg">
            <CardHeader className="p-4 pb-1">
              <CardTitle className="text-xs text-slate-400 font-bold uppercase">Attempted</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <div className="text-2xl font-black text-amber-400 flex items-center gap-1.5">
                <Clock className="h-5 w-5" /> {overall.attempted}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-white/10 text-white shadow-lg">
            <CardHeader className="p-4 pb-1">
              <CardTitle className="text-xs text-slate-400 font-bold uppercase">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <div className="text-2xl font-black text-cyan-400 flex items-center gap-1.5">
                <BarChart3 className="h-5 w-5" /> {overall.percentage}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-white/10 text-white shadow-lg">
            <CardHeader className="p-4 pb-1">
              <CardTitle className="text-xs text-slate-400 font-bold uppercase">Current Streak</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <div className="text-2xl font-black text-orange-400 flex items-center gap-1.5">
                <Flame className="h-5 w-5 fill-orange-500" /> {overall.streak} Days
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Section: Topics Breakdown vs Code Submissions */}
        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList className="bg-slate-900 border border-slate-800 p-1">
            <TabsTrigger value="submissions" className="gap-2 text-xs font-bold data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              <Code2 className="h-4 w-4" /> Code Submissions Inspector ({submissions?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="topics" className="gap-2 text-xs font-bold data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Layers className="h-4 w-4" /> Topic Breakdown
            </TabsTrigger>
          </TabsList>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <Card className="bg-slate-900/60 border-white/10 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-cyan-400" /> Student IDE Code Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!submissions || submissions.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 space-y-2">
                    <Code2 className="h-8 w-8 mx-auto opacity-40 text-cyan-400" />
                    <p>No code submissions recorded for this student yet.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {submissions.map((sub) => (
                      <div key={sub.problemId} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-950/40 px-3 rounded-xl transition-colors">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{sub.problemTitle}</span>
                            <Badge variant="outline" className="text-[10px] bg-slate-800 text-slate-300 border-slate-700">
                              {sub.topicTitle}
                            </Badge>
                            <Badge variant="outline" className={`text-[10px] ${sub.status === "solved" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-amber-500/10 text-amber-400 border-amber-500/30"}`}>
                              {sub.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                            <span>Lang: <strong className="text-cyan-400 uppercase">{sub.language}</strong></span>
                            <span>•</span>
                            <span>Updated: {new Date(sub.updatedAt).toLocaleString()}</span>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setInspectSubmission(sub)}
                          className="h-8 text-xs gap-1.5 bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200"
                        >
                          <Eye className="h-3.5 w-3.5 text-cyan-400" /> Inspect Code
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Topics Tab */}
          <TabsContent value="topics">
            <div className="space-y-6 bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="space-y-4">
                {topics.map((topic) => (
                  <Collapsible key={topic.id} defaultOpen className="bg-slate-950/60 border border-white/10 rounded-2xl overflow-hidden">
                    <CollapsibleTrigger asChild>
                      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/80 transition-colors">
                        <div className="flex items-center gap-3">
                          <ChevronDown className="h-4 w-4 text-slate-400" />
                          <div>
                            <h3 className="text-base font-bold text-white">{topic.title}</h3>
                            {topic.description && (
                              <p className="text-xs text-slate-400">{topic.description}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 sm:w-64">
                          <div className="flex flex-col gap-1 w-full">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-slate-400">{topic.solved}/{topic.total} Solved</span>
                              <span className="text-white font-bold">{topic.percentage}%</span>
                            </div>
                            <DsaProgressBar value={topic.percentage} />
                          </div>
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="px-5 pb-5 pt-2 border-t border-white/5 space-y-3 bg-slate-950/40">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                        {topic.subtopics.map((subtopic) => (
                          <div key={subtopic.id} className="bg-slate-900/80 border border-white/5 p-4 rounded-xl space-y-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-bold text-slate-200">{subtopic.title}</span>
                              <span className="font-mono text-slate-400 font-bold">
                                <span className="text-emerald-400">{subtopic.solved}</span> / {subtopic.total} ({subtopic.percentage}%)
                              </span>
                            </div>
                            <DsaProgressBar value={subtopic.percentage} />
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Code Inspection Dialog */}
        {inspectSubmission && (
          <Dialog open={!!inspectSubmission} onOpenChange={() => setInspectSubmission(null)}>
            <DialogContent className="max-w-4xl w-[90vw] h-[80vh] p-0 bg-[#0B0F19] border border-cyan-500/30 text-slate-100 flex flex-col overflow-hidden">
              <DialogHeader className="p-4 bg-[#090D16] border-b border-slate-800 flex flex-row items-center justify-between">
                <div>
                  <DialogTitle className="text-base font-bold flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-cyan-400" />
                    {inspectSubmission.problemTitle}
                  </DialogTitle>
                  <span className="text-xs text-slate-400">
                    Language: <strong className="text-cyan-400 font-mono uppercase">{inspectSubmission.language}</strong> • Status: {inspectSubmission.status}
                  </span>
                </div>
              </DialogHeader>
              <div className="flex-1 p-0 overflow-hidden">
                <Editor
                  height="100%"
                  language={inspectSubmission.language === "cpp" ? "cpp" : inspectSubmission.language === "python" ? "python" : inspectSubmission.language === "java" ? "java" : "javascript"}
                  theme="vs-dark"
                  value={inspectSubmission.code}
                  options={{ readOnly: true, fontSize: 13, minimap: { enabled: false } }}
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminLayout>
  );
}
