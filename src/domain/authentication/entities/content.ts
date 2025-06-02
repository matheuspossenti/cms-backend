import { BaseEntity } from "@/core/entities/base-entity";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";
import { ContentStatus } from "@/core/enum/content-status";
import { IAuditColumns } from "@/core/types/audit-columns";
import { Optional } from "@/core/types/optional";

export interface IContentProps extends IAuditColumns {
  title: string;
  body: Record<string, string>; // Estrutura dinâmica baseada no template
  templateId: string;
  authorId: UniqueEntityObjectId;
  status: ContentStatus;
  reviewerId?: string;
  reviewNotes?: string;
}

export class Content extends BaseEntity<IContentProps> {
  private touch() {
    this.props.updatedAt = new Date();
  }

  get title() {
    return this.props.title;
  }

  get body() {
    return this.props.body;
  }

  get templateId() {
    return this.props.templateId;
  }

  get authorId() {
    return this.props.authorId;
  }

  get status() {
    return this.props.status;
  }

  get reviewerId() {
    return this.props.reviewerId;
  }

  get reviewNotes() {
    return this.props.reviewNotes;
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

  updateBody(body: Record<string, string>) {
    this.props.body = body;
    this.touch();
  }

  submitForReview() {
    if (this.props.status !== "draft") {
      throw new Error("Only draft content can be submitted for review");
    }
    this.props.status = "review";
    this.touch();
  }

  approve(reviewerId: string, notes?: string) {
    if (this.props.status !== "review") {
      throw new Error("Only content under review can be approved");
    }
    this.props.status = "approved";
    this.props.reviewerId = reviewerId;
    this.props.reviewNotes = notes;
    this.touch();
  }

  reject(reviewerId: string, notes: string) {
    if (this.props.status !== "review") {
      throw new Error("Only content under review can be rejected");
    }
    this.props.status = "rejected";
    this.props.reviewerId = reviewerId;
    this.props.reviewNotes = notes;
    this.touch();
  }

  publish() {
    if (this.props.status !== "approved") {
      throw new Error("Only approved content can be published");
    }
    this.props.status = "published";
    this.touch();
  }

  returnToDraft() {
    if (!["review", "rejected"].includes(this.props.status)) {
      throw new Error(
        "Only content under review or rejected can be returned to draft"
      );
    }
    this.props.status = "draft";
    this.touch();
  }

  clone(): Content {
    return new Content({
      ...this.props,
      title: `${this.title} (Copy)`,
      status: "draft",
      reviewerId: undefined,
      reviewNotes: undefined,
    });
  }

  static create(
    props: Optional<
      IContentProps,
      "createdAt" | "updatedAt" | "status" | "reviewerId" | "reviewNotes"
    >,
    id?: UniqueEntityObjectId
  ): Content {
    const content = new Content(
      {
        ...props,
        status: props.status ?? "draft",
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        reviewerId: props.reviewerId,
        reviewNotes: props.reviewNotes,
      },
      id
    );
    return content;
  }
}
