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
    // Try several potential locations for built assets in serverless environment
    const possiblePaths = [
        path.resolve(process.cwd(), "dist", "public"),
        path.resolve(process.cwd(), "public"),
        path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist", "public"),
        path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "dist", "public")
    ];

    let distPath = "";
    for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
            distPath = p;
            break;
        }
    }

    if (!distPath) {
        console.error(`❌ Static Assets Error: Could not find build artifacts in any expected location.`);
        console.log(`Debug - process.cwd(): ${process.cwd()}`);
        console.log(`Checked paths: ${possiblePaths.join(", ")}`);
        return;
    }

    log(`✅ Serving production assets from ${distPath}`);
    app.use(express.static(distPath));

    // SPA fallback
    app.use("*", (req, res, next) => {
        if (req.path.startsWith("/api")) {
            return next();
        }
        const indexPath = path.resolve(distPath, "index.html");
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
        } else {
            res.status(404).send("Frontend build not found - please check build logs.");
        }
    });
}
