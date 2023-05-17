import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { paths } from "common/constants/paths";
import ErrorImg from "assets/images/notFound.svg";
import Button from "@mui/material/Button";

export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Grid sx={{ paddingTop: 8 }} direction={"column"} container gap={2} justifyContent={"center"} alignItems={"center"}>
      <Typography fontWeight={"bold"} variant={"h1"} fontSize={"xxx-large"}>
        Ooops!
      </Typography>
      <Typography fontSize={"larger"}>Sorry, an unexpected error has occurred or page not found!</Typography>
      <img alt={"NotFound"} src={ErrorImg} />
      <Button onClick={() => navigate(paths.LOGIN)} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Back to home page
      </Button>
    </Grid>
  );
};
