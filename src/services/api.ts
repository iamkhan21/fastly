import wretch from "wretch";
import { Credentials, User } from "@domain/user";
import {
  AUTH_URL,
  JOBS_URL,
  PROFILE_URL,
  REFRESH_URL,
  SERVER_URL,
} from "@constants/api-urls";
import { AuthToken, RefreshToken, SigninData, Tokens } from "@services/types";
import { Job } from "@domain/job";

const server = wretch(SERVER_URL);

export function fakeApi<TResponse>(response: TResponse): Promise<TResponse> {
  return new Promise((res) => setTimeout(() => res(response), 500));
}

export function signin(credentials: Credentials): Promise<SigninData | null> {
  return server.url(AUTH_URL).post(credentials).json();
}

export function refreshToken(token: RefreshToken): Promise<Tokens | null> {
  return server.url(REFRESH_URL).post({ token }).json();
}

export function getUser(token: AuthToken): Promise<User | null> {
  return server.auth(token).url(PROFILE_URL).get().json();
}

export function getActiveJobs(token: AuthToken): Promise<Job[] | null> {
  return server.auth(token).url(JOBS_URL).get().json();
}
