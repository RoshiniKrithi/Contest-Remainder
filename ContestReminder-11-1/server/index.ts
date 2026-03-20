import "dotenv/config";
import { initializeApp, app } from "./app";
import { log } from "./log";

async function startServer() {
  await initializeApp();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    log(`🚀 Server heart-beat detected on port ${PORT}`);
  });
}




startServer().catch(err => {
  console.error("❌ Fatal: Failed to start server:", err);
  process.exit(1);
});
