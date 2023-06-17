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
    await packsApi.createPacks(arg);
  });
});

const deletePacks = createAppAsyncThunk<any, any>("packs/deletePacks", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.deletePacks(arg);
    // thunkAPi.dispatch(getPacks())
    return res.data.deletedCardsPack._id;
  });
});

const slice = createSlice({
  name: "packs",
  initialState: {
    cardPacks: [] as PackResponseTypeCardPacks[],
    packId: "",
    newCardsPack: {} as CreatePacksDataType,
    packName: "",
    deckCover: "",
  },
  reducers: {
    setPacks: (state, action) => {
      state.cardPacks = action.payload.cardPacks;
    },
    createPacks: (state, action) => {
      state.newCardsPack = action.payload.newCardsPack;
    },
    setSearchPacks: (state, action) => {
      state.packName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.cardPacks = action.payload;
    });
    builder.addCase(createPacks.fulfilled, (state, action) => {
      state.cardPacks = action.payload;
    });
    builder.addCase(deletePacks.fulfilled, (state, action) => {
      // state.cardPacks = action.payload.cardPacks.filter((pack: any) => pack._id !== action.payload.packId);
      state.packId = action.payload;
    });
  },
});

export const packsReducer = slice.reducer;
export const packsActions = slice.actions;
export const packsThunks = { getPacks, createPacks, deletePacks };
