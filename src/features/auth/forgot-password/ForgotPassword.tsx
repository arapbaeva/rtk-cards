import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Input } from "@mui/material";
import { Copyright } from "common/copyright/Copyright";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authThunks } from "features/auth/auth.slice";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useAppSelector } from "common/hooks/useAppSelector";

const theme = createTheme();
export const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector((state) => state.app.status);
  const test = () => {
    return navigate("/check-email");
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (data) => {
      dispatch(authThunks.recoveryPassword(data.email));
      test();
    },
  });

  if (status === "succeeded") {
    return <Navigate to={"/check-email"} />;
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot your password
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <Input
              required
              fullWidth
              id="email"
              type="email"
              className={"input"}
              placeholder={"Email"}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <span className={"error-lbl"}>{formik.errors.email}</span>
            ) : null}
            <div className="info b-title bt14 color6">
              Enter your email address and we will send you further instructions
            </div>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Send Instructions
            </Button>
            <div className="bottom">
              <div className="b-title bt14 semibold align-center">Did you remember your password?</div>
              <NavLink to={"/login"} className="b-title bt16 semibold align-center">
                Try logging in
              </NavLink>
            </div>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
