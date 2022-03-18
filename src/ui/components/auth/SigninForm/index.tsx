import React, { FormEvent } from "react";
import { signIn, signinFx } from "@application/auth";
import { useStore } from "effector-react";

const SigninForm = ({ useStoreHook = useStore }) => {
  const loading = useStoreHook(signinFx.pending);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO Remove creds
    signIn({
      email: "Braulio60@yahoo.com",
      password: "CWJ_40_X9HMN80A",
    });
  }

  return (
    <form className="pt-3" onSubmit={onSubmit}>
      <div className={"mb-3"}>
        <label className={"flex flex-col sm:flex-row sm:items-center gap-1"}>
          <span className={"sm:basis-25"}>Email</span>
          <input
            className={"w-full"}
            data-testid="email"
            disabled={loading}
            type="email"
          />
        </label>
      </div>
      <div className={"mb-4"}>
        <label className={"flex flex-col sm:flex-row sm:items-center gap-1"}>
          <span className={"sm:basis-25"}>Password</span>
          <input
            className={"w-full"}
            data-testid="password"
            disabled={loading}
            type="password"
          />
        </label>
      </div>
      <div className={"flex items-center justify-between"}>
        <a href="" className={"link"}>
          Forget the password?
        </a>
        <button
          className={"btn btn-primary"}
          data-testid="submit"
          disabled={loading}
          type="submit"
        >
          {loading ? "Trying to sign in.." : "Sign In"}
        </button>
      </div>
    </form>
  );
};

export default SigninForm;
