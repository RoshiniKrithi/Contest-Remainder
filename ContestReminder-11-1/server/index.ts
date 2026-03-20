import "dotenv/config";
import { initializeApp, app } from "./app";
import { log } from "./log";

async function startServer() {
  const server = await initializeApp();

  // PORT 5000 is default, but Render/Vercel will provide their own

  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    log(`🚀 Server heart-beat detected on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
  });
}


startServer().catch(err => {
  console.error("❌ Fatal: Failed to start server:", err);
  process.exit(1);
});
