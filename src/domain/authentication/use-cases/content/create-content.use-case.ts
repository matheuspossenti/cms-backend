import { inject, injectable } from "tsyringe";
import { IContentRepository } from "../../repositories/content-repository";
import { ITemplateRepository } from "../../repositories/template-repository";
import { Content } from "../../entities/content";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error";
import { object, string } from "yup";
import { validate } from "@/core/utils/validate";
import { ContentEventEmitter } from "../../events/content-event-emitter";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";

interface ICreateContentRequest {
  title: string;
  templateId: string;
  authorId: UniqueEntityObjectId;
}

interface ICreateContentResponse {
  content: Content;
}

@injectable()
export class CreateContentUseCase {
  constructor(
    @inject("contentRepository")
    private contentRepository: IContentRepository,
    @inject("templateRepository")
    private templateRepository: ITemplateRepository,
    @inject(ContentEventEmitter)
    private eventEmitter: ContentEventEmitter
  ) {}

  async execute({
    title,
    templateId,
    authorId,
  }: ICreateContentRequest): Promise<ICreateContentResponse> {
    await validate(createContentYupSchema, { title, templateId, authorId });

    // Verificar se o template existe
    const template = await this.templateRepository.findById(templateId);

    if (!template) {
      throw new ResourceNotFoundError(
        `Template with ID ${templateId} not found`
      );
    }

    // Criar um objeto body vazio com base na estrutura do template
    const body: Record<string, string> = {};
    template.structure.forEach((field) => {
      body[field] = "";
    });

    // Criar o conteúdo
    const content = Content.create({
      title,
      body,
      templateId,
      authorId,
      status: "draft",
    });

    const createdContent = await this.contentRepository.create(content);

    // Emitir evento de criação
    await this.eventEmitter.emit("content.created", createdContent);

    return { content: createdContent };
  }
}

const createContentYupSchema = object({
  title: string()
    .min(3, "Título deve conter ao menos 3 caracteres")
    .required("Título é obrigatório"),
  templateId: string().required("ID do template é obrigatório"),
  authorId: string().required("ID do autor é obrigatório"),
});
