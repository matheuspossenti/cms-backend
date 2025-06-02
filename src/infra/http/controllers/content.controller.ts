import { CreateContentService } from "@/domain/authentication/services/content/create-content.service";
import { SubmitContentForReviewService } from "@/domain/authentication/services/content/submit-content-for-review.service";
import { ApproveContentService } from "@/domain/authentication/services/content/approve-content.service";
import { RejectContentService } from "@/domain/authentication/services/content/reject-content.service";
import { PublishContentService } from "@/domain/authentication/services/content/publish-content.service";
import { RunApprovalChainService } from "@/domain/authentication/services/content/run-approval-chain.service";
import { FastifyRequest, FastifyReply } from "fastify";
import { container } from "tsyringe";
import { ReturnContentToDraftService } from "@/domain/authentication/services/content/return-content-to-draft.service";
import { ContentPresenter } from "@/infra/presenters/content.presenter";

export class ContentController {
  static async create(
    req: FastifyRequest<{
      Body: {
        title: string;
        templateId: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const { title, templateId } = req.body;
    const authorId = req.account.id;

    const command = container.resolve(CreateContentService);

    const { content } = await command.execute({
      title,
      templateId,
      authorId,
    });

    return reply.status(201).send(ContentPresenter.toHttp(content));
  }

  static async submitForReview(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const { id } = req.params;
    const authorId = req.account.id;

    const command = container.resolve(SubmitContentForReviewService);

    const { content } = await command.execute({
      contentId: id,
      authorId,
    });

    return reply.status(200).send(ContentPresenter.toHttp(content));
  }

  static async approve(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
      Body: {
        notes?: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const { id } = req.params;
    const { notes } = req.body;
    const reviewerId = req.account.id;

    const command = container.resolve(ApproveContentService);

    const { content } = await command.execute({
      contentId: id,
      reviewerId,
      notes,
    });

    return reply.status(200).send(ContentPresenter.toHttp(content));
  }

  static async reject(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
      Body: {
        notes: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const { id } = req.params;
    const { notes } = req.body;
    const reviewerId = req.account.id;

    const command = container.resolve(RejectContentService);

    const { content } = await command.execute({
      contentId: id,
      reviewerId,
      notes,
    });

    return reply.status(200).send(ContentPresenter.toHttp(content));
  }

  static async publish(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const { id } = req.params;
    const editorId = req.account.id;

    const command = container.resolve(PublishContentService);

    const { content } = await command.execute({
      contentId: id,
      editorId,
    });

    return reply.status(200).send(ContentPresenter.toHttp(content));
  }

  static async returnToDraft(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const { id } = req.params;
    const editorId = req.account.id;

    const command = container.resolve(ReturnContentToDraftService);

    const { content } = await command.execute({
      contentId: id,
      editorId,
    });

    return reply.status(200).send(ContentPresenter.toHttp(content));
  }

  static async runApprovalChain(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const { id } = req.params;

    const command = container.resolve(RunApprovalChainService);

    const { content } = await command.execute({
      contentId: id,
    });

    return reply.status(200).send(ContentPresenter.toHttp(content));
  }
}
