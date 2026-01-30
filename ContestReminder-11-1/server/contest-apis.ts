import axios from "axios";

// Define contest data types
export interface Contest {
  id: string;
  name: string;
  platform: string;
  start_time: string;
  end_time: string;
  duration: number; // in minutes
  url: string;
  status: "upcoming" | "live" | "completed";
}

export interface ApiResponse {
  status: string;
  result?: any;
}

// Codeforces API integration
export class CodeforcesAPI {
  private static readonly BASE_URL = "https://codeforces.com/api";
  
  static async getContests(): Promise<Contest[]> {
    try {
      const response = await axios.get(`${this.BASE_URL}/contest.list`, {
        timeout: 10000,
        headers: {
          'User-Agent': 'CodeArena Contest Tracker'
        }
      });
      
      if (response.data.status === "OK") {
        return response.data.result
          .filter((contest: any) => contest.phase === "BEFORE" || contest.phase === "CODING")
          .slice(0, 20) // Get latest 20 contests
          .map((contest: any) => ({
            id: contest.id.toString(),
            name: contest.name,
            platform: "Codeforces",
            start_time: new Date(contest.startTimeSeconds * 1000).toISOString(),
            end_time: new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000).toISOString(),
            duration: Math.round(contest.durationSeconds / 60),
            url: `https://codeforces.com/contest/${contest.id}`,
            status: contest.phase === "BEFORE" ? "upcoming" : "live"
          }));
      }
      return [];
    } catch (error) {
      console.error("Error fetching Codeforces contests:", error);
      // Return empty array but log the specific error for debugging
      if (axios.isAxiosError(error)) {
        console.error("Codeforces API Error:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
      return [];
    }
  }
}

// Universal contest API (Kontests.net)
export class KontestsAPI {
  private static readonly BASE_URL = "https://www.kontests.net/api/v1";
  
  static async getAllContests(): Promise<Contest[]> {
    try {
      const response = await axios.get(`${this.BASE_URL}/all`, {
        timeout: 15000,
        headers: {
          'User-Agent': 'CodeArena Contest Tracker'
        }
      });
      
      const now = new Date();
      return response.data
        .filter((contest: any) => new Date(contest.end_time) > now) // Only upcoming and live contests
        .slice(0, 50) // Limit to 50 contests
        .map((contest: any) => ({
          id: `${contest.site}-${contest.name.replace(/\s+/g, '-')}-${Date.parse(contest.start_time)}`,
          name: contest.name,
          platform: this.normalizePlatform(contest.site),
          start_time: contest.start_time,
          end_time: contest.end_time,
          duration: Math.round((new Date(contest.end_time).getTime() - new Date(contest.start_time).getTime()) / 60000),
          url: contest.url,
          status: new Date(contest.start_time) <= now && new Date(contest.end_time) > now ? "live" : "upcoming"
        }));
    } catch (error) {
      console.error("Error fetching from Kontests API:", error);
      // Return empty array but log the specific error for debugging
      if (axios.isAxiosError(error)) {
        console.error("Kontests API Error:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
      return [];
    }
  }
  
  private static normalizePlatform(site: string): string {
    const platformMap: { [key: string]: string } = {
      'CodeForces': 'Codeforces',
      'CodeChef': 'CodeChef',
      'LeetCode': 'LeetCode',
      'AtCoder': 'AtCoder',
      'HackerRank': 'HackerRank',
      'TopCoder': 'TopCoder',
      'HackerEarth': 'HackerEarth',
      'Kick Start': 'Google Kick Start',
      'CSAcademy': 'CS Academy',
    };
    
    return platformMap[site] || site;
  }
}

// Contest aggregator service
export class ContestService {
  static async fetchAllContests(): Promise<Contest[]> {
    try {
      // Fetch from both APIs simultaneously
      const [codeforcesContests, kontestsContests] = await Promise.allSettled([
        CodeforcesAPI.getContests(),
        KontestsAPI.getAllContests()
      ]);
      
      const contests: Contest[] = [];
      
      // Add Codeforces contests
      if (codeforcesContests.status === "fulfilled") {
        contests.push(...codeforcesContests.value);
      }
      
      // Add Kontests contests
      if (kontestsContests.status === "fulfilled") {
        contests.push(...kontestsContests.value);
      }
      
      // Remove duplicates and sort by start time
      const uniqueContests = contests.filter((contest, index, self) => 
        index === self.findIndex(c => c.name === contest.name && c.platform === contest.platform)
      );
      
      return uniqueContests
        .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
        .slice(0, 100); // Limit to 100 most relevant contests
        
    } catch (error) {
      console.error("Error in contest service:", error);
      return [];
    }
  }
  
  static async getContestsByPlatform(platform: string): Promise<Contest[]> {
    const allContests = await this.fetchAllContests();
    return allContests.filter(contest => 
      contest.platform.toLowerCase().includes(platform.toLowerCase())
    );
  }
  
  static formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  }
  
  static getTimeUntilContest(startTime: string): string {
    const now = new Date();
    const start = new Date(startTime);
    const diffMs = start.getTime() - now.getTime();
    
    if (diffMs <= 0) return "Started";
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) return `${diffDays}d ${diffHours}h`;
    if (diffHours > 0) return `${diffHours}h ${diffMinutes}m`;
    return `${diffMinutes}m`;
  }
}