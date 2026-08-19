import { storage } from "../../storage";
import { ensureDb } from "../../db";
import passport from "passport";
import express from "express";
import request from "supertest";
import { setupAuth } from "../../auth";

console.log("🧪 Running Authentication Blockers and Session Invalidation validation tests...");

async function runTests() {
  try {
    if (process.env.DATABASE_URL) {
      console.log("⏳ Waiting for DB pool initialization...");
      await ensureDb();
    }

    // 1. Create mock users
    const mockActive = await storage.createUser({
      username: "user_auth_active",
      password: "password123",
    });

    const mockBanned = await storage.createUser({
      username: "user_auth_banned",
      password: "password123",
    });
    // Set status to banned
    await storage.banUser(mockBanned.id, "system", "Auth test block");

    const mockRevoked = await storage.createUser({
      username: "user_auth_revoked",
      password: "password123",
    });
    // Set status to revoked
    await storage.banUser(mockRevoked.id, "system", "Revoke prep");
    await storage.revokeUser(mockRevoked.id, "system", "Auth test block");

    console.log("✅ Mock auth users created.");

    // 2. Setup mock express app with passport auth to perform requests
    const app = express();
    app.use(express.json());
    setupAuth(app);

    // Endpoint to verify session status
    app.get("/test-session", (req, res) => {
      if (req.isAuthenticated()) {
        res.json({ authenticated: true, user: req.user });
      } else {
        res.status(401).json({ authenticated: false });
      }
    });

    const agent = request.agent(app);

    // 3. Test active user login - should succeed
    console.log("👉 Testing active user login strategy...");
    const loginResActive = await agent
      .post("/api/login")
      .send({ username: "user_auth_active", password: "password123" });
    
    if (loginResActive.status !== 200) {
      throw new Error(`Expected active user login to succeed, got: ${loginResActive.status}`);
    }
    console.log("✅ Active user logged in successfully.");

    // Check session access
    const sessionResActive = await agent.get("/test-session");
    if (sessionResActive.status !== 200 || !sessionResActive.body.authenticated) {
      throw new Error("Active user session should be valid");
    }
    console.log("✅ Active user session verified.");

    // 4. Test banned user login - should fail with 403 Forbidden
    console.log("👉 Testing banned user login strategy...");
    const loginResBanned = await request(app)
      .post("/api/login")
      .send({ username: "user_auth_banned", password: "password123" });
    
    if (loginResBanned.status !== 403) {
      throw new Error(`Expected banned user login to return 403, got: ${loginResBanned.status}`);
    }
    if (loginResBanned.body.error !== "banned") {
      throw new Error(`Expected error payload 'banned', got: ${JSON.stringify(loginResBanned.body)}`);
    }
    console.log("✅ Banned user login blocked with 403 Forbidden.");

    // 5. Test revoked user login - should fail with 403 Forbidden
    console.log("👉 Testing revoked user login strategy...");
    const loginResRevoked = await request(app)
      .post("/api/login")
      .send({ username: "user_auth_revoked", password: "password123" });
    
    if (loginResRevoked.status !== 403) {
      throw new Error(`Expected revoked user login to return 403, got: ${loginResRevoked.status}`);
    }
    if (loginResRevoked.body.error !== "revoked") {
      throw new Error(`Expected error payload 'revoked', got: ${JSON.stringify(loginResRevoked.body)}`);
    }
    console.log("✅ Revoked user login blocked with 403 Forbidden.");

    // 6. Test Session Invalidation
    console.log("👉 Testing session invalidation after status update...");
    // Let's ban the active user in storage
    await storage.banUser(mockActive.id, "system", "Immediate session cut test");
    
    // Now call the session verification endpoint using the active agent
    // Since the user is banned, the deserializer should return false and invalidate the session immediately!
    const sessionResInvalidated = await agent.get("/test-session");
    if (sessionResInvalidated.status !== 401) {
      throw new Error(`Expected session request to be unauthorized (401), got: ${sessionResInvalidated.status}`);
    }
    console.log("✅ Active user session invalidated immediately upon account status changes.");

    // 7. Cleanup mock users
    if (process.env.DATABASE_URL) {
      console.log("🧹 Cleaning up auth mock users...");
      await storage.deleteUser(mockActive.id);
      await storage.deleteUser(mockBanned.id);
      await storage.deleteUser(mockRevoked.id);
      console.log("✅ Mock auth users cleaned up.");
    }

    console.log("🎉 Authentication Blockers and Session Invalidation tests passed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Authentication blocker tests failed:", err);
    process.exit(1);
  }
}

runTests();
