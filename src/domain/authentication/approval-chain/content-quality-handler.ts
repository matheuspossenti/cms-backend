import { injectable } from "tsyringe";
import { ApprovalHandler } from "./approval-handler";
import { Content } from "../entities/content";

@injectable()
export class ContentQualityHandler extends ApprovalHandler {
  protected async process(content: Content): Promise<void> {
    // Simulação de verificação de qualidade do conteúdo
    console.log(`Verificando qualidade para o conteúdo: ${content.id.toString()}`);

    await new Promise(resolve => setTimeout(resolve, 100));
  }
}
