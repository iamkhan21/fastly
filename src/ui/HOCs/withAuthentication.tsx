import React, { FC, useEffect } from "react";
import { useAuth } from "@application/auth";
import Loader from "@ui/components/shared/Loader";
import { UserState } from "@application/auth/types";
import { useAppGate } from "@application/app";

const Auth = React.lazy(() => import("@ui/views/Auth"));

const withAuthentication = (
  Component: FC,
  useAuthHook: () => UserState = useAuth,
  useGateHook: () => void = useAppGate
) => {
  return () => {
    useGateHook();
    const user: UserState = useAuthHook();

    useEffect(() => {
      document.title = `Dispatch Portal | ${import.meta.env.VITE_PROJECT_NAME}`;
    }, []);

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
