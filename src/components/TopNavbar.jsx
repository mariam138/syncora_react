import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

function TopNavbar() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Home 2</Nav.Link>
            <Nav.Link href="/">Home 3</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavbar