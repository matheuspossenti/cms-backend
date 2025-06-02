import { inject, injectable } from "tsyringe";
import { RejectContentUseCase } from "../../use-cases/content/reject-content.use-case";
import { Content } from "../../entities/content";
import { ContentAccessProxy } from "../../proxies/content-access-proxy";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";

interface RejectContentServiceRequest {
  contentId: string;
  reviewerId: UniqueEntityObjectId;
  notes: string;
}

interface RejectContentServiceResponse {
  content: Content;
}

@injectable()
export class RejectContentService {
  constructor(
    @inject(RejectContentUseCase)
    private readonly rejectContentUseCase: RejectContentUseCase,
    @inject(ContentAccessProxy)
    private readonly accessProxy: ContentAccessProxy
  ) {}

  async execute({
    contentId,
    reviewerId,
    notes,
  }: RejectContentServiceRequest): Promise<RejectContentServiceResponse> {
    // Verificar permissão
    await this.accessProxy.canReview(contentId, reviewerId);

    const { content } = await this.rejectContentUseCase.execute({
      contentId,
      reviewerId,
      notes,
    });

    return {
      content,
    };
  }
}
