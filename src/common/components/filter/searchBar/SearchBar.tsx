import React from "react";
import { TextField } from "@mui/material";

export const SearchBar = () => {
  return <TextField id="filled-search" label="Search field" type="search" variant="filled" fullWidth sx={{ m: 1 }} />;
};
