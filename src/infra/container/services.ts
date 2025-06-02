import { container } from "tsyringe";
import { ContentEventEmitter } from "@/domain/authentication/events/content-event-emitter";
import { EmailNotificationListener } from "@/domain/authentication/events/listeners/email-notification-listener";
import { PlagiarismCheckHandler } from "@/domain/authentication/approval-chain/plagiarism-check-handler";
import { ContentQualityHandler } from "@/domain/authentication/approval-chain/content-quality-handler";
import { SeoCheckHandler } from "@/domain/authentication/approval-chain/seo-check-handler";
import { ContentAccessProxy } from "@/domain/authentication/proxies/content-access-proxy";

// Registrar o emissor de eventos
container.registerSingleton(ContentEventEmitter);

// Registrar os listeners
container.registerSingleton(EmailNotificationListener);

// Registrar os handlers da cadeia de aprovação
container.registerSingleton(PlagiarismCheckHandler);
container.registerSingleton(ContentQualityHandler);
container.registerSingleton(SeoCheckHandler);

// Registrar o proxy de acesso
container.registerSingleton(ContentAccessProxy);

// Configurar os listeners
container.resolve(ContentEventEmitter).subscribe(
  "content.created",
  container.resolve(EmailNotificationListener)
);

container.resolve(ContentEventEmitter).subscribe(
  "content.submitted",
  container.resolve(EmailNotificationListener)
);

container.resolve(ContentEventEmitter).subscribe(
  "content.approved",
  container.resolve(EmailNotificationListener)
);

container.resolve(ContentEventEmitter).subscribe(
  "content.rejected",
  container.resolve(EmailNotificationListener)
);

container.resolve(ContentEventEmitter).subscribe(
  "content.published",
  container.resolve(EmailNotificationListener)
);
