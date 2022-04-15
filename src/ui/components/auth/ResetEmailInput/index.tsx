import React, { FC } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { $authFail, signinFx } from "@application/auth";
import { useStore } from "effector-react";

interface Props {
  usePendingHook?: () => boolean;
  useErrorHook?: () => string | null;
}

interface FormInputs {
  email: string;
}

const schema = z.object({
  email: z.string().email(),
});

function useResetPending(): boolean {
  return useStore(signinFx.pending);
}

function useResetError(): string | null {
  return useStore($authFail);
}

const ResetEmailInput: FC<Props> = ({
  // TODO: Replace reset password effect
  usePendingHook = useResetPending,
  useErrorHook = useResetError,
}) => {
  const isLoading = usePendingHook();
  const error = useErrorHook();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: "onChange",
    delayError: 750,
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormInputs) => {
    // TODO: Call password reset event
    console.log(data);
  };

  const errorMsg = errors.email?.message || error;

  return (
    <form className="pt-3" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="mb-5">
        <label className="flex flex-col sm:flex-row sm:items-center gap-2">
          <b className="sm:basis-15">Email</b>
          <input
            className="w-full input"
            data-testid="email"
            type="email"
            disabled={isLoading}
            required
            {...register("email")}
          />
        </label>
        {errorMsg && (
          <span className="text-red-500" data-testid="error-msg">
            {errorMsg}
          </span>
        )}
      </div>
      <div className="flex justify-end">
        <button
          data-testid="submit"
          type="submit"
          className="btn btn-primary"
          disabled={isLoading || !isValid}
        >
          {isLoading ? "Sending..." : "Send reset link"}
        </button>
      </div>
    </form>
  );
};

export default ResetEmailInput;
