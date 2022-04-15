import React, { FC } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { $authFail, signinFx } from "@application/auth";
import { useStore } from "effector-react";

interface Props {
  useStoreHook?: () => boolean | string;
}

interface FormInputs {
  email: string;
}

const schema = z.object({
  email: z.string().email(),
});

const ResetEmailInput: FC<Props> = ({ useStoreHook = useStore }) => {
  // TODO: Replace reset password effect
  const isLoading = useStoreHook(signinFx.pending) as boolean;
  const error = useStoreHook($authFail) as string;

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
    console.log(data);
    // TODO: Call password reset event
  };

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
        {errors.email && (
          <span className="text-red-500" data-testid="error-msg">
            {errors.email?.message}
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
