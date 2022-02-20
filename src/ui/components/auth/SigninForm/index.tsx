import React, { FormEvent, useState } from "react";
import { signIn } from "@application/auth";

const SigninForm = () => {
  const [loading, setLoading] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();

    setTimeout(() => {
      signIn({ email: "", password: "" });
    }, 1000);
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
