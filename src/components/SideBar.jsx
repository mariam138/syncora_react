import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Link, NavLink } from "react-router-dom";
import styles from "../styles/SideBar.module.css";

import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../App";

/** Separate function for the menu links, destructuring
 * screenSize as a prop. If screenSize = true, then the
 * quick menu links will render. The rest of the links will
 * render despite the screensize prop. This is then used to
 * create a LoggedInMenuLinks component which is used in the
 * Sidebar arrow function below.
 */
const LoggedInMenuLinks = ({ screenSize }) => {
  return (
    <>
      {screenSize && (
        <>
          {/* Quick create links for mobile */}
          <NavLink exact to="/events/new" activeClassName="activeClicked">
            <CDBSidebarMenuItem
              icon="calendar-plus"
              iconSize="lg"
              className={styles.SidebarMenuItem}
            >
              New Event
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/tasks/new" activeClassName="activeClicked">
            <CDBSidebarMenuItem
              icon="file-circle-plus"
              iconSize="lg"
              className={styles.SidebarMenuItem}
            >
              New Task
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/notes/new" activeClassName="activeClicked">
            <CDBSidebarMenuItem
              icon="square-plus"
              iconSize="lg"
              className={styles.SidebarMenuItem}
            >
              New Note
            </CDBSidebarMenuItem>
          </NavLink>
          <hr />
        </>
      )}
      <NavLink exact to="/" activeClassName="activeClicked">
        <CDBSidebarMenuItem
          icon="table-columns"
          iconSize="lg"
          className={styles.SidebarMenuItem}
        >
          Dashboard
        </CDBSidebarMenuItem>
      </NavLink>

      {/* Events page link */}
      <NavLink exact to="/events" activeClassName="activeClicked">
        <CDBSidebarMenuItem
          icon="calendar-day"
          iconSize="lg"
          className={styles.SidebarMenuItem}
        >
          Events
        </CDBSidebarMenuItem>
      </NavLink>

      {/* Tasks page link */}
      <NavLink exact to="/tasks" activeClassName="activeClicked">
        <CDBSidebarMenuItem
          icon="list"
          iconSize="lg"
          className={styles.SidebarMenuItem}
        >
          Tasks
        </CDBSidebarMenuItem>
      </NavLink>

      {/* Notes page link */}
      <NavLink exact to="/notes" activeClassName="activeClicked">
        <CDBSidebarMenuItem
          className={styles.SidebarMenuItem}
          icon="sticky-note"
          iconSize="lg"
        >
          Notes
        </CDBSidebarMenuItem>
      </NavLink>

      {/* Profile page link */}
      <NavLink exact to="" activeClassName="activeClicked">
        <CDBSidebarMenuItem
          className={styles.SidebarMenuItem}
          icon="user"
          iconSize="lg"
        >
          Profile
        </CDBSidebarMenuItem>
      </NavLink>

      {/* Sign out link */}
      <NavLink exact to="" activeClassName="activeClicked">
        <CDBSidebarMenuItem
          className={styles.SidebarMenuItem}
          icon="right-from-bracket"
          iconSize="lg"
        >
          Sign Out
        </CDBSidebarMenuItem>
      </NavLink>
    </>
  );
};

const SideBar = () => {
  const currentUser = useContext(CurrentUserContext);
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
      <CDBSidebar breakpoint={992} toggled minWidth="75px">
        {/* Header of sidebar */}
        <CDBSidebarHeader
          prefix={<i className="fa fa-bars fa-large"></i>}
          className={styles.Sidebar}
        >
          <Link exact to="/" className={styles.SidebarHeaderLink}>
            Syncora
          </Link>
        </CDBSidebarHeader>

        <CDBSidebarContent className={styles.Sidebar}>
          <CDBSidebarMenu>
            {/* Takes in screenSize as a prop for the conditional rendering in the
            sidebar menu links function above */}
            <LoggedInMenuLinks screenSize={screenSize} />
          </CDBSidebarMenu>

          {/* Separate menu for sign in and register links */}
          <CDBSidebarMenu>
            {/* Sign in link */}
            <NavLink exact to="signin" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                className={styles.SidebarMenuItem}
                icon="right-to-bracket"
                iconSize="lg"
              >
                Sign In
              </CDBSidebarMenuItem>
            </NavLink>

            {/* Register link */}
            <NavLink to="signup" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                className={styles.SidebarMenuItem}
                icon="user-plus"
                iconSize="lg"
              >
                Register
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default SideBar;
