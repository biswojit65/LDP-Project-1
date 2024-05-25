
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite"
  schema: "./src/database/schema.ts",
  out: "./migration",
  breakpoints:false
});