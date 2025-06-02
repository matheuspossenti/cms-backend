import { Content } from "../entities/content";

export abstract class ApprovalHandler {
  private nextHandler: ApprovalHandler | null = null;

  setNext(handler: ApprovalHandler): ApprovalHandler {
    this.nextHandler = handler;
    return handler;
  }

  async handle(content: Content): Promise<void> {
    await this.process(content);
    
    if (this.nextHandler) {
      await this.nextHandler.handle(content);
    }
  }

  protected abstract process(content: Content): Promise<void>;
}

