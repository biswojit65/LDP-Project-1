import { FastifyReply, FastifyRequest } from "fastify";
import { CreateApplicationBody } from "./applications.schema";
import { createApplication, getApplications } from "./applications.service";
import { ALL_PERMISSION_LIST,SYSTEM_ROLES,USER_ROLE_PERMISSIONS} from "../../config/permission";
import { createRole } from "../user.roles/user.roles.service";

export async function createApplicationHandler(request: FastifyRequest<{Body: CreateApplicationBody;}>,reply: FastifyReply) {
  const { name } = request.body;
  const application = await createApplication({name});
  //creating admin role
  const mainAdminPromise = createRole({
    applicationId: application.id,
    name: SYSTEM_ROLES.MAIN_ADMIN,
    permissions: ALL_PERMISSION_LIST as unknown as Array<string>,
  });
  //creating application user role
  const applicationUserRolePromise = createRole({
    applicationId: application.id,
    name: SYSTEM_ROLES.APP_USER,
    permissions: USER_ROLE_PERMISSIONS,
  });
  
  const [mainAdmin, applicationUserRole] = await Promise.allSettled([mainAdminPromise,applicationUserRolePromise]);

  if (mainAdmin.status === "rejected") {
    throw new Error("Error occured while creating admin role");
  }

  if (applicationUserRole.status === "rejected") {
    throw new Error("Error occured while creating admin role");
  }

  return {
    application,
    superAdminRole: mainAdmin.value,
    applicationUserRole: applicationUserRole.value,
  };
}

export async function getApplicationshandler() {
  return getApplications();
}