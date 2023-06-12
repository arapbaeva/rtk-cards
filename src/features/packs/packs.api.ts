import { PacksInstance } from "features/packs/packs.instance";

export const packsApi = {
  getPacks: (params: GetParamsPacksType) => {
    return PacksInstance.get("pack", {
      params,
    });
  },
  createPacks: (data: CreatePacksDataType) => {
    return PacksInstance.post("pack", { cardsPack: data });
  },
};
export type CreatePacksDataType = {
  name: string; // если не отправить будет таким
  deckCover?: string; // не обязателен
  private: boolean; // если не отправить будет такой
};

export type GetParamsPacksType = {
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
