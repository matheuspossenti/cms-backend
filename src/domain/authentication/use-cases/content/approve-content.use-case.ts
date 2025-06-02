import { inject, injectable } from "tsyringe";
import { IContentRepository } from "../../repositories/content-repository";
import { Content } from "../../entities/content";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error";
import { ForbiddenError } from "@/core/errors/forbidden.error";
import { object, string } from "yup";
import { validate } from "@/core/utils/validate";
import { ContentEventEmitter } from "../../events/content-event-emitter";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";

interface IApproveContentRequest {
  contentId: string;
  reviewerId: UniqueEntityObjectId;
  notes?: string;
}

interface IApproveContentResponse {
  content: Content;
}

@injectable()
export class ApproveContentUseCase {
  constructor(
    @inject("contentRepository")
    private contentRepository: IContentRepository,
    @inject(ContentEventEmitter)
    private eventEmitter: ContentEventEmitter
  ) {}

  async execute({
    contentId,
    reviewerId,
    notes,
  }: IApproveContentRequest): Promise<IApproveContentResponse> {
    await validate(approveContentYupSchema, { contentId, reviewerId });

    const content = await this.contentRepository.findById(contentId);

    if (!content) {
      throw new ResourceNotFoundError(`Content with ID ${contentId} not found`);
    }

    // Verificar se o conteúdo está em revisão
    if (content.status !== "review") {
      throw new ForbiddenError("Only content under review can be approved");
    }

    // Aprovar o conteúdo
    content.approve(reviewerId.toString(), notes);

    const updatedContent = await this.contentRepository.save(content);

    // Emitir evento
    await this.eventEmitter.emit("content.approved", updatedContent);

    return { content: updatedContent };
  }
}

const approveContentYupSchema = object({
  contentId: string().required("ID do conteúdo é obrigatório"),
  reviewerId: string().required("ID do revisor é obrigatório"),
});
