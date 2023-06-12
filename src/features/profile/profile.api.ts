import { ProfileType } from "features/auth/auth.api";
import { AuthInstance } from "features/auth/auth.instance";

export const profileApi = {
  changeUserData: (data: UserProfile) => {
    return AuthInstance.put<"", UserUpdateResponse, UserProfile>("me", data);
  },
};

export type UserProfile = {
  name?: string;
  avatar?: string;
};

export type UserUpdateResponse = {
  updatedUser: ProfileType;
  error?: string;
};
