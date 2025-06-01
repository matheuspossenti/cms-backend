import { UnauthorizedError } from '@/core/errors/unauthorized.error'
import { Encrypter } from '../../cryptography/encrypter'
import { GetAccountByIdUseCase } from '../../use-cases/account/get-account-by-id.use-case'
import { Account } from '../../entities/account'
import { inject, injectable } from 'tsyringe'
import { logger } from '@/core/logger'

interface IVerifyAccessTokenServiceRequest {
  accessToken: string
}

interface IVerifyAccessTokenServiceResponse {
  account: Account
}

@injectable()
export class VerifyAccessTokenService {
  constructor(
    @inject('encrypter')
    private readonly encrypter: Encrypter,
    @inject(GetAccountByIdUseCase)
    private readonly getAccountByIdUseCase: GetAccountByIdUseCase
  ) {}

  async execute({ accessToken }: IVerifyAccessTokenServiceRequest): Promise<IVerifyAccessTokenServiceResponse> {
    try {
      const token = await this.encrypter.decrypt(accessToken)

      if (!token) {
        throw new UnauthorizedError('Token inválido')
      }

      const { sub } = token

      const { account } = await this.getAccountByIdUseCase.execute({
        id: sub,
      })

      return {
        account,
      }
    } catch (error) {
      logger.error(error)
      throw new UnauthorizedError('Token inválido')
    }
  }
}
