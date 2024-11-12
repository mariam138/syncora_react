import { Route, Routes } from "react-router-dom";
import Root from "./routes/Root";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route exact path="/" element={<Root />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
