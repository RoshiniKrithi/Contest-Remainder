import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getContestUrl(contest: { url?: string; href?: string; link?: string; platform?: string }): string {
  if (!contest) return "https://clist.by";
  let rawUrl = contest.url || contest.href || contest.link;
  
  if (rawUrl && typeof rawUrl === "string" && rawUrl.trim() !== "") {
    let url = rawUrl.trim();
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    if (url.startsWith("//")) {
      return `https:${url}`;
    }
    return `https://${url}`;
  }

  // Fallback links by platform if url is missing/empty
  const platform = (contest.platform || "").toLowerCase();
  if (platform.includes("codeforces")) return "https://codeforces.com/contests";
  if (platform.includes("leetcode")) return "https://leetcode.com/contest/";
  if (platform.includes("codechef")) return "https://www.codechef.com/contests";
  if (platform.includes("atcoder")) return "https://atcoder.jp/contests/";
  if (platform.includes("hackerrank")) return "https://www.hackerrank.com/contests";
  if (platform.includes("geeksforgeeks")) return "https://practice.geeksforgeeks.org/events";
  if (platform.includes("hackerearth")) return "https://www.hackerearth.com/challenges/";
  if (platform.includes("topcoder")) return "https://www.topcoder.com/challenges";
  if (platform.includes("codingninjas") || platform.includes("coding ninjas")) return "https://www.naukri.com/code360/contests";

  return "https://clist.by";
}

