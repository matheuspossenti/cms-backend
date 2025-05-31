import { UnauthorizedError } from '@/core/errors/unauthorized.error'
import { VerifyAccessTokenService } from '@/domain/authentication/services/auth/verify-token-access.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1]

    if (!accessToken) {
      throw new UnauthorizedError('Token inválido')
    }

    const command = container.resolve(VerifyAccessTokenService)

    const { account } = await command.execute({ accessToken })

    req['account'] = account
  } catch (error) {
    return reply.status(401).send({ error: error.message })
  }
}
