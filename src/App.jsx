import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Root from "./routes/root";
import "./api/axiosDefaults";
import { useState } from "react";

function App() {
  // This will be used to check whether a use is logged in or not
  // Initially set to null
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <>
      <div className={styles.App}>
        <Routes>
          <Route exact path="/" element={<Root />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
