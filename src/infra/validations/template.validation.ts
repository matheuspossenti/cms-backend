import { array, object, string } from "yup";

export class TemplateValidation {
  static create() {
    return object({
      body: object({
        title: string().required("Título é obrigatório"),
        structure: array().required("Estrutura é obrigatória"),
      }),
    });
  }

  static getById() {
    return object({
      params: object({
        id: string().required("ID do template é obrigatório"),
      }),
    });
  }
}
