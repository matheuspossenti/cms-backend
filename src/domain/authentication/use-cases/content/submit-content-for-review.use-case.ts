import { inject, injectable } from "tsyringe";
import { IContentRepository } from "../../repositories/content-repository";
import { Content } from "../../entities/content";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error";
import { ForbiddenError } from "@/core/errors/forbidden.error";
import { object, string } from "yup";
import { validate } from "@/core/utils/validate";
import { ContentEventEmitter } from "../../events/content-event-emitter";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";

interface ISubmitContentForReviewRequest {
  contentId: string;
  authorId: UniqueEntityObjectId; // Para verificação de permissão
}

interface ISubmitContentForReviewResponse {
  content: Content;
}

@injectable()
export class SubmitContentForReviewUseCase {
  constructor(
    @inject("contentRepository")
    private contentRepository: IContentRepository,
    @inject(ContentEventEmitter)
    private eventEmitter: ContentEventEmitter
  ) {}

  async execute({
    contentId,
    authorId,
  }: ISubmitContentForReviewRequest): Promise<ISubmitContentForReviewResponse> {
    await validate(submitContentForReviewYupSchema, { contentId, authorId });

    const content = await this.contentRepository.findById(contentId);

    if (!content) {
      throw new ResourceNotFoundError(`Content with ID ${contentId} not found`);
    }

    // Verificar se o usuário é o autor do conteúdo
    if (content.authorId !== authorId) {
      throw new ForbiddenError(
        "Only the author can submit this content for review"
      );
    }

    // Submeter para revisão
    content.submitForReview();

    const updatedContent = await this.contentRepository.save(content);

    // Emitir evento
    await this.eventEmitter.emit("content.submitted", updatedContent);

    return { content: updatedContent };
  }
}

const submitContentForReviewYupSchema = object({
  contentId: string().required("ID do conteúdo é obrigatório"),
  authorId: string().required("ID do autor é obrigatório"),
});
