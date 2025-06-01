import { FastifyInstance } from "fastify";
import { authenticate } from "../../middlewares/authenticate";
import { httpValidate } from "../../middlewares/http-validate";
import { AccountController } from "../../controllers/account.controller";
import { AccountValidation } from "@/infra/validations/account.validation";

export async function accountRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      preHandler: [httpValidate(AccountValidation.create()), authenticate],
    },
    AccountController.create
  );

  app.get(
    "/:accountId",
    {
      preHandler: [httpValidate(AccountValidation.show()), authenticate],
    },
    AccountController.show
  );

  app.put(
    "/:accountId",
    {
      preHandler: [httpValidate(AccountValidation.update()), authenticate],
    },
    AccountController.update
  );

  app.delete(
    "/:accountId",
    {
      preHandler: [httpValidate(AccountValidation.delete()), authenticate],
    },
    AccountController.delete
  );
}
