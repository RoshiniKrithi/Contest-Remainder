import "dotenv/config";
import { storage } from "../server/storage";

async function main() {
    console.log("Searching for legacy Google users...");
    const users = await storage.getAllUsers();
    const legacyUsers = users.filter(u => u.username.startsWith("google_") && u.username.length > 20);

    if (legacyUsers.length === 0) {
        console.log("No legacy Google users found.");
        return;
    }

    console.log(`Found ${legacyUsers.length} legacy users:`);
    for (const user of legacyUsers) {
        console.log(`- ${user.username} (ID: ${user.id})`);
        await storage.deleteUser(user.id);
        console.log(`  Deleted user ${user.username}`);
    }

    console.log("Cleanup complete.");
    process.exit(0);
}

main().catch(err => {
    console.error("Error running script:", err);
    process.exit(1);
});
