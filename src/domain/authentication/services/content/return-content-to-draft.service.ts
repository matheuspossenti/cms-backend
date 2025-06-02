import { inject, injectable } from "tsyringe";
import { ReturnContentToDraftUseCase } from "../../use-cases/content/return-content-to-draft.use-case";
import { Content } from "../../entities/content";
import { ContentAccessProxy } from "../../proxies/content-access-proxy";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";

interface ReturnContentToDraftServiceRequest {
  contentId: string;
  editorId: UniqueEntityObjectId;
}

interface ReturnContentToDraftServiceResponse {
  content: Content;
}

@injectable()
export class ReturnContentToDraftService {
  constructor(
    @inject(ReturnContentToDraftUseCase)
    private readonly returnContentToDraftUseCase: ReturnContentToDraftUseCase,
    @inject(ContentAccessProxy)
    private readonly accessProxy: ContentAccessProxy
  ) {}

  async execute({
    contentId,
    editorId,
  }: ReturnContentToDraftServiceRequest): Promise<ReturnContentToDraftServiceResponse> {
    // Verificar permissão
    await this.accessProxy.canReview(contentId, editorId);

    const { content } = await this.returnContentToDraftUseCase.execute({
      contentId,
      editorId,
    });

    return {
      content,
    };
  }
}
