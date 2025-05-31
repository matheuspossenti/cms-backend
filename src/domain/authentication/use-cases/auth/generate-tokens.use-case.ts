import { TokenType } from '@/core/enum/token-type'
import { Encrypter } from '../../cryptography/encrypter'
import { inject, injectable } from 'tsyringe'

export interface IGenerateTokensUseCaseRequest {
  accountId: string
}

export interface IGenerateTokensUseCaseResponse {
  accessToken: string
  refreshToken: string
}

@injectable()
export class GenerateTokensUseCase {
  constructor(
    @inject('encrypter')
    private readonly encrypter: Encrypter
  ) {}

  async execute({ accountId }: IGenerateTokensUseCaseRequest): Promise<IGenerateTokensUseCaseResponse> {
    const accessToken = this.encrypter.encrypt(accountId, TokenType.ACCESS_TOKEN)
    const refreshToken = this.encrypter.encrypt(accountId, TokenType.REFRESH_TOKEN)

    return {
      accessToken,
      refreshToken,
    }
  }
}
