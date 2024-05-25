import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const createApplicationBodySchema = z.object({
  name: z.string({
    required_error: "Application name must be given"//validaing the incomming request 
  })
});
export type CreateApplicationBody = z.infer<typeof createApplicationBodySchema>;
export const createApplicationJsonSchema = {
  body: zodToJsonSchema(createApplicationBodySchema,"createApplicationBodySchema")//attaching inncoming data in request.body
};
