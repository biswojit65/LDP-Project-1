import { z } from "zod";
import { ALL_PERMISSION_LIST } from "../../config/permission";
import zodToJsonSchema from "zod-to-json-schema";

//Defining Schema for incomming createRole request
const createRoleBodySchema = z.object({
  name: z.string(),
  permissions: z.array(z.enum(ALL_PERMISSION_LIST))
});
export type CreateRoleBody = z.infer<typeof createRoleBodySchema>;
export const createRoleJsonSchema = {body: zodToJsonSchema(createRoleBodySchema, "createRoleBodySchema")};