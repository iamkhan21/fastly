import React, { FC, useEffect } from "react";
import { $authFail, signIn, signinFx } from "@application/auth";
import { useStore } from "effector-react";
import { Link } from "wouter";
import { animate } from "motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { checkStringNotEmpty } from "@lib/validators";

interface Props {
  usePendingHook?: () => boolean;
  useErrorHook?: () => string | null;
}

interface FormInputs {
  email: string;
  password: string;
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().refine(checkStringNotEmpty),
});

function useSigninPending(): boolean {
  return useStore(signinFx.pending);
}

function useSigninError(): string | null {
  return useStore($authFail);
}

const SigninForm: FC<Props> = ({
  usePendingHook = useSigninPending,
  useErrorHook = useSigninError,
}) => {
  const isLoading = usePendingHook();
  const error = useErrorHook();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormInputs>({
    mode: "onChange",
    delayError: 750,
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormInputs) {
    signIn(data);
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

  return (
    <form className="pt-3" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="mb-3">
        <label className="flex flex-col sm:flex-row sm:items-center gap-2">
          <b className="sm:basis-25">Email</b>
          <input
            className="w-full input"
            data-testid="email"
            disabled={isLoading}
            type="email"
            required
            {...register("email")}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="flex flex-col sm:flex-row sm:items-center gap-2">
          <b className="sm:basis-25">Password</b>
          <input
            className="w-full input"
            data-testid="password"
            disabled={isLoading}
            type="password"
            required
            {...register("password")}
          />
        </label>
      </div>
      <p id="error" className="text-red-500 h-6">
        <small>{error}</small>
      </p>
      <div className="flex items-center justify-between">
        <Link href="/reset-password" className="link">
          Forget the password?
        </Link>
        <button
          className="btn btn-primary"
          data-testid="submit"
          disabled={isLoading || !isValid}
          type="submit"
        >
          {isLoading ? "Trying to sign in.." : "Sign In"}
        </button>
      </div>
    </form>
  );
};

export default SigninForm;
