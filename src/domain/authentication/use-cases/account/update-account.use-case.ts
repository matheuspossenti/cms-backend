import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Account } from '../../entities/account'
import { IAccountRepository } from '../../repositories/account-repository'
import { DuplicateResourceError } from '@/core/errors/duplicate-resource.error'
import { object, string } from 'yup'
import { validate } from '@/core/utils/validate'
import { inject, injectable } from 'tsyringe'

interface IUpdateAccountRequest {
  name?: string
  email?: string
  id: string
  role?: 'editor' | 'redator'
}

interface IUpdateAccountResponse {
  account: Account
}

@injectable()
export class UpdateAccountUseCase {
  constructor(
    @inject('accountRepository')
    private readonly accountRepository: IAccountRepository
  ) {}

  async execute({
    id,
    email,
    name,
    role,
  }: IUpdateAccountRequest): Promise<IUpdateAccountResponse> {
    await validate(updateAccountYupSchema, { id, email, name })

    const account = await this.accountRepository.getById(id)

    if (!account) {
      throw new ResourceNotFoundError('Conta não encontrada.')
    }

    if (email) {
      const existingAccount = await this.accountRepository.getByEmail(email)

      if (existingAccount && existingAccount.id.toString() !== id) {
        throw new DuplicateResourceError('Já existe uma conta com este e-mail.')
      }

      account.changeEmail(email)
    }

    if (name) account.changeName(name)

    if (role) account.changeRole(role)

    await this.accountRepository.save(account)

    return {
      account,
    }
  }
}

const updateAccountYupSchema = object({
  id: string().objectId('Id inválido').required('Id é obrigatório'),
  name: string().min(3, 'Nome deve conter ao menos 3 caracteres').optional(),
  email: string().email('Deve ser um email válido').optional(),
})
