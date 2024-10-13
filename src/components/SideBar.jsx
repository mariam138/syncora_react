import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import styles from "../styles/SideBar.module.css";

import React from "react";

const SideBar = () => {
  // Code for sidebar adapted from:
  // https://www.devwares.com/blog/create-responsive-sidebar-in-react/
  return (
    <div className={styles.Div}>
      <CDBSidebar>
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
            {/* Dashboard link */}
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                icon="table-columns"
                className={styles.SidebarMenuItem}
              >
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>
            {/* Events page link */}
            <NavLink exact to="/events" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                icon="calendar"
                className={styles.SidebarMenuItem}
              >
                Events
              </CDBSidebarMenuItem>
            </NavLink>
            {/* Tasks page link */}
            <NavLink exact to="/tasks" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                icon="list"
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
              >
                Notes
              </CDBSidebarMenuItem>
            </NavLink>
            {/* Profile page link */}
            <NavLink exact to="" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                className={styles.SidebarMenuItem}
                icon="user"
              >
                Profile
              </CDBSidebarMenuItem>
            </NavLink>
            {/* Sign out link */}
            <NavLink exact to="" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                className={styles.SidebarMenuItem}
                icon="right-from-bracket"
              >
                Sign Out
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
          {/* Separate menu for sign in and register links */}
          <CDBSidebarMenu>
            {/* Sign in link */}
            <NavLink exact to="" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                className={styles.SidebarMenuItem}
                icon="right-to-bracket"
              >
                Sign In
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default SideBar;
