/* eslint-disable import/export */
import { render } from "@testing-library/react";
import { Roles, User } from "@domain/user";

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });

export * from "@testing-library/react";

export { default as userEvent } from "@testing-library/user-event";

// override render export
export { customRender as render };

export function getMockedUser(role = Roles.Dispatcher): User {
  return {
    uid: "e9bf0e74-7858-4c47-ae6d-232ac90d5b15",
    email: "schaefer@hotmail.com",
    name: "Fernando Schaefer",
    role,
  };
}
