import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export function log(message: string, source = "express") {
    const formattedTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
    console.log(`${formattedTime} [${source}] ${message}`);
}

export function serveStatic(app: Express) {
    // Use absolute paths for Vercel deployment
    const distPath = path.resolve(process.cwd(), "dist", "public");

    if (!fs.existsSync(distPath)) {
        console.error(`❌ Static Assets Error: dist/public NOT found at ${distPath}`);
        // Check if the build actually happened
        console.log("CWD contents:", fs.readdirSync(process.cwd()));
        return;
    }

    log(`✅ Serving production assets from ${distPath}`);

    // 1. Serve static files with high priority
    app.use(express.static(distPath, {
        index: false, // Don't serve index.html automatically here
        setHeaders: (res, filePath) => {
            // Force correct MIME types for key files
            if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
            if (filePath.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
        }
    }));

    // 2. SPA fallback - ONLY for page navigations, NOT for broken assets
    app.use("*", (req, res, next) => {
        // If it looks like an asset request (has an extension) and we're here, it's a 404
        if (req.path.includes('.') || req.path.startsWith("/api")) {
            return next();
        }

        const indexPath = path.resolve(distPath, "index.html");
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
        } else {
            res.status(404).send("Frontend build not found.");
        }
    });
}
