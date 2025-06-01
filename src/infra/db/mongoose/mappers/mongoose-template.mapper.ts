import { Template } from "@/domain/authentication/entities/template";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";
import { Types } from "mongoose";
import { ITemplate } from "../schemas/template.schema";

export class MongooseTemplateMapper {
  static toDomain(raw: ITemplate): Template {
    return Template.create(
      {
        title: raw.title,
        structure: raw.structure,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityObjectId(raw._id.toString())
    );
  }

  static toPersistence(template: Template): ITemplate {
    return {
      _id: new Types.ObjectId(template.id.toValue()),
      title: template.title,
      structure: template.structure,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
    };
  }
}
