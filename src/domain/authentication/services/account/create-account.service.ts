import { Account } from '../../entities/account'
import { CreateAccountUseCase } from '../../use-cases/account/create-account.use-case'
import { inject, injectable } from 'tsyringe'

interface CreateAccountServiceRequest {
  name: string
  email: string
  password: string
  role: 'redator' | 'editor'
  requester: Account
}

interface CreateAccountServiceResponse {
  account: Account
}

@injectable()
export class CreateAccountService {
  constructor(
    @inject(CreateAccountUseCase)
    private readonly createAccountUseCase: CreateAccountUseCase,
  ) {}

  async execute({
    email,
    name,
    password,
    role,
    requester,
  }: CreateAccountServiceRequest): Promise<CreateAccountServiceResponse> {
    // if (
    //   !requester.canAccessThisFeature({
    //     resource: 'manageAccounts',
    //     tenantId: new UniqueEntityObjectId(tenantId),
    //     environmentToCheck: AccountRoleEnvironmentType.TENANT,
    //   })
    // ) {
    //   throw new ForbiddenError('Você não tem permissão para acessar essa funcionalidade')
    // }

      const { account } = await this.createAccountUseCase.execute({
        email,
        name,
        password,
        role
      })

    return {
      account,
    }
  }
}
