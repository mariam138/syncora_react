import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

function TopNavbar() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link>
              New Event <i class="fa-regular fa-calendar-plus"></i>
            </Nav.Link>
            <Nav.Link>
              New Task <i class="fa-solid fa-file-circle-plus"></i>
            </Nav.Link>
            <Nav.Link>
              New Note <i class="fa-solid fa-notes-medical"></i>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavbar