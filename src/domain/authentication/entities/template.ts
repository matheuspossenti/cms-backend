import { BaseEntity } from "@/core/entities/base-entity";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";
import { IAuditColumns } from "@/core/types/audit-columns";
import { Optional } from "@/core/types/optional";

export interface ITemplateProps extends IAuditColumns {
  title: string;
  structure: string[]; // Ex: ["título", "lead", "corpo"]
}

export class Template extends BaseEntity<ITemplateProps> {
  private touch() {
    this.props.updatedAt = new Date();
  }

  get title() {
    return this.props.title;
  }

  get structure() {
    return this.props.structure;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  changeTitle(title: string) {
    this.props.title = title;
    this.touch();
  }

  changeStructure(structure: string[]) {
    this.props.structure = structure;
    this.touch();
  }

  clone(): Template {
    return new Template({
      title: this.title,
      structure: [...this.structure],
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  static create(
    props: Optional<ITemplateProps, "createdAt" | "updatedAt">,
    id?: UniqueEntityObjectId
  ): Template {
    const template = new Template(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id
    );

    return template;
  }
}
