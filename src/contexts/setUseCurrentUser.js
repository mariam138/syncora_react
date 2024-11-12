import { useContext } from "react";
import { SetCurrentUserContext } from "./currentUserContext";

export const useSetCurrentUser = () => {
  return useContext(SetCurrentUserContext);
};
