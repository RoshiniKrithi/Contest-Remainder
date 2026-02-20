import express from "express";
const app = express();

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Vercel function is working" });
});

app.get("*", (req, res) => {
    res.send("<h1>Vercel Deployment Debug</h1><p>The server is running, but the main app is not yet linked.</p>");
});

export default app;
