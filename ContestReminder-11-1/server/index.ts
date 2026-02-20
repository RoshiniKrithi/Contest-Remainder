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

  // CRITICAL: Bind to 0.0.0.0 for Render/Docker/Cloud deployments
  // 127.0.0.1 will block external traffic on Render
  const host = '0.0.0.0';

  server.listen(port, host, () => {
    log(`Server running in ${process.env.NODE_ENV || 'development'} mode on http://${host}:${port}`);
  });
}

startServer().catch(err => {
  console.error("❌ Fatal: Failed to start server:", err);
  process.exit(1);
});
