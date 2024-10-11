import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route index element={() => <p>Hello World!</p> }  />
        </Routes>
      </div>
    </>
  )
}

export default App
