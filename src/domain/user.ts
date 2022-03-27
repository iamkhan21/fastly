import { OrganizationUID } from "@domain/organization";
import { Email, Password, UID, UserName } from "@lib/types";

export type UserUid = UID;

export enum Roles {
  Admin = 20001,
  Dispatcher = 20002,
}

export type User = {
  uid: UserUid;
  email: Email;
  name: UserName;
  role: Roles;
  organization: OrganizationUID;
};

export type NoUser = { uid: null };

export type Credentials = {
  email: Email;
  password: Password;
};

export function getNoUser() {
  return { uid: null };
}

export function checkIsUserAdmin(user: User | NoUser | null): boolean {
  if (!user?.uid) return false;

  return user.role === Roles.Admin;
}
