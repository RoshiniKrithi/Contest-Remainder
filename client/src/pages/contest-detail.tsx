import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, Trophy } from "lucide-react";
import ContestTimer from "@/components/contests/contest-timer";
import CodeEditor from "@/components/code-editor/code-editor";

export default function ContestDetail() {
  const [, params] = useRoute("/contest/:id");
  const contestId = params?.id;

  const { data: contest, isLoading: contestLoading } = useQuery({
    queryKey: ["/api/contests", contestId],
    enabled: !!contestId,
  });

  const { data: problems, isLoading: problemsLoading } = useQuery({
    queryKey: ["/api/contests", contestId, "problems"],
    enabled: !!contestId,
  });

  if (contestLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Contest Not Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              The requested contest could not be found.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isLive = contest.status === "live";
  const isUpcoming = contest.status === "upcoming";

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDuration = () => {
    const start = new Date(contest.startTime);
    const end = new Date(contest.endTime);
    const duration = end.getTime() - start.getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {contest.title}
          </h1>
          <Badge 
            variant={isLive ? "default" : isUpcoming ? "secondary" : "outline"}
            className={isLive ? "bg-secondary text-white" : isUpcoming ? "bg-accent text-white" : ""}
          >
            {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
          </Badge>
        </div>
        
        {contest.description && (
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {contest.description}
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>Starts: {formatDateTime(contest.startTime)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Duration: {getDuration()}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Users className="h-4 w-4" />
            <span>{contest.participants} participants</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Trophy className="h-4 w-4" />
            <span>{problems?.length || 0} problems</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="problems" className="space-y-6">
            <TabsList>
              <TabsTrigger value="problems">Problems</TabsTrigger>
              <TabsTrigger value="submissions">My Submissions</TabsTrigger>
              {isLive && <TabsTrigger value="editor">Code Editor</TabsTrigger>}
            </TabsList>

            <TabsContent value="problems">
              <Card>
                <CardContent className="p-6">
                  {problemsLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : problems?.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-400">
                        No problems have been added to this contest yet.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {problems?.map((problem: any, index: number) => (
                        <div key={problem.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                              {String.fromCharCode(65 + index)}. {problem.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{problem.difficulty}</Badge>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {problem.points} pts
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                            {problem.description?.substring(0, 150)}...
                          </p>
                          {isLive && (
                            <Button size="sm">
                              Solve Problem
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="submissions">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">
                      No submissions yet. Start solving problems to see your submissions here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {isLive && (
              <TabsContent value="editor">
                <CodeEditor />
              </TabsContent>
            )}
          </Tabs>
        </div>

        <div className="space-y-6">
          {isLive && <ContestTimer contest={contest} />}
          
        </div>
      </div>
    </div>
  );
}
