import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SignOutPage() {
  // Use react-router's useNavigate hook to allow the user to go back
  // to the previous page if they change their mind about logging out
  // Adapted from the docs:
  // https://reactrouter.com/en/main/start/tutorial#cancel-button
  const navigate = useNavigate();
  return (
    <>
      <Container fluid="lg">
        <Row>
          <Col>
            <h1>Are you sure you want to sign out?</h1>
            <Button
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Go back
            </Button>
            <Button>Sign Out</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
