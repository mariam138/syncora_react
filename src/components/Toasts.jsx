import { toast, Bounce } from "react-toastify";
import React from "react";

const SuccessToast = ({ message }) => {
  toast.success({message}, {
    position: "top-center",
    autoClose: 3500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export default SuccessToast;
