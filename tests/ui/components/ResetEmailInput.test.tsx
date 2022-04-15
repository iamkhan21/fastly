import { describe, expect, it } from "vitest";
import { render, screen, userEvent } from "@tests/utils/test-utils";
import ResetEmailInput from "@components/auth/ResetEmailInput";
import { act } from "react-dom/test-utils";

describe("ResetEmailInput", () => {
  const getEmailInput = () => screen.queryByTestId("email");
  const getSubmitButton = () => screen.queryByTestId("submit");
  const getErrorSection = () => screen.queryByTestId("error-msg");

  it("should ender email input form with disabled button", async () => {
    render(<ResetEmailInput />);

    const submitButton = getSubmitButton();
    const emailInput = getEmailInput();

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeEnabled();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("should enable button when email is entered", async () => {
    render(<ResetEmailInput />);

    const submitButton = getSubmitButton();

    expect(submitButton).toBeDisabled();

    act(() => {
      userEvent.type(getEmailInput() as HTMLElement, "test@email.com");
    });

    await new Promise((resolve) => setTimeout(resolve, 800));
    expect(submitButton).toBeEnabled();
  });

  it("should show error if email is incorrect and disable button", async () => {
    render(<ResetEmailInput />);

    act(() => {
      userEvent.type(getEmailInput() as HTMLElement, "test@email");
    });

    await new Promise((resolve) => setTimeout(resolve, 800));

    expect(getErrorSection()).toBeInTheDocument();
    expect(getSubmitButton()).toBeDisabled();
  });

  it("should disable button and input when reset effect is pending", async () => {
    render(<ResetEmailInput usePendingHook={() => true} />);

    expect(getEmailInput()).toBeDisabled();
    expect(getSubmitButton()).toBeDisabled();
  });

  it("should show error from password reset event", async () => {
    const errorMsg = "error";
    render(<ResetEmailInput useErrorHook={() => errorMsg} />);

    const errorSection = getErrorSection();
    expect(errorSection).toBeInTheDocument();
    expect(errorSection).toHaveTextContent(errorMsg);
  });
});
