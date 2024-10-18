import SideBar from "../components/SideBar";
import { Stack } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import TopNavbar from "../components/TopNavbar";
import { useState, useEffect } from "react";

/**
 * This defines the root function, where all remaining roots become
 * children of. The <Outlet /> component provided by
 * React Router is where all children components are displayed.
 * The root will constantly show the <Sidebar /> component
 * and conditionally show the <TopNavbar /> component only if
 * a user is authenticated and the screen size is larger
 * than 992 px.
 */
const root = () => {
  const currentUser = useCurrentUser();
  const [screenSize, setScreenSize] = useState(window.innerWidth < 992);
  const updateTopNavbar = () => {
    setScreenSize(window.innerWidth < 992);
  };

  useEffect(() => {
    window.addEventListener("resize", updateTopNavbar);
    return () => window.removeEventListener("resize", updateTopNavbar);
  }, []);
  return (
    <>
      <Stack direction="horizontal">
        {currentUser && !screenSize && <TopNavbar />}
        <SideBar />
        <div className={`mx-auto `}>
          <Outlet />
        </div>
      </Stack>
    </>
  );
};

export default root;
