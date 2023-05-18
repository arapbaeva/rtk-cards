import Box from "@mui/material/Box";
import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { SliderFilter } from "common/components/filter/sliderFilter/SliderFilter";
import { SearchBar } from "common/components/filter/searchBar/SearchBar";
import { DeckOfCards } from "common/components/filter/deckOfCards/DeckOfCards";
import { StyledDiv } from "common/styles/styledDiv/StyledDiv";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { FilterRemove } from "common/components/filter/filterRemove/FilterRemove";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export const Filter = () => {
  return (
    <Box sx={{ flexGrow: 1, justifyContent: "space-between" }}>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <SearchBar tableName={"packs"} />
        </Grid>
        <Grid item xs={2}>
          <DeckOfCards />
        </Grid>
        <Grid item xs={3}>
          <SliderFilter />
        </Grid>
        <Grid item xs={1}>
          <FilterRemove />
        </Grid>
      </Grid>
    </Box>
  );
};
