import { FastifyInstance } from "fastify";
import { AssignRoleToUserBody, assignRoleTouserJsonSchema, createUserJsonSchema, loginJsonSchema } from "./user.data.schema";
import { assignRoleTouserHandler, createUserHandler, loginHandler } from "./user.data.controller";
import { PERMISSIONS } from "../../config/permission";

//Routing Info for creating user,logging user,assigning role to user
export async function usersRoutes(app: FastifyInstance) {
    app.post("/",{schema: createUserJsonSchema},createUserHandler);
    app.post("/login",{schema: loginJsonSchema},loginHandler);
    app.post<{Body: AssignRoleToUserBody;}>("/roles",{
        schema: assignRoleTouserJsonSchema,
        preHandler: [app.guard.scope(PERMISSIONS["user:role:write"])],
    },assignRoleTouserHandler);
}

