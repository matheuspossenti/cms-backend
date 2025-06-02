import { inject, injectable } from "tsyringe";
import { PublishContentUseCase } from "../../use-cases/content/publish-content.use-case";
import { Content } from "../../entities/content";
import { ContentAccessProxy } from "../../proxies/content-access-proxy";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";

interface PublishContentServiceRequest {
  contentId: string;
  editorId: UniqueEntityObjectId;
}

interface PublishContentServiceResponse {
  content: Content;
}

@injectable()
export class PublishContentService {
  constructor(
    @inject(PublishContentUseCase)
    private readonly publishContentUseCase: PublishContentUseCase,
    @inject(ContentAccessProxy)
    private readonly accessProxy: ContentAccessProxy
  ) {}

  async execute({
    contentId,
    editorId,
  }: PublishContentServiceRequest): Promise<PublishContentServiceResponse> {
    // Verificar permissão
    await this.accessProxy.canPublish(contentId, editorId);

    const { content } = await this.publishContentUseCase.execute({
      contentId,
      editorId,
    });

    return {
      content,
    };
  }
}
