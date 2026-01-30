// Dummy Leaderboard – Backend integration pending

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";

// Static dummy data for leaderboard
const leaderboardData = [
    { rank: 1, username: "Alex", contestsParticipated: 25, problemsSolved: 320, score: 1850 },
    { rank: 2, username: "Roshini", contestsParticipated: 22, problemsSolved: 290, score: 1700 },
    { rank: 3, username: "Sam", contestsParticipated: 20, problemsSolved: 260, score: 1600 },
    { rank: 4, username: "Priya", contestsParticipated: 18, problemsSolved: 230, score: 1450 },
    { rank: 5, username: "John", contestsParticipated: 15, problemsSolved: 200, score: 1300 },
];

export default function Leaderboard() {
    // Function to get rank badge color, icon, and background
    const getRankBadge = (rank: number) => {
        switch (rank) {
            case 1:
                return { icon: Trophy, color: "text-yellow-400", bgClass: "bg-yellow-400/8" };
            case 2:
                return { icon: Medal, color: "text-gray-300", bgClass: "bg-gray-300/6" };
            case 3:
                return { icon: Award, color: "text-orange-400", bgClass: "bg-orange-400/6" };
            default:
                return null;
        }
    };

    return (
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-black mb-2" data-testid="text-page-title">
                    Leaderboard
                </h1>
                <p className="text-gray-800">
                    Top performers based on contest activity
                </p>
            </div>

            <Card className="overflow-hidden bg-slate-950 border-slate-800">
                <CardHeader className="bg-slate-950">
                    <CardTitle className="text-xl flex items-center gap-2 text-slate-100">
                        <Trophy className="h-5 w-5 text-yellow-400" />
                        Top Performers
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-900 border-b border-slate-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-200 uppercase tracking-wider">
                                        Rank
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-200 uppercase tracking-wider">
                                        Username
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-200 uppercase tracking-wider">
                                        Contests Participated
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-200 uppercase tracking-wider">
                                        Problems Solved
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-200 uppercase tracking-wider">
                                        Score
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-slate-950 divide-y divide-slate-800">
                                {leaderboardData.map((user) => {
                                    const badge = getRankBadge(user.rank);
                                    const Icon = badge?.icon;

                                    return (
                                        <tr
                                            key={user.rank}
                                            className={`hover:bg-slate-900 hover:outline hover:outline-1 hover:outline-sky-400 transition-all duration-150 ${badge ? badge.bgClass : ''}`}
                                            data-testid={`leaderboard-row-${user.rank}`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    {Icon && <Icon className={`h-5 w-5 ${badge.color}`} />}
                                                    <span className="text-sm font-bold text-slate-200">
                                                        #{user.rank}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-medium text-slate-50">
                                                    {user.username}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-slate-300">
                                                    {user.contestsParticipated}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-slate-300">
                                                    {user.problemsSolved}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-semibold text-green-500">
                                                    {user.score}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4 p-4">
                        {leaderboardData.map((user) => {
                            const badge = getRankBadge(user.rank);
                            const Icon = badge?.icon;

                            return (
                                <Card key={user.rank} className={`hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-150 bg-slate-950 border-slate-800 ${badge ? badge.bgClass : ''}`}>
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                {Icon && <Icon className={`h-5 w-5 ${badge.color}`} />}
                                                <span className="text-lg font-bold text-slate-200">
                                                    #{user.rank}
                                                </span>
                                            </div>
                                            <span className="text-lg font-semibold text-green-500">
                                                {user.score} pts
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-slate-400">Username:</span>
                                                <span className="text-sm font-medium text-slate-50">
                                                    {user.username}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-slate-400">Contests:</span>
                                                <span className="text-sm text-slate-300">
                                                    {user.contestsParticipated}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-slate-400">Problems:</span>
                                                <span className="text-sm text-slate-300">
                                                    {user.problemsSolved}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Footer Note */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-700">
                    This is a demo leaderboard. Real-time rankings coming soon.
                </p>
            </div>
        </div>
    );
}
