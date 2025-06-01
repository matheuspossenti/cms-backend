import { Account } from '../../entities/account'
import { DeleteAccountByIdUseCase } from '../../use-cases/account/delete-account-by-id.use-case'
import { inject, injectable } from 'tsyringe'

interface DeleteAccountServiceRequest {
  accountId: string
  requester: Account
}

@injectable()
export class DeleteAccountService {
  constructor(
    @inject(DeleteAccountByIdUseCase)
    private readonly deleteAccountByIdUseCase: DeleteAccountByIdUseCase
  ) {}

  async execute({ accountId, requester }: DeleteAccountServiceRequest): Promise<void> {
    await this.deleteAccountByIdUseCase.execute({ id: accountId, deletedBy: requester.id })
  }
}
