import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";
import Button from "@mui/material/Button";

export const DeckOfCards = () => {
  return (
    <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
      <Button>One</Button>
      <Button>Two</Button>
    </ButtonGroup>
  );
};
