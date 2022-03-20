import { forward } from "effector";
import { initApp } from "@application/app/index";
import { checkAuth } from "@application/auth";

forward({
  from: initApp,
  to: [checkAuth],
});
