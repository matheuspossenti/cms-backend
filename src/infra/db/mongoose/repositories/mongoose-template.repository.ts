import { Template } from "@/domain/authentication/entities/template";
import { ITemplateRepository } from "@/domain/authentication/repositories/template-repository";
import { ClientSession } from "mongoose";
import { MongooseTemplateMapper } from "../mappers/mongoose-template.mapper";
import { TemplatesModel } from "../schemas/template.schema";
import { injectable } from "tsyringe";

@injectable()
export class MongooseTemplateRepository implements ITemplateRepository {
  async create(
    template: Template,
    session?: ClientSession | null
  ): Promise<Template> {
    const templateData = MongooseTemplateMapper.toPersistence(template);

    const createdTemplate = await new TemplatesModel(templateData).save({
      session,
    });

    return MongooseTemplateMapper.toDomain(createdTemplate);
  }

  async findById(id: string): Promise<Template | null> {
    const template = await TemplatesModel.findOne({ _id: id });

    if (!template) return null;

    return MongooseTemplateMapper.toDomain(template);
  }

  async findAll(): Promise<Template[]> {
    const templates = await TemplatesModel.find();

    return templates.map(MongooseTemplateMapper.toDomain);
  }
}
