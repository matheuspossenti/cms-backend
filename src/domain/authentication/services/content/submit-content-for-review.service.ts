import { inject, injectable } from "tsyringe";
import { SubmitContentForReviewUseCase } from "../../use-cases/content/submit-content-for-review.use-case";
import { Content } from "../../entities/content";

interface SubmitContentForReviewServiceRequest {
  contentId: string;
  authorId: UniqueEntityObjectId;
}

interface SubmitContentForReviewServiceResponse {
  content: Content;
}

@injectable()
export class SubmitContentForReviewService {
  constructor(
    @inject(SubmitContentForReviewUseCase)
    private readonly submitContentForReviewUseCase: SubmitContentForReviewUseCase
  ) {}

  async execute({
    contentId,
    authorId,
  }: SubmitContentForReviewServiceRequest): Promise<SubmitContentForReviewServiceResponse> {
    const { content } = await this.submitContentForReviewUseCase.execute({
      contentId,
      authorId,
    });

    return {
      content,
    };
  }
}
