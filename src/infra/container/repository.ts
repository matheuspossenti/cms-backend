import { container } from "tsyringe";
import { IAccountRepository } from "@/domain/authentication/repositories/account-repository";
import { MongooseAccountRepository } from "../db/mongoose/repositories/mongoose-account.repository";
import { ITemplateRepository } from "@/domain/authentication/repositories/template-repository";
import { MongooseTemplateRepository } from "../db/mongoose/repositories/mongoose-template.repository";

container.registerSingleton<IAccountRepository>(
  "accountRepository",
  MongooseAccountRepository
);
container.registerSingleton<ITemplateRepository>(
  "templateRepository",
  MongooseTemplateRepository
);
