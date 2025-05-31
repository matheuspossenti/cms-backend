import { AuthenticateAccountUseCase } from '../../use-cases/auth/authenticate-account.use-case'
import { Account } from '../../entities/account'
import { GenerateTokensUseCase } from '../../use-cases/auth/generate-tokens.use-case'
import { inject, injectable } from 'tsyringe'

interface ILoginAccountServiceRequest {
  email: string
  password: string
}

interface ILoginAccountServiceResponse {
  account: Account
  accessToken: string
  refreshToken: string
}

@injectable()
export class LoginAccountService {
  constructor(
    @inject(AuthenticateAccountUseCase)
    private readonly authenticateAccountUseCase: AuthenticateAccountUseCase,
    @inject(GenerateTokensUseCase)
    private readonly generateTokensUseCase: GenerateTokensUseCase
  ) {}

  async execute({ email, password }: ILoginAccountServiceRequest): Promise<ILoginAccountServiceResponse> {
    const { account } = await this.authenticateAccountUseCase.execute({ email, password })

    const { accessToken, refreshToken } = await this.generateTokensUseCase.execute({
      accountId: account.id.toString(),
    })

    return {
      account,
      accessToken,
      refreshToken,
    }
  }
}
