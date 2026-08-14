import axios from "axios";

// Ping self every 14 minutes to prevent Render free tier sleep
export function setupKeepAlive() {
  const url = process.env.RENDER_EXTERNAL_URL || process.env.BACKEND_URL;
  if (!url || process.env.NODE_ENV !== "production") return;

  setInterval(async () => {
    try {
      await axios.get(`${url}/api/health`, { timeout: 5000 });
      console.log("💓 Keep-alive ping sent");
    } catch {
      // ignore
    }
  }, 14 * 60 * 1000); // every 14 minutes

  console.log("💓 Keep-alive scheduler started");
}
