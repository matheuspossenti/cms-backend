import { inject, injectable } from "tsyringe";
import { ApproveContentUseCase } from "../../use-cases/content/approve-content.use-case";
import { Content } from "../../entities/content";
import { ContentAccessProxy } from "../../proxies/content-access-proxy";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";

interface ApproveContentServiceRequest {
  contentId: string;
  reviewerId: UniqueEntityObjectId;
  notes?: string;
}

interface ApproveContentServiceResponse {
  content: Content;
}

@injectable()
export class ApproveContentService {
  constructor(
    @inject(ApproveContentUseCase)
    private readonly approveContentUseCase: ApproveContentUseCase,
    @inject(ContentAccessProxy)
    private readonly accessProxy: ContentAccessProxy
  ) {}

  async execute({
    contentId,
    reviewerId,
    notes,
  }: ApproveContentServiceRequest): Promise<ApproveContentServiceResponse> {
    // Verificar permissão
    await this.accessProxy.canReview(contentId, reviewerId);

    const { content } = await this.approveContentUseCase.execute({
      contentId,
      reviewerId,
      notes,
    });

    return {
      content,
    };
  }
}
