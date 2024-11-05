import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function TaskForm({
  taskTitle,
  detailDueDate,
  taskCategory,
  taskPriority,
  taskDescription,
  taskCompleted,
  isEditing,
  setIsEditing,
  isOwner,
}) {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [dueDate, setDueDate] = useState(detailDueDate || new Date());
  const { pk } = useParams();
  const [error, setError] = useState({});
  // Set initial task data
  // Completed automatically set to false when created which is set up in the back end
  const [taskData, setTaskData] = useState({
    owner: "",
    title: "",
    due_date: "",
    priority: "",
    category: "",
    description: "",
  });
  const { owner, title, priority, category, description } = taskData;

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

  const cancelEdit = () => {
    setIsEditing(false);
    navigate(`/tasks/${pk}`);
    WarningToast("Your changes were not saved.");
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
    formData.append("title", title || taskTitle);
    formData.append("due_date", dueDate || detailDueDate);
    formData.append("priority", priority || taskPriority);
    formData.append("category", category || taskCategory);
    formData.append("description", description || taskDescription);

    try {
      if (isEditing && isOwner) {
        await apiReq.put(`/tasks/${pk}/`, formData);
        setIsEditing(false);
        SuccessToast("Task updated");
      } else if (currentUser) {
        await apiReq.post("/tasks/new/", formData);
        navigate("/tasks/");
        SuccessToast("Task created");
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data);
    }
  };

  return (
    <>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          <h1 className={appStyles.Header}>
            {isEditing ? "Edit Task" : "New Task"}
          </h1>
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
                    value={title || taskTitle}
                    onChange={handleChange}
                  />
                </Form.Group>
                {error &&
                  error.title?.map((message, i) => (
                    <Alert variant="warning" key={i}>
                      {message}
                    </Alert>
                  ))}

                <Form.Group className="mb-3" controlId="formDueDate">
                  <Form.Label className="pe-3">
                    Due date <i class="fa-regular fa-calendar-check"></i>
                  </Form.Label>
                  <DateTimePicker
                    name="due_date"
                    value={dueDate || detailDueDate}
                    required
                    onChange={handleDateChange}
                  />
                </Form.Group>
                {error &&
                  error.due_date?.map((message, i) => (
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
                    value={priority || taskPriority}
                    onChange={handleChange}
                  >
                    <option>Priority level</option>
                    <option value="L">Low</option>
                    <option value="M">Medium</option>
                    <option value="H">High</option>
                  </Form.Select>
                </Form.Group>
                {error &&
                  error.priority?.map((message, i) => (
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
                    value={category || taskCategory}
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
                {error &&
                  error.category?.map((message, i) => (
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
                    value={description || taskDescription}
                    onChange={handleChange}
                  />
                </Form.Group>
                {isEditing ? (
                  <div className="text-center">
                    <Button className={`${appStyles.Button} btn`} type="submit">
                      Save changes <i class="fa-solid fa-plus"></i>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Button className={`${appStyles.Button} btn`} type="submit">
                      Create <i class="fa-solid fa-plus"></i>
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center mb-3">
            {isEditing ? (
              <Button variant="outline-secondary" onClick={cancelEdit}>
                Cancel <i class="fa-solid fa-xmark"></i>
              </Button>
            ) : (
              <Button variant="outline-secondary" onClick={goBack}>
                <i class="fa-solid fa-arrow-left"></i> Back
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default TaskForm;
