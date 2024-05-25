import { FastifyInstance } from "fastify";
import { createApplicationJsonSchema } from "./applications.schema";
import { createApplicationHandler, getApplicationshandler } from "./applications.controller";

//Defining methode and route information
export async function applicationRoute(app: FastifyInstance) {
  app.post("/",{schema: createApplicationJsonSchema},createApplicationHandler);
  app.get("/",getApplicationshandler);
}