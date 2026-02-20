import { initializeApp, app } from "../server/app";

// Optimization: Cache the initialization promise
const initPromise = initializeApp();

export default async function handler(req: any, res: any) {
    // Ensure the app is fully initialized before handling the first request
    await initPromise;

    // Forward the request to Express
    return app(req, res);
}
