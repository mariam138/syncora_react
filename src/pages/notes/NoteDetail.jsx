import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function NoteDetail() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <h1>Note title</h1>
          <Card>
            <Card.Body>
              <Card.Text>Note content blah blah blah</Card.Text>
              <Card.Text>Date updated</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default NoteDetail;
