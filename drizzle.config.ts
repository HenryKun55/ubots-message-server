import { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schema.ts",
  out: "./src/database/migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
  dialect: "sqlite",
} satisfies Config
