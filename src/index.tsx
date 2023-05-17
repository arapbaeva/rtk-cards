import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "app/store";
import App from "app/App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "features/auth/login/Login";
import SignUp from "features/auth/sign-up/SignUp";
import { ForgotPassword } from "features/auth/forgot-password/ForgotPassword";
import { SetNewPassword } from "features/auth/set-new-password/SetNewPassword";
import { CheckEmail } from "features/auth/check-email/CheckEmail";
import { Profile } from "features/profile/Profile";
import { GlobalError } from "common/components/GlobalError/GlobalError";
import { Packs } from "features/packs/Packs";
import { Header } from "common/components/Header/Header";
import { router } from "common/routes/Routes";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <GlobalError />,
//
//     children: [
//       {
//         path: "/",
//         element: <div>Hello world!</div>,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "/register",
//         element: <SignUp />,
//       },
//       {
//         path: "/forgot",
//         element: <ForgotPassword />,
//       },
//       {
//         path: "/set-new-password/:token",
//         element: <SetNewPassword />,
//       },
//       {
//         path: "/check-email",
//         element: <CheckEmail />,
//       },
//       {
//         path: "/profile",
//         element: <Profile />,
//       },
//       {
//         path: "/packs",
//         element: <Packs />,
//       },
//     ],
//   },
// ]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <GlobalError />
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
