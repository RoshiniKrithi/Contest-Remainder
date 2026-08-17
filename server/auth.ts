import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "./shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser { }
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  if (!salt) {
    // Legacy support or broken hash
    return supplied === stored;
  }
  try {
    const hashedBuf = Buffer.from(hashed, "hex");
    const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
    return timingSafeEqual(hashedBuf, suppliedBuf);
  } catch (err) {
    return false;
  }
}

export function setupAuth(app: Express) {
  // On Render, cookies must be SameSite=None;Secure for cross-domain (Vercel ↔ Render)
  const isRender = !!process.env.RENDER;
  const isProd = process.env.NODE_ENV === "production" || isRender;

  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "codearena-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    proxy: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (err) {
        console.error("Local login error:", err);
        return done(err);
      }
    }),
  );

  // Google OAuth Strategy
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (googleClientId && googleClientSecret) {
    const googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL ||
      (process.env.RENDER_EXTERNAL_URL
        ? `${process.env.RENDER_EXTERNAL_URL.replace(/\/$/, "")}/api/auth/google/callback`
        : "/api/auth/google/callback");

    passport.use(
      new GoogleStrategy(
        {
          clientID: googleClientId,
          clientSecret: googleClientSecret,
          callbackURL: googleCallbackUrl,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const googleId = profile.id;
            const email = profile.emails?.[0]?.value;
            const displayName = profile.displayName;

            // 1. Try to find user by Google ID (existing user)
            let user = await storage.getUserByGoogleId(googleId);
            if (user) {
              return done(null, user);
            }

            // 1.5. Fallback: Try to find user by old username format (migration path)
            const oldUsername = `google_${googleId}`;
            user = await storage.getUserByUsername(oldUsername);
            if (user) {
              // Found legacy user. In a real app we would update their googleId here.
              return done(null, user);
            }

            // 2. Generate a friendly username
            let baseUsername = displayName || (email ? email.split('@')[0] : `User_${googleId.slice(-6)}`);

            // Sanitize username: replace spaces and special chars with underscores, keep alphanumeric
            baseUsername = baseUsername.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();

            // Ensure username is not empty after sanitization
            if (!baseUsername) {
              baseUsername = `user_${googleId.slice(-6)}`;
            }

            // 3. Ensure uniqueness
            let username = baseUsername;
            let counter = 1;

            while (true) {
              const existing = await storage.getUserByUsername(username);
              if (!existing) {
                break;
              }
              username = `${baseUsername}_${Math.floor(Math.random() * 10000)}`;
              counter++;
              if (counter > 10) { // Safety break, fallback to google_id if extremely unlucky
                username = `google_${googleId}`;
                break;
              }
            }

            // 4. Create new user
            user = await storage.createUser({
              username: username,
              password: await hashPassword(randomBytes(32).toString("hex")), // Random password
              role: "user", // Default role
              googleId: googleId,
            });

            return done(null, user);
          } catch (error) {
            return done(error as Error);
          }
        }
      )
    );
  }

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user || false);
    } catch (error: any) {
      // DB unreachable — treat as unauthenticated, don't crash
      console.error("Passport deserialize error (DB down?):", error.message);
      done(null, false);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    const existingUser = await storage.getUserByUsername(req.body.username);
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }

    const user = await storage.createUser({
      ...req.body,
      password: await hashPassword(req.body.password),
    });

    req.login(user, (err) => {
      if (err) return next(err);
      res.status(201).json(user);
    });
  });

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      
      // Explicitly clear the session cookie
      req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie("connect.sid", {
          path: "/",
          httpOnly: true,
          secure: isProd,
          sameSite: isProd ? "none" : "lax",
        });
        res.sendStatus(200);
      });
    });
  });

  app.get("/api/user", (req, res) => {
    try {
      if (!req.isAuthenticated?.() || !req.user) {
        return res.json(null);
      }
      res.json({
        ...req.user,
        current_streak: req.user.streak,
        longest_streak: req.user.longestStreak,
        last_daily_solved_at: req.user.lastDailySolve
      });
    } catch (error: any) {
      res.json(null);
    }
  });

  // Google OAuth routes
  if (googleClientId && googleClientSecret) {
    app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

    app.get(
      "/api/auth/google/callback",
      passport.authenticate("google", { failureRedirect: "/auth" }),
      (req, res) => {
        // Successful authentication, redirect to dashboard
        const redirectUrl = process.env.FRONTEND_URL || "/";
        res.redirect(redirectUrl);
      }
    );
  } else {
    // If Google OAuth is not configured, support demo mode for local development and return a styled configuration guide
    app.get("/api/auth/google", async (req, res) => {
      // In development mode, auto-login a demo Google user if requested via ?demo=true
      if (req.query.demo === "true" || process.env.NODE_ENV !== "production") {
        if (req.query.demo === "true") {
          try {
            const demoGoogleId = "demo_google_user_1001";
            let user = await storage.getUserByGoogleId(demoGoogleId);
            if (!user) {
              let username = "demo_google_user";
              const existing = await storage.getUserByUsername(username);
              if (existing && existing.googleId !== demoGoogleId) {
                username = `demo_google_${Math.floor(Math.random() * 1000)}`;
              }
              user = await storage.createUser({
                username: username,
                password: await hashPassword(randomBytes(16).toString("hex")),
                role: "user",
                googleId: demoGoogleId,
              });
            }
            return req.login(user, (err) => {
              if (err) return res.status(500).send("Mock login session error");
              const redirectUrl = process.env.FRONTEND_URL || "http://localhost:5005/";
              return res.redirect(redirectUrl);
            });
          } catch (err) {
            console.error("Demo Google Login failed:", err);
          }
        }
      }

      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5005";

      const callbackUrl = process.env.RENDER_EXTERNAL_URL
        ? `${process.env.RENDER_EXTERNAL_URL.replace(/\/$/, "")}/api/auth/google/callback`
        : "http://localhost:5000/api/auth/google/callback";

      // Return a styled HTML page with instructions and demo login trigger
      res.setHeader("Content-Type", "text/html");
      res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Google OAuth Setup Required - CodeArena</title>
          <style>
            * { box-sizing: border-box; }
            body {
              background-color: #020617;
              color: #f8fafc;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              padding: 1.5rem;
            }
            .card {
              background: rgba(15, 23, 42, 0.85);
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 1.5rem;
              padding: 2.5rem;
              max-width: 580px;
              width: 100%;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
              backdrop-filter: blur(16px);
            }
            .icon-badge {
              width: 52px;
              height: 52px;
              background: rgba(245, 158, 11, 0.1);
              border: 1px solid rgba(245, 158, 11, 0.25);
              border-radius: 14px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 1.5rem;
            }
            h1 { font-size: 1.5rem; font-weight: 800; margin: 0 0 0.5rem 0; color: #fff; tracking: -0.02em; }
            p { color: #94a3b8; line-height: 1.6; margin: 0 0 1.5rem 0; font-size: 0.95rem; }
            .code-block {
              background: #090d16;
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 0.85rem;
              padding: 1rem 1.25rem;
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
              font-size: 0.85rem;
              color: #38bdf8;
              margin-bottom: 1.5rem;
              line-height: 1.7;
            }
            .steps {
              margin-bottom: 2rem;
              padding-left: 1.25rem;
              color: #cbd5e1;
              font-size: 0.9rem;
              line-height: 1.7;
            }
            .steps li { margin-bottom: 0.5rem; }
            .btn-group {
              display: flex;
              gap: 0.75rem;
              flex-wrap: wrap;
            }
            .btn {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 0.85rem 1.4rem;
              border-radius: 0.85rem;
              font-weight: 700;
              font-size: 0.875rem;
              text-decoration: none;
              transition: all 0.2s ease;
              cursor: pointer;
            }
            .btn-primary {
              background: #38bdf8;
              color: #020617;
            }
            .btn-primary:hover { background: #7dd3fc; transform: translateY(-1px); }
            .btn-secondary {
              background: rgba(255, 255, 255, 0.06);
              color: #fff;
              border: 1px solid rgba(255, 255, 255, 0.12);
            }
            .btn-secondary:hover { background: rgba(255, 255, 255, 0.12); }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="icon-badge">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h1>Google OAuth Configuration Required</h1>
            <p>Google OAuth keys (<code>GOOGLE_CLIENT_ID</code> & <code>GOOGLE_CLIENT_SECRET</code>) are not set in your Render Environment Variables.</p>
            
            <div class="code-block">
              GOOGLE_CLIENT_ID="your_google_client_id_here"<br>
              GOOGLE_CLIENT_SECRET="your_google_client_secret_here"
            </div>

            <ol class="steps">
              <li>Open Google Cloud Console (<a href="https://console.cloud.google.com/apis/credentials" target="_blank" style="color:#38bdf8;">console.cloud.google.com</a>).</li>
              <li>Create an OAuth 2.0 Client ID for Web Application.</li>
              <li>Set Authorized redirect URI to: <code style="color:#e2e8f0;">${callbackUrl}</code></li>
              <li>Add <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code> to your Render Service Environment Variables.</li>
            </ol>

            <div class="btn-group">
              <a href="/api/auth/google?demo=true" class="btn btn-primary">⚡ Continue with Demo Google Account</a>
              <a href="${frontendUrl}/auth" class="btn btn-secondary">← Back to Login Page</a>
            </div>
          </div>
        </body>
        </html>
      `);
    });
  }
}
