import { injectable } from "tsyringe";
import { Content } from "../entities/content";

export type ContentEventType = 
  | "content.created" 
  | "content.submitted" 
  | "content.approved" 
  | "content.rejected" 
  | "content.published";

export interface ContentEventListener {
  handle(content: Content): Promise<void>;
}

@injectable()
export class ContentEventEmitter {
  private listeners: Map<ContentEventType, ContentEventListener[]> = new Map();

  subscribe(event: ContentEventType, listener: ContentEventListener): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)?.push(listener);
  }

  async emit(event: ContentEventType, content: Content): Promise<void> {
    const eventListeners = this.listeners.get(event) || [];

    for (const listener of eventListeners) {
      await listener.handle(content);
    }
  }
}
