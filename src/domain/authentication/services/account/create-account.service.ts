import { Account } from '../../entities/account'
import { CreateAccountUseCase } from '../../use-cases/account/create-account.use-case'
import { inject, injectable } from 'tsyringe'

interface CreateAccountServiceRequest {
  name: string
  email: string
  password: string
  role: 'redator' | 'editor'
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
  }: CreateAccountServiceRequest): Promise<CreateAccountServiceResponse> {
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
