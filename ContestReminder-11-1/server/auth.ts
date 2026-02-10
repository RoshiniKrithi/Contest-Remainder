import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";

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
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "codearena-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await storage.getUserByUsername(username);
      if (!user || !(await comparePasswords(password, user.password))) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }),
  );

  // Google OAuth Strategy
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (googleClientId && googleClientSecret) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: googleClientId,
          clientSecret: googleClientSecret,
          callbackURL: "/api/auth/google/callback",
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
    const user = await storage.getUser(id);
    done(null, user);
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
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });

  // Google OAuth routes
  if (googleClientId && googleClientSecret) {
    app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

    app.get(
      "/api/auth/google/callback",
      passport.authenticate("google", { failureRedirect: "/auth" }),
      (req, res) => {
        // Successful authentication, redirect to dashboard
        res.redirect("/");
      }
    );
  } else {
    // If Google OAuth is not configured, return helpful message
    app.get("/api/auth/google", (req, res) => {
      res.status(503).send("Google OAuth is not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.");
    });
  }
}
