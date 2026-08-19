import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, ShieldAlert, ShieldCheck, ArrowLeft, RefreshCw, Eye, Search, Filter } from "lucide-react";
import { useState } from "react";
import PageTransition from "@/components/layout/page-transition";

interface IntegrityReport {
  id: string;
  userId: string;
  username: string;
  problemId: string;
  problemTitle: string;
  sessionId: string;
  astSimilarityScore: number;
  overallRiskScore: number;
  flagReasons: string[];
  contextType: string;
  createdAt: string;
}

export default function IntegrityDashboard() {
  const [filterRisk, setFilterRisk] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: reports = [], isLoading, refetch, isRefetching } = useQuery<IntegrityReport[]>({
    queryKey: ["/api/admin/integrity/reports"],
  });

  const highRiskCount = reports.filter(r => r.overallRiskScore >= 65).length;
  const moderateRiskCount = reports.filter(r => r.overallRiskScore >= 25 && r.overallRiskScore < 65).length;
  const lowRiskCount = reports.filter(r => r.overallRiskScore < 25).length;

  const filteredReports = reports.filter(r => {
    // Search filter
    const matchesSearch = r.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.problemTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Risk filter
    if (filterRisk === "high") return matchesSearch && r.overallRiskScore >= 65;
    if (filterRisk === "moderate") return matchesSearch && r.overallRiskScore >= 25 && r.overallRiskScore < 65;
    if (filterRisk === "low") return matchesSearch && r.overallRiskScore < 25;
    
    return matchesSearch;
  });

  const getRiskBadge = (score: number) => {
    if (score >= 65) {
      return <Badge className="bg-rose-500/20 text-rose-400 border border-rose-500/30 font-black">HIGH RISK ({score}%)</Badge>;
    }
    if (score >= 25) {
      return <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30 font-black">MODERATE RISK ({score}%)</Badge>;
    }
    return <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-black">LOW RISK ({score}%)</Badge>;
  };

  return (
    <PageTransition>
      <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-white border border-white/10">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-black flex items-center gap-2">
                <Shield className="h-6 w-6 text-cyan-400" />
                Code Integrity Engine
              </h1>
              <p className="text-xs text-slate-400 mt-1">Real-time AST comparisons, structural fingerprinter, and keystroke telemetry dashboard</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading || isRefetching}
            className="h-9 text-slate-400 hover:text-white border border-white/10 gap-1.5"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefetching ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>

        {/* Stats summary section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-[#0b0f19] border-white/5 text-white">
            <CardHeader className="py-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-black uppercase text-slate-500 tracking-wider">Total Evaluated</CardTitle>
              <Shield className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{reports.length}</div>
              <p className="text-[10px] text-slate-500 mt-1">Cross-platform coding submissions</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0b0f19] border-white/5 text-white">
            <CardHeader className="py-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-black uppercase text-slate-500 tracking-wider">High Risk Flags</CardTitle>
              <ShieldAlert className="h-4 w-4 text-rose-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-rose-400">{highRiskCount}</div>
              <p className="text-[10px] text-slate-500 mt-1">Requires immediate manual verification</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0b0f19] border-white/5 text-white">
            <CardHeader className="py-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-black uppercase text-slate-500 tracking-wider">Moderate Risk</CardTitle>
              <ShieldAlert className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-amber-400">{moderateRiskCount}</div>
              <p className="text-[10px] text-slate-500 mt-1">Potential anomalies or minor copy indicators</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0b0f19] border-white/5 text-white">
            <CardHeader className="py-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-black uppercase text-slate-500 tracking-wider">Low Risk Passes</CardTitle>
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-emerald-400">{lowRiskCount}</div>
              <p className="text-[10px] text-slate-500 mt-1">Verified unique execution telemetry</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter controls */}
        <div className="bg-[#0b0f19] border border-white/5 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by student name or problem..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 overflow-x-auto py-1">
            <span className="text-xs text-slate-500 flex items-center gap-1.5 mr-2"><Filter className="h-3.5 w-3.5" /> Risk Filter:</span>
            {(["all", "high", "moderate", "low"] as const).map((r) => (
              <Button
                key={r}
                size="sm"
                variant={filterRisk === r ? "default" : "ghost"}
                onClick={() => setFilterRisk(r)}
                className={`text-[10px] uppercase font-black tracking-widest px-3 h-8 border ${filterRisk === r ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'text-slate-400 border-white/5 hover:bg-white/5'}`}
              >
                {r}
              </Button>
            ))}
          </div>
        </div>

        {/* Reports Listing Table */}
        <div className="bg-[#0b0f19] border border-white/5 rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500 space-y-3">
              <RefreshCw className="h-8 w-8 animate-spin text-cyan-400" />
              <p className="text-xs">Parsing AST telemetry databases...</p>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <ShieldCheck className="h-8 w-8 mx-auto text-emerald-400 opacity-60 mb-2" />
              <p className="text-xs font-bold">No behavior integrity risks detected.</p>
              <p className="text-[10px] text-slate-600 mt-1">All processed submissions fall inside expected metrics parameters.</p>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-slate-900/40">
                <TableRow className="border-b border-white/5">
                  <TableHead className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Student Name</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Problem Context</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Assessment Type</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-500 tracking-wider">AST Similarity</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Overall Risk</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Behavior Flags</TableHead>
                  <TableHead className="text-right text-[10px] font-black uppercase text-slate-500 tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id} className="border-b border-white/5 hover:bg-white/5">
                    <TableCell className="font-bold text-slate-200">{report.username}</TableCell>
                    <TableCell className="text-xs font-medium text-slate-300">{report.problemTitle}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] border-slate-700 bg-slate-800/40 text-slate-300">
                        {report.contextType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs font-mono font-bold ${report.astSimilarityScore >= 75 ? 'text-rose-400' : 'text-slate-300'}`}>
                        {report.astSimilarityScore}%
                      </span>
                    </TableCell>
                    <TableCell>{getRiskBadge(report.overallRiskScore)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {report.flagReasons.length === 0 ? (
                          <span className="text-[10px] text-slate-500">—</span>
                        ) : (
                          report.flagReasons.map((f, i) => (
                            <Badge key={i} className="text-[9px] bg-slate-900 text-rose-300 border border-rose-950/50">
                              {f}
                            </Badge>
                          ))
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/admin/integrity/reports/${report.id}`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 gap-1.5 text-xs"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Investigate
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
