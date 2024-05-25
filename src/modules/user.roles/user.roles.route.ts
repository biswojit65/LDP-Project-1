import { FastifyInstance } from "fastify";
import { CreateRoleBody, createRoleJsonSchema } from "./user.roles.schema";
import { PERMISSIONS } from "../../config/permission";
import { createRoleHandler } from "./user.roles.controller";

//Routing info of role creation request
export async function roleRoutes(app: FastifyInstance) {app.post<{Body: CreateRoleBody;}>("/",
    {
      schema: createRoleJsonSchema,
      preHandler: [app.guard.scope([PERMISSIONS["roles:write"]])],
    },
    createRoleHandler
  );
}