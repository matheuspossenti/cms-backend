import { container } from "tsyringe";
import { IAccountRepository } from "@/domain/authentication/repositories/account-repository";
import { MongooseAccountRepository } from "../db/mongoose/repositories/mongoose-account.repository";

container.registerSingleton<IAccountRepository>(
  "accountRepository",
  MongooseAccountRepository
);
