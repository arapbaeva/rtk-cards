import { instance } from "common/api/common.api";

export const packsApi = {
  getPacks: (data: getParamsPacksType) => {
    debugger;
    return instance.get("/cards/pack", { data });
  },
};

export type getParamsPacksType = {
  packName?: string; // не обязательно
  min?: number; // не обязательно
  max?: number; // не обязательно
  sortPacks?: string; // не обязательно
  page?: number; // не обязательно
  pageCount?: number; // не обязательно
  user_id: string;
};

export type PackResponseType = {
  cardPacks: PackResponseTypeCardPacks[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};
export type PackResponseTypeCardPacks = {
  _id: string;
  user_id: string;
  user_name: string;
  name: string;
  private: boolean;
  path: string;
  grade: number;
  shots: number;
  cardsCount: number;
  deckCover: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
};
