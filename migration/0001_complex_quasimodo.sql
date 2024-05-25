CREATE TABLE IF NOT EXISTS "userdata" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"applicationId" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "userdata_email_applicationId_pk" PRIMARY KEY("email","applicationId")
);

DO $$ BEGIN
 ALTER TABLE "userdata" ADD CONSTRAINT "userdata_applicationId_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "userdata_id_index" ON "userdata" ("id");