import React from "react";
import SigninForm from "@components/auth/SigninForm";

const Auth = () => {
  return (
    <article
      className="content flex items-center justify-center w-screen"
      data-testid="auth"
    >
      <section className="card w-full max-w-lg p-5 rounded">
        <h3 data-testid="title">Signin</h3>
        <SigninForm />
      </section>
    </article>
  );
};

export default Auth;
