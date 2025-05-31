import { TokenType } from "@/core/enum/token-type";

export interface Encrypter {
  encrypt: (sub: string, tokenType: TokenType) => string;
  decrypt: (
    token: string
  ) => Promise<{ sub: string; exp: number; iat: number }>;
}
