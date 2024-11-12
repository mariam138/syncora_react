import { useContext } from "react";
import { CurrentUserContext } from "./currentUserContextVars";

// Create custom context hooks
export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};
