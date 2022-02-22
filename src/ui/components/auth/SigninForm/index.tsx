import React, { FormEvent, useState } from "react";
import { signIn, signinFx } from "@application/auth";
import { useStore } from "effector-react";

const SigninForm = ({ useStoreHook = useStore }) => {
  const loading = useStoreHook(signinFx.pending);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn({ email: "", password: "" });
  }

  return (
    <form className="py-3" onSubmit={onSubmit}>
      <div>
        <label>
          <span>Email</span>
          <input data-testid="email" disabled={loading} type="email" />
        </label>
      </div>
      <div>
        <label>
          <span>Password</span>
          <input data-testid="password" disabled={loading} type="password" />
        </label>
      </div>
      <div>
        <button data-testid="submit" disabled={loading} type="submit">
          {loading ? "Trying to sign in.." : "Sign In"}
        </button>
      </div>
    </form>
  );
};

export default SigninForm;
