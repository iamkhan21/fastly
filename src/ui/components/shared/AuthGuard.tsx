import React, { FC, lazy, Suspense } from "react";
import { UserState } from "@application/auth/types";
import Loader from "@ui/components/shared/Loader";
import { useAuth } from "@application/auth";
import { useAppGate } from "@application/app";
import { useTitle } from "@ui/hooks/useTitle";

interface Props {
  useAuthHook?: () => UserState;
  useGateHook?: () => void;
  useTitleHook?: (title: string) => void;
}

const Auth = lazy(() => import("@ui/views/Auth"));

const AuthGuard: FC<Props> = ({
  children,
  useGateHook = useAppGate,
  useAuthHook = useAuth,
  useTitleHook = useTitle,
}) => {
  useGateHook();
  useTitleHook(`Dispatch Portal | ${import.meta.env.VITE_PROJECT_NAME}`);
  const user: UserState = useAuthHook();

  if (!user) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<p>loading..</p>}>
      {user.uid ? children : <Auth />}
    </Suspense>
  );
};

export default AuthGuard;
