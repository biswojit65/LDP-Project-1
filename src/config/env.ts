import zennv from "zennv";//utility for managing environment variables and schemas.
import {z} from 'zod'; //for schema validation

export const env = zennv({
    dotenv: true,// zennv to load environment variables from a .env file using the dotenv package
    schema: z.object({//defining the structure and types of the environment variables
      PORT: z.number().default(5000),
      HOST: z.string().default("0.0.0.0"),
      DATABASE_CONNECTION: z.string(),
    }),
  });
  