import { CreateTemplateService } from "@/domain/authentication/services/template/create-template.service";
import { GetTemplateByIdService } from "@/domain/authentication/services/template/get-template-by-id.service";
import { TemplatePresenter } from "@/infra/presenters/template.presenter";
import { FastifyRequest, FastifyReply } from "fastify";
import { container } from "tsyringe";

export class TemplateController {
  static async create(
    req: FastifyRequest<{
      Body: {
        title: string;
        structure: string[];
      };
    }>,
    reply: FastifyReply
  ) {
    const { title, structure } = req.body;
    const command = container.resolve(CreateTemplateService);

    const { template } = await command.execute({
      title,
      structure,
    });

    return reply.status(201).send(TemplatePresenter.toHttp(template));
  }

  static async getById(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const { id } = req.params;
    const command = container.resolve(GetTemplateByIdService);

    const { template } = await command.execute({
      id,
    });

    return reply.status(200).send(TemplatePresenter.toHttp(template));
  }
}
