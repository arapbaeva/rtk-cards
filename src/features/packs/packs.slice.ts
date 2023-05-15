import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { thunkTryCatch } from "common/utils/thunk-try-catch";
import { getParamsPacksType, PackResponseType, PackResponseTypeCardPacks, packsApi } from "features/packs/packs.api";

const getPacks = createAppAsyncThunk<PackResponseTypeCardPacks[], getParamsPacksType>(
  "packs/getPacks",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.getPacks({
        sortPacks: arg.sortPacks,
        packName: arg.packName,
        min: arg.min,
        page: arg.page,
        pageCount: arg.pageCount,
        max: arg.max,
        user_id: arg.user_id,
      });

      return res.data.cardPacks;
    });
  }
);

const slice = createSlice({
  name: "packs",
  initialState: {
    packs: [] as PackResponseTypeCardPacks[],
  },
  reducers: {
    setPacks: (state, action) => {
      state.packs = action.payload.packs;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.packs = action.payload;
    });
  },
});

export const packsReducer = slice.reducer;
export const packsActions = slice.actions;
export const packsThunks = { getPacks };
