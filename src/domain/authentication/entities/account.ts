import { BaseEntity } from "@/core/entities/base-entity";
import { Password } from "./value-objects/password";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { IAuditWithSoftColumns } from "@/core/types/audit-columns";

export interface IAccountProps extends IAuditWithSoftColumns {
  name: string;
  email: string;
  role: "redator" | "editor";
  password: Password;
}

export class Account extends BaseEntity<IAccountProps> {
  private touch() {
    this.props.updatedAt = new Date();
  }

  get role() {
    return this.props.role;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deleted() {
    return this.props.deleted;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }

  get deletedBy() {
    return this.props.deletedBy;
  }

  changeEmail(email: string) {
    this.props.email = email;
    this.touch();
  }

  changeName(name: string) {
    this.props.name = name;
    this.touch();
  }

  changeRole(role: "editor" | "redator") {
    this.props.role = role;
    this.touch();
  }

  static create(
    props: Optional<
      IAccountProps,
      "createdAt" | "updatedAt" | "deleted" | "deletedAt" | "deletedBy"
    >,
    id?: UniqueEntityObjectId
  ): Account {
    const account = new Account(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        deleted: props.deleted ?? false,
        deletedAt: props.deletedAt ?? null,
        deletedBy: props.deletedBy ?? null,
      },
      id
    );

    return account;
  }

  public softDelete(deletedBy: UniqueEntityObjectId) {
    this.props.deleted = true;
    this.props.deletedBy = deletedBy;
    this.props.deletedAt = new Date();
  }
}
