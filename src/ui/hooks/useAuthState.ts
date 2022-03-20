import { useStore } from "effector-react";
import { $auth } from "@application/auth";
import { UserState } from "@application/auth/types";

export function useAuthState(): UserState {
  return useStore($auth);
}
