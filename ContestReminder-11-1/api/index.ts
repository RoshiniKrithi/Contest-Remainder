import serverless from "serverless-http";
import { initializeApp } from "../server/app";

// Optimization: Cached handler for serverless execution
let cachedHandler: any;

export default async function handler(req: any, res: any) {
    if (!cachedHandler) {
        // Ensure the Express app is fully initialized with routes
        const app = await initializeApp();

        // serverless-http bridges Express to the serverless environment
        // Note: Vercel handles this natively, but serverless-http provides 
        // a standard interface requested for this deployment.
        cachedHandler = serverless(app);
    }

    // Handle the incoming request
    return cachedHandler(req, res);
}
