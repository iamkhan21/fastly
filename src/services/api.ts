import wretch from "wretch";
import { Credentials, Token, User } from "@domain/user";
import {
  AUTH_URL,
  PROFILE_URL,
  REFRESH_URL,
  SERVER_URL,
} from "@constants/api-urls";
import { SigninData, Tokens } from "@services/types";

const server = wretch(SERVER_URL);

export function fakeApi<TResponse>(response: TResponse): Promise<TResponse> {
  return new Promise((res) => setTimeout(() => res(response), 500));
}

export function signin(credentials: Credentials): Promise<SigninData | null> {
  return server.url(AUTH_URL).post(credentials).json();
}

export function refreshToken(token: Token): Promise<Tokens | null> {
  return server.url(REFRESH_URL).post({ token }).json();
}

export function getUser(token: Token): Promise<User | null> {
  return server.auth(token).url(PROFILE_URL).get().json();
}
