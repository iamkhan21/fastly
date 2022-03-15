import { Token, User } from "@domain/user";

export type Tokens = { token: Token; refreshToken: Token };

export enum TokenType {
  auth_token = "auth_token",
  refresh_token = "refresh_token",
}

export type SigninData = Tokens & { user: User };
