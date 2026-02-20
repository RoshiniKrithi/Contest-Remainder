import { initializeApp, app } from "./app";
import { setupVite, log } from "./vite";

async function startLocalServer() {
  const server = await initializeApp();

  if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
    await setupVite(app, server);
  }

  const port = parseInt(process.env.PORT || '5000', 10);
  const host = '127.0.0.1';

  server.listen(port, host, () => {
    log(`Local development server running on http://${host}:${port}`);
  });
}

startLocalServer().catch(err => {
  console.error("Failed to start local server:", err);
  process.exit(1);
});
