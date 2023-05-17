import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { thunkTryCatch } from "common/utils/thunk-try-catch";
import { CreatePacksDataType, GetParamsPacksType, PackResponseTypeCardPacks, packsApi } from "features/packs/packs.api";

const getPacks = createAppAsyncThunk<PackResponseTypeCardPacks[], GetParamsPacksType>(
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

const createPacks = createAppAsyncThunk<any, any>("packs/createPacks", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.createPacks(arg);
    console.log(res, "resss");
  });
});

const slice = createSlice({
  name: "packs",
  initialState: {
    cardPacks: [] as PackResponseTypeCardPacks[],
    newCardsPack: {} as CreatePacksDataType,
  },
  reducers: {
    setPacks: (state, action) => {
      state.cardPacks = action.payload.cardPacks;
    },
    createPacks: (state, action) => {
      state.newCardsPack = action.payload.newCardsPack;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.cardPacks = action.payload;
    });
    builder.addCase(createPacks.fulfilled, (state, action) => {
      state.cardPacks = action.payload;
    });
  },
});

export const packsReducer = slice.reducer;
export const packsActions = slice.actions;
export const packsThunks = { getPacks, createPacks };
