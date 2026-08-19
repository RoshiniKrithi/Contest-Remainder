import { Router } from "express";
import { storage } from "../storage";
import { sendBanEmail, sendRevocationEmail } from "../services/email";

const router = Router();

// Middleware to check admin role
function ensureAdmin(req: any, res: any, next: any) {
  if (req.isAuthenticated && req.isAuthenticated() && req.user && (req.user.role === "admin" || req.user.role === "staff")) {
    return next();
  }
  return res.status(403).json({ error: "Access denied. Admin privileges required." });
}

function getUserEmail(user: any): string {
  // If user has googleId, map to mock google email, otherwise default to local domain
  return user.googleId ? `google_${user.googleId.slice(0, 6)}@gmail.com` : `${user.username}@codearena.local`;
}

/**
 * PATCH /api/admin/users/:id/ban
 * Temporarily ban a normal user
 */
router.patch("/admin/users/:id/ban", ensureAdmin, async (req: any, res) => {
  const targetId = req.params.id;
  const { reason } = req.body;
  const adminId = req.user.id;

  try {
    const target = await storage.getUser(targetId);
    if (!target) {
      return res.status(404).json({ error: "User not found" });
    }

    // Role checks
    if (target.id === adminId) {
      return res.status(400).json({ error: "Administrators cannot ban themselves." });
    }
    if (target.role === "admin" || target.role === "staff") {
      return res.status(400).json({ error: "Administrators cannot ban other admin accounts." });
    }

    // State checks
    if (target.accountStatus === "revoked") {
      return res.status(409).json({ error: "Cannot ban a permanently revoked account." });
    }
    if (target.accountStatus === "banned") {
      return res.status(409).json({ error: "User is already temporarily banned." });
    }

    // Save status
    const updatedUser = await storage.banUser(target.id, adminId, reason);

    // Send email notification (in background, failures logged inside service)
    const emailTo = getUserEmail(target);
    sendBanEmail(emailTo, reason);

    res.json({
      success: true,
      message: "User has been temporarily banned successfully.",
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        accountStatus: updatedUser.accountStatus,
      },
    });
  } catch (err: any) {
    console.error("Error banning user:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * PATCH /api/admin/users/:id/restore
 * Restore access to a temporarily banned user
 */
router.patch("/admin/users/:id/restore", ensureAdmin, async (req: any, res) => {
  const targetId = req.params.id;
  const adminId = req.user.id;

  try {
    const target = await storage.getUser(targetId);
    if (!target) {
      return res.status(404).json({ error: "User not found" });
    }

    // State checks
    if (target.accountStatus === "revoked") {
      return res.status(409).json({ error: "Permanently revoked accounts cannot be restored." });
    }
    if (target.accountStatus === "active") {
      return res.status(400).json({ error: "User account is already active." });
    }

    // Save status
    const updatedUser = await storage.restoreUser(target.id);

    res.json({
      success: true,
      message: "User access has been restored successfully.",
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        accountStatus: updatedUser.accountStatus,
      },
    });
  } catch (err: any) {
    console.error("Error restoring user access:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * PATCH /api/admin/users/:id/revoke
 * Permanently revoke a banned user's account
 */
router.patch("/admin/users/:id/revoke", ensureAdmin, async (req: any, res) => {
  const targetId = req.params.id;
  const { reason } = req.body;
  const adminId = req.user.id;

  try {
    const target = await storage.getUser(targetId);
    if (!target) {
      return res.status(404).json({ error: "User not found" });
    }

    // Role checks
    if (target.id === adminId) {
      return res.status(400).json({ error: "Administrators cannot revoke their own accounts." });
    }
    if (target.role === "admin" || target.role === "staff") {
      return res.status(400).json({ error: "Administrators cannot revoke other admin accounts." });
    }

    // State checks: must be banned first
    if (target.accountStatus === "active") {
      return res.status(400).json({ error: "Only temporarily banned accounts are eligible for permanent revocation." });
    }
    if (target.accountStatus === "revoked") {
      return res.status(409).json({ error: "Account access has already been revoked." });
    }

    // Save status
    const updatedUser = await storage.revokeUser(target.id, adminId, reason);

    // Send email notification (in background, failures logged inside service)
    const emailTo = getUserEmail(target);
    sendRevocationEmail(emailTo, reason);

    res.json({
      success: true,
      message: "User account has been revoked successfully.",
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        accountStatus: updatedUser.accountStatus,
      },
    });
  } catch (err: any) {
    console.error("Error revoking user account:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
