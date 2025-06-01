import { FastifyInstance } from "fastify";
import { authenticate } from "../../middlewares/authenticate";
import { TemplateController } from "../../controllers/template.controller";
import { httpValidate } from "../../middlewares/http-validate";
import { TemplateValidation } from "@/infra/validations/template.validation";

export async function templateRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      preHandler: [httpValidate(TemplateValidation.create()), authenticate],
    },
    TemplateController.create
  );

  app.get(
    "/:id",
    {
      preHandler: [httpValidate(TemplateValidation.getById()), authenticate],
    },
    TemplateController.getById
  );
}
