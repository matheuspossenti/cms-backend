import jwt from 'jsonwebtoken'
import { Encrypter } from '@/domain/authentication/cryptography/encrypter'
import { env } from '../env'
import { UnauthorizedError } from '@/core/errors/unauthorized.error'
import { injectable } from 'tsyringe'
import { TokenType } from '@/core/enum/token-type'

@injectable()
export class JwtEncrypter implements Encrypter {
  private readonly accessExpiration = `${env.JWT_ACCESS_EXPIRATION_HOURS}h`
  private readonly refreshExpiration = `${env.JWT_REFRESH_EXPIRATION_DAYS}d`
  // to be more easy to test this module, we can inject the expiration time
  constructor() {}

  private getExpirationDate(tokenType: TokenType) {
    return tokenType === TokenType.ACCESS_TOKEN ? this.accessExpiration : this.refreshExpiration
  }

  encrypt(sub: string, jwtToken: TokenType) {
    return jwt.sign({ sub }, env.JWT_SECRET, {
      expiresIn: this.getExpirationDate(jwtToken),
    })
  }

  async decrypt(token: string) {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET)

      return decoded as { sub: string; iat: number; exp: number }
    } catch (error) {
      throw new UnauthorizedError('Token inválido')
    }
  }
}
