import { initializeApp, app } from "../server/app";

// Performance: Start initialization immediately
const initPromise = initializeApp();

export default async function handler(req: any, res: any) {
    // Wait for routes and DB to be ready
    await initPromise;

    // Directly pass to Express
    return app(req, res);
}
