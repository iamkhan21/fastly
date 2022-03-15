import type { Credentials, Token, User } from "@domain/user";
import { SigninData, Tokens, TokenType } from "@services/types";

export interface AuthenticationService {
  signin(credentials: Credentials): Promise<SigninData | null>;

  resetPassword(email: Pick<Credentials, "email">): Promise<void>;

  refreshToken(token: Token): Promise<Tokens | null>;

  getUser(token: Token): Promise<User | null>;
}

export interface StorageService {
  setTokens(tokens: Tokens): Promise<void>;

  getToken(type: TokenType): Promise<Token | undefined>;

  removeTokens(): Promise<void>;
}
