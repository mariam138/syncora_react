import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiReq, apiResp } from "../../api/axiosDefaults";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import appStyles from "../../App.module.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "../../styles/DetailPageButtons.module.css";
import DeleteModal from "../../components/DeleteModal";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { toast, Bounce } from "react-toastify";
import EventForm from "./EventForm";
import EventEdit from "./EventEdit";
import SuccessToast from "../../components/Toasts";

function EventDetail() {
  const { pk } = useParams();
  const currentUser = useCurrentUser();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [eventDetail, setEventDetail] = useState({
    id: null,
    owner: "",
    name: "",
    date: "",
    start_time: "",
    end_time: "",
    category_display: "",
    location: "",
    notes: "",
  });

  // Destructure data into variables to use for display
  const {
    owner,
    name,
    date,
    start_time,
    end_time,
    category_display,
    location,
    notes,
  } = eventDetail;

  const is_owner = currentUser?.username === owner;
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      const { data } = await apiResp.get(`/events/${pk}/`);
      const {
        id,
        owner,
        name,
        date,
        start_time,
        end_time,
        category,
        category_display,
        location,
        notes,
      } = data;
      setEventDetail({
        id,
        owner,
        name,
        date,
        start_time,
        end_time,
        category,
        category_display,
        location,
        notes,
      });
      setHasLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleMount();
  }, [pk]);

  const goBack = () => {
    navigate(-1);
  };

  const handleDelete = async (e) => {
    if (is_owner) {
      try {
        await apiReq.delete(`/events/${pk}/`);
        navigate("/events/");
        SuccessToast("Event deleted")
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setEventDetail({
      ...eventDetail,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          {isEditing ? (
            <EventEdit
              eventDetail={eventDetail}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              handleChange={handleChange}
            />
          ) : hasLoaded ? (
            <>
              <h1 className={appStyles.Header}>{name}</h1>
              <Card className="my-3">
                <Card.Body>
                  <Card.Title>
                    Date <i className="fa-regular fa-calendar"></i>
                  </Card.Title>
                  <Card.Text>{date}</Card.Text>
                  <hr />
                  <Card.Title>
                    Start Time <i className="fa-solid fa-hourglass-start"></i>
                  </Card.Title>
                  <Card.Text>{start_time}</Card.Text>
                  <hr />
                  <Card.Title>
                    End Time <i className="fa-solid fa-hourglass-end"></i>
                  </Card.Title>
                  <Card.Text>{end_time}</Card.Text>
                  <hr />
                  <Card.Title>
                    Location <i className="fa-solid fa-location-dot"></i>
                  </Card.Title>
                  <Card.Text>{location}</Card.Text>
                  <hr />
                  <Card.Title>
                    Category <i className="fa-solid fa-icons"></i>
                  </Card.Title>
                  <Card.Text>{category_display}</Card.Text>
                  <hr />
                  <Card.Title>
                    Notes <i className="fa-regular fa-message"></i>
                  </Card.Title>
                  <Card.Text className={`${!notes && "text-body-secondary"}`}>
                    {notes || "No notes"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          ) : (
            <div className="text-center">
              <LoadingSpinner />
            </div>
          )}

          {!isEditing && (
            <>
              <div className="text-center mt-4">
                <Button
                  variant="info"
                  className={`mx-2 ${styles.BtnText}`}
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  Edit <i class="fa-solid fa-pencil"></i>
                </Button>
                <Button
                  variant="danger"
                  className={`mx-2 ${styles.BtnText}`}
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Delete <i class="fa-solid fa-trash"></i>
                </Button>
              </div>

              <div className="text-center mt-4">
                <Button
                  className={`btn ${appStyles.Button} mx-2 ${styles.BtnText}`}
                  onClick={goBack}
                >
                  <i class="fa-solid fa-arrow-left"></i> Back
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>
      <DeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        feature="event"
        modalContent="Are you sure you want to delete this event"
        handleDelete={handleDelete}
      />
    </>
  );
}

export default EventDetail;
