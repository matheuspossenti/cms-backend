import { injectable } from "tsyringe";
import { ApprovalHandler } from "./approval-handler";
import { Content } from "../entities/content";

@injectable()
export class SeoCheckHandler extends ApprovalHandler {
  protected async process(content: Content): Promise<void> {
    // Simulação de verificação de SEO
    console.log(`Verificando SEO para o conteúdo: ${content.id.toString()}`);

    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
