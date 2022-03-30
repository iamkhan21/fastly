import React from "react";
import SigninForm from "@ui/components/auth/SigninForm";
import Card from "@mui/material/Card";

const Auth = () => {
  return (
    <article
      className="content flex items-center justify-center w-screen"
      data-testid="auth"
    >
      <Card className="w-full max-w-md p-5">
        <h3 data-testid="title">Signin</h3>
        <SigninForm />
      </Card>
    </article>
  );
};

export default Auth;
