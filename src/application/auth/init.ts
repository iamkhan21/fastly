import {
  $auth,
  checkAuth,
  checkAuthFx,
  logout,
  logoutFx,
  signIn,
  signinFx,
} from "@application/auth/index";
import { forward } from "effector";
import { authAdapter } from "@services/authAdapter";
import { getNoUser, Token } from "@domain/user";
import { storageAdapter } from "@services/storageAdapter";
import { of } from "await-of";
import { SigninData, TokenType } from "@services/types";

signinFx.use(async (credentials) => {
  const [data, err] = await of(authAdapter().signin(credentials));

  if (err || !data) {
    throw "Can't authenticate";
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
  const token: Token | undefined = await storageAdapter().getToken(
    TokenType.refresh_token
  );

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!token) {
    throw "Token not found";
  }

  // Request to update tokens
  const [tokens, err1] = await of(authAdapter().refreshToken(token));

  if (err1 || !tokens) {
    throw "Token expired";
  }

  // Get user
  const [user, err2] = await of(authAdapter().getUser(tokens.token));

  if (err2 || !user) {
    throw "User not found";
  }

  await storageAdapter().setTokens(tokens);

  return user;
});

forward({
  from: signIn,
  to: signinFx,
});

forward({
  from: logout,
  to: logoutFx,
});

forward({
  from: checkAuth,
  to: checkAuthFx,
});

$auth
  .on([signinFx.doneData, checkAuthFx.doneData], (_, user) => user)
  .on([signinFx.fail, checkAuthFx.fail, logoutFx.done], () => getNoUser());
