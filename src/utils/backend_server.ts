import fastify from "fastify";
import { logger } from "./logger";
import guard from "fastify-guard";
import { applicationRoute } from "../modules/applications/applications.route";
import { usersRoutes } from "../modules/user.data/user.data.route";
import { roleRoutes } from "../modules/user.roles/user.roles.route";
import jwt from "jsonwebtoken";

type User = {
    id: string;
    applicationId: string;
    scopes: Array<string>;
};

//including a user property on the FastifyRequest interface, allowing us to attach user information to requests.
declare module "fastify" {
  interface FastifyRequest {
    user: User;
  }
}

export async function createServer(){
  const app = fastify({logger});// Initializing Fastify with the custom logger.
  app.decorateRequest("user", null);
//token extraction and verification process will happen for each request, 
//ensuring that the user object is available (if a valid token is provided)
//for every request handled by the server.
  app.addHook("onRequest", async function (request, reply) {
    const authHeader = request.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {return;}
    try {
      const token = authHeader.replace("Bearer ", "");
      const decoded = jwt.verify(token, "secret") as User;
      console.log("user", decoded);
      request.user = decoded;
    } catch (e) {console.error("JWT Verification Error:", e);}
  });


  app.register(guard, {requestProperty: "user",scopeProperty: "scopes",errorHandler: (result, request, reply) => {
    return reply.send("you can not do that");
  }});
  app.register(applicationRoute,{prefix:'/userapi/applications'});
  app.register(usersRoutes, { prefix: "/userapi/users" });
  app.register(roleRoutes, { prefix: "/userapi/roles" });
  return app;
};