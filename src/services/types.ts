import { Token } from "@lib/types";
import { User } from "@domain/user";

export type AuthToken = Token;
export type RefreshToken = Token;

export type Tokens = { token: AuthToken; refreshToken: RefreshToken };

export enum TokenType {
  auth_token = "auth_token",
  refresh_token = "refresh_token",
}

export type SigninData = Tokens & { user: User };
