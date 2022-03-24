import type { Credentials, User } from "@domain/user";
import {
  AuthToken,
  RefreshToken,
  SigninData,
  Tokens,
  TokenType,
} from "@services/types";
import { FullJob, Job, JobUID } from "@domain/job";

export interface AuthenticationService {
  signin(credentials: Credentials): Promise<SigninData | null>;

  resetPassword(email: Pick<Credentials, "email">): Promise<void>;

  refreshToken(token: RefreshToken): Promise<Tokens | null>;

  getUser(token: AuthToken): Promise<User | null>;
}

export interface JobsService {
  getActiveJobs(
    token: AuthToken,
    abortController: AbortController
  ): Promise<Job[] | null>;

  getJobInfo(
    token: AuthToken,
    jobUID: JobUID,
    abortController: AbortController
  ): Promise<FullJob | null>;
}

export interface StorageService {
  setTokens(tokens: Tokens): Promise<void>;

  getToken(type: TokenType): Promise<AuthToken | RefreshToken | undefined>;

  removeTokens(): Promise<void>;
}
