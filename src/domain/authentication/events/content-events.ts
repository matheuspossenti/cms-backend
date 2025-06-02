import { Content } from "../entities/content";

export type ContentEvent = 
  | "content.created" 
  | "content.submitted" 
  | "content.approved" 
  | "content.rejected" 
  | "content.published";

export interface ContentEventData {
  content: Content;
}

export interface ContentEventListener {
  handle(event: ContentEvent, data: ContentEventData): Promise<void>;
}