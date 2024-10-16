import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosDefaults";

export default function SignOutPage() {
  // Use react-router's useNavigate hook to allow the user to go back
  // to the previous page if they change their mind about logging out
  // Adapted from the docs:
  // https://reactrouter.com/en/main/start/tutorial#cancel-button
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/dj-rest-auth/logout/");
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container fluid="sm">
        <Row>
          <Col className="text-center">
            <h1>Are you sure you want to sign out?</h1>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Button
              className="mx-2"
              variant="outline-secondary"
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Go back
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              type="submit"
              onClick={handleSubmit}
            >
              Sign Out
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
