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
import { apiReq } from "../../api/axiosDefaults";

function NewTaskForm() {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [dueDate, setDueDate] = useState(new Date());
  const [error, setError] = useState({});
  // Set initial task data
  // Completed automatically set to false when created which is set up in the back end
  const [taskData, setTaskData] = useState({
    title: "",
    due_date: "",
    priority: "",
    category: "",
    description: "",
  });
  const { title, priority, category, description } = taskData;

  // Stringify's the due date and ensures it's in the correct format
  // for submission. Used as the onChange function for the due date input
  const handleDateChange = (newDate) => {
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");
    const hours = String(newDate.getHours()).padStart(2, "0");
    const minutes = String(newDate.getMinutes()).padStart(2, "0");

    setDueDate(`${year}-${month}-${day}T${hours}:${minutes}`);
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Only allows logged in users to create tasks
    if (currentUser) {
      const now = new Date();
      const taskDueDate = new Date(dueDate);
      // Validation to check that the due date is not set in the past
      // Will prevent submission if validation fails
      if (taskDueDate < now) {
        setError({ due_date: ["Tasks cannot be set in the past."] });
        return;
      }
      // Create new form data to send to api end point
      const formData = new FormData();
      formData.append("title", title);
      formData.append("due_date", dueDate);
      formData.append("priority", priority);
      formData.append("category", category);
      formData.append("description", description);

      try {
        await apiReq.post("/tasks/new/", formData);
        navigate("/tasks/");
        SuccessToast("Task created");
      } catch (error) {
        console.log(error);
        setError(error.response?.data);
      }
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          <h1 className={appStyles.Header}>New Task</h1>
          <Card className="mb-3">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>
                    Title <i class="fa-solid fa-heading"></i>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Task title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  />
                </Form.Group>
                {error.title?.map((message, i) => (
                  <Alert variant="warning" key={i}>
                    {message}
                  </Alert>
                ))}

                <Form.Group className="mb-3" controlId="formDueDate">
                  <Form.Label>
                    Due date <i class="fa-regular fa-calendar-check"></i>
                  </Form.Label>
                  <DateTimePicker
                    name="due_date"
                    value={dueDate}
                    required
                    onChange={handleDateChange}
                    className="ps-3"
                  />
                </Form.Group>
                {error.due_date?.map((message, i) => (
                  <Alert variant="warning" key={i}>
                    {message}
                  </Alert>
                ))}

                <Form.Group className="mb-3" controlId="formPriority">
                  <Form.Label>
                    Priority <i class="fa-solid fa-triangle-exclamation"></i>
                  </Form.Label>
                  <Form.Select
                    aria-label="Choose a priority"
                    name="priority"
                    value={priority}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    Description <i class="fa-solid fa-pencil"></i>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Any extra information?"
                    name="description"
                    value={description}
                    onChange={handleChange}
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
