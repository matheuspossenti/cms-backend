import { Account } from '../../entities/account'
import { DeleteAccountByIdUseCase } from '../../use-cases/account/delete-account-by-id.use-case'
import { inject, injectable } from 'tsyringe'

interface DeleteAccountServiceRequest {
  tenantId: string
  accountId: string
  requester: Account
}

@injectable()
export class DeleteAccountService {
  constructor(
    @inject(DeleteAccountByIdUseCase)
    private readonly deleteAccountByIdUseCase: DeleteAccountByIdUseCase
  ) {}

  async execute({ accountId, tenantId, requester }: DeleteAccountServiceRequest): Promise<void> {
    // if (
    //   !requester.canAccessThisFeature({
    //     resource: 'manageAccounts',
    //     tenantId: new UniqueEntityObjectId(tenantId),
    //     environmentToCheck: AccountRoleEnvironmentType.TENANT,
    //   })
    // ) {
    //   throw new ForbiddenError('Você não tem permissão para acessar essa funcionalidade')
    // }

    await this.deleteAccountByIdUseCase.execute({ id: accountId, deletedBy: requester.id })
  }
}
