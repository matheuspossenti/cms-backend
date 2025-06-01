import { number, object, string } from "yup";

const envSchema = object({
  NODE_ENV: string()
    .oneOf(["development", "production", "test"])
    .default("development")
    .required("NODE_ENV é obrigatório"),
  JWT_SECRET: string().required("JWT_SECRET é obrigatório"),
  JWT_ACCESS_EXPIRATION_HOURS: string().required(
    "JWT_ACCESS_EXPIRATION_HOURS é obrigatório"
  ),
  JWT_REFRESH_EXPIRATION_DAYS: string().required(
    "JWT_REFRESH_EXPIRATION_DAYS é obrigatório"
  ),
  MONGODB_URI: string().required("MONGODB_URI é obrigatório"),
  PORT: number().default(8080).required("PORT é obrigatório"),
});

export const env = envSchema.validateSync(process.env);
