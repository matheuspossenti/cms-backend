import { inject, injectable } from "tsyringe";
import { IContentRepository } from "../repositories/content-repository";
import { ForbiddenError } from "@/core/errors/forbidden.error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";
import { IAccountRepository } from "../repositories/account-repository";

@injectable()
export class ContentAccessProxy {
  constructor(
    @inject("contentRepository")
    private contentRepository: IContentRepository,
    @inject("accountRepository")
    private accountRepository: IAccountRepository
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

    const account = await this.accountRepository.getById(userId.toString());

    if (!account || !account.isEditor()) {
      throw new ForbiddenError("Only editor can review content");
    }

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

    const account = await this.accountRepository.getById(userId.toString());

    if (!account || !account.isRedator()) {
      throw new ForbiddenError("Only redator can publish content");
    }

    if (content.status !== "approved") {
      throw new ForbiddenError("Only approved content can be published");
    }

    return true;
  }
}
