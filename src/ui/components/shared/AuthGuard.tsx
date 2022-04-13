import React, { FC, lazy, ReactNode, Suspense } from "react";
import { UserState } from "@application/auth/types";
import Loader from "@components/shared/Loader";
import { useTitle } from "@hooks/useTitle";
import { useAppInit } from "@hooks/useAppInit";
import { useAuthState } from "@hooks/useAuthState";
import { useRoute } from "wouter";
import ComponentLoader from "@components/shared/ComponentLoader";

interface Props {
  children: ReactNode;
  useAuthHook?: () => UserState;
  useGateHook?: () => void;
  useTitleHook?: (title: string) => void;
}

const AuthView = lazy(() => import("@views/Auth"));
const PasswordResetView = lazy(() => import("@views/PasswordReset"));

const AuthComponents = () => {
  const [match] = useRoute("/reset-password");

  if (match) return <PasswordResetView />;

  return <AuthView />;
};

const AuthGuard: FC<Props> = ({
  children,
  useGateHook = useAppInit,
  useAuthHook = useAuthState,
  useTitleHook = useTitle,
}) => {
  useGateHook();
  useTitleHook(`Dispatch Portal | ${import.meta.env.VITE_PROJECT_NAME}`);
  const user: UserState = useAuthHook();

  if (!user) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<ComponentLoader />}>
      {user.uid ? children : <AuthComponents />}
    </Suspense>
  );
};

export default AuthGuard;
