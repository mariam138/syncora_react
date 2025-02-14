import { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { CDBInput } from "cdbreact";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import appStyles from "../../App.module.css";
import { useNavigate } from "react-router-dom";
import { apiReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/useCurrentUser";
import { SuccessToast, WarningToast } from "../../functions/toasts";

/* 
* BUGS TO FIX:
* 2. User is unable to leave times unchanged without getting error messages that time is in wrong format
* - so far unable to replicate this error to fix the bug so is being left for now
*/

function EventForm() {
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  // Create function to add hours to current time
  // Adapted from https://javascript.plainenglish.io/javascript-add-hours-to-date-6e3a39bb9345
  const addHours = (date, hours) => {
    const dateCopy = new Date(date.getTime());
    const hoursToAdd = hours * 60 * 60 * 1000;
    dateCopy.setTime(date.getTime() + hoursToAdd);
    return dateCopy;
  };
  let now = new Date();
  let plusOneHour = addHours(now, 1);
  // Ensures the time is in the format that the api is expecting
  let currTimePlusOne = plusOneHour.toLocaleTimeString({
    hour: "2-digit",
    minute: "2-digit",
  });
  let currentTime = now.toLocaleTimeString({
    hour: "2-digit",
    minute: "2-digit",
  });
  // Set the start time to user's current time
  // Set the end time to the current time + 1 hour
  const [startTime, setStartTime] = useState(currentTime);
  const [endTime, setEndTime] = useState(currTimePlusOne);
  const [error, setError] = useState({});
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    start_time: "",
    end_time: "",
    category: "",
    location: "",
    notes: "",
  });

  const { name, date, category, location, notes } = eventData;

  const changeStartTime = (newTime) => {
    setStartTime(newTime);
  };
  const changeEndTime = (newTime) => {
    setEndTime(newTime);
  };
  const goBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const eventDate = new Date(date);

    if (eventDate < now) {
      setError({ date: ["Events cannot be set in the past."] });
      return;
    }
    if (endTime < startTime) {
      setError({
        end_time: ["Events cannot end before they begin."],
        start_time: ["Start time cannot be after end time."],
      });
      return;
    }

    if (currentUser) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("date", date);
      formData.append("category", category);
      formData.append("location", location);
      formData.append("start_time", startTime);
      formData.append("end_time", endTime);
      formData.append("notes", notes);
      try {
        setIsCreating(true);
        await apiReq.post("/events/new/", formData);
        navigate(`/events/`);
        SuccessToast("Event created");
      } catch (error) {
        // Re enables create button in case of errors
        setIsCreating(false);
        // Only display the toast if the error is due to something
        // Other than a 400 code ie a client error
        if (error.response.status !== 400) {
          WarningToast("Event could not be created. Please try again.");
        }
        setError(error.response?.data);
      }
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <h1 className={appStyles.Header}>New Event</h1>
          <Card className="mb-3">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>
                    Name <i className="fa-solid fa-tag"></i>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Event name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    eventName
                  />
                </Form.Group>
                {error.name?.map((message, i) => (
                  <Alert variant="warning" key={i}>
                    {message}
                  </Alert>
                ))}

                <Form.Group className="mb-3" controlId="formDate">
                  <Form.Label>
                    Date <i className="fa-regular fa-calendar"></i>
                  </Form.Label>
                  <CDBInput
                    type="date"
                    placeholder="Date"
                    name="date"
                    value={date}
                    onChange={handleChange}
                  />
                </Form.Group>
                {error.date?.map((message, i) => (
                  <Alert variant="warning" key={i}>
                    {message}
                  </Alert>
                ))}

                <Form.Group className="mb-3" controlId="formStartTime">
                  <Form.Label className="me-2">
                    Start Time <i className="fa-solid fa-hourglass-start"></i>
                  </Form.Label>
                  <TimePicker
                    clockAriaLabel="Click to choose a start time"
                    onChange={changeStartTime}
                    name="start_time"
                    value={startTime}
                    required
                    clearAriaLabel="Clear time"
                  />
                </Form.Group>
                {error.start_time?.map((message, i) => (
                  <Alert variant="warning" key={i}>
                    {message}
                  </Alert>
                ))}

                <Form.Group className="mb-3" controlId="formEndTime">
                  <Form.Label className="me-2">
                    End Time <i className="fa-solid fa-hourglass-end"></i>
                  </Form.Label>
                  <TimePicker
                    clockAriaLabel="Click to choose an end time"
                    onChange={changeEndTime}
                    value={endTime}
                    name="end_time"
                    required
                    clearAriaLabel="Clear time"
                  />
                </Form.Group>
                {error.end_time?.map((message, i) => (
                  <Alert variant="warning" key={i}>
                    {message}
                  </Alert>
                ))}

                <Form.Group className="mb-3" controlId="formLocation">
                  <Form.Label>
                    Location <i className="fa-solid fa-location-dot"></i>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    name="location"
                    value={location}
                    onChange={handleChange}
                  />
                </Form.Group>
                {error.location?.map((message, i) => (
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

                <Form.Group className="mb-3" controlId="formNotes">
                  <Form.Label>
                    Notes <i className="fa-solid fa-message"></i>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Any notes?"
                    name="notes"
                    value={notes}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    className={`${appStyles.Button} btn`}
                    type="submit"
                    disabled={isCreating}
                  >
                    {isCreating ? "Creating event..." : "Create"}{" "}
                    <i className="fa-solid fa-plus"></i>
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center mb-3">
            <Button variant="outline-secondary" onClick={goBack}>
              <i className="fa-solid fa-arrow-left"></i> Back
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default EventForm;
