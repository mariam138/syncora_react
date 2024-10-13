import { Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import Root from './routes/root'
import LoadingSpinner from './components/LoadingSpinner'

function App() {

  return (
    <>
      <div className={styles.App}>
        <Routes>
          <Route index element={<Root/>}  />
        </Routes>
        <LoadingSpinner />
      </div>
    </>
  )
}

export default App
