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
import { formatToIso } from "../../functions/dateFormat";

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
  onUpdateTaskDetail,
}) {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [dueDate, setDueDate] = useState(detailDueDate || new Date());
  const { pk } = useParams();
  const [error, setError] = useState({});
  // Set initial task data based on whether user is creating
  // a new task or editing one already made
  // This binds the value to the state
  const [taskData, setTaskData] = useState({
    title: taskTitle || "",
    due_date: detailDueDate || "",
    priority: taskPriority || "",
    category: taskCategory || "",
    description: taskDescription || "",
    completed: taskCompleted || false,
  });
  const { title, priority, category, description, completed } = taskData;

  // Use the formatToIso function when setting due date during onChange handler
  const handleDateChange = (newDate) => {
    setDueDate(formatToIso(newDate));
  };

  const goBack = () => {
    navigate(-1);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    WarningToast("Your changes were not saved.");
  };

  // Allows changing of input fields values by creating a copy
  // of the previous data before updating
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      [name]: value,
    }));
  };

  // Use the checked property of the checkbox with the completed section
  // Used in the onChange handler for the checkbox
  // Code adapted from:
  // https://react.school/todo-list/completing-tasks
  const toggleCompleted = (e) => {
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      completed: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Only allows logged in users to create tasks
    const now = new Date();
    const taskDueDate = new Date(dueDate || detailDueDate);
    // Validation to check that the due date is not set in the past
    // Will prevent submission if validation fails
    // Only does this check on new tasks so that if someone is completing
    // a task after the due date, the error doesn't appear
    if (!isEditing) {
      if (taskDueDate <= now) {
        setError({ due_date: ["Tasks cannot be set in the past."] });
        return;
      }
    }

    /* Ensures either new due date or due date passed down from task detail
    is in ISO format when submitting the form. */
    const formattedDueDate = formatToIso(taskDueDate);

    // Create new form data to send to api end point
    const formData = new FormData();
    formData.append("title", title);
    formData.append("due_date", formattedDueDate);
    formData.append("priority", priority);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("completed", completed);

    /* if the form is in editing mode and the current user owns the task,
    send a put request to update the task detail. Use the callback function
    to then send data to the parent task detail component to display the updated
    data on the task detail page.
    If the current user is authenticated and not editing, send a psot request
    to create a new task. Navigate users back to the tasks list page.
    Otherwise if the user is not authenticated, redirect them to the sign in page.
    This prevents unauthorised changes to data.
    If there is an error when updating/creating a task which is not a 400 
    client error, display a notification telling user to try again later. */
    try {
      if (isEditing && isOwner) {
        const { data } = await apiReq.put(`/tasks/${pk}/`, formData);
        if (onUpdateTaskDetail) {
          onUpdateTaskDetail(data);
        }
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
      if (error.response.status !== 400) {
        WarningToast("Server error. Please try again");
      }
    }
  };

  return (
    <>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          {/* Conditionally display title based on whether user is editing or not */}
          <h1 className={appStyles.Header}>
            {isEditing ? "Edit Task" : "New Task"}
          </h1>
          <Card className="mb-3">
            <Card.Body>
              {/* Each form input will display an error message underneath
              if the data is not valid. With the exception of the description
              field as it is not required. */}
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
                    value={dueDate}
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
                    value={priority}
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
                    value={description}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Only display checkbox in form when editing so that new tasks which are
                created are set to false as default. The checked attribute is true/false 
                based on the status of completed. toggleCompleted is the handler used for the
                onChange attribute. Code adapted from: https://react.school/todo-list/completing-tasks */}
                {isEditing && (
                  <Form.Check
                    type="checkbox"
                    id="completed"
                    label="Completed?"
                    className="pb-2"
                    checked={completed}
                    onChange={toggleCompleted}
                  />
                )}

                {/* Conditionally display save/create button based on editing state */}
                <div className="text-center">
                  <Button className={`${appStyles.Button} btn`} type="submit">
                    {isEditing ? "Save changes" : "Create"}{" "}
                    <i class="fa-solid fa-plus"></i>
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center mb-3">
            {/* Conditionally display cancel/back button based on editing state */}
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
