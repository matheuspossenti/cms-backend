import { AccountsModel } from "../schemas/accounts.schema";
import { Account } from "@/domain/authentication/entities/account";
import { IAccountRepository } from "@/domain/authentication/repositories/account-repository";
import { PaginationParams, PaginationResponse } from "@/core/types/pagination";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error";
import { ClientSession } from "mongoose";
import { MongooseAccountMapper } from "../mappers/mongoose-account.mapper";

export class MongooseAccountRepository implements IAccountRepository {
  async getByEmail(email: string): Promise<Account | null> {
    const account = await AccountsModel.findOne({
      email: email.toLowerCase(),
    });

    if (!account) return null;

    return MongooseAccountMapper.toDomain(account);
  }

  async getById(id: string): Promise<Account | null> {
    const account = await AccountsModel.findOne({
      _id: id,
    });

    if (!account) return null;

    return MongooseAccountMapper.toDomain(account);
  }

  async create(
    account: Account,
    session?: ClientSession | null
  ): Promise<Account> {
    const accountData = MongooseAccountMapper.toPersistence(account);

    const createdAccount = await new AccountsModel(accountData).save({
      session,
    });

    return MongooseAccountMapper.toDomain(createdAccount);
  }

  async save(
    account: Account,
    session?: ClientSession | null
  ): Promise<Account> {
    const accountData = MongooseAccountMapper.toPersistence(account);

    const updatedAccount = await AccountsModel.findOneAndUpdate(
      { _id: account.id.toString() },
      { $set: accountData },
      { new: true, runValidators: true, session }
    );

    if (!updatedAccount) {
      throw new ResourceNotFoundError("Account not found");
    }

    return MongooseAccountMapper.toDomain(updatedAccount);
  }
}
