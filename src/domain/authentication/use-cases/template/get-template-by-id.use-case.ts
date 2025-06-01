import { inject, injectable } from "tsyringe";
import { ITemplateRepository } from "../../repositories/template-repository";
import { Template } from "../../entities/template";
import { object, string } from "yup";
import { validate } from "@/core/utils/validate";

interface GetTemplateByIdRequest {
  templateId: string;
}

interface GetTemplateByIdResponse {
  template: Template;
}

@injectable()
export class GetTemplateByIdUseCase {
  constructor(
    @inject("templateRepository")
    private readonly templateRepository: ITemplateRepository
  ) {}

  async execute({
    templateId,
  }: GetTemplateByIdRequest): Promise<GetTemplateByIdResponse> {
    await validate(getTemplateByIdSchema, { templateId });

    const template = await this.templateRepository.findById(templateId);

    if (!template) {
      throw new Error(`Template with ID ${templateId} not found`);
    }

    return { template };
  }
}

const getTemplateByIdSchema = object({
  templateId: string().required("Template ID is required"),
});
