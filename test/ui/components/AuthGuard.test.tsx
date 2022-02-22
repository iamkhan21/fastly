import { describe, expect, it } from "vitest";
import { getMockedUser, render, screen } from "@test_utils/test-utils";
import AuthGuard from "@ui/components/shared/AuthGuard";
import { UserState } from "@application/auth/types";
import { getNoUser } from "@domain/user";
import { waitFor } from "@testing-library/react";

describe("withAuthentication", () => {
  const App = () => <p data-testid={"test"}>Test</p>;

  const getLoader = () => screen.queryByTestId("loader");
  const getTest = () => screen.queryByTestId("test");
  const getAuth = () => screen.queryByTestId("auth");

  const useGateMock = function () {};
  const useTitleMock = function (title: string) {};
  const renderFunc = (useAuthMock: () => UserState) =>
    render(
      <AuthGuard
        useTitleHook={useTitleMock}
        useAuthHook={useAuthMock}
        useGateHook={useGateMock}
      >
        <App />
      </AuthGuard>
    );

  it("should show loader when fetching user", () => {
    const useAuthHookMock = () => null;
    renderFunc(useAuthHookMock);
    expect(getLoader()).toBeInTheDocument();
  });

  it("should show auth form if user unauthenticated", async () => {
    const useAuthHookMock = () => getNoUser();
    renderFunc(useAuthHookMock);
    await waitFor(() => expect(getAuth()).toBeInTheDocument());
  });

  it("should show app if user authenticated", () => {
    const useAuthHookMock = () => getMockedUser();
    renderFunc(useAuthHookMock);
    expect(getTest()).toBeInTheDocument();
  });
});
