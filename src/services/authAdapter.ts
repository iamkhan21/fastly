import { Credentials, Token, User } from "@domain/user";
import { fakeApi } from "@services/api";
import { AuthenticationService, UserData } from "@services/ports";

export function authAdapter(): AuthenticationService {
  const fakeUser = {
    name: "Katelynn Medhurst",
    email: "Rosalind_Mills84@hotmail.com",
    uid: "69a674e0-f467-4cc8-b96e-d151a05dfc2d",
    role: 200002,
  };

  let fakeUserData = {
    user: fakeUser,
    token: "df7cc78ca1ba928fc816742cb739205929396fea",
  };
  return {
    validateToken(token: Token): Promise<User> {
      return fakeApi(fakeUser);
    },
    signin(credentials: Credentials): Promise<UserData> {
      return fakeApi(fakeUserData);
    },
    resetPassword(email: Pick<Credentials, "email">): Promise<void> {
      return Promise.resolve();
    },
  };
}
