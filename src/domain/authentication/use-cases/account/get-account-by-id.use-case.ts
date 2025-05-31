import { object, string } from 'yup'
import { IAccountRepository } from '../../repositories/account-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { validate } from '@/core/utils/validate'
import { Account } from '../../entities/account'
import { inject, injectable } from 'tsyringe'

interface IGetAccountByIdRequest {
  id: string
}

interface IGetAccountByIdResponse {
  account: Account
}

@injectable()
export class GetAccountByIdUseCase {
  constructor(
    @inject('accountRepository')
    private accountRepository: IAccountRepository
  ) {}

  async execute({ id }: IGetAccountByIdRequest): Promise<IGetAccountByIdResponse> {
    await validate(getAccountYupSchema, { id })

    const account = await this.accountRepository.getById(id)

    if (!account) {
      throw new ResourceNotFoundError('Conta não encontrada.')
    }

    return { account }
  }
}

const getAccountYupSchema = object({
  id: string().required('Id é obrigatório'),
})
