import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import appStyles from "../../App.module.css";
import { SuccessToast, WarningToast } from "../../functions/toasts";

function NewTaskForm() {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [error, setError] = useState({});
  const [taskData, setTaskData] = useState({
    title: "",
    due_date: "",
    priority: "",
    category: "",
    description: "",
    completed: false,
  });
  const { title, due_date, priority, category, description, completed } =
    taskData;
  return (
    <>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          <h1 className={appStyles.Header}>New Task</h1>
          <Card className="mb-3">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>
                    Title <i class="fa-solid fa-tag"></i>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Task title"
                    name="title"
                    value={title}
                  />
                </Form.Group>
                {error.title?.map((message, i) => (
                  <Alert variant="warning" key={i}>
                    {message}
                  </Alert>
                ))}

                <Form.Group className="mb-3" controlId="formDueDate">
                  <Form.Label>
                    Due date <i class="fa-solid fa-tag"></i>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="When is it due?"
                    name="due_date"
                    value={due_date}
                  />
                </Form.Group>
                {error.due_date?.map((message, i) => (
                  <Alert variant="warning" key={i}>
                    {message}
                  </Alert>
                ))}

                <Form.Group className="mb-3" controlId="formPriority">
                  <Form.Label>
                    Priority <i className="fa-solid fa-icons"></i>
                  </Form.Label>
                  <Form.Select
                    aria-label="Choose a priority"
                    name="priority"
                    value={priority}
                  >
                    <option>Priority level</option>
                    <option value="WORK">Work</option>
                    <option value="SOC">Social</option>
                    <option value="FAM">Family</option>
                    <option value="APP">Appointment</option>
                    <option value="EDU">Education</option>
                    <option value="TRAVEL">Travel</option>
                  </Form.Select>
                </Form.Group>
                {error.priority?.map((message, i) => (
                  <Alert variant="warning" key={i}>
                    {message}
                  </Alert>
                ))}

                <Form.Group className="mb-3" controlId="formCategory">
                  <Form.Label>
                    Category <i className="fa-solid fa-icons"></i>
                  </Form.Label>
                  <Form.Select
                    aria-label="Choose a category"
                    name="category"
                    value={category}
                  >
                    <option>Choose a category</option>
                    <option value="WORK">Work</option>
                    <option value="SOC">Social</option>
                    <option value="FAM">Family</option>
                    <option value="APP">Appointment</option>
                    <option value="EDU">Education</option>
                    <option value="TRAVEL">Travel</option>
                  </Form.Select>
                </Form.Group>
                {error.category?.map((message, i) => (
                  <Alert variant="warning" key={i}>
                    {message}
                  </Alert>
                ))}

                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>
                    Description <i className="fa-solid fa-message"></i>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Any extra information?"
                    name="description"
                    value={description}
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

export default NewTaskForm;
