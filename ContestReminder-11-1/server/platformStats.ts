import axios from "axios";

export interface PlatformStat {
  platform: string;
  handle: string;
  solved: number;
  rating: number | null;
  rank: string | null;
  badges: string[];
  easy: number;
  medium: number;
  hard: number;
  contests: number;
  profileUrl: string;
  error?: string;
}

// ── Codeforces ────────────────────────────────────────────────────────────────
async function fetchCodeforces(handle: string): Promise<PlatformStat> {
  const base: PlatformStat = {
    platform: "Codeforces", handle, solved: 0, rating: null,
    rank: null, badges: [], easy: 0, medium: 0, hard: 0,
    contests: 0, profileUrl: `https://codeforces.com/profile/${handle}`
  };
  try {
    const [userRes, subRes] = await Promise.all([
      axios.get(`https://codeforces.com/api/user.info?handles=${handle}`, { timeout: 8000 }),
      axios.get(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000`, { timeout: 10000 }),
    ]);
    const u = userRes.data.result[0];
    base.rating = u.rating ?? null;
    base.rank = u.rank ?? null;
    base.badges = u.rank ? [u.rank] : [];

    const accepted = new Set<string>();
    for (const s of subRes.data.result) {
      if (s.verdict === "OK") {
        accepted.add(`${s.problem.contestId}-${s.problem.index}`);
      }
    }
    base.solved = accepted.size;

    const ratingRes = await axios.get(
      `https://codeforces.com/api/user.rating?handle=${handle}`, { timeout: 8000 }
    );
    base.contests = ratingRes.data.result?.length ?? 0;
  } catch (e: any) {
    base.error = e.message;
  }
  return base;
}

// ── LeetCode ──────────────────────────────────────────────────────────────────
async function fetchLeetCode(handle: string): Promise<PlatformStat> {
  const base: PlatformStat = {
    platform: "LeetCode", handle, solved: 0, rating: null,
    rank: null, badges: [], easy: 0, medium: 0, hard: 0,
    contests: 0, profileUrl: `https://leetcode.com/u/${handle}/`
  };
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats { acSubmissionNum { difficulty count } }
          profile { ranking }
          badges { name }
          userCalendar { streak totalActiveDays }
        }
        userContestRanking(username: $username) { rating attendedContestsCount }
      }`;
    const res = await axios.post(
      "https://leetcode.com/graphql",
      { query, variables: { username: handle } },
      { timeout: 10000, headers: { "Content-Type": "application/json", "Referer": "https://leetcode.com" } }
    );
    const u = res.data?.data?.matchedUser;
    if (!u) { base.error = "User not found"; return base; }

    for (const s of u.submitStats?.acSubmissionNum ?? []) {
      if (s.difficulty === "Easy") base.easy = s.count;
      else if (s.difficulty === "Medium") base.medium = s.count;
      else if (s.difficulty === "Hard") base.hard = s.count;
      else if (s.difficulty === "All") base.solved = s.count;
    }
    base.rank = u.profile?.ranking ? `#${u.profile.ranking}` : null;
    base.badges = (u.badges ?? []).map((b: any) => b.name);

    const cr = res.data?.data?.userContestRanking;
    if (cr) {
      base.rating = Math.round(cr.rating ?? 0) || null;
      base.contests = cr.attendedContestsCount ?? 0;
    }
  } catch (e: any) {
    base.error = e.message;
  }
  return base;
}

// ── CodeChef ──────────────────────────────────────────────────────────────────
async function fetchCodeChef(handle: string): Promise<PlatformStat> {
  const base: PlatformStat = {
    platform: "CodeChef", handle, solved: 0, rating: null,
    rank: null, badges: [], easy: 0, medium: 0, hard: 0,
    contests: 0, profileUrl: `https://www.codechef.com/users/${handle}`
  };
  try {
    const res = await axios.get(`https://www.codechef.com/users/${handle}`, {
      timeout: 12000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    const html: string = res.data;

    // Rating — "rating-number">1583
    const ratingMatch = html.match(/class="rating-number">(\d+)/);
    if (ratingMatch) base.rating = parseInt(ratingMatch[1]);

    // Stars — count ★ characters in the rating widget
    const starsMatch = html.match(/class="rating-star">([\s\S]*?)<\/div>/);
    if (starsMatch) {
      const starCount = (starsMatch[1].match(/&#9733;/g) || []).length;
      base.rank = starCount ? `${starCount}★` : null;
      if (starCount) base.badges = [`${starCount} Star`];
    }

    // Total problems solved
    const solvedMatch = html.match(/Total Problems Solved:\s*(\d+)/);
    if (solvedMatch) base.solved = parseInt(solvedMatch[1]);

    // Contest count — count entries in all_rating array
    const ratingArrayMatch = html.match(/var all_rating = (\[[\s\S]*?\]);/);
    if (ratingArrayMatch) {
      try {
        const arr = JSON.parse(ratingArrayMatch[1]);
        base.contests = arr.length;
      } catch { /* ignore */ }
    }

    // Badges
    const badgeMatches = html.matchAll(/class='badge__title'>(.*?)<\/p>/g);
    const badgeList: string[] = [];
    for (const m of badgeMatches) badgeList.push(m[1].trim());
    if (badgeList.length) base.badges = badgeList;

    // Global rank
    const globalRankMatch = html.match(/Global Rank[\s\S]*?<strong>([\d,]+)<\/strong>/);
    if (globalRankMatch) base.rank = `Global #${globalRankMatch[1].replace(/,/g, "")}`;

  } catch (e: any) {
    base.error = e.message;
  }
  return base;
}

// ── AtCoder ───────────────────────────────────────────────────────────────────
async function fetchAtCoder(handle: string): Promise<PlatformStat> {
  const base: PlatformStat = {
    platform: "AtCoder", handle, solved: 0, rating: null,
    rank: null, badges: [], easy: 0, medium: 0, hard: 0,
    contests: 0, profileUrl: `https://atcoder.jp/users/${handle}`
  };
  try {
    const [userRes, solvedRes] = await Promise.all([
      axios.get(`https://atcoder.jp/users/${handle}/history/json`, { timeout: 8000 }),
      axios.get(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=${handle}`, { timeout: 8000 }),
    ]);
    base.contests = userRes.data?.length ?? 0;
    if (userRes.data?.length) {
      const last = userRes.data[userRes.data.length - 1];
      base.rating = last.NewRating ?? null;
      base.rank = last.NewRating >= 2800 ? "Red" :
                  last.NewRating >= 2400 ? "Orange" :
                  last.NewRating >= 2000 ? "Yellow" :
                  last.NewRating >= 1600 ? "Blue" :
                  last.NewRating >= 1200 ? "Cyan" :
                  last.NewRating >= 800  ? "Green" : "Gray";
    }
    base.solved = solvedRes.data?.count ?? 0;
  } catch (e: any) {
    base.error = e.message;
  }
  return base;
}

// ── HackerRank ────────────────────────────────────────────────────────────────
async function fetchHackerRank(handle: string): Promise<PlatformStat> {
  const base: PlatformStat = {
    platform: "HackerRank", handle, solved: 0, rating: null,
    rank: null, badges: [], easy: 0, medium: 0, hard: 0,
    contests: 0, profileUrl: `https://www.hackerrank.com/profile/${handle}`
  };
  try {
    const res = await axios.get(
      `https://www.hackerrank.com/rest/hackers/${handle}/badges`,
      { timeout: 8000, headers: { "User-Agent": "Mozilla/5.0" } }
    );
    const models = res.data?.models ?? [];
    base.badges = models.map((b: any) => `${b.name} (${b.stars}★)`);
    base.solved = models.reduce((sum: number, b: any) => sum + (b.solved ?? 0), 0);
  } catch (e: any) {
    base.error = e.message;
  }
  return base;
}

// ── GeeksForGeeks ─────────────────────────────────────────────────────────────
async function fetchGFG(handle: string): Promise<PlatformStat> {
  const base: PlatformStat = {
    platform: "GeeksForGeeks", handle, solved: 0, rating: null,
    rank: null, badges: [], easy: 0, medium: 0, hard: 0,
    contests: 0, profileUrl: `https://www.geeksforgeeks.org/user/${handle}/`
  };
  try {
    const res = await axios.get(
      `https://geeks-for-geeks-stats-api.vercel.app/?raw=Y&userName=${handle}`,
      { timeout: 10000 }
    );
    const d = res.data;
    if (d.status === "error") { base.error = "User not found"; return base; }
    base.solved = d.totalProblemsSolved ?? 0;
    base.easy   = d.School ?? 0 + (d.Basic ?? 0);
    base.medium = d.Easy ?? 0 + (d.Medium ?? 0);
    base.hard   = d.Hard ?? 0;
    base.rating = d.codingScore ?? null;
    base.rank   = d.instituteRank ? `Institute Rank: ${d.instituteRank}` : null;
  } catch (e: any) {
    base.error = e.message;
  }
  return base;
}

// ── Aggregator ────────────────────────────────────────────────────────────────
export interface Handles {
  cf?: string | null;
  lc?: string | null;
  cc?: string | null;
  at?: string | null;
  hr?: string | null;
  gfg?: string | null;
}

export async function fetchAllPlatformStats(handles: Handles): Promise<PlatformStat[]> {
  const tasks: Promise<PlatformStat>[] = [];
  if (handles.cf)  tasks.push(fetchCodeforces(handles.cf));
  if (handles.lc)  tasks.push(fetchLeetCode(handles.lc));
  if (handles.cc)  tasks.push(fetchCodeChef(handles.cc));
  if (handles.at)  tasks.push(fetchAtCoder(handles.at));
  if (handles.hr)  tasks.push(fetchHackerRank(handles.hr));
  if (handles.gfg) tasks.push(fetchGFG(handles.gfg));

  const results = await Promise.allSettled(tasks);
  return results.map(r => r.status === "fulfilled" ? r.value : { platform: "Unknown", handle: "", solved: 0, rating: null, rank: null, badges: [], easy: 0, medium: 0, hard: 0, contests: 0, profileUrl: "", error: (r as any).reason?.message });
}
