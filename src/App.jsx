import { Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import Root from './routes/root'
import SideBar from './components/SideBar'

function App() {

  return (
    <>
      <div className={styles.App}>
        <SideBar />
        <Routes>
          <Route index element={<Root/>}  />
        </Routes>
      </div>
    </>
  )
}

export default App
