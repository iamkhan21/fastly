import { forward } from "effector";
import { AppGate } from "@application/app/index";
import { checkAuth } from "@application/auth";

forward({
  from: AppGate.open,
  to: [checkAuth],
});
