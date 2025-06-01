import { ITimestamp } from "@/core/types/timestamp";
import { Model, model, models, Schema, Types } from "mongoose";

export interface IAccount extends ITimestamp {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "editor" | "redator";
}

// Estende com SoftDeleteDocument para adicionar os métodos do plugin
export type IAccountDocument = Document & IAccount;
type IAccountModel = Model<IAccountDocument>;

const accountsSchema = new Schema<IAccountDocument>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["editor", "redator"] },
  },
  {
    id: true,
    timestamps: true,
  }
);

// Criando um virtual chamado "tenant"

accountsSchema.virtual("tenant", {
  ref: "tenants",
  foreignField: "_id",
  localField: "tenantId",
  justOne: true,
});

// Habilitar virtuais no JSON e objetos retornados
accountsSchema.set("toJSON", { virtuals: true });
accountsSchema.set("toObject", { virtuals: true });

export const AccountsModel =
  (models.accounts as IAccountModel) ||
  model<IAccountDocument, IAccountModel>("accounts", accountsSchema);
