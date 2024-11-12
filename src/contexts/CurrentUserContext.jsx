import { useEffect, useMemo, useState } from "react";
import api, { apiReq, apiResp } from "../api/axiosDefaults";
import { useNavigate } from "react-router-dom";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";
import { WarningToast } from "../functions/toasts";
import {
  CurrentUserContext,
  SetCurrentUserContext,
} from "./currentUserContextVars";

export const CurrentUserProvider = ({ children }) => {
  // This will be used to check whether a use is logged in or not
  // Initially set to null
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      const { data } = await apiResp.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (error) {
      WarningToast(
        "There was an issue loading your user data. Please try again later.",
      );
    }
  };

  // Set the current user data when a component mounts
  // Empty array to allow the effect to run only once
  useEffect(() => {
    handleMount();
  }, []);

  // Sets up interceptors only once rather than on each component re-render
  // Will only change the memoized value when navigate changes
  // Code adapted from https://github.com/mr-fibonacci/moments/blob/a981c39da1671a70023a3d6f3cf1410164e84e06/src/contexts/CurrentUserContext.js
  useMemo(() => {
    // When sending a request to the api, refresh the user token
    // If the token has expired, if the user was previously
    // logged in, redirect them back to the sign in page
    // and set current user to null
    apiReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await api.post("/dj-rest-auth/token/refresh/");
          } catch (error) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }

        return config;
      },
      // Reject the error if one is returned
      (error) => {
        return Promise.reject(error);
      },
    );

    // Handles expired tokens in the response when API rejects a request
    // If 401 error arises, the token has expired so attempts to be refreshed
    // If refresh fails, check if the user was previously signed in
    // and redirect them back to the sign in page. Sets the current user
    // to null.
    apiResp.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            await api.post("/dj-rest-auth/token/refresh/");
          } catch (error) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return api(error.config);
        }
        return Promise.reject(error);
      },
    );
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
