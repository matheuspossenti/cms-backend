import { FastifyInstance } from "fastify";
import { httpValidate } from "../../middlewares/http-validate";
import { authenticate } from "../../middlewares/authenticate";

export async function authRoutes(app: FastifyInstance) {
  app.post(
    "/login",
    {
      preHandler: [httpValidate(AuthValidation.login())],
    },
    AuthController.login
  );

  app.post(
    "/refresh-token",
    {
      preHandler: [httpValidate(AuthValidation.refresh())],
    },
    AuthController.refresh
  );

  app.get("/me", { preHandler: [authenticate] }, AuthController.me);
}
