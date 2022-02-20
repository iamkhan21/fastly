import { describe, expect, it } from "vitest";
import { app } from "@application/app";
import { allSettled, fork } from "effector";
import {
  $auth,
  checkAuth,
  checkAuthFx,
  logout,
  logoutFx,
  signIn,
  signinFx,
} from "@application/auth";
import "@application/init";
import { getMockedUser } from "@test_utils/test-utils";
import { getNoUser } from "@domain/user";

function mockSuccessAuth() {
  return getMockedUser();
}
function mockFailAuth() {
  throw "Can't load user";
}

describe("Authentication use cases", () => {
  const payload = { email: "test@test.com", password: "123456" };

  it("should have initial auth state as null", () => {
    const scope = fork(app);

    expect(scope.getState($auth)).toBe(null);
  });

  it("should set user on successful signin", async () => {
    const scope = fork(app, {
      handlers: new Map([[signinFx, mockSuccessAuth]]),
    });

    await allSettled(signIn, {
      scope: scope,
      params: payload,
    });

    expect(scope.getState($auth)).toEqual(getMockedUser());
  });

  it("should set no user on fail signin", async () => {
    const scope = fork(app, {
      handlers: new Map([[signinFx, mockFailAuth]]),
    });

    await allSettled(signIn, {
      scope: scope,
      params: payload,
    });

    expect(scope.getState($auth)).toEqual(getNoUser());
  });

  it("should load the user on auth check success", async () => {
    const scope = fork(app, {
      handlers: new Map([[checkAuthFx, mockSuccessAuth]]),
    });

    await allSettled(checkAuth, {
      scope: scope,
    });

    expect(scope.getState($auth)).toEqual(getMockedUser());
  });

  it("should load the no user on auth check fail", async () => {
    const scope = fork(app, {
      handlers: new Map([[checkAuthFx, mockFailAuth]]),
    });

    await allSettled(checkAuth, {
      scope: scope,
    });

    expect(scope.getState($auth)).toEqual(getNoUser());
  });

  it("should set no user on logout", async () => {
    const scope = fork(app, {
      values: new Map([[$auth, getMockedUser()]]),
      handlers: new Map([[logoutFx, () => Promise.resolve()]]),
    });

    expect(scope.getState($auth)).toEqual(getMockedUser());

    await allSettled(logout, {
      scope: scope,
    });

    expect(scope.getState($auth)).toEqual(getNoUser());
  });
});
