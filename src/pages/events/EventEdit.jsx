import React, { useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { apiReq } from "../../api/axiosDefaults";
import { SuccessToast, WarningToast } from "../../functions/toasts";
import { useCurrentUser } from "../../contexts/useCurrentUser";

function EventEdit({
  setEventDetail,
  eventDetail,
  setIsEditing,
  handleChange,
  originalEventDetail,
}) {
  const { owner, name, date, start_time, end_time, category, location, notes } =
    eventDetail;
  const [error, setError] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { pk } = useParams();
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const goBack = () => {
    setEventDetail(originalEventDetail);
    setIsEditing(false);
    navigate(`/events/${pk}/`);
    WarningToast("Your changes were not saved.");
  };

  const handleEdit = async (e) => {
    if (is_owner) {
      e.preventDefault();
      setError({});
      const formData = new FormData();
      formData.append("name", name);
      formData.append("date", date);
      formData.append("category", category);
      formData.append("location", location);
      formData.append("start_time", start_time);
      formData.append("end_time", end_time);
      formData.append("notes", notes);
      try {
        setIsSaving(true);
        await apiReq.put(`/events/${pk}/`, formData);
        setIsEditing(false);
        navigate(`/events/${pk}/`);
        SuccessToast("Event has been edited");
      } catch (error) {
        if (error.response.status !== 400) {
          WarningToast("Event could not be edited. Please try again.");
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
        <Col>
          <h1 className={appStyles.Header}>Edit Event</h1>
          <Card className="mb-3">
            <Card.Body>
              <Form onSubmit={handleEdit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>
                    Name <i class="fa-solid fa-tag"></i>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Event name"
                    name="name"
                    value={name || ""}
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
                    value={date || ""}
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
                    onChange={(time) => {
                      handleChange({
                        target: { name: "start_time", value: time },
                      });
                    }}
                    name="start_time"
                    value={start_time || ""}
                    required
                    clearAriaLabel="Clear time"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEndTime">
                  <Form.Label className="me-2">
                    End Time <i className="fa-solid fa-hourglass-end"></i>
                  </Form.Label>
                  <TimePicker
                    onChange={(time) => {
                      handleChange({
                        target: { name: "end_time", value: time },
                      });
                    }}
                    value={end_time || ""}
                    name="end_time"
                    required
                    clearAriaLabel="Clear time"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLocation">
                  <Form.Label>
                    Location <i className="fa-solid fa-location-dot"></i>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    name="location"
                    value={location || ""}
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
                    value={category || ""}
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
                {!category &&
                  error.category?.map((message, i) => (
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
                    placeholder={!notes && "No notes"}
                    name="notes"
                    value={notes || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    className={`${appStyles.Button} btn`}
                    type="submit"
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save changes"}{" "}
                    <i class="fa-solid fa-plus"></i>
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center mb-3">
            <Button variant="outline-secondary" onClick={goBack}>
              Cancel <i class="fa-solid fa-xmark"></i>
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default EventEdit;
