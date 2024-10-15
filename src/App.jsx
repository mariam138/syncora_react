import { Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import Root from './routes/root'
import './api/axiosDefaults'

function App() {

  return (
    <>
      <div className={styles.App}>
        <Routes>
          <Route exact path='/' element={<Root />} />
        </Routes>
      </div>
    </>
  );
}

export default App
