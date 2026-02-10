
import { storage } from "../server/storage";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
}

async function runTest() {
    console.log("🧪 Starting Google Auth Storage Test...");

    const googleId = "123456789";
    const email = "test@example.com";
    const displayName = "Test User";

    // 1. Clean up potential existing user
    const existing = await storage.getUserByGoogleId(googleId);
    if (existing) {
        console.log("Found existing user, cleaning up...");
        // storage.deleteUser is available in IStorage
        await storage.deleteUser(existing.id);
    }

    // 2. Create user with googleId
    console.log("Creating new user with googleId...");
    const username = "test_user_friendly_name";
    const user = await storage.createUser({
        username,
        password: await hashPassword("password"),
        role: "user",
        googleId: googleId
    });

    console.log(`User created: ID=${user.id}, Username=${user.username}, GoogleID=${user.googleId}`);

    if (user.googleId !== googleId) {
        console.error("❌ user.googleId does not match input!");
        process.exit(1);
    }

    // 3. Retrieve by googleId
    console.log("Retrieving user by googleId...");
    const retrieved = await storage.getUserByGoogleId(googleId);

    if (!retrieved) {
        console.error("❌ Failed to retrieve user by googleId!");
        process.exit(1);
    }

    if (retrieved.id !== user.id) {
        console.error("❌ Retrieved user ID does not match created user ID!");
        process.exit(1);
    }

    console.log("✅ Successfully retrieved user by googleId.");

    // 4. Retrieve by username
    console.log("Retrieving user by username...");
    const retrievedByUsername = await storage.getUserByUsername(username);
    if (!retrievedByUsername || retrievedByUsername.id !== user.id) {
        console.error("❌ Failed to retrieve user by username!");
        process.exit(1);
    }
    console.log("✅ Successfully retrieved user by username.");

    console.log("🎉 All Google Auth Storage tests passed!");
    process.exit(0);
}

runTest().catch(err => {
    console.error("Test failed:", err);
    process.exit(1);
});
