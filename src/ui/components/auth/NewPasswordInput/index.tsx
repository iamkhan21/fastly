import React, { FC } from "react";
import { z } from "zod";
import { useStore } from "effector-react";
import { checkStringNotEmpty } from "@lib/validators";
import { $authFail, signinFx } from "@application/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  useStoreHook?: () => boolean | string;
}

interface FormInputs {
  password: string;
}

const schema = z.object({
  password: z.string().refine(checkStringNotEmpty),
});

const NewPasswordInput: FC<Props> = ({ useStoreHook = useStore }) => {
  const isLoading = useStoreHook(signinFx.pending) as boolean;
  const error = useStoreHook($authFail) as string;

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormInputs>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormInputs) {
    console.log(data);
  }

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
