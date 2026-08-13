import React, { useState } from "react";
import { useAdminStudentProgress } from "@/hooks/use-dsa";
import AdminLayout from "@/components/layout/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, CheckCircle2, Flame, BarChart3, Search, ArrowRight, RefreshCw, AlertTriangle, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";
import { DsaProgressBar } from "@/components/dsa/DsaProgressBar";

export default function AdminStudentProgressPage() {
  const [, setLocation] = useLocation();
  const { data, isLoading, isError, refetch } = useAdminStudentProgress();
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-9 w-64 bg-slate-800" />
            <Skeleton className="h-4 w-96 bg-slate-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-2xl bg-slate-800" />
            ))}
          </div>

          <Skeleton className="h-96 rounded-2xl bg-slate-800" />
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
            <h2 className="text-xl font-bold text-white">Unable to load student analytics</h2>
            <p className="text-sm text-slate-400">
              You may not have admin authorization or the server encountered an error.
            </p>
            <Button onClick={() => refetch()} className="gap-2 bg-blue-600 hover:bg-blue-500">
              <RefreshCw className="h-4 w-4" /> Retry
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const { summary, students } = data;

  const filteredStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.username.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Banner Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Admin Dashboard
              </span>
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight">
              Student DSA Analytics
            </h1>
            <p className="text-sm text-slate-400">
              Track student problem-solving activity, topic completion rates, and overall platform progress.
            </p>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Students */}
          <Card className="bg-slate-900/60 border-white/10 text-white shadow-xl backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Students
              </CardTitle>
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{summary.totalStudents}</div>
              <p className="text-xs text-slate-500 mt-1">Enrolled on platform</p>
            </CardContent>
          </Card>

          {/* Total Solved */}
          <Card className="bg-slate-900/60 border-white/10 text-white shadow-xl backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Solved
              </CardTitle>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-emerald-400">{summary.totalSolved.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-1">Across all DSA problems</p>
            </CardContent>
          </Card>

          {/* Average Completion */}
          <Card className="bg-slate-900/60 border-white/10 text-white shadow-xl backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Average Completion
              </CardTitle>
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <BarChart3 className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-indigo-400">{summary.averageCompletion}%</div>
              <p className="text-xs text-slate-500 mt-1">Average student roadmap progress</p>
            </CardContent>
          </Card>

          {/* Active Students */}
          <Card className="bg-slate-900/60 border-white/10 text-white shadow-xl backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Students
              </CardTitle>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Flame className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-amber-400">{summary.activeStudents}</div>
              <p className="text-xs text-slate-500 mt-1">Attempted or solved problems</p>
            </CardContent>
          </Card>
        </div>

        {/* Student Table Section */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Student Progress Directory</h2>
              <p className="text-xs text-slate-400">Select a student to view detailed topic & subtopic breakdowns.</p>
            </div>

            <div className="relative sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-950/80 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-950/40">
            <Table>
              <TableHeader className="bg-slate-950/80 border-b border-white/10">
                <TableRow className="hover:bg-transparent border-white/10">
                  <TableHead className="text-slate-400 text-xs font-bold uppercase">Student</TableHead>
                  <TableHead className="text-slate-400 text-xs font-bold uppercase text-center">Solved</TableHead>
                  <TableHead className="text-slate-400 text-xs font-bold uppercase text-center">Attempted</TableHead>
                  <TableHead className="text-slate-400 text-xs font-bold uppercase w-48">Completion</TableHead>
                  <TableHead className="text-slate-400 text-xs font-bold uppercase text-center">Streak</TableHead>
                  <TableHead className="text-slate-400 text-xs font-bold uppercase">Last Active</TableHead>
                  <TableHead className="text-slate-400 text-xs font-bold uppercase text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center text-slate-400">
                      No students found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow
                      key={student.userId}
                      className="hover:bg-slate-850/60 border-b border-white/5 cursor-pointer transition-colors"
                      onClick={() => setLocation(`/admin/students/${student.userId}/progress`)}
                    >
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-white text-sm">{student.name}</span>
                          <span className="text-xs text-slate-500 font-mono">{student.email}</span>
                        </div>
                      </TableCell>

                      <TableCell className="text-center font-mono font-bold text-emerald-400">
                        {student.solvedProblems}
                      </TableCell>

                      <TableCell className="text-center font-mono font-bold text-amber-400">
                        {student.attemptedProblems}
                      </TableCell>

                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-slate-400">{student.solvedProblems}/{student.totalProblems}</span>
                            <span className="text-white font-bold">{student.completionPercentage}%</span>
                          </div>
                          <DsaProgressBar value={student.completionPercentage} />
                        </div>
                      </TableCell>

                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={`font-mono text-xs gap-1 px-2.5 py-0.5 ${
                            student.streak > 0
                              ? "bg-orange-500/10 text-orange-400 border-orange-500/30"
                              : "bg-slate-800 text-slate-500 border-white/5"
                          }`}
                        >
                          <Flame className={`h-3 w-3 ${student.streak > 0 ? "fill-orange-500 text-orange-500" : ""}`} />
                          {student.streak}d
                        </Badge>
                      </TableCell>

                      <TableCell className="text-xs text-slate-400">
                        {student.lastActivity ? new Date(student.lastActivity).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Never"}
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocation(`/admin/students/${student.userId}/progress`);
                          }}
                          className="h-8 text-xs text-blue-400 hover:text-white hover:bg-blue-600/20 gap-1"
                        >
                          <span>View</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
