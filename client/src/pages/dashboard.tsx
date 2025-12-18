import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Code, Bell, ExternalLink, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ContestTimer from "@/components/contests/contest-timer";
import ProgressGraph from "@/components/progress/progress-graph";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/stats"],
  });

  const { data: contests, isLoading: contestsLoading } = useQuery({
    queryKey: ["/api/external-contests"],
  });


  const liveContests = Array.isArray(contests) ? contests.filter((c: any) => c.status === "live") : [];
  const upcomingContests = Array.isArray(contests) ? contests.filter((c: any) => c.status === "upcoming").slice(0, 5) : [];

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  const getTimeRemaining = (endTime: string) => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const remaining = end - now;
    
    if (remaining <= 0) return "Ended";
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m left`;
  };

  const statsCards = [
    {
      title: "Contests Attended",
      value: 47,
      icon: Trophy,
      color: "bg-green-100 dark:bg-green-900",
      iconColor: "text-secondary",
    },
    {
      title: "Total Participants",
      value: 1847,
      icon: Users,
      color: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-primary",
    },
    {
      title: "Problems Solved",
      value: 342,
      icon: Code,
      color: "bg-orange-100 dark:bg-orange-900",
      iconColor: "text-accent",
    },
    {
      title: "Upcoming Contests",
      value: upcomingContests.length,
      icon: Bell,
      color: "bg-red-100 dark:bg-red-900",
      iconColor: "text-destructive",
    },
  ];

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <Card key={index} className="card-hover theme-transition">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {statsLoading ? "..." : stat.value.toLocaleString()}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`${stat.iconColor} text-xl h-6 w-6`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Live Contests Section */}
          <Card>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Live Contests
                </h2>
                <span className="bg-green-100 dark:bg-green-900 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                  <span className="inline-block w-2 h-2 bg-secondary rounded-full mr-1"></span>
                  {liveContests.length} Active
                </span>
              </div>
            </div>
            <CardContent className="p-0">
              {contestsLoading ? (
                <div className="p-6 space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="animate-pulse border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              ) : liveContests.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                  No live contests at the moment
                </p>
              ) : (
                <Table>
                  <TableHeader className="bg-gray-100 dark:bg-gray-800">
                    <TableRow>
                      <TableHead className="text-gray-900 dark:text-white font-semibold">Contest Name</TableHead>
                      <TableHead className="text-gray-900 dark:text-white font-semibold">Platform</TableHead>
                      <TableHead className="text-gray-900 dark:text-white font-semibold">Duration</TableHead>
                      <TableHead className="text-gray-900 dark:text-white font-semibold">Time Remaining</TableHead>
                      <TableHead className="text-gray-900 dark:text-white font-semibold">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {liveContests.map((contest: any) => (
                      <TableRow key={contest.id} data-testid={`row-live-contest-${contest.id}`}>
                        <TableCell className="font-medium" data-testid={`text-contest-name-${contest.id}`}>
                          {contest.name || contest.title}
                        </TableCell>
                        <TableCell data-testid={`text-platform-${contest.id}`}>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                            {contest.platform}
                          </span>
                        </TableCell>
                        <TableCell data-testid={`text-duration-${contest.id}`}>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-gray-500" />
                            {contest.duration ? formatDuration(contest.duration) : "N/A"}
                          </div>
                        </TableCell>
                        <TableCell data-testid={`text-time-remaining-${contest.id}`}>
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {contest.end_time ? getTimeRemaining(contest.end_time) : "N/A"}
                          </span>
                        </TableCell>
                        <TableCell data-testid={`action-live-contest-${contest.id}`}>
                          {contest.url ? (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => window.open(contest.url, '_blank')}
                              data-testid={`button-join-contest-${contest.id}`}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Join
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" disabled>
                              View
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Contests Section */}
          <Card>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Upcoming Contests
              </h2>
            </div>
            <CardContent className="p-0">
              {contestsLoading ? (
                <div className="p-6 space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="animate-pulse border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              ) : upcomingContests.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                  No upcoming contests scheduled
                </p>
              ) : (
                <Table>
                  <TableHeader className="bg-gray-100 dark:bg-gray-800">
                    <TableRow>
                      <TableHead className="text-gray-900 dark:text-white font-semibold">Contest Name</TableHead>
                      <TableHead className="text-gray-900 dark:text-white font-semibold">Platform</TableHead>
                      <TableHead className="text-gray-900 dark:text-white font-semibold">Start Time</TableHead>
                      <TableHead className="text-gray-900 dark:text-white font-semibold">Duration</TableHead>
                      <TableHead className="text-gray-900 dark:text-white font-semibold">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingContests.map((contest: any) => (
                      <TableRow key={contest.id} data-testid={`row-upcoming-contest-${contest.id}`}>
                        <TableCell className="font-medium" data-testid={`text-contest-name-${contest.id}`}>
                          {contest.name || contest.title}
                        </TableCell>
                        <TableCell data-testid={`text-platform-${contest.id}`}>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                            {contest.platform}
                          </span>
                        </TableCell>
                        <TableCell data-testid={`text-start-time-${contest.id}`}>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            {contest.start_time ? formatDateTime(contest.start_time) : "TBD"}
                          </div>
                        </TableCell>
                        <TableCell data-testid={`text-duration-${contest.id}`}>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-gray-500" />
                            {contest.duration ? formatDuration(contest.duration) : "N/A"}
                          </div>
                        </TableCell>
                        <TableCell data-testid={`action-upcoming-contest-${contest.id}`}>
                          {contest.url ? (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => window.open(contest.url, '_blank')}
                              data-testid={`button-view-contest-${contest.id}`}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" disabled>
                              View
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>


        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Progress Graph */}
          <ProgressGraph />

          {/* Contest Timer */}
          {liveContests.length > 0 && (
            <ContestTimer contest={liveContests[0]} />
          )}
        </div>
      </div>
    </div>
  );
}
