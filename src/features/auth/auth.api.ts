import { instance } from "common/api/common.api";

const message = `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/set-new-password/$token$'>
link</a>
</div>`;

export const authApi = {
  register: (arg: ArgRegisterType) => {
    return instance.post<RegisterResponseType>("/auth/register", arg);
  },
  login: (arg: ArgLoginType) => {
    return instance.post<ProfileType>("/auth/login", arg);
  },
  forgot: (email: string) => {
    return instance.post(
      "https://neko-back.herokuapp.com/2.0/auth/forgot",
      { email, message },
      { withCredentials: true }
    );
  },
  newPassword: (data: NewPasswordType) => {
    return instance.post("/auth/set-new-password", data);
  },
  me: () => {
    return instance.post<ProfileType>("/auth/me");
  },
  logout: () => {
    return instance.delete<{ info: string }>("/auth/me");
  },
};

// Types

export type LogoutType = {
  info: string;
  error: string;
};
export type NewPasswordType = {
  password: string;
  resetPasswordToken: string | undefined;
};
export type ArgLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
  confirmPassword?: string;
};

//т.е. в ArgRegisterType не нужен rememberMe из ArgLoginType. Ну, все свойства одинаковые кроме rememberMe.
export type ArgRegisterType = Pick<ArgLoginType, "email" | "password" | "confirmPassword">;

export type ProfileType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
};

export type RegisterResponseType = {
  addedUser: Omit<ProfileType, "token" | "tokenDeathTime">;
};
