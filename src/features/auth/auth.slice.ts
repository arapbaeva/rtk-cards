import { createSlice } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi, NewPasswordType, ProfileType } from "features/auth/auth.api";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { profileApi, UserProfile } from "features/profile/profile.api";
import { thunkTryCatch } from "common/utils/thunk-try-catch";
import { appActions } from "app/app.slice";

const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg: ArgRegisterType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.register(arg);
  });
});

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>("auth/login", async (arg, thunkAPI) => {
  return thunkTryCatch(
    thunkAPI,
    async () => {
      const res = await authApi.login(arg);
      return { profile: res.data };
    },
    false
  );
});

const recoveryPassword = createAppAsyncThunk<{ email: string }, string>(
  "auth/recoveryPassword",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.forgot(arg);
      return { email: res.data.email };
    });
  }
);

const newPassword = createAppAsyncThunk<any, NewPasswordType>("auth/newPassword", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.newPassword(arg);
    return { data: res.data };
  });
});

const me = createAppAsyncThunk<ProfileType | null, void>("auth/me", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.me();
    return res.data;
  });
});

const updateUserData = createAppAsyncThunk<UserProfile, UserProfile>(
  "profile/updateUserName",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await profileApi.changeUserData(arg);
      return res.updatedUser;
    });
  }
);

const logout = createAppAsyncThunk("auth/logout", async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.logout();
  });
});
const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    successMessage: "" as string,
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
      state.isLoggedIn = true;
    });
    builder.addCase(me.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const authReducer = slice.reducer;
export const authThunks = { register, login, recoveryPassword, newPassword, me, updateUserData, logout };
export const authActions = slice.actions;
