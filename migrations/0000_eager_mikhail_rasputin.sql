CREATE TABLE "analytics_snapshots" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"total_students" integer DEFAULT 0,
	"active_students" integer DEFAULT 0,
	"average_rating" integer DEFAULT 0,
	"total_problems_solved" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "bookmarks" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"contest_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "brain_teasers" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" timestamp NOT NULL,
	"title" text NOT NULL,
	"puzzle" text NOT NULL,
	"hint1" text,
	"hint2" text,
	"hint3" text,
	"solution" text NOT NULL,
	"difficulty" text NOT NULL,
	"explanation" text NOT NULL,
	"category" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "brain_teasers_date_unique" UNIQUE("date")
);
--> statement-breakpoint
CREATE TABLE "coding_profiles" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"platform" text NOT NULL,
	"handle" text NOT NULL,
	"current_rating" integer DEFAULT 0,
	"max_rating" integer DEFAULT 0,
	"total_solved" integer DEFAULT 0,
	"contest_count" integer DEFAULT 0,
	"streak" integer DEFAULT 0,
	"last_synced" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "contests" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"platform" text DEFAULT 'System' NOT NULL,
	"url" text,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"duration" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'upcoming' NOT NULL,
	"external_id" text,
	"participants" integer DEFAULT 0,
	"created_by" text DEFAULT 'system' NOT NULL,
	"last_updated" timestamp DEFAULT now(),
	"notified" boolean DEFAULT false,
	CONSTRAINT "contests_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"level" text NOT NULL,
	"duration" text NOT NULL,
	"difficulty" text NOT NULL,
	"topics" jsonb NOT NULL,
	"prerequisites" text,
	"instructor" text NOT NULL,
	"rating" integer DEFAULT 5,
	"students" integer DEFAULT 0,
	"price" text NOT NULL,
	"thumbnail" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "departments" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "departments_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "dsa_problems" (
	"id" serial PRIMARY KEY NOT NULL,
	"subtopic_id" integer NOT NULL,
	"title" text NOT NULL,
	"platform" text NOT NULL,
	"problem_url" text NOT NULL,
	"difficulty" text NOT NULL,
	"judge0_problem_id" integer,
	"order_index" integer DEFAULT 0 NOT NULL,
	"description" text,
	"sample_input" text,
	"sample_output" text,
	"explanation" text,
	"test_cases" jsonb DEFAULT '[]'::jsonb,
	"starter_code" jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
CREATE TABLE "dsa_sheets" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "dsa_subtopics" (
	"id" serial PRIMARY KEY NOT NULL,
	"topic_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"order_index" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dsa_topics" (
	"id" serial PRIMARY KEY NOT NULL,
	"sheet_id" integer,
	"title" text NOT NULL,
	"description" text,
	"order_index" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "enrollments" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"course_id" varchar NOT NULL,
	"enrolled_at" timestamp DEFAULT now(),
	"completed_at" timestamp,
	"progress" integer DEFAULT 0,
	"time_spent" integer DEFAULT 0,
	"status" text DEFAULT 'active',
	"last_accessed_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "group_members" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"cf_handle" text,
	"lc_handle" text,
	"cc_handle" text,
	"joined_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"invite_code" text NOT NULL,
	"created_by" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "groups_invite_code_unique" UNIQUE("invite_code")
);
--> statement-breakpoint
CREATE TABLE "integrity_audit_logs" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_user_id" varchar NOT NULL,
	"report_id" varchar NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"action" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "integrity_events" (
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
);
--> statement-breakpoint
CREATE TABLE "integrity_reports" (
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
);
--> statement-breakpoint
CREATE TABLE "leaderboard" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contest_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"username" text NOT NULL,
	"total_score" integer DEFAULT 0,
	"problems_solved" integer DEFAULT 0,
	"last_submission" timestamp,
	"rank" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "lesson_progress" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"enrollment_id" varchar NOT NULL,
	"lesson_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"completed" boolean DEFAULT false,
	"time_spent" integer DEFAULT 0,
	"completed_at" timestamp,
	"last_accessed_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lessons" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_id" varchar NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"content" text NOT NULL,
	"order" integer NOT NULL,
	"duration" integer DEFAULT 0,
	"video_url" text,
	"quiz_data" jsonb,
	"type" text DEFAULT 'video',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "participations" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"contest_id" varchar NOT NULL,
	"rank" integer,
	"rating_change" integer,
	"problems_solved" integer DEFAULT 0,
	"attended" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "problems" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contest_id" varchar NOT NULL,
	"slug" text,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"difficulty" text NOT NULL,
	"points" integer DEFAULT 100 NOT NULL,
	"constraints" text,
	"input_format" text,
	"output_format" text,
	"examples" jsonb DEFAULT '[]'::jsonb,
	"sample_inputs" jsonb DEFAULT '[]'::jsonb,
	"sample_outputs" jsonb DEFAULT '[]'::jsonb,
	"explanations" jsonb DEFAULT '[]'::jsonb,
	"hints" jsonb DEFAULT '[]'::jsonb,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"companies" jsonb DEFAULT '[]'::jsonb,
	"editorial" text,
	"starter_code" jsonb DEFAULT '{}'::jsonb,
	"test_cases" jsonb NOT NULL,
	"visible_test_cases" jsonb DEFAULT '[]'::jsonb,
	"acceptance_rate" integer DEFAULT 0,
	"time_limit" integer DEFAULT 2000,
	"memory_limit" integer DEFAULT 256,
	"daily_date" text,
	CONSTRAINT "problems_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "quiz_attempts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"question_ids" jsonb NOT NULL,
	"user_answers" jsonb NOT NULL,
	"score" integer NOT NULL,
	"total_questions" integer NOT NULL,
	"topic" text NOT NULL,
	"time_spent" integer NOT NULL,
	"completed_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "quiz_questions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text NOT NULL,
	"code_snippet" text,
	"options" jsonb NOT NULL,
	"correct_answer" integer NOT NULL,
	"topic" text NOT NULL,
	"difficulty" text NOT NULL,
	"explanation" text NOT NULL,
	"time_limit" integer DEFAULT 60,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" jsonb NOT NULL,
	"expire" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "submissions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"problem_id" varchar NOT NULL,
	"contest_id" varchar NOT NULL,
	"code" text NOT NULL,
	"language" text NOT NULL,
	"status" text NOT NULL,
	"score" integer DEFAULT 0,
	"submitted_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "teaser_attempts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"teaser_id" varchar NOT NULL,
	"solved" boolean DEFAULT false,
	"hints_used" integer DEFAULT 0,
	"attempts" integer DEFAULT 0,
	"user_answer" text,
	"solved_at" timestamp,
	"attempted_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "telemetry_snapshots" (
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
);
--> statement-breakpoint
CREATE TABLE "typing_challenges" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"code" text NOT NULL,
	"language" text NOT NULL,
	"difficulty" text NOT NULL,
	"line_count" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "typing_scores" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"challenge_id" varchar NOT NULL,
	"wpm" integer NOT NULL,
	"accuracy" integer NOT NULL,
	"time_spent" integer NOT NULL,
	"completed_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_activity" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"date" timestamp DEFAULT CURRENT_DATE NOT NULL,
	"minutes_active" integer DEFAULT 0,
	"questions_solved" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "user_dsa_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"problem_id" integer NOT NULL,
	"status" text DEFAULT 'unsolved' NOT NULL,
	"code" text,
	"language" text,
	"time_spent" integer DEFAULT 0,
	"notes" text,
	"solved_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"google_id" text,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"streak" integer DEFAULT 0,
	"last_daily_solve" timestamp,
	"longest_streak" integer DEFAULT 0,
	"cf_handle" text,
	"lc_handle" text,
	"cc_handle" text,
	"at_handle" text,
	"hr_handle" text,
	"gfg_handle" text,
	"department_id" varchar,
	CONSTRAINT "users_google_id_unique" UNIQUE("google_id"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "dsa_problems" ADD CONSTRAINT "dsa_problems_subtopic_id_dsa_subtopics_id_fk" FOREIGN KEY ("subtopic_id") REFERENCES "public"."dsa_subtopics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dsa_subtopics" ADD CONSTRAINT "dsa_subtopics_topic_id_dsa_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."dsa_topics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dsa_topics" ADD CONSTRAINT "dsa_topics_sheet_id_dsa_sheets_id_fk" FOREIGN KEY ("sheet_id") REFERENCES "public"."dsa_sheets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrity_audit_logs" ADD CONSTRAINT "integrity_audit_logs_admin_user_id_users_id_fk" FOREIGN KEY ("admin_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrity_events" ADD CONSTRAINT "integrity_events_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrity_events" ADD CONSTRAINT "integrity_events_user_dsa_progress_id_user_dsa_progress_id_fk" FOREIGN KEY ("user_dsa_progress_id") REFERENCES "public"."user_dsa_progress"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrity_events" ADD CONSTRAINT "integrity_events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrity_reports" ADD CONSTRAINT "integrity_reports_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrity_reports" ADD CONSTRAINT "integrity_reports_user_dsa_progress_id_user_dsa_progress_id_fk" FOREIGN KEY ("user_dsa_progress_id") REFERENCES "public"."user_dsa_progress"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrity_reports" ADD CONSTRAINT "integrity_reports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrity_reports" ADD CONSTRAINT "integrity_reports_matched_submission_id_submissions_id_fk" FOREIGN KEY ("matched_submission_id") REFERENCES "public"."submissions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrity_reports" ADD CONSTRAINT "integrity_reports_matched_user_dsa_progress_id_user_dsa_progress_id_fk" FOREIGN KEY ("matched_user_dsa_progress_id") REFERENCES "public"."user_dsa_progress"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "telemetry_snapshots" ADD CONSTRAINT "telemetry_snapshots_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "telemetry_snapshots" ADD CONSTRAINT "telemetry_snapshots_user_dsa_progress_id_user_dsa_progress_id_fk" FOREIGN KEY ("user_dsa_progress_id") REFERENCES "public"."user_dsa_progress"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "telemetry_snapshots" ADD CONSTRAINT "telemetry_snapshots_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_dsa_progress" ADD CONSTRAINT "user_dsa_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_dsa_progress" ADD CONSTRAINT "user_dsa_progress_problem_id_dsa_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."dsa_problems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "user_dsa_progress_user_problem_idx" ON "user_dsa_progress" USING btree ("user_id","problem_id");