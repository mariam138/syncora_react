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
              <CDBSidebarMenuItem className={styles.SidebarMenuItem}>
                Dashboard
                <i class="fa-solid fa-table-columns"></i>
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/events" activeClassName="activeClicked">
              <CDBSidebarMenuItem className={styles.SidebarMenuItem}>
                Events
                <i class="fa-regular fa-calendar"></i>
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tasks" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="" className={styles.SidebarMenuItem}>
                Tasks
                <i class="fa-solid fa-list-check"></i>
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/notes" activeClassName="activeClicked">
              <CDBSidebarMenuItem className={styles.SidebarMenuItem}>
                Notes
                <i class="fa-solid fa-note-sticky"></i>
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                className={styles.SidebarMenuItem}
              >
                Profile
                <i class="fa-solid fa-user"></i>
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default SideBar;
