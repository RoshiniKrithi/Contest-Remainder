import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  log("Initializing Vite dev server...", "vite");
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        // Do not crash the entire server on a vite error, just log it.
        // process.exit(1);
      },

    },
    server: serverOptions,
    appType: "custom",
  });

  log("Vite dev server created, adding middleware...", "vite");
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  let distPath = path.join(process.cwd(), "dist", "public");

  // Fallback check for different environment layouts
  if (!fs.existsSync(distPath)) {
    distPath = path.resolve(import.meta.dirname, "..", "dist", "public");
  }

  if (!fs.existsSync(distPath)) {
    distPath = path.resolve(process.cwd(), "public");
  }

  if (!fs.existsSync(distPath)) {
    console.error(`❌ Static Assets Error: Could not find build artifacts in dist/public or fallbacks.`);
    // Don't throw a fatal error here to allow API-only functionality if assets are missing
    return;
  }

  log(`Serving static assets from: ${distPath}`);
  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
