import React from "react";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";

export const SignUp = () => {
  const dispatch = useAppDispatch();

  const registerHandler = () => {
    const payload = { email: "safrondev2@gmail.com", password: "12345678" };
    dispatch(authThunks.register(payload));
  };

  return (
    <div>
      <h1>Register</h1>
      <button onClick={registerHandler}>register</button>
    </div>
  );
};
