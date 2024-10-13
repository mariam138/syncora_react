import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../styles/TopNavbar.module.css";

function TopNavbar() {
  return (
    <>
      <Navbar fixed="top" className={styles.Navbar}>
        <Container fluid>
          <Nav className="ms-auto d-flex align-items-center">
            <NavLink to="/events/new" className={styles.NavbarLinks}>
              New Event <i class="fa-regular fa-calendar-plus"></i>
            </NavLink>
            <NavLink to="/tasks/new" className={styles.NavbarLinks}>
              New Task <i class="fa-solid fa-file-circle-plus"></i>
            </NavLink>
            <NavLink to="/notes/new" className={styles.NavbarLinks}>
              New Note <i class="fa-solid fa-notes-medical"></i>
            </NavLink>
            {/* Welcome text to user when logged in */}
            <Navbar.Text>Welcome, User</Navbar.Text>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavbar;
