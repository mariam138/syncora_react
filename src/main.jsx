import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.jsx";
import SignUpForm from "./pages/auth/SignUpForm.jsx";
import Dashboard from "./pages/others/Dashboard.jsx";
import SignInForm from "./pages/auth/SignInForm.jsx";
import SignOutPage from "./pages/auth/SignOutPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import EventsList from "./pages/events/EventsList.jsx";
import EventDetail from "./pages/events/EventDetail.jsx";
import EventForm from "./pages/events/EventForm.jsx";
import TasksList from "./pages/tasks/TasksList.jsx";
import TaskDetail from "./pages/tasks/TaskDetail.jsx";
import TaskForm from "./pages/tasks/TaskForm.jsx";
// import NotesList from "./pages/notes/NotesList.jsx";
import NotesList from "./pages/notes/NotesList copy.jsx";
import NoteDetail from "./pages/notes/NoteDetail.jsx";
import NoteForm from "./pages/notes/NoteForm.jsx";
import LandingPage from "./pages/others/LandingPage.jsx";
import WrappedRoot from "./components/WrappedRoot.jsx";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <WrappedRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
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
            path: "profiles/:pk/",
            element: <ProfilePage />,
          },
          {
            path: "events/",
            element: <EventsList />,
          },
          {
            path: "events/:pk/",
            element: <EventDetail />,
          },
          {
            path: "events/new/",
            element: <EventForm />,
          },
          {
            path: "tasks/",
            element: <TasksList />,
          },
          {
            path: "tasks/new/",
            element: <TaskForm />,
          },
          {
            path: "tasks/:pk/",
            element: <TaskDetail />,
          },
          {
            path: "notes/",
            element: <NotesList />,
          },
          {
            path: "notes/:pk/",
            element: <NoteDetail />,
          },
          {
            path: "notes/new/",
            element: <NoteForm />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
