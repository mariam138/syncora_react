import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import styles from "../styles/SideBar.module.css";

import React, { useEffect, useState } from "react";

const SideBar = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth < 992);

  const updateSidebarMenu = () => {
    setScreenSize(window.innerWidth < 992);
  };

  useEffect(() => {
    window.addEventListener("resize", updateSidebarMenu);
    return () => window.removeEventListener("resize", updateSidebarMenu);
  });

  // Code for sidebar adapted from:
  // https://www.devwares.com/blog/create-responsive-sidebar-in-react/
  return (
    <div className={styles.Div}>
      {/* Sidebar will be collapsed on large screens and smaller */}
      <CDBSidebar breakpoint={992}>
        {/* Header of sidebar */}
        <CDBSidebarHeader
          prefix={<i className="fa fa-bars fa-large"></i>}
          className={styles.Sidebar}
        >
          <a href="/" className={styles.SidebarHeaderLink}>
            Syncora
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className={styles.Sidebar}>
          <CDBSidebarMenu>
            {screenSize ? (
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
            ) : (
              <>
                {/* Dashboard link */}
                <CDBSidebarMenu>
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
                </CDBSidebarMenu>
              </>
            )}
          </CDBSidebarMenu>
          {/* Separate menu for sign in and register links */}
          <CDBSidebarMenu>
            {/* Sign in link */}
            <NavLink exact to="" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                className={styles.SidebarMenuItem}
                icon="right-to-bracket"
                iconSize="lg"
              >
                Sign In
              </CDBSidebarMenuItem>
            </NavLink>

            {/* Register link */}
            <NavLink exact to="" activeClassName="activeClicked">
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
