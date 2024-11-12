import { useContext } from "react";
import { SetCurrentUserContext } from "./currentUserContextVars";

export const useSetCurrentUser = () => {
  return useContext(SetCurrentUserContext);
};
