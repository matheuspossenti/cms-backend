import { inject, injectable } from "tsyringe";
import { IContentRepository } from "../../repositories/content-repository";
import { Content } from "../../entities/content";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error";
import { PlagiarismCheckHandler } from "../../approval-chain/plagiarism-check-handler";
import { ContentQualityHandler } from "../../approval-chain/content-quality-handler";
import { SeoCheckHandler } from "../../approval-chain/seo-check-handler";
import { object, string } from "yup";
import { validate } from "@/core/utils/validate";

interface IRunApprovalChainRequest {
  contentId: string;
}

interface IRunApprovalChainResponse {
  content: Content;
}

@injectable()
export class RunApprovalChainUseCase {
  constructor(
    @inject("contentRepository")
    private contentRepository: IContentRepository,
    @inject(PlagiarismCheckHandler)
    private plagiarismHandler: PlagiarismCheckHandler,
    @inject(ContentQualityHandler)
    private qualityHandler: ContentQualityHandler,
    @inject(SeoCheckHandler)
    private seoHandler: SeoCheckHandler
  ) {}

  async execute({
    contentId,
  }: IRunApprovalChainRequest): Promise<IRunApprovalChainResponse> {
    await validate(runApprovalChainYupSchema, { contentId });
    
    const content = await this.contentRepository.findById(contentId);

    if (!content) {
      throw new ResourceNotFoundError(`Content with ID ${contentId} not found`);
    }

    // Configurar a cadeia de responsabilidade
    this.plagiarismHandler
      .setNext(this.qualityHandler)
      .setNext(this.seoHandler);

    // Executar a cadeia de verificações
    await this.plagiarismHandler.handle(content);

    return { content };
  }
}

const runApprovalChainYupSchema = object({
  contentId: string().required("ID do conteúdo é obrigatório"),
});

