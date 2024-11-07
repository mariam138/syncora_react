import React, { useEffect, useState } from "react";
import { apiReq } from "../../api/axiosDefaults";
import LoadingSpinner from "../../components/LoadingSpinner";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/CreateLink.module.css";
import DeleteModal from "../../components/DeleteModal";
import { SuccessToast } from "../../functions/toasts";
import { formatDate } from "../../functions/dateFormat";

function EventsList({
  showHeader = true,
  showCreateLink = true,
  showDeleteButton = true,
  showFilters = true,
}) {
  // Set events list to an empty results array
  const [eventsList, setEventsList] = useState({ results: [] });
  // Initially set loaded state to false
  const [isLoaded, setIsLoaded] = useState(false);
  const [category, setCategory] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const currentUser = useCurrentUser();
  const [showModal, setShowModal] = useState(false);
  const [eventId, setEventId] = useState(null);

  // Check current user against event owner
  const eventOwner = eventsList.results[0]?.owner;
  const is_owner = currentUser?.username === eventOwner;

  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      const { data } = await apiReq.get("/events/");
      setEventsList(data);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleMount();
  }, [currentUser]);

  const viewEvent = (eventId) => {
    navigate(`/events/${eventId}/`);
  };

  const handleDelete = async (e) => {
    if (is_owner) {
      e.preventDefault();
      try {
        setShowModal(false);
        await apiReq.delete(`/events/${eventId}/`);
        // Updates the events list by filtering through the results to remove the deleted event from the list
        setEventsList((prevEventsList) => ({
          ...prevEventsList,
          results: prevEventsList.results.filter(
            (event) => event.id !== eventId,
          ),
        }));

        SuccessToast("Event deleted");
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/");
    }
  };

  const handleCategoryFilter = (newCategory) => {
    setCategory(newCategory);
    setIsFiltering(true);
  };

  const filteredTasks = eventsList.results.filter(
    (event) => event.category === category,
  );

  const handleClearFilters = () => {
    setCategory("");
    setIsFiltering(false);
  }

  return (
    <>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          {showHeader && <h1 className={appStyles.Header}>Events</h1>}
          <Accordion alwaysOpen className="mb-3">
            {isLoaded ? (
              eventsList.results.length > 0 ? (
                eventsList.results.map((event) => {
                  const dateRep = formatDate(event.date);
                  return (
                    <Accordion.Item eventKey={`${event.id}`} key={event.id}>
                      <Accordion.Header>
                        {event.name}
                        <br />
                        {dateRep} | {event.start_time} | {event.location}
                      </Accordion.Header>
                      <Accordion.Body>
                        <ButtonGroup aria-label="View event and delete event buttons">
                          <Button
                            variant="outline-secondary"
                            onClick={() => viewEvent(event.id)}
                          >
                            View event
                          </Button>

                          {showDeleteButton && (
                            <Button
                              variant="danger"
                              onClick={() => {
                                setShowModal(true);
                                setEventId(event.id);
                              }}
                            >
                              Delete
                            </Button>
                          )}
                        </ButtonGroup>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })
              ) : (
                <p className="fs-5">No upcoming events</p>
              )
            ) : (
              <LoadingSpinner />
            )}
          </Accordion>
          {showCreateLink && (
            <Link to="new/" className={styles.Link}>
              New Event <i class="fa-solid fa-plus"></i>
            </Link>
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

export default EventsList;
