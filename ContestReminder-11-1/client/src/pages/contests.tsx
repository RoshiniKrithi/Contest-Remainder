import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ContestCard from "@/components/contests/contest-card";
import { useState } from "react";
import { Filter, Globe } from "lucide-react";

// Interface for external contest data
interface ExternalContest {
  id: string;
  name: string;
  platform: string;
  start_time: string;
  end_time: string;
  duration: number;
  url: string;
  status: "upcoming" | "live" | "completed";
}

export default function Contests() {
  const { data: contests = [], isLoading } = useQuery<ExternalContest[]>({
    queryKey: ["/api/external-contests"],
  });
  
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  
  // Get unique platforms
  const platforms = Array.from(new Set(contests.map(c => c.platform))).sort();
  
  // Filter contests by platform if selected
  const filteredContests = selectedPlatform 
    ? contests.filter(c => c.platform === selectedPlatform)
    : contests;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <Card>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const liveContests = filteredContests.filter((c) => c.status === "live");
  const upcomingContests = filteredContests.filter((c) => c.status === "upcoming");
  const completedContests = filteredContests.filter((c) => c.status === "completed");
  
  // Group contests by platform for display
  const contestsByPlatform = contests.reduce((acc, contest) => {
    if (!acc[contest.platform]) {
      acc[contest.platform] = { live: [], upcoming: [], completed: [] };
    }
    acc[contest.platform][contest.status].push(contest);
    return acc;
  }, {} as Record<string, { live: ExternalContest[], upcoming: ExternalContest[], completed: ExternalContest[] }>);

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2" data-testid="text-page-title">
              Live Contests
            </h1>
            <p className="text-black">
              Upcoming and ongoing contests from major coding platforms
            </p>
          </div>
          
          {/* Platform Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-gray-500" />
            <Button
              variant={selectedPlatform === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPlatform(null)}
              className="text-xs"
              data-testid="button-filter-all"
            >
              <Globe className="h-3 w-3 mr-1" />
              All Platforms
            </Button>
            {platforms.map((platform) => (
              <Button
                key={platform}
                variant={selectedPlatform === platform ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPlatform(platform)}
                className="text-xs"
                data-testid={`button-filter-${platform.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {platform}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Tabs defaultValue="live" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="live" className="relative">
            Live
            {liveContests.length > 0 && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {liveContests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="relative">
            Upcoming
            {upcomingContests.length > 0 && (
              <Badge variant="outline" className="ml-2 text-xs">
                {upcomingContests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          {liveContests.length === 0 ? (
            <Card data-testid="card-no-live-contests">
              <CardContent className="p-12 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No Live Contests
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedPlatform 
                    ? `No live contests on ${selectedPlatform} at the moment.`
                    : "There are no contests running at the moment. Check back later!"
                  }
                </p>
              </CardContent>
            </Card>
          ) : selectedPlatform ? (
            <div className="grid gap-6">
              {liveContests.map((contest) => (
                <Card key={contest.id} data-testid={`card-contest-${contest.id}`}>
                  <CardContent className="p-6">
                    <ContestCard contest={contest} />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(contestsByPlatform).map(([platform, platformContests]) => {
                if (platformContests.live.length === 0) return null;
                return (
                  <div key={platform}>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2" data-testid={`text-platform-${platform.toLowerCase().replace(/\s+/g, '-')}`}>
                          <Globe className="h-4 w-4" />
                          {platform} - Live Contests
                          <Badge variant="secondary" className="ml-auto">
                            {platformContests.live.length}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {platformContests.live.map((contest) => (
                          <ContestCard key={contest.id} contest={contest} />
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          {upcomingContests.length === 0 ? (
            <Card data-testid="card-no-upcoming-contests">
              <CardContent className="p-12 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No Upcoming Contests
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedPlatform 
                    ? `No upcoming contests on ${selectedPlatform} at the moment.`
                    : "No contests are scheduled. Check back later!"
                  }
                </p>
              </CardContent>
            </Card>
          ) : selectedPlatform ? (
            <div className="grid gap-6">
              {upcomingContests.map((contest) => (
                <Card key={contest.id} data-testid={`card-contest-${contest.id}`}>
                  <CardContent className="p-6">
                    <ContestCard contest={contest} />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(contestsByPlatform).map(([platform, platformContests]) => {
                if (platformContests.upcoming.length === 0) return null;
                return (
                  <div key={platform}>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2" data-testid={`text-platform-${platform.toLowerCase().replace(/\s+/g, '-')}`}>
                          <Globe className="h-4 w-4" />
                          {platform} - Upcoming Contests
                          <Badge variant="outline" className="ml-auto">
                            {platformContests.upcoming.length}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {platformContests.upcoming.map((contest) => (
                          <ContestCard key={contest.id} contest={contest} />
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {completedContests.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No Completed Contests
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Past contests will appear here once they finish.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {completedContests.map((contest: any) => (
                <Card key={contest.id}>
                  <CardContent className="p-6">
                    <ContestCard contest={contest} />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
