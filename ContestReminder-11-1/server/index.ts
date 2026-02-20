import "dotenv/config";
import { initializeApp, app } from "./app";
import { setupVite, log } from "./vite";

async function startServer() {
  const server = await initializeApp();

  // In development, setup Vite
  if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
    await setupVite(app, server);
  }

  // PORT 5000 is default, but Render/Vercel will provide their own
  const port = parseInt(process.env.PORT || '5000', 10);

  server.listen(port, () => {
    log(`🚀 Server heart-beat detected on port ${port} [${process.env.NODE_ENV || 'development'}]`);
  });
}

startServer().catch(err => {
  console.error("❌ Fatal: Failed to start server:", err);
  process.exit(1);
});
