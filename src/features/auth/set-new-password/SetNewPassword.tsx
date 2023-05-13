import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authThunks } from "features/auth/auth.slice";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { IconButton, Input, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { Copyright } from "common/copyright/Copyright";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "common/hooks";

const theme = createTheme();

export const SetNewPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useAppDispatch();
  const { token } = useParams();
  const status = useAppSelector((state) => state.app.status);
  const navigate = useNavigate();
  const test = () => {
    navigate("/login");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required").matches(/.{8,}/, {
        excludeEmptyString: true,
        message: "Must min 8 characters",
      }),
    }),
    onSubmit: (data) => {
      if (token) {
        dispatch(authThunks.newPassword({ password: data.password, resetPasswordToken: token }));
        test();
      }
    },
  });

  // if (status === "succeeded") {
  //   return <Navigate to={"/login"} />;
  // }
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
            Create new password
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <Input
              required
              fullWidth
              id="password"
              placeholder={"Password"}
              type={showPassword ? "text" : "password"}
              {...formik.getFieldProps("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {formik.touched.password && formik.errors.password ? (
              <span className={"error-lbl"}>{formik.errors.password}</span>
            ) : null}
            <div className="info b-title bt14 color6">
              Create new password and we will send you further instructions to email
            </div>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Create new password
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
