CREATE TABLE IF NOT EXISTS "user_role" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"applicationId" uuid,
	"permissions" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_role_name_applicationId_pk" PRIMARY KEY("name","applicationId")
);

DO $$ BEGIN
 ALTER TABLE "user_role" ADD CONSTRAINT "user_role_applicationId_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "user_role_id_index" ON "user_role" ("id");