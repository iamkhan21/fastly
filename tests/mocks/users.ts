import { Roles, User } from "@domain/user";

export function getMockedUser(role = Roles.Dispatcher): User {
  return {
    uid: "e9bf0e74-7858-4c47-ae6d-232ac90d5b15",
    email: "schaefer@hotmail.com",
    name: "Fernando Schaefer",
    organization: "1232312312",
    role,
  };
}
