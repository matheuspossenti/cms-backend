import { z } from "zod/v4";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  MONGODB_URI: z.string().default("mongodb://localhost:27017/cms"),
  PORT: z.coerce.number().default(8080),
});

export const env = envSchema.parse(process.env);
