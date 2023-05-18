import React, { ChangeEvent, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { packsActions } from "features/packs/packs.slice";

function useDebounce(value: string, delay: number = 800) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

type SearchBarType = {
  tableName: "packs" | "card";
};

export const SearchBar = ({ tableName }: SearchBarType) => {
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 1500);
  const dispatch = useAppDispatch();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  useEffect(() => {
    if (tableName === "packs") {
      dispatch(packsActions.setSearchPacks(search));
    }
  }, [debouncedSearchTerm]);

  return (
    <TextField
      id="search"
      label="Search field"
      type="text"
      variant="filled"
      fullWidth
      sx={{ m: 1 }}
      value={search}
      onChange={onChangeHandler}
    />
  );
};
