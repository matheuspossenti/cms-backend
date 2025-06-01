import { Template } from "@/domain/authentication/entities/template";

export class TemplatePresenter {
  static toHttp(template: Template) {
    return {
      id: template.id,
      title: template.title,
      structure: template.structure,
      createdAt: template.createdAt.toISOString(),
      updatedAt: template.updatedAt.toISOString(),
    };
  }
}
