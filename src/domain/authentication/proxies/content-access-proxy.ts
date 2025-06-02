import { inject, injectable } from "tsyringe";
import { IContentRepository } from "../repositories/content-repository";
import { ForbiddenError } from "@/core/errors/forbidden.error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";

@injectable()
export class ContentAccessProxy {
  constructor(
    @inject("contentRepository")
    private contentRepository: IContentRepository
  ) {}

  async canEdit(
    contentId: string,
    userId: UniqueEntityObjectId
  ): Promise<boolean> {
    const content = await this.contentRepository.findById(contentId);

    if (!content) {
      throw new ResourceNotFoundError(`Content with ID ${contentId} not found`);
    }

    // Apenas o autor pode editar o conteúdo
    if (content.authorId !== userId) {
      throw new ForbiddenError("Only the author can edit this content");
    }

    // Apenas conteúdos em rascunho podem ser editados
    if (content.status !== "draft") {
      throw new ForbiddenError("Only draft content can be edited");
    }

    return true;
  }

  async canReview(
    contentId: string,
    userId: UniqueEntityObjectId
  ): Promise<boolean> {
    const content = await this.contentRepository.findById(contentId);

    if (!content) {
      throw new ResourceNotFoundError(`Content with ID ${contentId} not found`);
    }

    // Aqui você implementaria a lógica real de verificação de permissão
    // Por exemplo, verificar se o usuário tem papel de revisor
    // Por enquanto, qualquer usuário diferente do autor pode revisar
    if (content.authorId === userId) {
      throw new ForbiddenError("The author cannot review their own content");
    }

    return true;
  }

  async canPublish(
    contentId: string,
    userId: UniqueEntityObjectId
  ): Promise<boolean> {
    const content = await this.contentRepository.findById(contentId);

    if (!content) {
      throw new ResourceNotFoundError(`Content with ID ${contentId} not found`);
    }

    // Aqui você implementaria a lógica real de verificação de permissão
    // Por exemplo, verificar se o usuário tem papel de editor
    // Por enquanto, qualquer usuário pode publicar conteúdo aprovado
    if (content.status !== "approved") {
      throw new ForbiddenError("Only approved content can be published");
    }

    return true;
  }
}
