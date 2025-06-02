import { Content } from "@/domain/authentication/entities/content";

export class ContentPresenter {
  static toHttp(content: Content) {
    return {
      id: content.id.toString(),
      title: content.title,
      body: content.body,
      templateId: content.templateId,
      authorId: content.authorId,
      status: content.status,
      reviewerId: content.reviewerId,
      reviewNotes: content.reviewNotes,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt,
    };
  }
}
