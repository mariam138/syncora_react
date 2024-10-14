import { Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import Root from './routes/root'
import SideBar from './components/SideBar'
import TopNavbar from './components/TopNavbar'

function App() {

  return (
    <>
      <div className={styles.App}>
        <Routes>
          <Route path='*' element={<Root />} />
        </Routes>
        {/* <TopNavbar />
        <SideBar /> */}
      </div>
    </>
  );
}

export default App
