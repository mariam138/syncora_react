import React from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import appStyles from "../../App.module.css";

function NoteForm() {
  return (
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <h1>New Note</h1>
          <Card className="mb-3">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label className="fs-5 d-flex flex-column flex-lg-row align-content-center">
                    <span>
                      Title <i class="fa-solid fa-heading"></i>
                    </span>
                    <span className="text-body-secondary fs-6 ms-lg-3 align-self-lg-center">
                      <i className="fa-solid fa-circle-info"></i> Title is not
                      required.
                    </span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Note title"
                    name="title"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formContent">
                  <Form.Label>
                    Content <i class="fa-solid fa-pencil"></i>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="A penny for your thoughts?"
                    name="content"
                  />
                </Form.Group>
                <div className="text-center">
                  <Button className={`${appStyles.Button} btn`} type="submit">
                    Create <i class="fa-solid fa-plus"></i>
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center mb-3">
            <Button variant="outline-secondary">
              <i class="fa-solid fa-arrow-left"></i> Back
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default NoteForm;
