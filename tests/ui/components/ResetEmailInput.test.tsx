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

    const emailInput = getEmailInput() as HTMLElement;
    const submitButton = getSubmitButton();

    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    expect(submitButton).toBeDisabled();
  });

  it("should enable button when email is entered", async () => {
    render(<ResetEmailInput />);

    const emailInput = getEmailInput() as HTMLElement;
    const submitButton = getSubmitButton();

    expect(submitButton).toBeDisabled();

    act(() => {
      userEvent.type(emailInput, "test@email.com");
    });

    await new Promise((resolve) => setTimeout(resolve, 800));
    expect(submitButton).toBeEnabled();
  });

  it("should show error if email is incorrect and disable button", async () => {
    render(<ResetEmailInput />);

    const emailInput = getEmailInput() as HTMLElement;
    const submitButton = getSubmitButton();

    act(() => {
      userEvent.type(emailInput, "test@email");
    });

    await new Promise((resolve) => setTimeout(resolve, 800));

    expect(getErrorSection()).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});
