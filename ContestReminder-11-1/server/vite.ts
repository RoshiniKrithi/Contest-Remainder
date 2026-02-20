import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
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
  let distPath = path.resolve(process.cwd(), "dist", "public");

  if (!fs.existsSync(distPath)) {
    // Try relative to this file (server/vite.ts -> ../dist/public)
    distPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist", "public");
  }

  if (!fs.existsSync(distPath)) {
    // Try relative to the app root (api/ -> ../dist/public)
    distPath = path.resolve(process.cwd(), "public");
  }

  if (!fs.existsSync(distPath)) {
    console.warn(`⚠️ Warning: Static Assets NOT found in common locations. Vercel deployment logs will help find them.`);
    console.log(`Debug - process.cwd(): ${process.cwd()}`);
    console.log(`Debug - Looked in: ${path.resolve(process.cwd(), "dist", "public")}`);
    return;
  }

  log(`✅ Success: Serving assets from ${distPath}`);
  app.use(express.static(distPath));

  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
