import { FastifyInstance } from "fastify";
import { authenticate } from "../../middlewares/authenticate";
import { ContentController } from "../../controllers/content.controller";
import { httpValidate } from "../../middlewares/http-validate";
import { ContentValidation } from "@/infra/validations/content.validation";

export async function contentRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      preHandler: [httpValidate(ContentValidation.create()), authenticate],
    },
    ContentController.create
  );

  app.post(
    "/:id/submit",
    {
      preHandler: [
        httpValidate(ContentValidation.submitForReview()),
        authenticate,
      ],
    },
    ContentController.submitForReview
  );

  app.post(
    "/:id/approve",
    {
      preHandler: [httpValidate(ContentValidation.approve()), authenticate],
    },
    ContentController.approve
  );

  app.post(
    "/:id/reject",
    {
      preHandler: [httpValidate(ContentValidation.reject()), authenticate],
    },
    ContentController.reject
  );

  app.post(
    "/:id/publish",
    {
      preHandler: [httpValidate(ContentValidation.publish()), authenticate],
    },
    ContentController.publish
  );

  app.post(
    "/:id/return-to-draft",
    {
      preHandler: [
        httpValidate(ContentValidation.returnToDraft()),
        authenticate,
      ],
    },
    ContentController.returnToDraft
  );

  app.post(
    "/:id/run-approval-chain",
    {
      preHandler: [
        httpValidate(ContentValidation.runApprovalChain()),
        authenticate,
      ],
    },
    ContentController.runApprovalChain
  );
}
