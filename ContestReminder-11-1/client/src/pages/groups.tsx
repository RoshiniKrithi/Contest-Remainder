import { useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Plus, LogIn, Trophy, Code2, RefreshCw,
  Copy, LogOut, Crown, Medal, Star, BarChart3
} from "lucide-react";

interface Group { id: string; name: string; description: string | null; inviteCode: string; createdBy: string; }
interface LeaderboardEntry { userId: string; username: string; totalSolved: number; totalContests: number; cfRating: number | null; lcRating: number | null; platforms: number; }

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="h-5 w-5 text-amber-400" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-slate-300" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
  return <span className="text-slate-500 font-black text-sm w-5 text-center">#{rank}</span>;
}

function GroupLeaderboard({ group, onLeave }: { group: Group; onLeave: () => void }) {
  const { user } = useAuth();
  const { data, isLoading, refetch, isFetching } = useQuery<{ group: Group; leaderboard: LeaderboardEntry[] }>({
    queryKey: ["/api/groups", group.id, "leaderboard"],
    queryFn: async () => (await apiRequest("GET", `/api/groups/${group.id}/leaderboard`)).json(),
    staleTime: 5 * 60 * 1000,
  });
  const { toast } = useToast();

  const copyCode = () => {
    navigator.clipboard.writeText(group.inviteCode);
    toast({ title: "Invite code copied!", description: group.inviteCode });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Group header */}
      <Card className="bg-slate-900/60 border-white/5">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-white font-black text-lg">{group.name}</CardTitle>
              {group.description && <p className="text-slate-400 text-xs mt-1">{group.description}</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black px-3 py-1.5 rounded-lg hover:bg-blue-500/20 transition-colors"
              >
                <Copy className="h-3 w-3" /> {group.inviteCode}
              </button>
              <Button
                size="sm" variant="ghost"
                onClick={onLeave}
                className="text-rose-400 hover:text-rose-300 hover:bg-rose-400/10 text-xs h-8"
              >
                <LogOut className="h-3.5 w-3.5 mr-1" /> Leave
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center gap-4">
            <Button size="sm" variant="outline" onClick={() => refetch()} disabled={isFetching}
              className="border-white/10 bg-white/5 text-white text-xs font-black h-8">
              <RefreshCw className={`h-3 w-3 mr-1.5 ${isFetching ? "animate-spin" : ""}`} />
              {isFetching ? "Fetching…" : "Refresh Stats"}
            </Button>
            <p className="text-slate-500 text-xs">Stats fetched live from all platforms</p>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 rounded-xl" />)}
        </div>
      ) : (
        <div className="space-y-2">
          {data?.leaderboard.map((entry, i) => (
            <motion.div
              key={entry.userId}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                entry.userId === user?.id
                  ? "bg-blue-500/10 border-blue-500/20"
                  : "bg-slate-900/40 border-white/5 hover:bg-slate-900/60"
              }`}
            >
              {/* Rank */}
              <div className="w-8 flex justify-center shrink-0">
                <RankIcon rank={i + 1} />
              </div>

              {/* Avatar + name */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shrink-0">
                  {entry.username[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-black text-sm truncate">
                    {entry.username}
                    {entry.userId === user?.id && <span className="ml-2 text-[10px] text-blue-400 font-bold">(you)</span>}
                  </p>
                  <p className="text-slate-500 text-[10px]">{entry.platforms} platform{entry.platforms !== 1 ? "s" : ""} linked</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 shrink-0">
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Solved</p>
                  <p className="text-blue-400 font-black text-lg">{entry.totalSolved}</p>
                </div>
                <div className="text-center hidden sm:block">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Contests</p>
                  <p className="text-amber-400 font-black text-lg">{entry.totalContests}</p>
                </div>
                {entry.cfRating && (
                  <div className="text-center hidden md:block">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">CF Rating</p>
                    <p className="text-indigo-400 font-black text-lg">{entry.cfRating}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Groups() {
  const { user } = useAuth();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [createForm, setCreateForm] = useState({ name: "", description: "" });
  const [inviteCode, setInviteCode] = useState("");

  const { data: myGroups, isLoading } = useQuery<Group[]>({
    queryKey: ["/api/groups"],
    queryFn: async () => (await apiRequest("GET", "/api/groups")).json(),
    enabled: !!user,
  });

  const createMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/groups", createForm),
    onSuccess: async (res) => {
      const g = await res.json();
      qc.invalidateQueries({ queryKey: ["/api/groups"] });
      setShowCreate(false);
      setCreateForm({ name: "", description: "" });
      setActiveGroup(g);
      toast({ title: `Group "${g.name}" created!`, description: `Invite code: ${g.inviteCode}` });
    },
    onError: () => toast({ title: "Failed to create group", variant: "destructive" }),
  });

  const joinMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/groups/join", { inviteCode }),
    onSuccess: async (res) => {
      const g = await res.json();
      qc.invalidateQueries({ queryKey: ["/api/groups"] });
      setShowJoin(false);
      setInviteCode("");
      setActiveGroup(g);
      toast({ title: `Joined "${g.name}"!` });
    },
    onError: (e: any) => toast({ title: e.message || "Invalid invite code", variant: "destructive" }),
  });

  const leaveMutation = useMutation({
    mutationFn: (groupId: string) => apiRequest("DELETE", `/api/groups/${groupId}/leave`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/groups"] });
      setActiveGroup(null);
      toast({ title: "Left group" });
    },
  });

  return (
    <PageTransition>
      <div className="container max-w-5xl mx-auto px-4 py-8 relative">
        <ParticlesBackground />

        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Group <span className="text-blue-400">Tracker</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Track your batch's coding progress — live leaderboard across all platforms
            </p>
          </div>
          <div className="flex gap-3">
            <Button size="sm" variant="outline" onClick={() => { setShowJoin(!showJoin); setShowCreate(false); }}
              className="border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-black">
              <LogIn className="h-3.5 w-3.5 mr-2" /> Join Group
            </Button>
            <Button size="sm" onClick={() => { setShowCreate(!showCreate); setShowJoin(false); }}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-black">
              <Plus className="h-3.5 w-3.5 mr-2" /> Create Group
            </Button>
          </div>
        </div>

        {/* Create form */}
        <AnimatePresence>
          {showCreate && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mb-6">
              <Card className="bg-slate-900/60 border-white/5">
                <CardHeader className="pb-3"><CardTitle className="text-white text-base font-black">Create a Group</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <Input placeholder="Group name (e.g. CSE 2025 Batch)" value={createForm.name}
                    onChange={e => setCreateForm(p => ({ ...p, name: e.target.value }))}
                    className="bg-slate-950 border-white/10 text-white h-10 rounded-xl" />
                  <Input placeholder="Description (optional)" value={createForm.description}
                    onChange={e => setCreateForm(p => ({ ...p, description: e.target.value }))}
                    className="bg-slate-950 border-white/10 text-white h-10 rounded-xl" />
                  <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending || !createForm.name.trim()}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs">
                    <Plus className="h-3.5 w-3.5 mr-2" />
                    {createMutation.isPending ? "Creating…" : "Create & Get Invite Code"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {showJoin && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mb-6">
              <Card className="bg-slate-900/60 border-white/5">
                <CardHeader className="pb-3"><CardTitle className="text-white text-base font-black">Join a Group</CardTitle></CardHeader>
                <CardContent className="flex gap-3">
                  <Input placeholder="Enter 6-character invite code (e.g. AB12CD)" value={inviteCode}
                    onChange={e => setInviteCode(e.target.value.toUpperCase())}
                    className="bg-slate-950 border-white/10 text-white h-10 rounded-xl font-mono tracking-widest" maxLength={6} />
                  <Button onClick={() => joinMutation.mutate()} disabled={joinMutation.isPending || inviteCode.length < 6}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shrink-0">
                    {joinMutation.isPending ? "Joining…" : "Join"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* My groups list */}
        {!activeGroup && (
          <>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map(i => <Skeleton key={i} className="h-28 rounded-2xl" />)}
              </div>
            ) : !myGroups?.length ? (
              <Card className="border-dashed border-white/10 bg-slate-900/20 rounded-2xl p-12 text-center">
                <Users className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-black text-white mb-2">No groups yet</h3>
                <p className="text-slate-500 text-sm mb-6">Create a group for your batch or join one with an invite code.</p>
                <Button onClick={() => setShowCreate(true)} className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs">
                  <Plus className="h-3.5 w-3.5 mr-2" /> Create Your First Group
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myGroups.map(g => (
                  <motion.div key={g.id} whileHover={{ y: -2 }}
                    onClick={() => setActiveGroup(g)}
                    className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 cursor-pointer hover:bg-slate-900/60 hover:border-blue-500/20 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-blue-500/10 rounded-xl">
                        <Users className="h-5 w-5 text-blue-400" />
                      </div>
                      <Badge className="text-[9px] bg-white/5 border-white/10 text-slate-400 font-mono">
                        {g.inviteCode}
                      </Badge>
                    </div>
                    <h3 className="text-white font-black text-base mb-1">{g.name}</h3>
                    {g.description && <p className="text-slate-500 text-xs line-clamp-1">{g.description}</p>}
                    <p className="text-blue-400 text-xs font-bold mt-3">View Leaderboard →</p>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Active group leaderboard */}
        {activeGroup && (
          <div>
            <button onClick={() => setActiveGroup(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold mb-5 transition-colors">
              ← Back to groups
            </button>
            <GroupLeaderboard
              group={activeGroup}
              onLeave={() => leaveMutation.mutate(activeGroup.id)}
            />
          </div>
        )}
      </div>
    </PageTransition>
  );
}
