import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CDBInput } from "cdbreact";
import TimePicker from "react-time-picker";
import appStyles from "../../App.module.css";

function EventForm() {
  const [value, onChange] = useState("10:00");
  return (
    <>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          <h1 className={appStyles.Header}>New Event</h1>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="email" placeholder="Event name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDate">
                  <Form.Label>Date</Form.Label>
                  <CDBInput type="date" placeholder="Date" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formStartTime">
                  <Form.Label>Start Time</Form.Label>
                  <TimePicker onChange={onChange} value={value} />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default EventForm;
