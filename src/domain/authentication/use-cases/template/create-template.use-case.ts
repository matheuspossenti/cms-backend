import { inject, injectable } from "tsyringe";
import { ITemplateRepository } from "../../repositories/template-repository";
import { Template } from "../../entities/template";
import { array, object, string } from "yup";
import { validate } from "@/core/utils/validate";

interface ICreateTemplateRequest {
  title: string;
  structure: string[];
}

interface ICreateTemplateResponse {
  template: Template;
}

@injectable()
export class CreateTemplateUseCase {
  constructor(
    @inject("templateRepository")
    private templateRepository: ITemplateRepository
  ) {}

  async execute({
    title,
    structure,
  }: ICreateTemplateRequest): Promise<ICreateTemplateResponse> {
    await validate(createTemplateYupSchema, { title, structure });

    const template = Template.create({
      title,
      structure,
    });

    const createdTemplate = await this.templateRepository.create(template);

    return { template: createdTemplate };
  }
}

const createTemplateYupSchema = object({
  title: string()
    .min(3, "Título deve conter ao menos 3 caracteres")
    .required("Título é obrigatório"),
  structure: array(string())
    .min(1, "Estrutura deve conter pelo menos um item")
    .required("Estrutura é obrigatória"),
});
