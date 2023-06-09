import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton, Input, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { authThunks } from "features/auth/auth.slice";
import { Copyright } from "common/copyright/Copyright";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { paths } from "common/constants/paths";

const theme = createTheme();

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const successMessage = useAppSelector((state) => state.auth.successMessage);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Password is required").matches(/.{8,}/, {
        excludeEmptyString: true,
        message: "Must min 8 characters",
      }),
    }),
    onSubmit: (data) => {
      dispatch(authThunks.login(data))
        .unwrap()
        .then((res) => {
          toast.success("Вы успешно залогинились");
        })
        .catch((err) => {
          toast.error(err.e.response.data.error);
        });
    },
  });

  if (isLoggedIn) {
    navigate("/");
  }

  return (
    <>
      {successMessage !== null && successMessage}
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
              Sign in
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
              <FormControlLabel
                control={<Checkbox color="primary" {...formik.getFieldProps("rememberMe")} />}
                label="Remember me"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href={paths.FORGOT_PASSWORD} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={paths.REGISTRATION} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
