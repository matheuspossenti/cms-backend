import { number, object, string } from "yup";

export class AccountValidation {
  static show() {
    return object().shape({
      params: object().shape({
        accountId: string().required("accountId é obrigatório"),
      }),
    });
  }

  static create() {
    return object().shape({
      body: object().shape({
        name: string()
          .min(3, "Nome deve conter ao menos 3 caracteres")
          .required("Nome é obrigatório"),
      }),
    });
  }

  static update() {
    return object().shape({
      params: object().shape({
        accountId: string().required("accountId é obrigatório"),
      }),

      body: object().shape({
        name: string()
          .min(3, "Nome deve conter ao menos 3 caracteres")
          .required("Nome é obrigatório")
          .optional(),
      }),
    });
  }

  static delete() {
    return object().shape({
      params: object().shape({
        accountId: string().required("accountId é obrigatório"),
      }),
    });
  }
}
