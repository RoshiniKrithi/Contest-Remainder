import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const sqlStatements = [
  // 1. Create Tables
  `CREATE TABLE IF NOT EXISTS "integrity_audit_logs" (
    "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "admin_user_id" varchar NOT NULL,
    "report_id" varchar NOT NULL,
    "timestamp" timestamp DEFAULT now() NOT NULL,
    "action" text NOT NULL
  );`,

  `CREATE TABLE IF NOT EXISTS "integrity_events" (
    "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "session_id" varchar NOT NULL,
    "submission_id" varchar,
    "user_dsa_progress_id" integer,
    "user_id" varchar NOT NULL,
    "problem_id" varchar NOT NULL,
    "event_type" varchar NOT NULL,
    "timestamp" timestamp DEFAULT now() NOT NULL,
    "cursor_offset" integer DEFAULT 0,
    "payload" jsonb DEFAULT '{}'::jsonb,
    "created_at" timestamp DEFAULT now() NOT NULL
  );`,

  `CREATE TABLE IF NOT EXISTS "integrity_reports" (
    "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "submission_id" varchar,
    "user_dsa_progress_id" integer,
    "user_id" varchar NOT NULL,
    "problem_id" varchar NOT NULL,
    "session_id" varchar NOT NULL,
    "ast_similarity_score" integer DEFAULT 0,
    "ai_attribution_score" integer DEFAULT 0,
    "overall_risk_score" integer DEFAULT 0,
    "matched_submission_id" varchar,
    "matched_user_dsa_progress_id" integer,
    "structural_fingerprints" jsonb DEFAULT '[]'::jsonb,
    "signals" jsonb DEFAULT '[]'::jsonb,
    "flag_reasons" jsonb DEFAULT '[]'::jsonb,
    "confidence_score" integer DEFAULT 100,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
  );`,

  `CREATE TABLE IF NOT EXISTS "telemetry_snapshots" (
    "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "submission_id" varchar,
    "user_dsa_progress_id" integer,
    "user_id" varchar NOT NULL,
    "problem_id" varchar NOT NULL,
    "session_id" varchar NOT NULL,
    "timestamp" timestamp DEFAULT now() NOT NULL,
    "iki_average_ms" integer DEFAULT 0,
    "iki_entropy" text,
    "backspace_count" integer DEFAULT 0,
    "delete_count" integer DEFAULT 0,
    "arrow_navigation_count" integer DEFAULT 0,
    "selection_count" integer DEFAULT 0,
    "paste_event_count" integer DEFAULT 0,
    "pasted_char_count" integer DEFAULT 0,
    "total_char_count" integer DEFAULT 0,
    "ast_node_count" integer DEFAULT 0,
    "cyclomatic_complexity" integer DEFAULT 0,
    "ast_node_delta" integer DEFAULT 0,
    "ast_velocity" integer DEFAULT 0,
    "code_delta" jsonb DEFAULT '[]'::jsonb,
    "metadata" jsonb DEFAULT '{}'::jsonb,
    "created_at" timestamp DEFAULT now() NOT NULL
  );`,
];

const constraints = [
  // 2. Add Constraints
  `ALTER TABLE "integrity_audit_logs" ADD CONSTRAINT "integrity_audit_logs_admin_user_id_users_id_fk" FOREIGN KEY ("admin_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;`,
  `ALTER TABLE "integrity_events" ADD CONSTRAINT "integrity_events_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;`,
  `ALTER TABLE "integrity_events" ADD CONSTRAINT "integrity_events_user_dsa_progress_id_user_dsa_progress_id_fk" FOREIGN KEY ("user_dsa_progress_id") REFERENCES "public"."user_dsa_progress"("id") ON DELETE cascade ON UPDATE no action;`,
  `ALTER TABLE "integrity_events" ADD CONSTRAINT "integrity_events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;`,
  `ALTER TABLE "integrity_reports" ADD CONSTRAINT "integrity_reports_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;`,
  `ALTER TABLE "integrity_reports" ADD CONSTRAINT "integrity_reports_user_dsa_progress_id_user_dsa_progress_id_fk" FOREIGN KEY ("user_dsa_progress_id") REFERENCES "public"."user_dsa_progress"("id") ON DELETE cascade ON UPDATE no action;`,
  `ALTER TABLE "integrity_reports" ADD CONSTRAINT "integrity_reports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;`,
  `ALTER TABLE "integrity_reports" ADD CONSTRAINT "integrity_reports_matched_submission_id_submissions_id_fk" FOREIGN KEY ("matched_submission_id") REFERENCES "public"."submissions"("id") ON DELETE set null ON UPDATE no action;`,
  `ALTER TABLE "integrity_reports" ADD CONSTRAINT "integrity_reports_matched_user_dsa_progress_id_user_dsa_progress_id_fk" FOREIGN KEY ("matched_user_dsa_progress_id") REFERENCES "public"."user_dsa_progress"("id") ON DELETE set null ON UPDATE no action;`,
  `ALTER TABLE "telemetry_snapshots" ADD CONSTRAINT "telemetry_snapshots_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;`,
  `ALTER TABLE "telemetry_snapshots" ADD CONSTRAINT "telemetry_snapshots_user_dsa_progress_id_user_dsa_progress_id_fk" FOREIGN KEY ("user_dsa_progress_id") REFERENCES "public"."user_dsa_progress"("id") ON DELETE cascade ON UPDATE no action;`,
  `ALTER TABLE "telemetry_snapshots" ADD CONSTRAINT "telemetry_snapshots_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;`,
];

async function runMigration() {
  console.log("🚀 Starting CodeArena database migrations for Code Integrity Engine...");

  // Execute Table Creation
  for (const sql of sqlStatements) {
    try {
      await pool.query(sql);
      console.log(`✅ Executed: ${sql.slice(0, 50)}...`);
    } catch (err: any) {
      console.error(`❌ Error executing table query:`, err.message);
      process.exit(1);
    }
  }

  // Execute Constraints
  for (const sql of constraints) {
    try {
      await pool.query(sql);
      console.log(`✅ Added constraint: ${sql.slice(12, 60)}...`);
    } catch (err: any) {
      // Ignore if constraint already exists
      if (err.message.includes("already exists")) {
        console.log(`ℹ️ Constraint already exists: ${sql.slice(12, 60)}...`);
      } else {
        console.warn(`⚠️ Warning adding constraint:`, err.message);
      }
    }
  }

  console.log("🎉 Database migrations completed successfully!");
  await pool.end();
}

runMigration().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
