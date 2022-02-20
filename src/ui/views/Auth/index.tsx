import React from "react";
import SigninForm from "@ui/components/auth/SigninForm";

const Auth = () => {
  return (
    <article
      className="flex items-center justify-center w-screen p-5"
      data-testid="auth"
    >
      <section className="p-5 w-full max-w-lg rounded">
        <h3 data-testid="title">Signin</h3>
        <SigninForm />
      </section>
    </article>
  );
};

export default Auth;
