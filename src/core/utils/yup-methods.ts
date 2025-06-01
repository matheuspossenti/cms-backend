import * as yup from "yup";
import mongoose from "mongoose";

declare module "yup" {
  interface StringSchema {
    objectId(message?: string): StringSchema;
  }
}

yup.addMethod(
  yup.string,
  "objectId",
  function objectId(message = "Id inválido") {
    return this.test("objectId", message, function (value: any) {
      return mongoose.Types.ObjectId.isValid(value);
    });
  }
);
