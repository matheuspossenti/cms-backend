import { Account } from "@/domain/authentication/entities/account";

export class AccountPresenter {
  static toHttp(account: Account) {
    return {
      id: account.id.toString(),
      email: account.email,
      name: account.name,
      role: account.role,
      createdAt: account.createdAt.toISOString(),
      updatedAt: account.updatedAt.toISOString(),
    };
  }
}
