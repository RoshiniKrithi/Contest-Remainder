import { storage } from "../../storage";
import { ensureDb } from "../../db";
import { sendBanEmail, sendRevocationEmail } from "../../services/email";

console.log("🧪 Running Access Transitions and Storage Engine validation tests...");

async function runTests() {
  try {
    // Wait for DB connection if database is being used
    if (process.env.DATABASE_URL) {
      console.log("⏳ Waiting for database connection pool...");
      await ensureDb();
      console.log("✅ Database connection pool verified.");
    }

    // 1. Create mock users
    const mockUser1 = await storage.createUser({
      username: "user_test_ban",
      password: "password123",
    });

    const mockAdmin = await storage.createUser({
      username: "admin_test_moderator",
      password: "adminpassword",
      role: "admin",
    });

    console.log(`✅ Mock user created: ${mockUser1.username} (${mockUser1.id}), status: ${mockUser1.accountStatus}`);
    console.log(`✅ Mock admin created: ${mockAdmin.username} (${mockAdmin.id}), role: ${mockAdmin.role}`);

    if (mockUser1.accountStatus !== "active") {
      throw new Error("New users must default to active status");
    }

    // 2. Test Ban transitions
    console.log("👉 Testing active user ban...");
    const bannedUser = await storage.banUser(mockUser1.id, mockAdmin.id, "Violation of Section 4");
    console.log(`✅ Banned user status: ${bannedUser.accountStatus}, bannedBy: ${bannedUser.bannedBy}, banReason: ${bannedUser.banReason}`);

    if (bannedUser.accountStatus !== "banned") {
      throw new Error("Expected banned status");
    }

    // 3. Test Restore transitions
    console.log("👉 Testing banned user restore...");
    const restoredUser = await storage.restoreUser(mockUser1.id);
    console.log(`✅ Restored user status: ${restoredUser.accountStatus}, bannedAt: ${restoredUser.bannedAt}`);

    if (restoredUser.accountStatus !== "active") {
      throw new Error("Expected active status after restore");
    }

    // 4. Test Ban -> Revocation transitions
    console.log("👉 Testing ban followed by revocation...");
    await storage.banUser(mockUser1.id, mockAdmin.id, "Violation of Section 5");
    const revokedUser = await storage.revokeUser(mockUser1.id, mockAdmin.id, "Permanent exclusion");
    console.log(`✅ Revoked user status: ${revokedUser.accountStatus}, revokedBy: ${revokedUser.revokedBy}, reason: ${revokedUser.revocationReason}`);

    if (revokedUser.accountStatus !== "revoked") {
      throw new Error("Expected revoked status after revocation");
    }

    // 5. Test Email services
    console.log("👉 Testing email log verification...");
    const emailResultBan = await sendBanEmail("test@example.com", "Spamming IDE console");
    const emailResultRevoke = await sendRevocationEmail("test@example.com", "Malicious telemetry spoofing");

    if (!emailResultBan || !emailResultRevoke) {
      throw new Error("Expected email helper to return success (true) even if credentials are not configured");
    }
    console.log("✅ Email log verification passed.");

    // Cleanup mock data if using database
    if (process.env.DATABASE_URL) {
      console.log("🧹 Cleaning up mock test accounts from DB...");
      await storage.deleteUser(mockUser1.id);
      await storage.deleteUser(mockAdmin.id);
      console.log("✅ Mock test accounts deleted.");
    }

    console.log("🎉 User Access transitions validation test passed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Access transitions tests failed:", err);
    process.exit(1);
  }
}

runTests();
