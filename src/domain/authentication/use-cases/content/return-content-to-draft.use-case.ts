import { inject, injectable } from "tsyringe";
import { IContentRepository } from "../../repositories/content-repository";
import { Content } from "../../entities/content";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error";
import { object, string } from "yup";
import { validate } from "@/core/utils/validate";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";

interface IReturnContentToDraftRequest {
  contentId: string;
  editorId: UniqueEntityObjectId;
}

interface IReturnContentToDraftResponse {
  content: Content;
}

@injectable()
export class ReturnContentToDraftUseCase {
  constructor(
    @inject("contentRepository")
    private contentRepository: IContentRepository
  ) {}

  async execute({
    contentId,
    editorId,
  }: IReturnContentToDraftRequest): Promise<IReturnContentToDraftResponse> {
    await validate(returnContentToDraftYupSchema, { contentId, editorId });

    const content = await this.contentRepository.findById(contentId);

    if (!content) {
      throw new ResourceNotFoundError(`Content with ID ${contentId} not found`);
    }

    // Retornar para rascunho
    content.returnToDraft();

    const updatedContent = await this.contentRepository.save(content);

    return { content: updatedContent };
  }
}

const returnContentToDraftYupSchema = object({
  contentId: string().required("ID do conteúdo é obrigatório"),
  editorId: string().required("ID do editor é obrigatório"),
});
