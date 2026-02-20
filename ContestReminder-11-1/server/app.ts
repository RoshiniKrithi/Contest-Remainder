import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { serveStatic, log } from "./static";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS setup for connecting Render backend to Vercel frontend
app.use(cors({
    origin: [
        "http://localhost:5173", // Local Vite
        "http://localhost:5000", // Local Express
        process.env.FRONTEND_URL || "", // Vercel URL
    ].filter(Boolean),
    credentials: true,
}));

// Debug route to check files on Vercel
app.get("/api/debug-files", async (req, res) => {
    const fs = await import("fs");
    const path = await import("path");
    const { fileURLToPath } = await import("url");

    const check = (p: string) => ({
        path: p,
        exists: fs.existsSync(p),
        stats: fs.existsSync(p) ? (fs.lstatSync(p).isDirectory() ? "dir" : "file") : "missing"
    });

    res.json({
        cwd: process.cwd(),
        meta_url: import.meta.url,
        checks: [
            check(path.resolve(process.cwd(), "dist", "public")),
            check(path.resolve(process.cwd(), "dist", "public", "index.html")),
            check(path.resolve(process.cwd(), "public")),
            check(path.resolve(process.cwd(), "client")),
        ]
    });
});

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running", time: new Date().toISOString() });
});

app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
        capturedJsonResponse = bodyJson;
        return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
        const duration = Date.now() - start;
        if (path.startsWith("/api")) {
            let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
            if (capturedJsonResponse) {
                logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
            }
            if (logLine.length > 80) {
                logLine = logLine.slice(0, 79) + "…";
            }
            log(logLine);
        }
    });

    next();
});

export async function initializeApp() {
    const httpServer = await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        res.status(status).json({ message });
    });

    if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
        serveStatic(app);
    }

    return httpServer;
}

export { app };
