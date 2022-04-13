import React from "react";

const NewPasswordInput = () => {
  return (
    <form className="pt-3">
      <div className="mb-3">
        <label className="flex flex-col sm:flex-row sm:items-center gap-2">
          <b className="sm:basis-50">New password</b>
          <input
            className="w-full input"
            data-testid="password"
            type="password"
          />
        </label>
      </div>
      <div className="mb-3">
        <label className="flex flex-col sm:flex-row sm:items-center gap-2">
          <b className="sm:basis-50">Repeat password</b>
          <input
            className="w-full input"
            data-testid="password2"
            type="password"
          />
        </label>
      </div>

      <div className="flex justify-end">
        <button data-testid="submit" type="submit" className="btn btn-primary">
          Save new password
        </button>
      </div>
    </form>
  );
};

export default NewPasswordInput;
