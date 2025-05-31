import { Account } from '../../entities/account'
import { ForbiddenError } from '@/core/errors/forbidden.error'
import { GetAccountByIdUseCase } from '../../use-cases/account/get-account-by-id.use-case'
import { UniqueEntityObjectId } from '@/core/entities/unique-entity-id'
import { inject, injectable } from 'tsyringe'

interface GetAccountByIdServiceRequest {
  accountId: string
  tenantId: string
  requester: Account
}

interface GetAccountByIdServiceResponse {
  account: Account
}

@injectable()
export class GetAccountByIdService {
  constructor(
    @inject(GetAccountByIdUseCase)
    private readonly getAccountByIdUseCase: GetAccountByIdUseCase
  ) {}

  async execute({
    accountId,
    tenantId,
    requester,
  }: GetAccountByIdServiceRequest): Promise<GetAccountByIdServiceResponse> {
    // if (
    //   !requester.canAccessThisFeature({
    //     resource: 'getAccounts',
    //     tenantId: new UniqueEntityObjectId(tenantId),
    //     environmentToCheck: AccountRoleEnvironmentType.TENANT,
    //   })
    // ) {
    //   throw new ForbiddenError('Você não tem permissão para acessar essa funcionalidade')
    // }

    const { account } = await this.getAccountByIdUseCase.execute({ id: accountId })

    return { account }
  }
}
