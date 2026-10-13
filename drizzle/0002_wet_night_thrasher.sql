CREATE TABLE "login_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"ip" text,
	"attempted_at" timestamp with time zone DEFAULT now() NOT NULL
);
