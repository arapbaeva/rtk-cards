import React from "react";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";

export const SignIn = () => {
  const dispatch = useAppDispatch();

  const loginHandler = () => {
    const payload = { email: "safrondev2@gmail.com", password: "12345678", rememberMe: false };
    dispatch(authThunks.login(payload));
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={loginHandler}>login</button>
    </div>
  );
};
