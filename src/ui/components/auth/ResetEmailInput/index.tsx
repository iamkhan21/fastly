import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface IFormInputs {
  email: string;
}

const schema = z.object({
  email: z.string().email(),
});

const ResetEmailInput = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    mode: "onChange",
    delayError: 750,
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: IFormInputs) => {
    console.log(data);

    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 5_000);
  };

  return (
    <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="flex flex-col sm:flex-row sm:items-center gap-2">
          <b className="sm:basis-15">Email</b>
          <input
            className="w-full input"
            data-testid="email"
            type="email"
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
