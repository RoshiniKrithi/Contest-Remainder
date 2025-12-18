import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, Trophy, Target } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface ProgressData {
  month: string;
  contestsAttended: number;
  problemsSolved: number;
  averageRating: number;
}

interface ProgressGraphProps {
  className?: string;
}

export default function ProgressGraph({ className }: ProgressGraphProps) {
  const { data: progressData, isLoading, error } = useQuery({
    queryKey: ["/api/progress"],
  });

  if (isLoading) {
    return (
      <Card className={className} data-testid="card-progress-graph">
        <CardHeader>
          <CardTitle className="flex items-center gap-2" data-testid="text-progress-title">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !progressData || !Array.isArray(progressData) || progressData.length === 0) {
    return (
      <Card className={className} data-testid="card-progress-graph">
        <CardHeader>
          <CardTitle className="flex items-center gap-2" data-testid="text-progress-title">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 dark:text-gray-400 text-center py-4">
            No progress data available
          </p>
        </CardContent>
      </Card>
    );
  }

  const latestData = progressData[progressData.length - 1];
  const previousData = progressData[progressData.length - 2];
  
  const contestsGrowth = previousData ? latestData.contestsAttended - previousData.contestsAttended : 0;
  const problemsGrowth = previousData ? latestData.problemsSolved - previousData.problemsSolved : 0;
  const ratingGrowth = previousData ? latestData.averageRating - previousData.averageRating : 0;

  return (
    <Card className={className} data-testid="card-progress-graph">
      <CardHeader>
        <CardTitle className="flex items-center gap-2" data-testid="text-progress-title">
          <TrendingUp className="h-5 w-5 text-purple-600" />
          Progress Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center" data-testid="metric-contests">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Contests</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100" data-testid="value-contests-attended">
              {latestData.contestsAttended}
            </div>
            <div className={`text-xs ${contestsGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`} data-testid="growth-contests">
              {contestsGrowth >= 0 ? '+' : ''}{contestsGrowth} this month
            </div>
          </div>
          
          <div className="text-center" data-testid="metric-problems">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Problems</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100" data-testid="value-problems-solved">
              {latestData.problemsSolved}
            </div>
            <div className={`text-xs ${problemsGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`} data-testid="growth-problems">
              {problemsGrowth >= 0 ? '+' : ''}{problemsGrowth} this month
            </div>
          </div>
          
          <div className="text-center" data-testid="metric-rating">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Rating</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100" data-testid="value-average-rating">
              {latestData.averageRating}
            </div>
            <div className={`text-xs ${ratingGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`} data-testid="growth-rating">
              {ratingGrowth >= 0 ? '+' : ''}{ratingGrowth} this month
            </div>
          </div>
        </div>

        {/* Contest Participation Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3" data-testid="title-contests-chart">
            Contest Participation
          </h4>
          <ResponsiveContainer width="100%" height={120} data-testid="chart-contests">
            <AreaChart data={progressData}>
              <defs>
                <linearGradient id="contestGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="contestsAttended" 
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#contestGradient)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Rating Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3" data-testid="title-rating-chart">
            Performance Rating
          </h4>
          <ResponsiveContainer width="100%" height={120} data-testid="chart-rating">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis hide domain={['dataMin - 50', 'dataMax + 50']} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="averageRating" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2, fill: '#ffffff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}