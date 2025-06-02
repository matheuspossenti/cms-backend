import { inject, injectable } from "tsyringe";
import { CreateContentUseCase } from "../../use-cases/content/create-content.use-case";
import { Content } from "../../entities/content";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";

interface CreateContentServiceRequest {
  title: string;
  templateId: string;
  authorId: UniqueEntityObjectId;
}

interface CreateContentServiceResponse {
  content: Content;
}

@injectable()
export class CreateContentService {
  constructor(
    @inject(CreateContentUseCase)
    private readonly createContentUseCase: CreateContentUseCase
  ) {}

  async execute({
    title,
    templateId,
    authorId,
  }: CreateContentServiceRequest): Promise<CreateContentServiceResponse> {
    const { content } = await this.createContentUseCase.execute({
      title,
      templateId,
      authorId,
    });

    return {
      content,
    };
  }
}