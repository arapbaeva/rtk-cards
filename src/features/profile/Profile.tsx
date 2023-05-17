import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IMG from "assets/images/image-2.png";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { EditableSpan } from "common/components/EditableSpan";
import { authThunks } from "features/auth/auth.slice";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useAppSelector } from "common/hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export const Profile = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.auth.profile);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const editName = (name: string) => {
    dispatch(authThunks.updateUserData({ name }));
  };

  const logoutHandler = () => {
    dispatch(authThunks.logout());
  };

  if (!isLoggedIn) {
    navigate("/login");
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Personal Information
          </Typography>
          <Box sx={{ mt: 1 }}>
            <img alt="Travis Howard" src={IMG} />
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </Box>
          <div className="info b-title bt14 color6">
            <EditableSpan name={profile ? profile.name : ""} callback={editName} />
          </div>
          <div>{profile?.email}</div>
          <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }} onClick={logoutHandler}>
            <LogoutIcon />
            Log out
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
