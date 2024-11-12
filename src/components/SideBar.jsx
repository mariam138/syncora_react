import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Link, NavLink } from "react-router-dom";
import styles from "../styles/SideBar.module.css";

import { useEffect, useState } from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";

/** Separate function for the menu links, destructuring
 * screenSize as a prop. If screenSize = true, then the
 * quick menu links will render. The rest of the links will
 * render despite the screensize prop. This is then used to
 * create a LoggedInMenuLinks component which is used in the
 * Sidebar arrow function below.
 */
const LoggedInMenuLinks = ({ screenSize }) => {
  // Use pk to set id of current user, to be used in url for profile page
  const currentUser = useCurrentUser();

  return (
    <>
      {screenSize && (
        <>
          {/* Quick create links for mobile */}
          <NavLink exact to="/events/new/">
            <CDBSidebarMenuItem
              icon="calendar-plus"
              iconSize="lg"
              
            >
              New Event
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/tasks/new/">
            <CDBSidebarMenuItem
              icon="file-circle-plus"
              iconSize="lg"
              
            >
              New Task
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/notes/new/">
            <CDBSidebarMenuItem
              icon="square-plus"
              iconSize="lg"
              
            >
              New Note
            </CDBSidebarMenuItem>
          </NavLink>
          <hr />
        </>
      )}
      <NavLink exact to="/dashboard">
        <CDBSidebarMenuItem
          icon="table-columns"
          iconSize="lg"
          
        >
          Dashboard
        </CDBSidebarMenuItem>
      </NavLink>

      {/* Events page link */}
      <NavLink
        exact
        to="/events/"
        
      >
        <CDBSidebarMenuItem
          icon="calendar-day"
          iconSize="lg"
          
        >
          Events
        </CDBSidebarMenuItem>
      </NavLink>

      {/* Tasks page link */}
      <NavLink exact to="/tasks">
        <CDBSidebarMenuItem
          icon="list"
          iconSize="lg"
          
        >
          Tasks
        </CDBSidebarMenuItem>
      </NavLink>

      {/* Notes page link */}
      <NavLink exact to="/notes">
        <CDBSidebarMenuItem
          
          icon="sticky-note"
          iconSize="lg"
        >
          Notes
        </CDBSidebarMenuItem>
      </NavLink>

      {/* Profile page link */}
      <NavLink exact to={`/profiles/${currentUser?.pk}`}>
        <CDBSidebarMenuItem
          
          icon="user"
          iconSize="lg"
        >
          Profile
        </CDBSidebarMenuItem>
      </NavLink>

      {/* Sign out link */}
      <NavLink exact to="/signout">
        <CDBSidebarMenuItem
          
          icon="right-from-bracket"
          iconSize="lg"
        >
          Sign Out
        </CDBSidebarMenuItem>
      </NavLink>
    </>
  );
};

const LoggedOutMenuLinks = () => {
  return (
    <>
      <NavLink exact to="signin">
        <CDBSidebarMenuItem
          
          icon="right-to-bracket"
          iconSize="lg"
        >
          Sign In
        </CDBSidebarMenuItem>
      </NavLink>

      {/* Register link */}
      <NavLink to="signup">
        <CDBSidebarMenuItem
          
          icon="user-plus"
          iconSize="lg"
        >
          Register
        </CDBSidebarMenuItem>
      </NavLink>
    </>
  );
};

const SideBar = () => {
  const currentUser = useCurrentUser();
  // Code to conditionally render the quick links in the navbar
  // Based on the screen size is adapted from this post:
  // https://stackoverflow.com/questions/46586165/react-conditionally-render-based-on-viewport-size
  // From the comment by foakesm
  const [screenSize, setScreenSize] = useState(window.innerWidth < 992);

  const updateSidebarMenu = () => {
    setScreenSize(window.innerWidth < 992);
  };

  useEffect(() => {
    window.addEventListener("resize", updateSidebarMenu);
    return () => window.removeEventListener("resize", updateSidebarMenu);
  }, []);

  // Code for sidebar adapted from:
  // https://www.devwares.com/blog/create-responsive-sidebar-in-react/
  return (
    <div className={styles.Div}>
      {/* Sidebar will be collapsed on large screens and smaller */}
      <CDBSidebar toggled minWidth="75px" backgroundColor="#fb6083" textColor="#000010">
        {/* Header of sidebar */}
        <CDBSidebarHeader
          prefix={<i className="fa fa-bars fa-large"></i>}
          className={styles.Sidebar}
        >
          <Link
            exact
            to={currentUser ? "/dashboard" : "/"}
            className={styles.SidebarHeaderLink}
          >
            Syncora
          </Link>
        </CDBSidebarHeader>

        <CDBSidebarContent className={styles.Sidebar}>
          <CDBSidebarMenu>
            {/* Takes in screenSize as a prop for the conditional rendering in the
            sidebar menu links function above */}
            {currentUser ? (
              <LoggedInMenuLinks screenSize={screenSize} />
            ) : (
              <LoggedOutMenuLinks />
            )}
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default SideBar;
