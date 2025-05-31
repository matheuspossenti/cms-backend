import { UnauthorizedError } from '@/core/errors/unauthorized.error'
import { IAccountRepository } from '../../repositories/account-repository'
import { object, string } from 'yup'
import { validate } from '@/core/utils/validate'
import { Account } from '../../entities/account'
import { inject, injectable } from 'tsyringe'

interface IAuthenticateAccountUseCaseRequest {
  email: string
  password: string
}

interface IAuthenticateAccountUseCaseResponse {
  account: Account
}

@injectable()
export class AuthenticateAccountUseCase {
  constructor(
    @inject('accountRepository')
    private accountRepository: IAccountRepository
  ) {}

  async execute({ email, password }: IAuthenticateAccountUseCaseRequest): Promise<IAuthenticateAccountUseCaseResponse> {
    await validate(
      authenticateAccountYupSchema,
      { email, password },
      new UnauthorizedError('E-mail ou senha inválidos')
    )

    const account = await this.accountRepository.getByEmail(email)

    if (!account) {
      throw new UnauthorizedError('E-mail ou senha inválidos')
    }

    const isPasswordValid = await account.password.comparePasswords(password)

    if (!isPasswordValid) {
      throw new UnauthorizedError('E-mail ou senha inválidos')
    }

    return {
      account,
    }
  }
}

const authenticateAccountYupSchema = object({
  email: string().email('Deve ser um email válido').required('E-mail é obrigatório'),
  password: string().required('Senha é obrigatória'),
})
