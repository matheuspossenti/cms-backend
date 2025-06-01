import { ClientSession } from "mongoose";
import { Template } from "../entities/template";

export interface ITemplateRepository {
  create(template: Template, session?: ClientSession | null): Promise<Template>;
  findById(id: string): Promise<Template | null>;
  findAll(): Promise<Template[]>;
}
