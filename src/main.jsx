import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/ErrorPage.jsx'
import SignUpForm from './pages/SignUpForm.jsx'
import Root from './routes/root.jsx'

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'signup',
        element: <SignUpForm />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
