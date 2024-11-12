import SideBar from "../components/SideBar";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import { Outlet } from "react-router-dom";
import { useCurrentUser } from "../contexts/useCurrentUser";
import TopNavbar from "../components/TopNavbar";
import { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import appStyles from "../App.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

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
    <div className={appStyles.App}>
      <Stack direction="horizontal">
        {/* Only displays top navbar if a user is authenticated
        and the screensize is larger than 992px */}
        {currentUser && !screenSize && <TopNavbar />}
        <SideBar />
        {/* Displays username only if user is authenticated and
        the screensize is smaller than 992px */}
        {currentUser && screenSize && (
          <Navbar fixed="top" className={`${appStyles.WelcomeNav}`}>
            <Container>
              <Navbar.Text className="ms-auto">
                Welcome {currentUser?.username}
              </Navbar.Text>
            </Container>
          </Navbar>
        )}
        <ToastContainer />

        <Container
          className={`${screenSize ? "mt-5" : appStyles.Container} mb-auto overflow-y-auto overflow-x-hidden pb-3`}
        >
          <Outlet />
        </Container>
      </Stack>
    </div>
  );
};

export default root;
