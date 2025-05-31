import { Types } from 'mongoose'

export class UniqueEntityId {
  private value: string | undefined

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  equals(uuid: UniqueEntityId) {
    return uuid.toValue() === this.value
  }

  constructor(value?: string) {
    this.value = value
  }
}

export class UniqueEntityObjectId {
  private value: string

  toString() {
    return this.value.toString()
  }

  toValue() {
    return this.value.toString()
  }

  equals(id: UniqueEntityObjectId) {
    return id.toValue() === this.value.toString()
  }

  constructor(value?: string) {
    this.value = value ?? new Types.ObjectId().toString()
  }
}
