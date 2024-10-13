import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import styles from '../styles/TopNavbar.module.css'

function TopNavbar() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container fluid>
          <Nav className="ms-auto">
            <NavLink to="/events/new" className={styles.NavbarLinks}>
              New Event <i class="fa-regular fa-calendar-plus"></i>
            </NavLink>
            <NavLink to="/tasks/new" className={styles.NavbarLinks}>
              New Task <i class="fa-solid fa-file-circle-plus"></i>
            </NavLink>
            <NavLink to="/notes/new" className={styles.NavbarLinks}>
              New Note <i class="fa-solid fa-notes-medical"></i>
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavbar