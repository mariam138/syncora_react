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
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                icon="columns"
                className={styles.SidebarMenuItem}
              >
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/events" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                icon="calendar"
                className={styles.SidebarMenuItem}
              >
                Events
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tasks" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                icon=""
                className={styles.SidebarMenuItem}
              >
                Tasks
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/notes" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                icon="note-sticky"
                className={styles.SidebarMenuItem}
              >
                Notes
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                icon="user"
                className={styles.SidebarMenuItem}
              >
                Profile
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default SideBar;
