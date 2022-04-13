import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@tests/utils/test-utils";
import PasswordReset from "@views/PasswordReset";
import { act } from "react-dom/test-utils";
import { waitFor } from "@testing-library/react";

describe("PasswordReset view", () => {
  const getTitle = () => screen.queryByTestId("title");
  const getEmailInput = () => screen.queryByTestId("email");
  const getPasswordInput = () => screen.queryByTestId("password");
  const getRepeatPasswordInput = () => screen.queryByTestId("password2");
  const getSubmitButton = () => screen.queryByTestId("submit");

  beforeEach(() => {
    render(<PasswordReset />);
  });

  it("should render password reset form if token absent", async () => {
    expect(getTitle()).toHaveTextContent("Password Reset");
  });

  it("should render password reset form if token absent", async () => {
    expect(getTitle()).toHaveTextContent("Password Reset");
  });

  it("should render password reset form", async () => {
    await waitFor(() => expect(getEmailInput()).toBeInTheDocument());
    expect(getSubmitButton()).toBeInTheDocument();
  });
});
