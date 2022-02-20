export type Email = string;
export type Password = string;
export type UID = string;
export type Token = string;
export type UserName = string;

export enum Roles {
  Admin = 20001,
  Dispatcher = 20002,
}

export type User = {
  uid: UID;
  email: Email;
  name: UserName;
  role: Roles;
};

export type NoUser = { uid: null };

export type Credentials = {
  email: Email;
  password: Password;
};

export function getNoUser() {
  return { uid: null };
}

export function checkIsUserAdmin(user: User): boolean {
  return user.role === Roles.Admin;
}
