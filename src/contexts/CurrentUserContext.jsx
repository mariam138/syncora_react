import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api, { apiResp } from "../api/axiosDefaults";
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

  // Set requests before children are mounted
  useMemo(() => {
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
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
