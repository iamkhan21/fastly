import React from "react";

const ResetEmailInput = () => {
  return (
    <form className="pt-3">
      <div className="mb-3">
        <label className="flex flex-col sm:flex-row sm:items-center gap-2">
          <b className="sm:basis-15">Email</b>
          <input className="w-full input" data-testid="password" type="email" />
        </label>
      </div>

      <div className="flex justify-end">
        <button className="btn btn-primary">Send reset link</button>
      </div>
    </form>
  );
};

export default ResetEmailInput;
