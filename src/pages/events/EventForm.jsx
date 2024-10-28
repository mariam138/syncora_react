import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CDBInput } from "cdbreact";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import appStyles from "../../App.module.css";

function EventForm() {
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("13:00");
  const changeStartTime = (newTime) => {
    setStartTime(newTime);
  };
  const changeEndTime = (newTime) => {
    setEndTime(newTime);
  };

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
                  <Form.Label className="me-2">Start Time</Form.Label>
                  <TimePicker
                    onChange={changeStartTime}
                    value={startTime}
                    required
                    clearAriaLabel="Clear time"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEndTime">
                  <Form.Label className="me-2">End Time</Form.Label>
                  <TimePicker
                    onChange={endTime}
                    value={endTime}
                    required
                    clearAriaLabel="Clear time"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Select aria-label="Choose a category">
                    <option>Choose a category</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" placeholder="Enter location" />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="formNotes"
                >
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Any notes?"/>
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
