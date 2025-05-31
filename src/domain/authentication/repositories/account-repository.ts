import { PaginationParams, PaginationResponse } from '@/core/types/pagination'
import { Account } from '../entities/account'
import { ClientSession } from 'mongoose'

export interface IAccountRepository {
  getById(id: string): Promise<Account | null>
  getByEmail(email: string): Promise<Account | null>

  findManyAccounts(paginationParams: PaginationParams<{ tenantId: string }>): Promise<PaginationResponse<Account>>

  save(account: Account, session?: ClientSession | null): Promise<Account>
  create(account: Account, session?: ClientSession | null): Promise<Account>
}
