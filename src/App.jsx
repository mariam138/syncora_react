import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Root from "./routes/root";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";

function App() {
  return (
    <>
      {/* <CurrentUserProvider> */}
        <div className={styles.App}>
          <Routes>
            <Route exact path="/" element={<Root />} />
          </Routes>
        </div>
      {/* </CurrentUserProvider> */}
    </>
  );
}

export default App;
