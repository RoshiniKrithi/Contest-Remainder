import "dotenv/config";
import { initializeApp, app } from "./app";
import { log } from "./log";
import { setupContestScheduler } from "./scheduler";
import { setupNotificationScheduler } from "./notificationScheduler";
import { dbReady } from "./db";
import { setupKeepAlive } from "./keepAlive";

async function startServer() {
  // Wait for DB to resolve DNS and initialise pool
  await dbReady;

  const server = await initializeApp();
  const PORT = Number(process.env.PORT) || 5000;

  server.listen(PORT, "0.0.0.0", () => {
    log(`🚀 Server running on port ${PORT}`);
    setupContestScheduler();
    setupNotificationScheduler();
    setupKeepAlive();
  });
}




startServer().catch(err => {
  console.error("❌ Fatal: Failed to start server:", err);
  process.exit(1);
});
