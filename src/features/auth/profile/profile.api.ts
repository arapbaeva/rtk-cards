import { instance } from "common/api/common.api";
import { ProfileType } from "features/auth/auth.api";

export const profileApi = {
  changeUserData: (data: UserProfile) => {
    return instance.put<"", UserUpdateResponse, UserProfile>("/auth/me", data);
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
