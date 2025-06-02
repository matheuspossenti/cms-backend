import { inject, injectable } from "tsyringe";
import { RunApprovalChainUseCase } from "../../use-cases/content/run-approval-chain.use-case";
import { Content } from "../../entities/content";

interface RunApprovalChainServiceRequest {
  contentId: string;
}

interface RunApprovalChainServiceResponse {
  content: Content;
}

@injectable()
export class RunApprovalChainService {
  constructor(
    @inject(RunApprovalChainUseCase)
    private readonly runApprovalChainUseCase: RunApprovalChainUseCase
  ) {}

  async execute({
    contentId,
  }: RunApprovalChainServiceRequest): Promise<RunApprovalChainServiceResponse> {
    const { content } = await this.runApprovalChainUseCase.execute({
      contentId,
    });

    return {
      content,
    };
  }
}
