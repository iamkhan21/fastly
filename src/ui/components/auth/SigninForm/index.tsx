import React, { FormEvent, useEffect, useState } from "react";
import { $authFail, signIn, signinFx } from "@application/auth";
import { useStore } from "effector-react";
import { Link } from "wouter";
import { animate } from "motion";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const SigninForm = ({ useStoreHook = useStore }) => {
  const loading = useStoreHook(signinFx.pending);
  const error = useStoreHook($authFail);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

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
        <TextField
          label="Email"
          variant="standard"
          fullWidth
          name="email"
          data-testid="email"
          disabled={loading}
          onChange={onInput}
          value={email}
          type="email"
          required
        />
      </div>
      <div className="mb-4">
        <TextField
          label="Password"
          variant="standard"
          fullWidth
          name="password"
          data-testid="password"
          disabled={loading}
          onInput={onInput}
          value={password}
          type="password"
          required
        />
      </div>
      <p id="error" className="text-red-500 h-6">
        <small>{error}</small>
      </p>
      <div className="flex items-center justify-between">
        <Link href="/reset-password" className="link">
          Forget the password?
        </Link>
        <Button
          variant="contained"
          data-testid="submit"
          disabled={loading || disabled}
          type="submit"
        >
          {loading ? "Trying to sign in.." : "Sign In"}
        </Button>
      </div>
    </form>
  );
};

export default SigninForm;
