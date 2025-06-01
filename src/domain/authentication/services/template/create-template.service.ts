import { inject, injectable } from "tsyringe";
import { CreateTemplateUseCase } from "../../use-cases/template/create-template.use-case";
import { Template } from "../../entities/template";

interface CreateTemplateServiceRequest {
  title: string;
  structure: string[];
}

interface CreateTemplateServiceResponse {
  template: Template;
}

@injectable()
export class CreateTemplateService {
  constructor(
    @inject(CreateTemplateUseCase)
    private readonly createTemplateUseCase: CreateTemplateUseCase
  ) {}

  async execute({
    title,
    structure,
  }: CreateTemplateServiceRequest): Promise<CreateTemplateServiceResponse> {
    const { template } = await this.createTemplateUseCase.execute({
      title,
      structure,
    });

    return {
      template,
    };
  }
}
