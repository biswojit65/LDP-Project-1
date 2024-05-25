import { FastifyReply, FastifyRequest } from "fastify";
import { AssignRoleToUserBody, CreateUserBody, LoginBody } from "./user.data.schema";
import { SYSTEM_ROLES } from "../../config/permission";
import { assignRoleTouser, createUser, getUserByEmail } from "./user.data.service";
import { getRoleByName } from "../user.roles/user.roles.service";
import jwt from "jsonwebtoken";
import { logger } from "../../utils/logger";
import { getUsersByApplication } from "../applications/applications.service";

//Creating user with assigning appropriate role
export async function createUserHandler(request: FastifyRequest<{Body: CreateUserBody;}>,reply: FastifyReply) {
    const { initialUser, ...data } = request.body;
    const roleName = initialUser ? SYSTEM_ROLES.MAIN_ADMIN : SYSTEM_ROLES.APP_USER;//assigning role according to the initialUser boolean value
    if (roleName === SYSTEM_ROLES.MAIN_ADMIN) {
      const appUsers = await getUsersByApplication(data.applicationId);
      if (appUsers.length > 0) {
        return reply.code(400).send({
          message: "Application already has super admin user",
          extensions: {
            code: "APPLICATION_ALRADY_ADMIN_USER",
            applicationId: data.applicationId,
          },
        });
      }
    }
    const role = await getRoleByName({name: roleName,applicationId: data.applicationId});
    if (!role) {
        return reply.code(404).send({message: "Role not found"});//Just for checking,In our application it will never execute
    } 
    try {
        const user = await createUser(data);
        await assignRoleTouser({//Creating new entry in userAndRoles table
          userId: user.id,
          roleId: role.id,
          applicationId: data.applicationId,
        });
        return user;
    }catch (e) {console.log(e);}
}

//Logging the user
export async function loginHandler(request: FastifyRequest<{Body: LoginBody;}>,reply: FastifyReply) {
  const { applicationId, email, password } = request.body;
  const user = await getUserByEmail({applicationId,email});
  if (!user) {
    return reply.code(400).send({message: "User does not exist",});
  }
  const token = jwt.sign({//Creating a Json Web Token after successfully login
      id: user.id,
      email,
      applicationId,
      scopes: user.permissions,
    },"secret"
  );
  return { token };
}

//Assigning Role
export async function assignRoleTouserHandler(request: FastifyRequest<{Body: AssignRoleToUserBody;}>,reply: FastifyReply) {
    const applicationId = request.user.applicationId;
    const { userId, roleId } = request.body;
    try {
      const result = await assignRoleTouser({userId,applicationId,roleId});
      return result;
    } catch (e) {//Error Occured while assigning role
      logger.error(e, `error assigning role to user`);
      return reply.code(400).send({
        message: "could not assign role to user",
      });
    }
}