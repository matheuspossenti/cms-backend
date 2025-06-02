import { ITimestamp } from "@/core/types/timestamp";
import { model, Model, models, Schema, Types } from "mongoose";

export interface IContent extends ITimestamp {
  _id: Types.ObjectId;
  title: string;
  body: Record<string, string>;
  templateId: Types.ObjectId;
  authorId: Types.ObjectId;
  status: string;
  reviewerId?: Types.ObjectId;
  reviewNotes?: string;
}

export type IContentDocument = Document & IContent;
type IContentModel = Model<IContentDocument>;

const contentSchema = new Schema<IContentDocument>(
  {
    title: { type: String, required: true },
    body: { type: Schema.Types.Mixed, required: true },
    templateId: { type: Schema.Types.ObjectId, ref: "templates", required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "accounts", required: true },
    status: { 
      type: String, 
      enum: ["draft", "review", "approved", "rejected", "published"],
      default: "draft" 
    },
    reviewerId: { type: Schema.Types.ObjectId, ref: "accounts" },
    reviewNotes: { type: String },
  },
  {
    id: true,
    timestamps: true,
  }
);

// Habilitar virtuais no JSON e objetos retornados
contentSchema.set("toJSON", { virtuals: true });
contentSchema.set("toObject", { virtuals: true });

// Adicionar virtuals para template e author
contentSchema.virtual("template", {
  ref: "templates",
  localField: "templateId",
  foreignField: "_id",
  justOne: true,
});

contentSchema.virtual("author", {
  ref: "accounts",
  localField: "authorId",
  foreignField: "_id",
  justOne: true,
});

contentSchema.virtual("reviewer", {
  ref: "accounts",
  localField: "reviewerId",
  foreignField: "_id",
  justOne: true,
});

export const ContentsModel =
  (models.contents as IContentModel) ||
  model<IContentDocument, IContentModel>("contents", contentSchema);