import { inject, injectable } from "tsyringe";
import { IContentRepository } from "../../repositories/content-repository";
import { Content } from "../../entities/content";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error";
import { object, string } from "yup";
import { validate } from "@/core/utils/validate";
import { ContentEventEmitter } from "../../events/content-event-emitter";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";

interface IPublishContentRequest {
  contentId: string;
  editorId: UniqueEntityObjectId;
}

interface IPublishContentResponse {
  content: Content;
}

@injectable()
export class PublishContentUseCase {
  constructor(
    @inject("contentRepository")
    private contentRepository: IContentRepository,
    @inject(ContentEventEmitter)
    private eventEmitter: ContentEventEmitter
  ) {}

  async execute({
    contentId,
    editorId,
  }: IPublishContentRequest): Promise<IPublishContentResponse> {
    await validate(publishContentYupSchema, { contentId, editorId });

    const content = await this.contentRepository.findById(contentId);

    if (!content) {
      throw new ResourceNotFoundError(`Content with ID ${contentId} not found`);
    }

    // Publicar o conteúdo
    content.publish();

    const updatedContent = await this.contentRepository.save(content);

    // Emitir evento
    await this.eventEmitter.emit("content.published", updatedContent);

    return { content: updatedContent };
  }
}

const publishContentYupSchema = object({
  contentId: string().required("ID do conteúdo é obrigatório"),
  editorId: string().required("ID do editor é obrigatório"),
});
