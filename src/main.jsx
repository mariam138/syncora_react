import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.jsx";
import SignUpForm from "./pages/auth/SignUpForm.jsx";
import Root from "./routes/root.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SignInForm from "./pages/auth/SignInForm.jsx";
import { CurrentUserProvider } from "./contexts/CurrentUserContext.jsx";
import SignOutPage from "./pages/auth/SignOutPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import EventsList from "./pages/events/EventsList.jsx";

/** Wraps the Root element with the CurrentUserProvider
 * ensuring context is available to all components in the app.
 * This also allows the useNavigate hook to be available to use
 * in the CurrentUserContext. The WrappedRoot element is then set
 * as the main element for the /* path.
 */
const WrappedRoot = () => (
  <CurrentUserProvider>
    <Root />
  </CurrentUserProvider>
);

const router = createBrowserRouter([
  {
    path: "/*",
    element: <WrappedRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "signup",
        element: <SignUpForm />,
      },
      {
        path: "signin",
        element: <SignInForm />,
      },
      {
        path: "signout",
        element: <SignOutPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "profiles/:pk",
        element: <ProfilePage />,
      },
      {
        path: "events",
        element: <EventsList />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
