import { Account } from "@/domain/authentication/entities/account";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";
import { Password } from "@/domain/authentication/entities/value-objects/password";
import { Types } from "mongoose";
import { IAccount } from "../schemas/accounts.schema";

export class MongooseAccountMapper {
  static toDomain(raw: IAccount): Account {
    return Account.create(
      {
        email: raw.email,
        name: raw.name,
        password: Password.loadPassword(raw.password),
        role: raw.role,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityObjectId(raw._id.toString())
    );
  }

  static toPersistence(account: Account): IAccount {
    return {
      _id: new Types.ObjectId(account.id.toValue()),
      email: account.email,
      name: account.name,
      role: account.role,
      password: account.password.hash,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  }
}
