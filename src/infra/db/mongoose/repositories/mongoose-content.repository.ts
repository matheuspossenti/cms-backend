import { injectable } from "tsyringe";
import { IContentRepository } from "@/domain/authentication/repositories/content-repository";
import { Content } from "@/domain/authentication/entities/content";
import { ContentsModel } from "../schemas/content.schema";
import { MongooseContentMapper } from "../mappers/mongoose-content.mapper";
import { ClientSession } from "mongoose";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error";

@injectable()
export class MongooseContentRepository implements IContentRepository {
  async create(
    content: Content,
    session?: ClientSession | null
  ): Promise<Content> {
    const contentData = MongooseContentMapper.toPersistence(content);

    const createdContent = await new ContentsModel(contentData).save({
      session,
    });

    return MongooseContentMapper.toDomain(createdContent);
  }

  async findById(id: string): Promise<Content | null> {
    const content = await ContentsModel.findOne({ _id: id });

    if (!content) return null;

    return MongooseContentMapper.toDomain(content);
  }

  async findByAuthorId(authorId: UniqueEntityObjectId): Promise<Content[]> {
    const contents = await ContentsModel.find({ authorId });

    return contents.map(MongooseContentMapper.toDomain);
  }

  async findByStatus(status: string): Promise<Content[]> {
    const contents = await ContentsModel.find({ status });

    return contents.map(MongooseContentMapper.toDomain);
  }

  async save(
    content: Content,
    session?: ClientSession | null
  ): Promise<Content> {
    const contentData = MongooseContentMapper.toPersistence(content);

    const updatedContent = await ContentsModel.findOneAndUpdate(
      { _id: content.id.toString() },
      { $set: contentData },
      { new: true, runValidators: true, session }
    );

    if (!updatedContent) {
      throw new ResourceNotFoundError("Content not found");
    }

    return MongooseContentMapper.toDomain(updatedContent);
  }

  async delete(id: string, session?: ClientSession | null): Promise<void> {
    const result = await ContentsModel.deleteOne({ _id: id }, { session });

    if (result.deletedCount === 0) {
      throw new ResourceNotFoundError("Content not found");
    }
  }
}
