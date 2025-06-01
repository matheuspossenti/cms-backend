import { inject, injectable } from "tsyringe";
import { Account } from "../../entities/account";
import { IAccountRepository } from "../../repositories/account-repository";
import { validate } from "@/core/utils/validate";
import { UniqueEntityObjectId } from "@/core/entities/unique-entity-id";
import { Password } from "../../entities/value-objects/password";
import { DuplicateResourceError } from "@/core/errors/duplicate-resource.error";
import { object, string } from "yup";

interface ICreateAccountRequest {
  name: string;
  email: string;
  password: string;
  role: "editor" | "redator";
}

interface ICreateAccountResponse {
  account: Account;
}

@injectable()
export class CreateAccountUseCase {
  constructor(
    @inject("accountRepository")
    private accountRepository: IAccountRepository
  ) {}

  async execute({
    email,
    name,
    password,
    role,
  }: ICreateAccountRequest): Promise<ICreateAccountResponse> {
    await validate(createAccountYupSchema, { email, name, role });

    const existingAccount = await this.accountRepository.getByEmail(email);

    if (existingAccount) {
      throw new DuplicateResourceError("Já existe uma conta com este e-mail.");
    }

    const account = Account.create({
      name: name,
      email: email.trim().toLowerCase(),
      password: Password.createNewPassword(password),
      role: role,
      deleted: false,
      deletedBy: null,
    });

    const createdAccount = await this.accountRepository.create(account);

    return { account: createdAccount };
  }
}

const createAccountYupSchema = object({
  name: string()
    .min(3, "Nome deve conter ao menos 3 caracteres")
    .required("Nome é obrigatório"),
  email: string()
    .email("Deve ser um email válido")
    .required("E-mail é obrigatório"),
  role: string()
    .oneOf(["editor", "redator"], "Função deve ser editor ou redator")
    .required("Função é obrigatória"),
});
