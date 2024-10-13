import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

function TopNavbar() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Nav className="me-auto">
            <NavLink to="/events/new">
              New Event <i class="fa-regular fa-calendar-plus"></i>
            </NavLink>
            <NavLink to="/tasks/new">
              New Task <i class="fa-solid fa-file-circle-plus"></i>
            </NavLink>
            <NavLink to="/notes/new">
              New Note <i class="fa-solid fa-notes-medical"></i>
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavbar