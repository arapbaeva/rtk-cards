import { createSlice, current } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi, NewPasswordType, ProfileType } from "features/auth/auth.api";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { profileApi, UserProfile } from "features/auth/profile/profile.api";

const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg: ArgRegisterType) => {
  await authApi.register(arg);
});

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>("auth/login", async (arg) => {
  const res = await authApi.login(arg);
  return { profile: res.data };
});

const recoveryPassword = createAppAsyncThunk<{ email: string }, string>("auth/recoveryPassword", async (arg) => {
  const res = await authApi.forgot(arg);
  return { email: res.data.email };
});

const newPassword = createAppAsyncThunk<any, NewPasswordType>("auth/newPassword", async (arg) => {
  const res = await authApi.newPassword(arg);
  return { data: res.data };
});

const me = createAppAsyncThunk<ProfileType | null, void>("auth/me", async (arg, thunkAPI) => {
  const res = await authApi.me();
  return res.data;
});

const updateUserData = createAppAsyncThunk<UserProfile, UserProfile>(
  "profile/updateUserName",
  async (arg, thunkAPI) => {
    const res = await profileApi.changeUserData(arg);
    return res.updatedUser;
  }
);
const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
    builder.addCase(me.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const authReducer = slice.reducer;
export const authThunks = { register, login, recoveryPassword, newPassword, me, updateUserData };
