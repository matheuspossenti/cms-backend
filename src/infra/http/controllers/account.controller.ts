import { CreateAccountService } from "@/domain/authentication/services/account/create-account.service";
import { DeleteAccountService } from "@/domain/authentication/services/account/delete-account-by-id.service";
import { GetAccountByIdService } from "@/domain/authentication/services/account/get-account-by-id.service";
import { UpdateAccountService } from "@/domain/authentication/services/account/update-account.service";
import { AccountPresenter } from "@/infra/presenters/account.presenter";
import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";

export class AccountController {
  static async create(
    req: FastifyRequest<{
      Body: {
        name: string;
        email: string;
        password: string;
        role: "editor" | "redator";
      };
    }>,
    reply: FastifyReply
  ) {
    const { name, role, email, password } = req.body;
    const command = container.resolve(CreateAccountService);

    const { account } = await command.execute({
      name,
      role,
      email,
      password,
    });

    return reply.status(201).send(AccountPresenter.toHttp(account));
  }

  static async update(
    req: FastifyRequest<{
      Params: {
        accountId: string;
      };
      Body: {
        name?: string;
        email?: string;
        role?: "editor" | "redator";
      };
    }>,
    reply: FastifyReply
  ) {
    const { accountId } = req.params;
    const { name, email, role } = req.body;
    const command = container.resolve(UpdateAccountService);

    const { account } = await command.execute({
      id: accountId,
      name,
      email,
      requester: req.account,
      role,
    });

    return reply.status(200).send(AccountPresenter.toHttp(account));
  }

  static async show(
    req: FastifyRequest<{
      Params: {
        accountId: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const { accountId } = req.params;
    const command = container.resolve(GetAccountByIdService);

    const { account } = await command.execute({
      accountId,
    });

    return reply.status(200).send(AccountPresenter.toHttp(account));
  }

  static async delete(
    req: FastifyRequest<{
      Params: {
        accountId: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const { accountId } = req.params;
    const command = container.resolve(DeleteAccountService);

    await command.execute({
      accountId,
      requester: req.account,
    });

    return reply.status(204).send();
  }
}
