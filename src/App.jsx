import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Root from "./routes/root";
import "./api/axiosDefaults";
import { createContext, useEffect, useState } from "react";
import api from "./api/axiosDefaults";

// Creates custom context object for the current user to be passed down the component tree
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  // This will be used to check whether a use is logged in or not
  // Initially set to null
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      const { data } = await api.get("dj-rest-auth/user");
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

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <SetCurrentUserContext.Provider value={setCurrentUser}>
          <div className={styles.App}>
            <Routes>
              <Route exact path="/" element={<Root />} />
            </Routes>
          </div>
        </SetCurrentUserContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
