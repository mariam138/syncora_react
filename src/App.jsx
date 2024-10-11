import { Route, Routes } from 'react-router-dom'
import './App.css'
import Root from './routes/root'

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route index element={<Root/>}  />
        </Routes>
      </div>
    </>
  )
}

export default App
