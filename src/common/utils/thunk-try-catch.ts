import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootState } from "app/store";
import { appActions } from "app/app.slice";

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  logic: Function,
  showGlobalError: boolean = true
) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  // dispatch(appActions.setStatus({ status: "loading" }));
  try {
    return await logic();
  } catch (e) {
    return rejectWithValue({ e, showGlobalError });
  }
  // } finally {
  //   dispatch(appActions.setStatus({ status: "idle" }));
  // }
};
