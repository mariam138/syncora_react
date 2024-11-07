import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import styles from "../styles/TopNavbar.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";

function TopNavbar() {
  // Gets current user information to display username
  const currentUser = useCurrentUser();

  return (
    <>
      <Navbar fixed="top" className={styles.Navbar}>
        <Container fluid>
          <Nav className="d-flex w-100 align-items-center justify-content-between">
            <div className="mx-auto">
              <Form inline>
                <Row>
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      className="mr-sm-2"
                    />
                  </Col>
                  <Col xs="auto">
                    <Button type="submit">Submit</Button>
                  </Col>
                </Row>
              </Form>
            </div>

            <div className="d-flex align-items-center">
              <NavLink to="/events/new/" className={styles.NavbarLinks}>
                New Event <i class="fa-regular fa-calendar-plus"></i>
              </NavLink>
              <NavLink to="/tasks/new/" className={styles.NavbarLinks}>
                New Task <i class="fa-solid fa-file-circle-plus"></i>
              </NavLink>
              <NavLink to="/notes/new/" className={styles.NavbarLinks}>
                New Note <i class="fa-solid fa-notes-medical"></i>
              </NavLink>
              {/* Welcome text to user when logged in */}
              <Navbar.Text className="px-2">
                Welcome, {currentUser.username}
              </Navbar.Text>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavbar;
