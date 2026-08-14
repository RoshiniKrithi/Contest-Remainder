import "dotenv/config";
import { initializeApp, app } from "../server/app";

// Optimization: Start initialization as soon as the lambda wakes up
const initPromise = initializeApp().catch(err => {
    console.error("Critical: Failed to initialize application:", err);
});

export default async function handler(req: any, res: any) {
    // Wait for the server (routes, DB connections, etc) to be ready
    await initPromise;

    // Hand over the request to Express
    return app(req, res);
}
