import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as string | null,
    isLoading: false,
    isAppInitialized: false,
    status: "idle" as RequestStatusType,
  },
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
    setStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
