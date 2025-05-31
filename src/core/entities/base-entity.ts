import { UniqueEntityObjectId } from './unique-entity-id'

export abstract class BaseEntity<Props> {
  private _id: UniqueEntityObjectId
  protected props: Props

  get id() {
    return this._id
  }

  public equals(entity: BaseEntity<unknown>) {
    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }

  protected constructor(props: Props, id?: UniqueEntityObjectId) {
    this.props = props
    this._id = id ?? new UniqueEntityObjectId(id)
  }
}
