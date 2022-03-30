import React from "react";
import Button from "@mui/material/Button";

const NewPasswordInput = () => {
  return (
    <form className="pt-3">
      <div className="mb-3">
        <label className="flex flex-col sm:flex-row sm:items-center gap-2">
          <b className="sm:basis-50">New password</b>
          <input className="w-full input" data-testid="password" type="email" />
        </label>
      </div>
      <div className="mb-3">
        <label className="flex flex-col sm:flex-row sm:items-center gap-2">
          <b className="sm:basis-50">Repeat password</b>
          <input className="w-full input" data-testid="password" type="email" />
        </label>
      </div>

      <div className="flex justify-end">
        <Button variant="contained">Save new password</Button>
      </div>
    </form>
  );
};

export default NewPasswordInput;
