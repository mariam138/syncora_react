import { Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import Root from './routes/root'
import SideBar from './components/SideBar'
import TopNavbar from './components/TopNavbar'

function App() {

  return (
    <>
      <div className={styles.App}>
        <TopNavbar />
        <SideBar />
        <Routes>
          <Route index element={<Root/>}  />
        </Routes>
      </div>
    </>
  )
}

export default App
