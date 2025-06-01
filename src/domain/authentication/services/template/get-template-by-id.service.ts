import { inject, injectable } from "tsyringe";
import { Template } from "../../entities/template";
import { GetTemplateByIdUseCase } from "../../use-cases/template/get-template-by-id.use-case";

interface GetTemplateByIdServiceRequest {
  id: string;
}

interface GetTemplateByIdServiceResponse {
  template: Template;
}

@injectable()
export class GetTemplateByIdService {
  constructor(
    @inject(GetTemplateByIdUseCase)
    private readonly getTemplateByIdUseCase: GetTemplateByIdUseCase
  ) {}

  async execute({
    id,
  }: GetTemplateByIdServiceRequest): Promise<GetTemplateByIdServiceResponse> {
    const { template } = await this.getTemplateByIdUseCase.execute({
      templateId: id,
    });

    return {
      template,
    };
  }
}
