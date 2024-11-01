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
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

function NewTaskForm() {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [error, setError] = useState({});
  const [dueDate, setDueDate] = useState(new Date());
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
  const goBack = () => {
    navigate(-1);
  };
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
                  <DateTimePicker
                    name="due_date"
                    value={dueDate}
                    required
                    onChange={setDueDate}
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
                    <option value="L">Low</option>
                    <option value="M">Medium</option>
                    <option value="H">High</option>
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
                    <option value="HOME">Home</option>
                    <option value="EDU">Learning</option>
                    <option value="FIN">Finance</option>
                    <option value="HEALTH">Health</option>
                    <option value="PER">Personal</option>
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
            <Button variant="outline-secondary" onClick={goBack}>
              <i class="fa-solid fa-arrow-left"></i> Back
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default NewTaskForm;
