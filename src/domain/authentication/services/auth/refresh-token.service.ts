import { UnauthorizedError } from '@/core/errors/unauthorized.error'
import { Encrypter } from '../../cryptography/encrypter'
import { GetAccountByIdUseCase } from '../../use-cases/account/get-account-by-id.use-case'
import { GenerateTokensUseCase } from '../../use-cases/auth/generate-tokens.use-case'
import { inject, injectable } from 'tsyringe'

interface IRefreshTokenServiceRequest {
  refreshToken: string
}

interface IRefreshTokenServiceResponse {
  accessToken: string
  refreshToken: string
}

@injectable()
export class RefreshTokenService {
  constructor(
    @inject('encrypter')
    private readonly encrypter: Encrypter,
    @inject(GetAccountByIdUseCase)
    private readonly getAccountByIdUseCase: GetAccountByIdUseCase,
    @inject(GenerateTokensUseCase)
    private readonly generateTokensUseCase: GenerateTokensUseCase
  ) {}

  async execute({ refreshToken }: IRefreshTokenServiceRequest): Promise<IRefreshTokenServiceResponse> {
    const token = await this.encrypter.decrypt(refreshToken)

    if (!token) {
      throw new UnauthorizedError('Token inválido')
    }

    const { sub } = token

    const { account } = await this.getAccountByIdUseCase.execute({
      id: sub,
    })

    const { accessToken, refreshToken: newRefresh } = await this.generateTokensUseCase.execute({
      accountId: account.id.toString(),
    })

    return {
      accessToken,
      refreshToken: newRefresh,
    }
  }
}
