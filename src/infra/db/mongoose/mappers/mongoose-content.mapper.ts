import { Content } from "@/domain/authentication/entities/content";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";
import { IContent, IContentDocument } from "../schemas/content.schema";
import { Types } from "mongoose";
import { ContentStatus } from "@/core/enum/content-status";

export class MongooseContentMapper {
  static toDomain(raw: IContentDocument): Content {
    return Content.create(
      {
        title: raw.title,
        body: raw.body,
        templateId: raw.templateId.toString(),
        authorId: new UniqueEntityObjectId(raw.authorId.toString()),
        status: raw.status as ContentStatus,
        reviewerId: raw.reviewerId ? raw.reviewerId.toString() : undefined,
        reviewNotes: raw.reviewNotes,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityObjectId(raw._id.toString())
    );
  }

  static toPersistence(content: Content): IContent {
    return {
      _id: new Types.ObjectId(content.id.toValue()),
      title: content.title,
      body: content.body,
      templateId: new Types.ObjectId(content.templateId),
      authorId: new Types.ObjectId(content.authorId.toValue()),
      status: content.status,
      reviewerId: content.reviewerId
        ? new Types.ObjectId(content.reviewerId)
        : undefined,
      reviewNotes: content.reviewNotes,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt,
    };
  }
}
