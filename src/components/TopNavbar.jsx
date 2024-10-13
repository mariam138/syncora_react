import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import styles from '../styles/TopNavbar.module.css'

function TopNavbar() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light" fixed='top'className={`${styles.Navbar} align-middle`}>
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

export default TopNavbar