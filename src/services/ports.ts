import type { Credentials, Token, User } from "@domain/user";

export type UserData = { user: User; token: Token };

export interface AuthenticationService {
  signin(credentials: Credentials): Promise<UserData>;

  resetPassword(email: Pick<Credentials, "email">): Promise<void>;

  validateToken(token: Token): Promise<User | null>;
}

export interface StorageService {
  setToken(token: Token): Promise<void>;

  getToken(): Promise<Token | undefined>;

  removeToken(): Promise<void>;
}
