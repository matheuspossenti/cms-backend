import { ITimestamp } from "@/core/types/timestamp";
import { model, Model, models, Schema, Types } from "mongoose";

export interface ITemplate extends ITimestamp {
  _id: Types.ObjectId;
  title: string;
  structure: string[];
}

export type ITemplateDocument = Document & ITemplate;
type ITemplateModel = Model<ITemplateDocument>;

const templateSchema = new Schema<ITemplateDocument>(
  {
    title: { type: String, required: true },
    structure: { type: [String], required: true },
  },
  {
    id: true,
    timestamps: true,
  }
);

export const TemplatesModel =
  (models.templates as ITemplateModel) ||
  model<ITemplateDocument, ITemplateModel>("templates", templateSchema);
