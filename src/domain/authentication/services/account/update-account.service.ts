import { Account } from '../../entities/account'
import { ForbiddenError } from '@/core/errors/forbidden.error'
import { UniqueEntityObjectId } from '@/core/entities/unique-entity-id'
import { inject, injectable } from 'tsyringe'
import { UpdateAccountUseCase } from '../../use-cases/account/update-account.use-case'

interface UpdateAccountServiceRequest {
  id: string
  name?: string
  email?: string
  role?: 'editor' | 'redator'
  requester: Account
}

interface UpdateAccountServiceResponse {
  account: Account
}

@injectable()
export class UpdateAccountService {
  constructor(
    @inject(UpdateAccountUseCase)
    private readonly updateAccountUseCase: UpdateAccountUseCase
  ) {}

  async execute({
    id,
    name,
    email,
    role,
    requester,
  }: UpdateAccountServiceRequest): Promise<UpdateAccountServiceResponse> {
    // if (
    //   !requester.canAccessThisFeature({
    //     resource: 'manageAccounts',
    //     tenantId: new UniqueEntityObjectId(tenantId),
    //     environmentToCheck: AccountRoleEnvironmentType.TENANT,
    //   })
    // ) {
    //   throw new ForbiddenError('Você não tem permissão para acessar essa funcionalidade')
    // }

    const { account } = await this.updateAccountUseCase.execute({
      id,
      email,
      name,
      role,
    })

    return { account }
  }
}
