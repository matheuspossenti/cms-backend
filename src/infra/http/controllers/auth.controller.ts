import { LoginAccountService } from '@/domain/authentication/services/auth/login-account.service'
import { RefreshTokenService } from '@/domain/authentication/services/auth/refresh-token.service'
import { AccountPresenter } from '@/infra/presenters/account.presenter'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export class AuthController {
  static async login(
    req: FastifyRequest<{
      Body: {
        email: string
        password: string
      }
    }>,
    reply: FastifyReply
  ) {
    const { email, password } = req.body
    const command = container.resolve(LoginAccountService)

    const { accessToken, account, refreshToken } = await command.execute({ email, password })

    return reply.status(200).send({
      account: AccountPresenter.toHttp(account),
      tokens: {
        accessToken,
        refreshToken,
      },
    })
  }

  static async refresh(
    req: FastifyRequest<{
      Body: {
        refreshToken: string
      }
    }>,
    reply: FastifyReply
  ) {
    const { refreshToken } = req.body
    const command = container.resolve(RefreshTokenService)

    const { accessToken, refreshToken: newRefreshToken } = await command.execute({ refreshToken })

    return reply.status(200).send({
      tokens: {
        accessToken,
        refreshToken: newRefreshToken,
      },
    })
  }

  static async me(req: FastifyRequest, reply: FastifyReply) {
    const account = req.account

    return reply.status(200).send({
      account: AccountPresenter.toHttp(account),
    })
  }
}
