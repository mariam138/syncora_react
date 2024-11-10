import { jwtDecode } from "jwt-decode";

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.access).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

// Create bool to check if token needs refreshing
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
