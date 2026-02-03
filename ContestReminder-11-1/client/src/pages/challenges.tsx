import { motion } from "framer-motion";
import { Link } from "wouter";
import { Zap, Brain, Calendar, Trophy, Keyboard, Award, Timer, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

interface ChallengeStats {
    typing: { completed: number; bestWPM: number };
    quiz: { completed: number; averageScore: number };
    brainTeaser: { streak: number; totalSolved: number };
    marathon: { participated: number; bestRank: number };
}

export default function Challenges() {
    const { data: stats } = useQuery<ChallengeStats>({
        queryKey: ["/api/challenges/stats"],
    });

    const challenges = [
        {
            id: "typing",
            title: "Speed Typing",
            description: "Race against time while typing code snippets. Improve your coding speed and accuracy!",
            icon: Keyboard,
            color: "from-blue-500 to-cyan-500",
            bgGradient: "from-blue-500/10 to-cyan-500/10",
            link: "/challenges/typing",
            stats: stats?.typing ? `Best: ${stats.typing.bestWPM} WPM | Completed: ${stats.typing.completed}` : "Start your first challenge!",
            iconBg: "bg-blue-500/20",
            iconColor: "text-blue-400",
        },
        {
            id: "quiz",
            title: "Algorithm Quiz",
            description: "Test your algorithm knowledge with timed multiple-choice questions. Master data structures!",
            icon: Brain,
            color: "from-purple-500 to-pink-500",
            bgGradient: "from-purple-500/10 to-pink-500/10",
            link: "/challenges/quiz",
            stats: stats?.quiz ? `Avg Score: ${stats.quiz.averageScore}% | Completed: ${stats.quiz.completed}` : "Start your first quiz!",
            iconBg: "bg-purple-500/20",
            iconColor: "text-purple-400",
        },
        {
            id: "brain-teaser",
            title: "Daily Brain Teaser",
            description: "Solve a new puzzle every day! Build your streak and sharpen your problem-solving skills.",
            icon: Target,
            color: "from-orange-500 to-red-500",
            bgGradient: "from-orange-500/10 to-red-500/10",
            link: "/challenges/brain-teaser",
            stats: stats?.brainTeaser ? `🔥 ${stats.brainTeaser.streak} Day Streak | Solved: ${stats.brainTeaser.totalSolved}` : "Start your streak today!",
            iconBg: "bg-orange-500/20",
            iconColor: "text-orange-400",
        },
        {
            id: "marathon",
            title: "Weekly Marathon",
            description: "Compete in weekly coding marathons. Solve multiple problems and climb the leaderboard!",
            icon: Trophy,
            color: "from-green-500 to-emerald-500",
            bgGradient: "from-green-500/10 to-emerald-500/10",
            link: "/challenges/marathon",
            stats: stats?.marathon ? `Best Rank: #${stats.marathon.bestRank} | Marathons: ${stats.marathon.participated}` : "Join your first marathon!",
            iconBg: "bg-green-500/20",
            iconColor: "text-green-400",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6"
        >
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center space-y-4"
                >
                    <div className="flex items-center justify-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/50">
                            <Zap className="h-10 w-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tight">
                        Mini-Games & <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Challenges</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Sharpen your coding skills through fun and engaging challenges. Compete, learn, and track your progress!
                    </p>
                </motion.div>

                {/* Challenge Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {challenges.map((challenge, index) => {
                        const IconComponent = challenge.icon;
                        return (
                            <motion.div
                                key={challenge.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                            >
                                <Card className={`group relative overflow-hidden border-slate-700 bg-gradient-to-br ${challenge.bgGradient} backdrop-blur-sm hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-${challenge.color.split('-')[1]}-500/20 hover:-translate-y-1`}>
                                    {/* Animated Background Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${challenge.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                    <CardHeader className="relative">
                                        <div className="flex items-start justify-between">
                                            <div className={`p-4 rounded-xl ${challenge.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                                                <IconComponent className={`h-8 w-8 ${challenge.iconColor}`} />
                                            </div>
                                            <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${challenge.color} text-white text-xs font-bold uppercase tracking-wider shadow-lg`}>
                                                New
                                            </div>
                                        </div>
                                        <CardTitle className="text-2xl font-black text-white mt-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
                                            {challenge.title}
                                        </CardTitle>
                                        <CardDescription className="text-slate-400 text-sm leading-relaxed">
                                            {challenge.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="relative space-y-4">
                                        {/* Stats */}
                                        <div className="flex items-center gap-2 text-sm">
                                            <Award className={`h-4 w-4 ${challenge.iconColor}`} />
                                            <span className="text-slate-300 font-medium">{challenge.stats}</span>
                                        </div>

                                        {/* Action Button */}
                                        <Link href={challenge.link}>
                                            <Button
                                                className={`w-full bg-gradient-to-r ${challenge.color} text-white font-bold py-6 rounded-xl hover:shadow-2xl hover:shadow-${challenge.color.split('-')[1]}-500/50 transform hover:scale-105 transition-all duration-300 group-hover:animate-pulse`}
                                            >
                                                <Timer className="h-5 w-5 mr-2" />
                                                Start Challenge
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Overall Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12"
                >
                    <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl font-black text-white flex items-center gap-3">
                                <Award className="h-6 w-6 text-yellow-400" />
                                Your Achievement Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="space-y-2 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <div className="text-3xl font-black text-blue-400">{stats?.typing?.completed || 0}</div>
                                    <div className="text-sm text-slate-400">Typing Challenges</div>
                                </div>
                                <div className="space-y-2 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                    <div className="text-3xl font-black text-purple-400">{stats?.quiz?.completed || 0}</div>
                                    <div className="text-sm text-slate-400">Quizzes Completed</div>
                                </div>
                                <div className="space-y-2 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                                    <div className="text-3xl font-black text-orange-400">🔥 {stats?.brainTeaser?.streak || 0}</div>
                                    <div className="text-sm text-slate-400">Day Streak</div>
                                </div>
                                <div className="space-y-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                                    <div className="text-3xl font-black text-green-400">{stats?.marathon?.participated || 0}</div>
                                    <div className="text-sm text-slate-400">Marathons Joined</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
