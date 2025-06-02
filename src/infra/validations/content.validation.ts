import { array, object, string } from "yup";

export class ContentValidation {
  static create() {
    return object({
      body: object({
        title: string().required("Título é obrigatório"),
        templateId: string().required("ID do template é obrigatório"),
      }),
    });
  }

  static submitForReview() {
    return object({
      params: object({
        id: string().required("ID do conteúdo é obrigatório"),
      }),
    });
  }

  static approve() {
    return object({
      params: object({
        id: string().required("ID do conteúdo é obrigatório"),
      }),
      body: object({
        notes: string().optional(),
      }),
    });
  }

  static reject() {
    return object({
      params: object({
        id: string().required("ID do conteúdo é obrigatório"),
      }),
      body: object({
        notes: string().required("Notas de rejeição são obrigatórias"),
      }),
    });
  }

  static publish() {
    return object({
      params: object({
        id: string().required("ID do conteúdo é obrigatório"),
      }),
    });
  }

  static returnToDraft() {
    return object({
      params: object({
        id: string().required("ID do conteúdo é obrigatório"),
      }),
    });
  }

  static runApprovalChain() {
    return object({
      params: object({
        id: string().required("ID do conteúdo é obrigatório"),
      }),
    });
  }
}


