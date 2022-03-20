import { Credentials, User } from "@domain/user";
import { UserState } from "@application/auth/types";
import { app } from "@application/app";

export const signIn = app.createEvent<Credentials>();
export const signinFx = app.createEffect<Credentials, User>();

export const logout = app.createEvent<void>();
export const logoutFx = app.createEffect<void, void>();

export const checkAuth = app.createEvent<void>();
export const checkAuthFx = app.createEffect<void, User>();

export const $auth = app.createStore<UserState>(null);
