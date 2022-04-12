import React, { lazy } from "react";
import ComponentLoader from "@components/shared/ComponentLoader";

const ResetEmailInput = lazy(() => import("@components/auth/ResetEmailInput"));
const NewPasswordInput = lazy(
  () => import("@components/auth/NewPasswordInput")
);

const PasswordReset = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  return (
    <article className="content flex items-center justify-center w-screen">
      <section className="card w-full max-w-lg p-5 rounded">
        <h3 data-testid="title">Password Reset</h3>
        <React.Suspense fallback={<ComponentLoader />}>
          {token ? <NewPasswordInput /> : <ResetEmailInput />}
        </React.Suspense>
      </section>
    </article>
  );
};

export default PasswordReset;
