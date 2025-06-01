import { object, string } from 'yup'

export class AuthValidation {
  static login() {
    return object({
      body: object({
        email: string().email('Deve ser um e-mail válido').required('E-email é obrigatório'),
        password: string().required('Senha é obrigatória'),
      }),
    })
  }

  static refresh() {
    return object({
      body: object({
        refreshToken: string().required('Refresh token é obrigatório'),
      }),
    })
  }
}
