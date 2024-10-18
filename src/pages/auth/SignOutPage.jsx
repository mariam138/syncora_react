import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function SignOutPage() {
  return (
    <>
      <Container fluid="lg">
        <Row>
          <Col>
            <h1>Are you sure you want to sign out?</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}
