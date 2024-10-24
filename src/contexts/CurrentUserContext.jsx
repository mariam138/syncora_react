import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api, { apiReq, apiResp } from "../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

// Creates custom context object for the current user to be passed down the component tree
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// Create custom context hooks
export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};
export const useSetCurrentUser = () => {
  return useContext(SetCurrentUserContext);
};

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
      console.log(error);
    }
  };

  // Set the current user data when a component mounts
  // Empty array to allow the effect to run only once
  useEffect(() => {
    handleMount();
  }, []);

  // Sets up interceptors only once rather than on each component re-render
  // Will only change the memoized value when navigate changes
  useMemo(() => {
    // When sending a request to the api, refresh the user token
    // If the token has expired, if the user was previously
    // logged in, redirect them back to the sign in page
    // and set current user to null
    apiReq.interceptors.request.use(
      async (config) => {
        try {
          await api.post("/dj-rest-auth/token/refresh/");
        } catch (error) {
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              navigate("/signin");
            }
            return null;
          });
          return config;
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
