import { createSlice, current } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi, NewPasswordType, ProfileType } from "features/auth/auth.api";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { profileApi, UserProfile } from "features/auth/profile/profile.api";
import { appActions } from "app/app.slice";

const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg: ArgRegisterType, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    await authApi.register(arg);
  } catch (e: any) {
    dispatch(appActions.setError({ error: e.response ? e.response.data.error : e.message }));
    return rejectWithValue(null);
  }
});

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>("auth/login", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await authApi.login(arg);
    return { profile: res.data };
  } catch (e: any) {
    dispatch(appActions.setError({ error: e.response ? e.response.data.error : e.message }));
    return rejectWithValue(null);
  }
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
