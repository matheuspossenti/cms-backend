import { container } from "tsyringe";
import { CreateContentUseCase } from "@/domain/authentication/use-cases/content/create-content.use-case";
import { SubmitContentForReviewUseCase } from "@/domain/authentication/use-cases/content/submit-content-for-review.use-case";
import { ApproveContentUseCase } from "@/domain/authentication/use-cases/content/approve-content.use-case";
import { RejectContentUseCase } from "@/domain/authentication/use-cases/content/reject-content.use-case";
import { PublishContentUseCase } from "@/domain/authentication/use-cases/content/publish-content.use-case";
import { ReturnContentToDraftUseCase } from "@/domain/authentication/use-cases/content/return-content-to-draft.use-case";
import { RunApprovalChainUseCase } from "@/domain/authentication/use-cases/content/run-approval-chain.use-case";

// Registrar casos de uso
container.registerSingleton(CreateContentUseCase);
container.registerSingleton(SubmitContentForReviewUseCase);
container.registerSingleton(ApproveContentUseCase);
container.registerSingleton(RejectContentUseCase);
container.registerSingleton(PublishContentUseCase);
container.registerSingleton(ReturnContentToDraftUseCase);
container.registerSingleton(RunApprovalChainUseCase);