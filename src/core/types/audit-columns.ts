import { UniqueEntityObjectId } from '../entities/unique-entity-id'

export interface IAuditColumns {
  createdAt: Date
  updatedAt: Date
}

export interface IAuditWithSoftColumns extends IAuditColumns {
  deleted: boolean
  deletedAt: Date | null
  deletedBy: UniqueEntityObjectId | null
}
