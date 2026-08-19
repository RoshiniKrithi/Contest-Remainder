import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, ShieldAlert, ShieldAlert as AlertIcon, AlertTriangle, ShieldCheck, Activity, Info } from "lucide-react";
import { DvrCodePlayer } from "@/components/integrity/dvr/DvrCodePlayer";
import { AstDiffViewer } from "@/components/integrity/dvr/AstDiffViewer";
import PageTransition from "@/components/layout/page-transition";

interface ReportDetailsResponse {
  report: {
    id: string;
    userId: string;
    problemId: string;
    sessionId: string;
    astSimilarityScore: number;
    aiAttributionScore: number;
    overallRiskScore: number;
    matchedSubmissionId: string | null;
    matchedUserDsaProgressId: number | null;
    structuralFingerprints: any[];
    signals: Array<{ name: string; value: number; weight: number }>;
    flagReasons: string[];
    confidenceScore: number;
    createdAt: string;
  };
  username: string;
  events: any[];
  snapshots: any[];
}

interface MatchResponse {
  currentCode: string;
  matchedCode: string;
  matchedUser: string;
  astSimilarityScore: number;
}

export default function IntegrityReportDetails() {
  const [, params] = useRoute("/admin/integrity/reports/:id");
  const reportId = params?.id;

  const { data: detail, isLoading, refetch, isRefetching } = useQuery<ReportDetailsResponse>({
    queryKey: [`/api/admin/integrity/reports/detail/${reportId}`],
    enabled: !!reportId,
  });

  const { data: matchData } = useQuery<MatchResponse>({
    queryKey: [`/api/admin/integrity/matches/${reportId}`],
    enabled: !!reportId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-500 bg-[#0f172a] space-y-4">
        <RefreshCw className="h-8 w-8 animate-spin text-cyan-400" />
        <p className="text-xs">Reconstructing keystroke database deltas...</p>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-500 bg-[#0f172a] space-y-2">
        <ShieldAlert className="h-8 w-8 text-rose-500" />
        <p className="text-xs font-bold">Integrity report not found.</p>
        <Link to="/admin/integrity">
          <Button variant="link" className="text-cyan-400">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const { report, username, events, snapshots } = detail;
  const isDsa = !!report.matchedUserDsaProgressId || !report.matchedSubmissionId;

  const getRiskColor = (score: number) => {
    if (score >= 65) return "text-rose-400 border-rose-500/30 bg-rose-500/10";
    if (score >= 25) return "text-amber-400 border-amber-500/30 bg-amber-500/10";
    return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
  };

  const getSignalDescription = (name: string, val: number) => {
    if (name === "AST Structural Similarity") {
      return `Structural fingerprint intersection overlap. Matches loops, calls, and branching layouts.`;
    }
    if (name === "Keystroke Cadence Anomaly") {
      return `Typing cadence rhythm. A high score flags uniform/robotic typing speeds lacking normal key-dwell pause distributions.`;
    }
    if (name === "AST Structural Insertion Velocity") {
      return `AST modification speed. Measures rate of parsed syntax tree expansions. Sudden massive gains point to blocks copy-paste.`;
    }
    return `Ratio of characters inserted through clipboard paste events vs manual editor typing.`;
  };

  return (
    <PageTransition>
      <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-4">
            <Link to="/admin/integrity">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-white border border-white/10">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-black flex items-center gap-2">
                Investigation Report
                <Badge variant="outline" className={`text-xs px-2.5 py-0.5 capitalize font-black ${getRiskColor(report.overallRiskScore)}`}>
                  {report.overallRiskScore >= 65 ? "High Risk" : report.overallRiskScore >= 25 ? "Moderate Risk" : "Low Risk"}
                </Badge>
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Audited Session: <span className="font-mono text-cyan-400">{report.sessionId}</span> for student <span className="text-white font-bold">{username}</span>
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            disabled={isRefetching}
            className="h-9 text-slate-400 hover:text-white border border-white/10 gap-1.5"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Audit Compliance Warning Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg flex items-start gap-2.5 text-xs text-amber-300">
          <Info className="h-4.5 w-4.5 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <span className="font-bold">Compliance Auditing Active:</span> Access to behavioral metrics and code playback requires instructor verification. This action has been signed and logged under administrative audit ID: <span className="font-mono text-white">{report.id}</span>.
          </div>
        </div>

        {/* Two-Column Top: Left Info & Flags, Right Signals Weights */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Flag reasons and Alerts */}
          <div className="md:col-span-5 space-y-6">
            <Card className="bg-[#0b0f19] border-white/5 text-white">
              <CardHeader className="py-4 border-b border-white/5">
                <CardTitle className="text-xs font-black uppercase text-slate-400 flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4 text-cyan-400" />
                  Integrity Alerts & Flags
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {report.flagReasons.length === 0 ? (
                  <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
                    No behavioral risk flags raised. Submission matches independent styling profiles.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {report.flagReasons.map((f, i) => (
                      <div key={i} className="flex gap-2.5 p-3 rounded-lg bg-rose-950/20 border border-rose-900/30 text-xs">
                        <AlertIcon className="h-4.5 w-4.5 text-rose-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-black text-rose-300 font-mono">{f}</div>
                          <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                            {f === "HIGH_AST_SIMILARITY" && "AST structure matches prior student submission exceeding typical boilerplate ranges."}
                            {f === "AST_VELOCITY_SPIKE" && "Sub-second additions of structural blocks observed. Typically indicates block insertions."}
                            {f === "HIGH_PASTE_RATIO" && "Over 70% of final character counts originated from clipboard paste operations."}
                            {f === "LOW_CADENCE_VARIANCE" && "Highly uniform typing rhythms with robotic entropy signatures."}
                            {f === "MATCHED_STRUCTURAL_SUBMISSION" && "An identical topology has been matched against active platform directories."}
                            {f === "LOW_FRICTION_SIGNAL" && "Significant code changes occurred with zero backspace, delete, or cursor navigation friction."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Signal Weight Indicators */}
          <div className="md:col-span-7 space-y-6">
            <Card className="bg-[#0b0f19] border-white/5 text-white">
              <CardHeader className="py-4 border-b border-white/5">
                <CardTitle className="text-xs font-black uppercase text-slate-400 flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-cyan-400" />
                  Weighted Risk Vectors
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {report.signals.map((sig, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-200">{sig.name}</span>
                      <span className="text-slate-400 font-mono">
                        {sig.value}% <span className="text-[10px] font-normal text-slate-500">(wt. {Math.round(sig.weight * 100)}%)</span>
                      </span>
                    </div>
                    {/* HSL Colored progress bars */}
                    <div className="h-2 w-full bg-slate-900 border border-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          sig.value >= 75
                            ? "bg-rose-500"
                            : sig.value >= 40
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                        style={{ width: `${sig.value}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal">{getSignalDescription(sig.name, sig.value)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Double-Panel: Interactive Playback & Code Comparisons */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* DVR Keystroke Player */}
          <div className="space-y-6">
            <DvrCodePlayer
              events={events}
              snapshots={snapshots}
              finalCode={matchData?.currentCode || ""}
            />
          </div>

          {/* AST Similarity Diff Side-by-Side */}
          <div className="space-y-6">
            <AstDiffViewer
              currentCode={matchData?.currentCode || ""}
              matchedCode={matchData?.matchedCode || ""}
              matchedUser={matchData?.matchedUser || "Other Operative"}
              similarityScore={report.astSimilarityScore}
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
