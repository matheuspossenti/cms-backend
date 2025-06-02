import { injectable } from "tsyringe";
import { Content } from "../../entities/content";
import { ContentEventListener } from "../content-event-emitter";

@injectable()
export class EmailNotificationListener implements ContentEventListener {
  async handle(content: Content): Promise<void> {
    // Simulação de envio de e-mail
    console.log(`Enviando e-mail de notificação para conteúdo: ${content.id.toString()}`);
    console.log(`Status: ${content.status}`);
    
    // Aqui você implementaria a lógica real de envio de e-mail
    // Por exemplo, usando um serviço de e-mail como SendGrid, Mailgun, etc.
    
    // Por enquanto, apenas simula um atraso
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

