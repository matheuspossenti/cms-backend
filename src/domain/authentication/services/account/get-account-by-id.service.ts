import { Account } from "../../entities/account";
import { ForbiddenError } from "@/core/errors/forbidden.error";
import { GetAccountByIdUseCase } from "../../use-cases/account/get-account-by-id.use-case";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";
import { inject, injectable } from "tsyringe";

interface GetAccountByIdServiceRequest {
  accountId: string;
}

interface GetAccountByIdServiceResponse {
  account: Account;
}

@injectable()
export class GetAccountByIdService {
  constructor(
    @inject(GetAccountByIdUseCase)
    private readonly getAccountByIdUseCase: GetAccountByIdUseCase
  ) {}

  async execute({
    accountId,
  }: GetAccountByIdServiceRequest): Promise<GetAccountByIdServiceResponse> {
    const { account } = await this.getAccountByIdUseCase.execute({
      id: accountId,
    });

    return { account };
  }
}
