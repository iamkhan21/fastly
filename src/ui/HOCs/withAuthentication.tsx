import React, { FC } from "react";
import { useAuth } from "@application/auth";
import Loader from "@ui/components/shared/Loader";
import { UserState } from "@application/auth/types";
import { useAppGate } from "@application/app";
import { useTitle } from "hoofd";

const Auth = React.lazy(() => import("@ui/views/Auth"));

const withAuthentication = (
  Component: FC,
  useAuthHook: () => UserState = useAuth,
  useGateHook: () => void = useAppGate
) => {
  return () => {
    useTitle(`Dispatch Portal | ${import.meta.env.VITE_PROJECT_NAME}`);
    useGateHook();
    const user: UserState = useAuthHook();

    if (!user) {
      return <Loader />;
    }

    return (
      <React.Suspense fallback={<p>loading..</p>}>
        {user.uid ? <Component /> : <Auth />}
      </React.Suspense>
    );
  };
};

export default withAuthentication;
