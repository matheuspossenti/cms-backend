import { Account } from "../entities/account";
import { ClientSession } from "mongoose";

export interface IAccountRepository {
  getById(id: string): Promise<Account | null>;
  getByEmail(email: string): Promise<Account | null>;

  save(account: Account, session?: ClientSession | null): Promise<Account>;
  create(account: Account, session?: ClientSession | null): Promise<Account>;
}
