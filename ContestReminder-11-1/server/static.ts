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
    let distPath = path.resolve(process.cwd(), "dist", "public");

    // Fallback 1: Relative to this file (likely in server/)
    if (!fs.existsSync(distPath)) {
        distPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist", "public");
    }

    // Fallback 2: Direct public folder
    if (!fs.existsSync(distPath)) {
        distPath = path.resolve(process.cwd(), "public");
    }

    if (!fs.existsSync(distPath)) {
        console.warn(`⚠️ Warning: Static Assets NOT found. This might be an API-only deployment or build issue.`);
        return;
    }

    log(`✅ Serving production assets from ${distPath}`);
    app.use(express.static(distPath));

    // SPA fallback
    app.use("*", (req, res, next) => {
        if (req.path.startsWith("/api")) {
            return next();
        }
        res.sendFile(path.resolve(distPath, "index.html"), (err) => {
            if (err) {
                res.status(404).send("Not found");
            }
        });
    });
}
