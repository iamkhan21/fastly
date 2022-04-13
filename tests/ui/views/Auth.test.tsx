import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@tests/utils/test-utils";
import Auth from "@views/Auth";

describe("Auth view", () => {
  const getTitle = () => screen.queryByTestId("title");
  const getEmailInput = () => screen.queryByTestId("email");
  const getPasswordInput = () => screen.queryByTestId("password");
  const getSubmitButton = () => screen.queryByTestId("submit");

  beforeEach(() => {
    render(<Auth />);
  });

  it("should render signin form", () => {
    expect(getTitle()).toBeInTheDocument();
    expect(getEmailInput()).toBeInTheDocument();
    expect(getPasswordInput()).toBeInTheDocument();
    expect(getSubmitButton()).toBeInTheDocument();
  });
});
