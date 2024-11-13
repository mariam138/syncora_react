import { jwtDecode } from "jwt-decode";

export const setTokenTimestamp = (data) => {
  const accessTokenTimestamp = jwtDecode(data?.access).exp;
  console.log(accessTokenTimestamp)
  localStorage.setItem("accessTokenTimestamp", accessTokenTimestamp);
};

// Create bool to check if token needs refreshing
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("accessTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("accessTokenTimestamp");
};
