import React, { FormEvent, useEffect, useState } from "react";
import { $authFail, signIn, signinFx } from "@application/auth";
import { useStore } from "effector-react";
import { Link } from "wouter";
import { animate } from "motion";

const SigninForm = ({ useStoreHook = useStore }) => {
  const loading = useStoreHook(signinFx.pending);
  const error = useStoreHook($authFail);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onInput(e: FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;

    switch (name) {
      case "email": {
        return setEmail(value);
      }
      case "password": {
        return setPassword(value);
      }
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    signIn({
      email: email.trim(),
      password: password.trim(),
    });
  }

  useEffect(() => {
    if (error) {
      animate(
        "#error",
        { x: [0, -10, 10, -10, 10, -10, 0] },
        { duration: 0.5 }
      );
    }
  }, [error]);

  const disabled = !email.trim() || !password.trim();
  return (
    <form className="pt-3" onSubmit={onSubmit} autoComplete="off">
      <div className="mb-3">
        <label className="flex flex-col sm:flex-row sm:items-center gap-2">
          <b className="sm:basis-25">Email</b>
          <input
            name="email"
            className="w-full input"
            data-testid="email"
            disabled={loading}
            onChange={onInput}
            value={email}
            type="email"
            required
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="flex flex-col sm:flex-row sm:items-center gap-2">
          <b className="sm:basis-25">Password</b>
          <input
            name="password"
            className="w-full input"
            data-testid="password"
            disabled={loading}
            onChange={onInput}
            value={password}
            type="password"
            required
          />
        </label>
      </div>
      <p id="error" className="text-red-500 h-6">
        <small>{error}</small>
      </p>
      <div className="flex items-center justify-between">
        <Link href="/reset-password" className="link">
          Forget the password?
        </Link>
        <button
          className="btn btn-primary"
          data-testid="submit"
          disabled={loading || disabled}
          type="submit"
        >
          {loading ? "Trying to sign in.." : "Sign In"}
        </button>
      </div>
    </form>
  );
};

export default SigninForm;
