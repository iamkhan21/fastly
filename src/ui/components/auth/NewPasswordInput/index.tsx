import React, { FC } from "react";
import { z } from "zod";
import { useStore } from "effector-react";
import { checkStringNotEmpty } from "@lib/validators";
import { $authFail, signinFx } from "@application/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  usePendingHook?: () => boolean;
  useErrorHook?: () => string | null;
}

interface FormInputs {
  password: string;
}

const schema = z.object({
  password: z.string().refine(checkStringNotEmpty),
});

function useNewPasswordPending(): boolean {
  return useStore(signinFx.pending);
}

function useNewPasswordError(): string | null {
  return useStore($authFail);
}

const NewPasswordInput: FC<Props> = ({
  // TODO: Replace new password effect
  usePendingHook = useNewPasswordPending,
  useErrorHook = useNewPasswordError,
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

  function onSubmit(data: FormInputs) {
    console.log(data);
  }

  const errorMsg = errors.password?.message || error;

  return (
    <form className="pt-3" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="mb-5">
        <label className="flex flex-col sm:flex-row sm:items-center gap-2">
          <b className="sm:basis-50">New password</b>
          <input
            className="w-full input"
            data-testid="password"
            type="password"
            disabled={isLoading}
            required
            {...register("password")}
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
          {isLoading ? "Saving..." : "Save new password"}
        </button>
      </div>
    </form>
  );
};

export default NewPasswordInput;
