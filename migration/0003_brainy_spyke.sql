CREATE TABLE IF NOT EXISTS "userAndRoles" (
	"applicationId" uuid NOT NULL,
	"roledId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	CONSTRAINT "userAndRoles_applicationId_roledId_userId_pk" PRIMARY KEY("applicationId","roledId","userId")
);

DO $$ BEGIN
 ALTER TABLE "userAndRoles" ADD CONSTRAINT "userAndRoles_applicationId_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "userAndRoles" ADD CONSTRAINT "userAndRoles_roledId_user_role_id_fk" FOREIGN KEY ("roledId") REFERENCES "public"."user_role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "userAndRoles" ADD CONSTRAINT "userAndRoles_userId_userdata_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."userdata"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
