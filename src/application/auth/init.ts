import {
  $auth,
  $authFail,
  checkAuth,
  checkAuthFx,
  cleanSigninError,
  logout,
  logoutFx,
  signIn,
  signinFx,
} from "@application/auth/index";
import { forward } from "effector";
import { authAdapter } from "@services/authAdapter";
import { getNoUser } from "@domain/user";
import { storageAdapter } from "@services/storageAdapter";
import { of } from "await-of";
import {
  AuthToken,
  RefreshToken,
  SigninData,
  TokenType,
} from "@services/types";
import { resetJob, resetJobs } from "@application/jobs";

signinFx.use(async (credentials) => {
  // TODO: remove
  await new Promise((resolve) => {
    setTimeout(resolve, 1_000);
  });

  const [data, err] = await of(authAdapter().signin(credentials));

  if (err) {
    throw new Error(err.message);
  }

  const { user, ...tokens } = data as SigninData;

  await storageAdapter().setTokens(tokens);

  return user;
});

logoutFx.use(async () => {
  await storageAdapter().removeTokens();
});

checkAuthFx.use(async () => {
  // Check token in storage
  const token: RefreshToken | undefined = await storageAdapter().getToken(
    TokenType.refresh_token
  );

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!token) {
    throw new Error("Token not found");
  }

  // Request to update tokens
  const [tokens, err1] = await of(authAdapter().refreshToken(token));

  if (err1 || !tokens) {
    throw "Token expired";
  }

  // Get user
  const [user, err2] = await of(
    authAdapter().getUser(tokens.token as AuthToken)
  );

  if (err2 || !user) {
    throw "User not found";
  }

  await storageAdapter().setTokens(tokens);

  return user;
});

forward({
  from: signIn,
  to: [cleanSigninError, signinFx],
});

forward({
  from: logout,
  to: [logoutFx, resetJobs, resetJob],
});

forward({
  from: checkAuth,
  to: checkAuthFx,
});

$auth
  .on([signinFx.doneData, checkAuthFx.doneData], (_, user) => user)
  .on([signinFx.fail, checkAuthFx.fail, logoutFx.done], () => getNoUser());

$authFail
  .reset(cleanSigninError)
  .on(signinFx.failData, (_, error) => error.message)
  .on(signinFx.done, () => null);
