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
    // We check multiple locations for the built frontend
    const possiblePaths = [
        path.resolve(process.cwd(), "dist", "public"),
        path.resolve(process.cwd(), "..", "dist", "public"),
        path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist", "public"),
    ];

    let distPath = possiblePaths.find(p => fs.existsSync(path.join(p, "index.html")));

    if (!distPath) {
        console.error("❌ Critical: Could not find built 'index.html' in any expected location.");
        // Log the CWD to help debug
        try {
            console.log("CWD:", process.cwd());
            console.log("CWD Contents:", fs.readdirSync(process.cwd()));
        } catch (e) { }

        // In emergency, fallback to public folder if it exists
        const emergencyPath = path.resolve(process.cwd(), "public");
        if (fs.existsSync(emergencyPath)) distPath = emergencyPath;
        else return;
    }

    log(`✅ Serving production assets from ${distPath}`);

    // Serve static files with explicit MIME types for JS/CSS
    app.use(express.static(distPath, {
        index: false,
        setHeaders: (res, filePath) => {
            if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
            if (filePath.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
        }
    }));

    // SPA fallback
    app.get("*", (req, res, next) => {
        // API routes should skip this
        if (req.path.startsWith("/api")) return next();

        // Don't serve HTML for broken links to JS/CSS files (prevents MIME errors)
        if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|json)$/)) {
            return res.status(404).end();
        }

        const indexPath = path.join(distPath!, "index.html");
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
        } else {
            res.status(404).send("Frontend build missing.");
        }
    });
}
