import { Content } from "../entities/content";
import { ClientSession } from "mongoose";

export interface IContentRepository {
  create(content: Content, session?: ClientSession | null): Promise<Content>;
  findById(id: string): Promise<Content | null>;
  findByAuthorId(authorId: UniqueEntityObjectId): Promise<Content[]>;
  findByStatus(status: string): Promise<Content[]>;
  save(content: Content, session?: ClientSession | null): Promise<Content>;
  delete(id: string, session?: ClientSession | null): Promise<void>;
}
