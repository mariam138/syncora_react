import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

function TopNavbar() {
  return (
    <>
      <Navbar>
        <Container>
          <Nav>
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Home 2</Nav.Link>
            <Nav.Link>Home 3</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavbar