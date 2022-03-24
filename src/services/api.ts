import wretch from "wretch";
import { Credentials, User } from "@domain/user";
import {
  AUTH_URL,
  JOBS_URL,
  ORGANIZATION_URL,
  PROFILE_URL,
  REFRESH_URL,
  SERVER_URL,
} from "@constants/api-urls";
import { AuthToken, RefreshToken, SigninData, Tokens } from "@services/types";
import { FullJob, Job, JobUID } from "@domain/job";
import { Organization } from "@domain/organization";

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

export function getOrganization(
  token: AuthToken,
  abortController: AbortController
): Promise<Organization | null> {
  return server
    .signal(abortController)
    .auth(token)
    .url(ORGANIZATION_URL)
    .get()
    .json();
}

export function getActiveJobs(
  token: AuthToken,
  abortController: AbortController
): Promise<Job[] | null> {
  return server.signal(abortController).auth(token).url(JOBS_URL).get().json();
}

export function getJobInfo(
  token: AuthToken,
  jobUid: JobUID,
  abortController: AbortController
): Promise<FullJob | null> {
  return server
    .signal(abortController)
    .auth(token)
    .url(`${JOBS_URL}/${jobUid}`)
    .get()
    .json();
}
