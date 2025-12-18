import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, Calendar, Hourglass } from "lucide-react";
import { Link } from "wouter";

interface ContestCardProps {
  contest: {
    id: string;
    name?: string; // External contest field
    title?: string; // Internal contest field
    platform?: string; // External contest field
    status: string;
    participants?: number; // Optional for external contests
    startTime?: string; // Internal contest field
    endTime?: string; // Internal contest field
    start_time?: string; // External contest field
    end_time?: string; // External contest field
    url?: string; // External contest field
    duration?: number; // External contest field in minutes
  };
}

export default function ContestCard({ contest }: ContestCardProps) {
  const isLive = contest.status === "live";
  const isUpcoming = contest.status === "upcoming";
  
  // Handle both internal and external contest data structures
  const contestTitle = contest.title || contest.name || "Untitled Contest";
  const startTime = contest.startTime || contest.start_time;
  const endTime = contest.endTime || contest.end_time;
  
  const getTimeInfo = () => {
    if (!startTime || !endTime) return "";
    
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (isLive) {
      const timeLeft = end.getTime() - now.getTime();
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      return `Ends in ${hours}h ${minutes}m`;
    } else if (isUpcoming) {
      const duration = end.getTime() - start.getTime();
      const hours = Math.floor(duration / (1000 * 60 * 60));
      return `${hours} hours`;
    }
    return "";
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDurationInfo = () => {
    if (contest.duration) {
      const hours = Math.floor(contest.duration / 60);
      const mins = contest.duration % 60;
      if (hours === 0) return `${mins}m`;
      if (mins === 0) return `${hours}h`;
      return `${hours}h ${mins}m`;
    }
    return getTimeInfo();
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary transition-colors card-hover theme-transition">
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1 mr-2">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1" data-testid="text-contest-title">
            {contestTitle}
          </h3>
          {contest.platform && (
            <p className="text-xs text-gray-600 dark:text-gray-300" data-testid="text-platform">
              {contest.platform}
            </p>
          )}
        </div>
        <Badge 
          variant={isLive ? "default" : "secondary"}
          className={isLive ? "bg-green-600 text-white" : isUpcoming ? "bg-blue-600 text-white" : "bg-gray-600 text-white"}
          data-testid="badge-status"
        >
          {isLive ? "Live" : isUpcoming ? "Upcoming" : "Completed"}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
        {contest.participants !== undefined ? (
          <span className="flex items-center" data-testid="text-participants">
            <Users className="h-4 w-4 mr-1" />
            {contest.participants} participants
          </span>
        ) : (
          <span className="flex items-center" data-testid="text-duration">
            <Hourglass className="h-4 w-4 mr-1" />
            Duration: {getDurationInfo()}
          </span>
        )}
        <span className="flex items-center" data-testid="text-time-info">
          {isLive ? (
            <>
              <Clock className="h-4 w-4 mr-1" />
              {getTimeInfo()}
            </>
          ) : (
            <>
              <Calendar className="h-4 w-4 mr-1" />
              {getDurationInfo()}
            </>
          )}
        </span>
      </div>

      {isUpcoming && startTime && (
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center" data-testid="text-start-time">
          <Calendar className="h-4 w-4 mr-1" />
          {formatDateTime(startTime)}
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        {contest.url ? (
          <a href={contest.url} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="btn-animate" data-testid="button-open-contest">
              {isLive ? "Join Contest" : "View Contest"}
            </Button>
          </a>
        ) : (
          <Link href={`/contest/${contest.id}`}>
            <Button size="sm" className="btn-animate" data-testid="button-join-contest">
              {isLive ? "Join Contest" : "Register"}
            </Button>
          </Link>
        )}
        {!contest.url && (
          <Link href={`/contest/${contest.id}`}>
            <Button variant="outline" size="sm" className="btn-animate" data-testid="button-view-details">
              View {isLive ? "Problems" : "Details"}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
