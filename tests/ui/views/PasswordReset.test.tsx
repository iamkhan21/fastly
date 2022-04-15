import { describe, expect, it } from "vitest";
import { render, screen } from "@tests/utils/test-utils";
import PasswordReset from "@views/PasswordReset";
import { waitFor } from "@testing-library/react";

describe("PasswordReset view", () => {
  const getTitle = () => screen.queryByTestId("title");
  const getEmailInput = () => screen.queryByTestId("email");
  const getPasswordInput = () => screen.queryByTestId("password");

  it("should render password reset form", async () => {
    render(<PasswordReset />);

    expect(getTitle()).toHaveTextContent("Password Reset");
  });

  it("should render email input form if token absent", async () => {
    render(<PasswordReset />);

    await waitFor(() => expect(getEmailInput()).toBeInTheDocument());
  });

  it("should render new password input form if token presented", async () => {
    Object.defineProperty(window, "location", {
      value: {
        search: {
          token: "333",
        },
      },
    });

    render(<PasswordReset />);

    await waitFor(() => expect(getPasswordInput()).toBeInTheDocument());

    // @ts-ignore
    delete window.location.search["token"];
  });

  // it("should enable button when both passwords is input", async () => {});

  // it("should show error and disable button if passwords isn't same", async () => {});
});
