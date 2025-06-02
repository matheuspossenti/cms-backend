import { container } from "tsyringe";
import { IAccountRepository } from "@/domain/authentication/repositories/account-repository";
import { MongooseAccountRepository } from "../db/mongoose/repositories/mongoose-account.repository";
import { ITemplateRepository } from "@/domain/authentication/repositories/template-repository";
import { MongooseTemplateRepository } from "../db/mongoose/repositories/mongoose-template.repository";
import { IContentRepository } from "@/domain/authentication/repositories/content-repository";
import { MongooseContentRepository } from "../db/mongoose/repositories/mongoose-content.repository";

container.registerSingleton<IAccountRepository>(
  "accountRepository",
  MongooseAccountRepository
);
container.registerSingleton<ITemplateRepository>(
  "templateRepository",
  MongooseTemplateRepository
);
container.registerSingleton<IContentRepository>(
  "contentRepository",
  MongooseContentRepository
);
