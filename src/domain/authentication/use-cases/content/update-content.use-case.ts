import { inject, injectable } from "tsyringe";
import { IContentRepository } from "../../repositories/content-repository";
import { Content } from "../../entities/content";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error";
import { ForbiddenError } from "@/core/errors/forbidden.error";
import { object, string } from "yup";
import { validate } from "@/core/utils/validate";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";

interface IUpdateContentRequest {
  contentId: string;
  title?: string;
  body?: Record<string, string>;
  authorId: UniqueEntityObjectId; // Para verificação de permissão
}

interface IUpdateContentResponse {
  content: Content;
}

@injectable()
export class UpdateContentUseCase {
  constructor(
    @inject("contentRepository")
    private contentRepository: IContentRepository
  ) {}

  async execute({
    contentId,
    title,
    body,
    authorId,
  }: IUpdateContentRequest): Promise<IUpdateContentResponse> {
    await validate(updateContentYupSchema, { contentId, authorId });

    const content = await this.contentRepository.findById(contentId);

    if (!content) {
      throw new ResourceNotFoundError(`Content with ID ${contentId} not found`);
    }

    // Verificar se o usuário é o autor do conteúdo
    if (content.authorId.equals(authorId) === false) {
      throw new ForbiddenError("Only the author can update this content");
    }

    // Verificar se o conteúdo está em estado de rascunho
    if (content.status !== "draft") {
      throw new ForbiddenError("Only draft content can be updated");
    }

    if (title) {
      content.changeTitle(title);
    }

    if (body) {
      content.updateBody(body);
    }

    const updatedContent = await this.contentRepository.save(content);

    return { content: updatedContent };
  }
}

const updateContentYupSchema = object({
  contentId: string().required("ID do conteúdo é obrigatório"),
  authorId: string().required("ID do autor é obrigatório"),
});
