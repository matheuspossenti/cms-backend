import { object, string } from 'yup'
import { IAccountRepository } from '../../repositories/account-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { validate } from '@/core/utils/validate'
import { inject, injectable } from 'tsyringe'
import { UniqueEntityObjectId } from '@/core/entities/unique-entity-id'

interface IDeleteAccountByIdRequest {
  id: string
  deletedBy: UniqueEntityObjectId
}

@injectable()
export class DeleteAccountByIdUseCase {
  constructor(
    @inject('accountRepository')
    private readonly accountRepository: IAccountRepository
  ) {}

  async execute({ id, deletedBy }: IDeleteAccountByIdRequest): Promise<void> {
    await validate(getAccountYupSchema, { id })

    const account = await this.accountRepository.getById(id)

    if (!account) {
      throw new ResourceNotFoundError('Conta não encontrada.')
    }

    account.softDelete(deletedBy)

    await this.accountRepository.save(account)
  }
}

const getAccountYupSchema = object({
  id: string().objectId('Id inválido').required('Id é obrigatório'),
})
