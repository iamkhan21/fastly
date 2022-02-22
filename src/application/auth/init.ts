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

signinFx.use(async (credentials) => {
  const data = await authAdapter().signin(credentials);

  if (!data) {
    throw "Can't authenticate";
  }

  await storageAdapter().setToken(data.token);

  return data.user;
});

logoutFx.use(async () => {
  await storageAdapter().removeToken();
});

checkAuthFx.use(async () => {
  // Check token in storage
  const token: Token | undefined = await storageAdapter().getToken();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!token) {
    throw "Token not found";
  }

  // Request to get user info with token
  const user = await authAdapter().validateToken(token);

  if (!user) {
    throw "Can't authenticate";
  }

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
