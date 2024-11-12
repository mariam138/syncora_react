import { useContext } from "react";
import { CurrentUserContext } from "./currentUserContext";

// Create custom context hooks
export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};
