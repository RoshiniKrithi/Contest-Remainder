import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Trophy, Calendar, Users, Clock, Target, Play, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface Marathon {
    id: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    status: "upcoming" | "live" | "completed";
    difficulty: string;
    problemIds: string[];
    participantCount: number;
}

interface MarathonParticipant {
    username: string;
    problemsSolved: number;
    totalScore: number;
    rank: number;
    lastSubmissionAt?: string;
}

interface UserParticipation {
    registered: boolean;
    problemsSolved: number;
    totalScore: number;
}

export default function CodingMarathonPage() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: activeMarathon } = useQuery<Marathon>({
        queryKey: ["/api/challenges/marathon/active"],
    });

    const { data: upcomingMarathons } = useQuery<Marathon[]>({
        queryKey: ["/api/challenges/marathon/upcoming"],
    });

    const { data: leaderboard } = useQuery<MarathonParticipant[]>({
        queryKey: ["/api/challenges/marathon/leaderboard", activeMarathon?.id],
        enabled: !!activeMarathon,
    });

    const { data: userParticipation } = useQuery<UserParticipation>({
        queryKey: ["/api/challenges/marathon/participation", activeMarathon?.id],
        enabled: !!activeMarathon,
    });

    const registerMutation = useMutation({
        mutationFn: async (marathonId: string) => {
            const res = await fetch("/api/challenges/marathon/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ marathonId }),
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/challenges/marathon/participation"] });
            queryClient.invalidateQueries({ queryKey: ["/api/challenges/marathon/active"] });
            toast({
                title: "Registered Successfully!",
                description: "You're now registered for the marathon.",
            });
        },
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "live": return "bg-green-500/20 text-green-400 border-green-500/30";
            case "upcoming": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
            case "completed": return "bg-slate-500/20 text-slate-400 border-slate-500/30";
            default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "easy": return "from-green-500 to-emerald-500";
            case "medium": return "from-yellow-500 to-orange-500";
            case "hard": return "from-red-500 to-pink-500";
            case "mixed": return "from-purple-500 to-indigo-500";
            default: return "from-slate-500 to-slate-600";
        }
    };

    const getTimeRemaining = (endTime: string) => {
        return formatDistanceToNow(new Date(endTime), { addSuffix: true });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6"
        >
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Link href="/challenges">
                        <Button variant="ghost" className="text-slate-400 hover:text-white">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Challenges
                        </Button>
                    </Link>
                </div>

                {/* Page Title */}
                <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg shadow-green-500/50">
                            <Trophy className="h-10 w-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-black text-white">
                        Weekly Coding <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">Marathon</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Compete in multi-problem coding marathons. Solve challenges, climb the leaderboard, and prove your skills!
                    </p>
                </div>

                {/* Active Marathon */}
                {activeMarathon ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <Card className="border-slate-700 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between mb-4">
                                        <Badge className={getStatusColor(activeMarathon.status)}>
                                            {activeMarathon.status === "live" && "🔴 "}
                                            {activeMarathon.status.toUpperCase()}
                                        </Badge>
                                        <Badge className={`bg-gradient-to-r ${getDifficultyColor(activeMarathon.difficulty)} text-white border-0`}>
                                            {activeMarathon.difficulty}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-3xl font-black text-white">{activeMarathon.title}</CardTitle>
                                    <CardDescription className="text-slate-300 text-base">
                                        {activeMarathon.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Marathon Stats */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                            <Target className="h-5 w-5 text-blue-400 mb-2" />
                                            <div className="text-2xl font-black text-white">{activeMarathon.problemIds.length}</div>
                                            <div className="text-xs text-slate-400">Problems</div>
                                        </div>
                                        <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                            <Users className="h-5 w-5 text-purple-400 mb-2" />
                                            <div className="text-2xl font-black text-white">{activeMarathon.participantCount}</div>
                                            <div className="text-xs text-slate-400">Participants</div>
                                        </div>
                                        <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                            <Clock className="h-5 w-5 text-orange-400 mb-2" />
                                            <div className="text-lg font-black text-white">
                                                {activeMarathon.status === "live" ? getTimeRemaining(activeMarathon.endTime) : "Starts Soon"}
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                {activeMarathon.status === "live" ? "Ends" : "Time"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Progress */}
                                    {userParticipation?.registered && activeMarathon.status === "live" && (
                                        <div className="p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg">
                                            <h3 className="text-lg font-bold text-white mb-4">Your Progress</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <div className="flex justify-between text-sm mb-2">
                                                        <span className="text-slate-300">Problems Solved</span>
                                                        <span className="font-bold text-white">
                                                            {userParticipation.problemsSolved} / {activeMarathon.problemIds.length}
                                                        </span>
                                                    </div>
                                                    <Progress
                                                        value={(userParticipation.problemsSolved / activeMarathon.problemIds.length) * 100}
                                                        className="h-2"
                                                    />
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-slate-300">Total Score</span>
                                                    <span className="font-bold text-green-400">{userParticipation.totalScore} pts</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    {!userParticipation?.registered ? (
                                        <Button
                                            onClick={() => registerMutation.mutate(activeMarathon.id)}
                                            disabled={registerMutation.isPending || activeMarathon.status === "completed"}
                                            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-6 text-lg"
                                        >
                                            {activeMarathon.status === "upcoming" ? (
                                                <>
                                                    <Calendar className="h-5 w-5 mr-2" />
                                                    Register for Marathon
                                                </>
                                            ) : (
                                                <>
                                                    <Play className="h-5 w-5 mr-2" />
                                                    Join Marathon
                                                </>
                                            )}
                                        </Button>
                                    ) : (
                                        <Link href={`/contest/${activeMarathon.id}`}>
                                            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-6 text-lg">
                                                <Target className="h-5 w-5 mr-2" />
                                                {activeMarathon.status === "live" ? "Continue Marathon" : "View Marathon"}
                                            </Button>
                                        </Link>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Live Leaderboard */}
                        <div>
                            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <Trophy className="h-5 w-5 text-yellow-400" />
                                        Live Leaderboard
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                                        {leaderboard?.map((participant, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0
                                                                ? "bg-yellow-500/20 text-yellow-400"
                                                                : idx === 1
                                                                    ? "bg-slate-300/20 text-slate-300"
                                                                    : idx === 2
                                                                        ? "bg-orange-500/20 text-orange-400"
                                                                        : "bg-slate-700 text-slate-400"
                                                            }`}
                                                    >
                                                        {participant.rank}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-white">{participant.username}</div>
                                                        <div className="text-xs text-slate-400">
                                                            {participant.problemsSolved} solved
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-green-400">{participant.totalScore}</div>
                                                    <div className="text-xs text-slate-500">pts</div>
                                                </div>
                                            </div>
                                        ))}
                                        {!leaderboard?.length && (
                                            <div className="text-center text-slate-500 py-8">
                                                No participants yet
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ) : (
                    /* No Active Marathon */
                    <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm max-w-2xl mx-auto">
                        <CardContent className="py-16 text-center space-y-4">
                            <Trophy className="h-16 w-16 text-slate-600 mx-auto" />
                            <h3 className="text-2xl font-black text-white">No Active Marathon</h3>
                            <p className="text-slate-400">Check back soon for the next coding marathon!</p>
                        </CardContent>
                    </Card>
                )}

                {/* Upcoming Marathons */}
                {upcomingMarathons && upcomingMarathons.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-black text-white">Upcoming Marathons</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {upcomingMarathons.map((marathon) => (
                                <Card key={marathon.id} className="border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:border-slate-600 transition-all">
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge className={getStatusColor(marathon.status)}>
                                                {marathon.status.toUpperCase()}
                                            </Badge>
                                            <Badge className={`bg-gradient-to-r ${getDifficultyColor(marathon.difficulty)} text-white border-0`}>
                                                {marathon.difficulty}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-xl text-white">{marathon.title}</CardTitle>
                                        <CardDescription className="text-slate-400 line-clamp-2">
                                            {marathon.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Target className="h-4 w-4" />
                                                {marathon.problemIds.length}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="h-4 w-4" />
                                                {marathon.participantCount}
                                            </div>
                                        </div>
                                        <div className="text-sm text-slate-500">
                                            Starts {formatDistanceToNow(new Date(marathon.startTime), { addSuffix: true })}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
