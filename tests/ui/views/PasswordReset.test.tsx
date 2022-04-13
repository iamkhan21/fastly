import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@tests/utils/test-utils";
import PasswordReset from "@views/PasswordReset";
import { waitFor } from "@testing-library/react";

describe("PasswordReset view", () => {
  const getTitle = () => screen.queryByTestId("title");
  const getEmailInput = () => screen.queryByTestId("email");
  const getPasswordInput = () => screen.queryByTestId("password");
  const getRepeatPasswordInput = () => screen.queryByTestId("password2");
  const getSubmitButton = () => screen.queryByTestId("submit");

  beforeEach(() => {});

  it("should render password reset form if token absent", async () => {
    render(<PasswordReset />);

    expect(getTitle()).toHaveTextContent("Password Reset");
  });

  it("should render password reset form if token absent", async () => {
    Object.defineProperty(window, "location", {
      value: {
        search: {
          token: "333",
        },
      },
    });

    render(<PasswordReset />);

    expect(getTitle()).toHaveTextContent("Password Reset");
    await waitFor(() => expect(getPasswordInput()).toBeInTheDocument());
    expect(getRepeatPasswordInput()).toBeInTheDocument();

    // @ts-ignore
    delete window.location.search["token"];
  });

  it("should render password reset form", async () => {
    render(<PasswordReset />);

    await waitFor(() => expect(getEmailInput()).toBeInTheDocument());
    expect(getSubmitButton()).toBeInTheDocument();
  });
});
