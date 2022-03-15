import { getUser, refreshToken, signin } from "@services/api";
import { AuthenticationService } from "@services/ports";

export function authAdapter(): AuthenticationService {
  return {
    signin(credentials) {
      return signin(credentials);
    },
    refreshToken(token) {
      return refreshToken(token);
    },
    resetPassword(email) {
      return Promise.resolve();
    },
    getUser(token) {
      return getUser(token);
    },
  };
}
