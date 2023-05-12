import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAppSelector } from "app/hooks";
import "react-toastify/dist/ReactToastify.css";

export const GlobalError = () => {
  const error = useAppSelector((state) => state.app.error);

  if (error !== null) {
    toast.error(error);
  }
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};
