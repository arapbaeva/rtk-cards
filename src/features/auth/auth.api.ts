import { AuthInstance } from "features/auth/auth.instance";

const message = `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/set-new-password/$token$'>
link</a>
</div>`;

export const authApi = {
  register: (arg: ArgRegisterType) => {
    return AuthInstance.post<RegisterResponseType>("register", arg);
  },
  login: (arg: ArgLoginType) => {
    return AuthInstance.post<ProfileType>("login", arg);
  },
  forgot: (email: string) => {
    return AuthInstance.post(
      "https://neko-back.herokuapp.com/2.0/auth/forgot",
      { email, message },
      { withCredentials: true }
    );
  },
  newPassword: (data: NewPasswordType) => {
    return AuthInstance.post("set-new-password", data);
  },
  me: () => {
    return AuthInstance.post<ProfileType>("me");
  },
  logout: () => {
    return AuthInstance.delete<{ info: string }>("me");
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
