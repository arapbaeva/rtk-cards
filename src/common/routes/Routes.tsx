import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { paths } from "common/constants/paths";
import App from "app/App";
import { ErrorPage } from "common/components/errorPage/ErrorPage";
import { Packs } from "features/packs/Packs";
import { Profile } from "features/profile/Profile";
import SignUp from "features/auth/sign-up/SignUp";
import Login from "features/auth/login/Login";
import { SetNewPassword } from "features/auth/set-new-password/SetNewPassword";
import { ForgotPassword } from "features/auth/forgot-password/ForgotPassword";
import { CheckEmail } from "features/auth/check-email/CheckEmail";

export const router = createBrowserRouter([
  {
    path: paths.PACK_LIST,
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: paths.PACK_LIST,
    element: <Profile />,
  },
  {
    path: paths.PACK,
    element: <Packs />,
  },
  {
    path: paths.USER_PROFILE,
    element: <Profile />,
  },
  // {
  //   path: paths.LEARN_PACK,
  //   element: <Learn />,
  // },

  {
    path: paths.REGISTRATION,
    element: <SignUp />,
  },
  {
    path: paths.LOGIN,
    element: <Login />,
  },
  {
    path: paths.SET_NEW_PASSWORD,
    element: <SetNewPassword />,
  },
  {
    path: paths.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: paths.CHECK_EMAIL,
    element: <CheckEmail />,
  },
]);
