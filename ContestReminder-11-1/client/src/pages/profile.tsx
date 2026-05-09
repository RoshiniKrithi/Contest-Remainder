import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import PageTransition from "@/components/layout/page-transition";
import ParticlesBackground from "@/components/layout/particles-background";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ExternalLink, RefreshCw, Save, Trophy, Code2,
  Star, AlertCircle, CheckCircle2, BarChart3, Download
} from "lucide-react";
import { SiCodeforces, SiLeetcode, SiCodechef } from "react-icons/si";
import { motion } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Handles {
  cfHandle?: string; lcHandle?: string; ccHandle?: string;
  atHandle?: string; hrHandle?: string; gfgHandle?: string;
}

interface PlatformStat {
  platform: string; handle: string; solved: number;
  rating: number | null; rank: string | null; badges: string[];
  easy: number; medium: number; hard: number;
  contests: number; profileUrl: string; error?: string;
}

// ── Platform config ───────────────────────────────────────────────────────────
const PLATFORMS = [
  { key: "cfHandle",  label: "Codeforces",    color: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/20",   icon: SiCodeforces,  placeholder: "e.g. Roshini_Krithi",
    urlPatterns: ["codeforces.com/profile/"] },
  { key: "lcHandle",  label: "LeetCode",      color: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/20",  icon: SiLeetcode,    placeholder: "e.g. Roshini_1115",
    urlPatterns: ["leetcode.com/u/", "leetcode.com/"] },
  { key: "ccHandle",  label: "CodeChef",      color: "text-rose-400",   bg: "bg-rose-500/10",   border: "border-rose-500/20",   icon: SiCodechef,    placeholder: "e.g. roshini_1115",
    urlPatterns: ["codechef.com/users/"] },
  { key: "atHandle",  label: "AtCoder",       color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", icon: null,          placeholder: "e.g. tourist",
    urlPatterns: ["atcoder.jp/users/"] },
  { key: "hrHandle",  label: "HackerRank",    color: "text-emerald-400",bg: "bg-emerald-500/10",border: "border-emerald-500/20",icon: null,          placeholder: "e.g. username",
    urlPatterns: ["hackerrank.com/profile/", "hackerrank.com/"] },
  { key: "gfgHandle", label: "GeeksForGeeks", color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/20",  icon: null,          placeholder: "e.g. username",
    urlPatterns: ["geeksforgeeks.org/user/", "auth.geeksforgeeks.org/user/"] },
] as const;

// Extract username from a URL or return the value as-is if it's already a handle
function cleanHandle(value: string, patterns: readonly string[]): string {
  const v = value.trim();
  if (!v) return "";
  // If it looks like a URL, extract the last meaningful path segment
  if (v.startsWith("http") || v.includes(".com/") || v.includes(".jp/")) {
    for (const pattern of patterns) {
      const idx = v.toLowerCase().indexOf(pattern.toLowerCase());
      if (idx !== -1) {
        const after = v.slice(idx + pattern.length);
        // Remove trailing slashes and query params
        return after.split("/")[0].split("?")[0].trim();
      }
    }
    // Generic fallback: take last non-empty path segment
    try {
      const url = new URL(v.startsWith("http") ? v : `https://${v}`);
      const parts = url.pathname.split("/").filter(Boolean);
      return parts[parts.length - 1] || v;
    } catch { return v; }
  }
  return v;
}

// ── PDF Export ────────────────────────────────────────────────────────────────
async function generatePDF(user: any, stats: PlatformStat[], totalSolved: number, totalContests: number) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  const W = doc.internal.pageSize.getWidth();
  const date = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
  const username = user?.username ?? "User";

  // ── Header bar ──────────────────────────────────────────────────────────────
  doc.setFillColor(30, 41, 59);          // slate-800
  doc.rect(0, 0, W, 22, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Coding Profile Report", 14, 14);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184);       // slate-400
  doc.text(`Generated: ${date}`, W - 14, 10, { align: "right" });
  doc.text(`User: ${username}`, W - 14, 16, { align: "right" });

  // ── Summary cards ───────────────────────────────────────────────────────────
  const cards = [
    { label: "Total Solved",   value: String(totalSolved),                              color: [59, 130, 246] as [number,number,number] },
    { label: "Total Contests", value: String(totalContests),                            color: [245, 158, 11] as [number,number,number] },
    { label: "Platforms",      value: String(stats.filter(s => !s.error).length),       color: [16, 185, 129] as [number,number,number] },
    { label: "Streak",         value: String(user?.streak ?? 0),                        color: [244, 63, 94]  as [number,number,number] },
  ];

  const cardW = (W - 28 - 9) / 4;
  cards.forEach((c, i) => {
    const x = 14 + i * (cardW + 3);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(x, 28, cardW, 22, 3, 3, "F");
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(148, 163, 184);
    doc.text(c.label.toUpperCase(), x + cardW / 2, 35, { align: "center" });
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...c.color);
    doc.text(c.value, x + cardW / 2, 46, { align: "center" });
  });

  // ── Table ───────────────────────────────────────────────────────────────────
  const headers = ["Platform", "Handle", "Solved", "Rating", "Rank", "Contests", "Easy", "Medium", "Hard", "Badges"];
  const colW =    [32,          30,        18,       18,       28,     20,          14,     16,       14,     50];
  const tableY = 58;
  const rowH = 9;

  // Header row
  doc.setFillColor(30, 41, 59);
  doc.rect(14, tableY, W - 28, rowH, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  let cx = 16;
  headers.forEach((h, i) => { doc.text(h, cx, tableY + 6); cx += colW[i]; });

  // Data rows
  const validStats = stats.filter(s => !s.error);
  validStats.forEach((s, ri) => {
    const y = tableY + rowH + ri * rowH;
    doc.setFillColor(ri % 2 === 0 ? 255 : 248, ri % 2 === 0 ? 255 : 250, ri % 2 === 0 ? 255 : 252);
    doc.rect(14, y, W - 28, rowH, "F");
    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);

    const row = [
      s.platform,
      s.handle,
      String(s.solved),
      s.rating ? String(s.rating) : "—",
      s.rank ?? "—",
      String(s.contests),
      s.easy > 0 ? String(s.easy) : "—",
      s.medium > 0 ? String(s.medium) : "—",
      s.hard > 0 ? String(s.hard) : "—",
      s.badges.slice(0, 2).join(", ") || "—",
    ];

    cx = 16;
    row.forEach((cell, i) => {
      // Truncate long text
      const maxW = colW[i] - 2;
      const truncated = doc.getTextWidth(cell) > maxW
        ? cell.slice(0, Math.floor(cell.length * maxW / doc.getTextWidth(cell)) - 1) + "…"
        : cell;
      doc.text(truncated, cx, y + 6);
      cx += colW[i];
    });

    // Row border
    doc.setDrawColor(226, 232, 240);
    doc.line(14, y + rowH, W - 14, y + rowH);
  });

  // ── Footer ──────────────────────────────────────────────────────────────────
  const footerY = doc.internal.pageSize.getHeight() - 8;
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.setFont("helvetica", "normal");
  doc.text("CodeArena — Coding Profile Report", 14, footerY);
  doc.text(`${username} · ${date}`, W - 14, footerY, { align: "right" });

  // ── Save ────────────────────────────────────────────────────────────────────
  doc.save(`${username}_coding_profile.pdf`);
}

const platformColor: Record<string, string> = {
  Codeforces: "text-blue-400", LeetCode: "text-amber-400",
  CodeChef: "text-rose-400", AtCoder: "text-indigo-400",
  HackerRank: "text-emerald-400", GeeksForGeeks: "text-green-400",
};

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ stat }: { stat: PlatformStat }) {
  const color = platformColor[stat.platform] ?? "text-slate-400";
  const cfg = PLATFORMS.find(p => p.label === stat.platform);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-black ${color}`}>{stat.platform}</span>
          {stat.error && <AlertCircle className="h-3.5 w-3.5 text-rose-400" />}
          {!stat.error && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
        </div>
        <a href={stat.profileUrl} target="_blank" rel="noopener noreferrer"
          className="text-slate-500 hover:text-white transition-colors">
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {stat.error ? (
        <p className="text-xs text-rose-400/80 italic">Could not fetch data. Check your handle.</p>
      ) : (
        <>
          {/* Main numbers */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`${cfg?.bg ?? "bg-white/5"} ${cfg?.border ?? "border-white/10"} border rounded-xl p-3 text-center`}>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Solved</p>
              <p className={`text-2xl font-black ${color}`}>{stat.solved}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                {stat.rating ? "Rating" : "Rank"}
              </p>
              <p className="text-2xl font-black text-white">
                {stat.rating ?? stat.rank ?? "—"}
              </p>
            </div>
          </div>

          {/* Difficulty breakdown */}
          {(stat.easy > 0 || stat.medium > 0 || stat.hard > 0) && (
            <div className="flex gap-2 text-[10px] font-black">
              <span className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">E {stat.easy}</span>
              <span className="text-amber-400 bg-amber-500/10 px-2 py-1 rounded-lg">M {stat.medium}</span>
              <span className="text-rose-400 bg-rose-500/10 px-2 py-1 rounded-lg">H {stat.hard}</span>
            </div>
          )}

          {/* Contests */}
          {stat.contests > 0 && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Trophy className="h-3.5 w-3.5 text-amber-400" />
              <span>{stat.contests} contests</span>
            </div>
          )}

          {/* Badges */}
          {stat.badges.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {stat.badges.slice(0, 4).map((b, i) => (
                <Badge key={i} className="text-[9px] bg-white/5 border-white/10 text-slate-300 font-bold">
                  <Star className="h-2.5 w-2.5 mr-1 text-amber-400" />{b}
                </Badge>
              ))}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Handles>({});

  // Load saved handles
  const { data: handles, isLoading: handlesLoading } = useQuery<Handles>({
    queryKey: ["/api/user/handles"],
    enabled: !!user,
    onSuccess: (d) => setForm(d),
  } as any);

  // Save handles — clean URLs to usernames before saving
  const saveMutation = useMutation({
    mutationFn: () => {
      // Strip any URLs to plain usernames
      const cleaned: Handles = {};
      for (const p of PLATFORMS) {
        const raw = (form as any)[p.key] ?? "";
        const handle = cleanHandle(raw, p.urlPatterns);
        if (handle) (cleaned as any)[p.key] = handle;
      }
      return apiRequest("PATCH", "/api/user/handles", cleaned);
    },
    onSuccess: async (res) => {
      const updated = await res.json();
      setForm(updated);
      qc.invalidateQueries({ queryKey: ["/api/user/handles"] });
      qc.invalidateQueries({ queryKey: ["/api/user/platform-stats"] });
      setEditing(false);
      toast({ title: "Handles saved", description: "Fetching your stats now…" });
    },
    onError: () => toast({ title: "Save failed", variant: "destructive" }),
  });

  // Fetch live stats
  const { data: stats, isLoading: statsLoading, refetch, isFetching } = useQuery<PlatformStat[]>({
    queryKey: ["/api/user/platform-stats"],
    enabled: !!user && !!handles && Object.values(handles).some(Boolean),
    staleTime: 5 * 60 * 1000,
  });

  const totalSolved = stats?.reduce((s, p) => s + (p.error ? 0 : p.solved), 0) ?? 0;
  const totalContests = stats?.reduce((s, p) => s + (p.error ? 0 : p.contests), 0) ?? 0;
  const hasHandles = handles && Object.values(handles).some(Boolean);
  const hasStats = stats && stats.filter(s => !s.error).length > 0;

  return (
    <PageTransition>
      <div className="container max-w-6xl mx-auto px-4 py-8 relative">
        <ParticlesBackground />

        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Coding <span className="text-blue-400">Profile</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Real stats aggregated from all your coding platforms
            </p>
          </div>
          <div className="flex gap-3">
            {hasStats && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => generatePDF(user, stats!, totalSolved, totalContests)}
                className="border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-black"
              >
                <Download className="h-3.5 w-3.5 mr-2" />
                Export PDF
              </Button>
            )}
            {hasHandles && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isFetching}
                className="border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-black"
              >
                <RefreshCw className={`h-3.5 w-3.5 mr-2 ${isFetching ? "animate-spin" : ""}`} />
                Refresh Stats
              </Button>
            )}
            <Button
              size="sm"
              onClick={() => setEditing(!editing)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-black"
            >
              <Code2 className="h-3.5 w-3.5 mr-2" />
              {editing ? "Cancel" : "Edit Handles"}
            </Button>
          </div>
        </div>

        {/* Summary cards — only when stats loaded */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Solved", value: totalSolved, icon: Code2, color: "text-blue-400" },
              { label: "Total Contests", value: totalContests, icon: Trophy, color: "text-amber-400" },
              { label: "Platforms", value: stats.filter(s => !s.error).length, icon: BarChart3, color: "text-emerald-400" },
              { label: "Streak", value: user?.streak ?? 0, icon: Star, color: "text-rose-400" },
            ].map((c) => (
              <Card key={c.label} className="bg-slate-900/40 border-white/5">
                <CardContent className="pt-5 pb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{c.label}</p>
                  <div className="flex items-center gap-2">
                    <c.icon className={`h-5 w-5 ${c.color}`} />
                    <span className={`text-2xl font-black ${c.color}`}>{c.value}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Handle editor */}
        {editing && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-slate-900/60 border-white/5">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-black text-white">Enter Your Platform Handles</CardTitle>
                <p className="text-xs text-slate-400">Leave blank to skip a platform</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {PLATFORMS.map((p) => {
                    const raw = (form as any)[p.key] ?? "";
                    const cleaned = cleanHandle(raw, p.urlPatterns);
                    const isUrl = raw !== cleaned && raw.length > 0;
                    return (
                      <div key={p.key} className="space-y-1.5">
                        <label className={`text-[10px] font-black uppercase tracking-widest ${p.color}`}>
                          {p.label}
                        </label>
                        <Input
                          placeholder={p.placeholder}
                          value={raw}
                          onChange={(e) => setForm(prev => ({ ...prev, [p.key]: e.target.value }))}
                          onBlur={(e) => {
                            const c = cleanHandle(e.target.value, p.urlPatterns);
                            if (c !== e.target.value) setForm(prev => ({ ...prev, [p.key]: c }));
                          }}
                          className={`bg-slate-950 border-white/10 h-10 text-sm text-white focus:border-blue-500/50 rounded-xl ${isUrl ? "border-amber-500/40" : ""}`}
                        />
                        {isUrl && (
                          <p className="text-[10px] text-amber-400">
                            Will save as: <span className="font-black">{cleaned}</span>
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
                <Button
                  onClick={() => saveMutation.mutate()}
                  disabled={saveMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs px-6"
                >
                  <Save className="h-3.5 w-3.5 mr-2" />
                  {saveMutation.isPending ? "Saving…" : "Save & Fetch Stats"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* No handles yet */}
        {!handlesLoading && !hasHandles && !editing && (
          <Card className="border-dashed border-white/10 bg-slate-900/20 rounded-2xl p-12 text-center">
            <Code2 className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-black text-white mb-2">No handles linked yet</h3>
            <p className="text-slate-500 text-sm mb-6">
              Add your usernames to see real stats from Codeforces, LeetCode, CodeChef, AtCoder, HackerRank and GeeksForGeeks.
            </p>
            <Button onClick={() => setEditing(true)} className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs">
              <Code2 className="h-3.5 w-3.5 mr-2" /> Add Handles
            </Button>
          </Card>
        )}

        {/* Stats grid */}
        {statsLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-52 rounded-2xl" />)}
          </div>
        )}

        {stats && stats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {stats.map((s) => <StatCard key={s.platform} stat={s} />)}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
