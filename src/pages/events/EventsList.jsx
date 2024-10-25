import React, { useEffect, useState } from "react";
import { apiResp } from "../../api/axiosDefaults";
import LoadingSpinner from "../../components/LoadingSpinner";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Link } from "react-router-dom";
import styles from "../../styles/EventsList.module.css";
import DeleteModal from "../../components/DeleteModal";

function EventsList() {
  // Set events list to an empty results array
  const [eventsList, setEventsList] = useState({ results: [] });
  // Initially set loaded state to false
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const [showModal, setShowModal] = useState(false);

  // Check current user against event owner
  const eventOwner = eventsList.results[0]?.owner;
  const is_owner = currentUser?.username === eventOwner;

  const handleMount = async () => {
    try {
      const { data } = await apiResp.get("/events");
      setEventsList(data);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleMount();
  }, [currentUser]);

  return (
    <>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          <h1 className={appStyles.Header}>Events</h1>
          <Accordion alwaysOpen className="mb-3">
            {isLoaded ? (
              eventsList.results.map((event) => (
                <Accordion.Item eventKey={`${event.id}`} key={event.id}>
                  <Accordion.Header>
                    {event.name}
                    <br />
                    {event.date} {event.start_time} {event.location}
                  </Accordion.Header>
                  <Accordion.Body>
                    <ButtonGroup aria-label="Edit and delete event buttons">
                      <Button variant="outline-secondary">Edit</Button>
                      <Button
                        variant="danger"
                        onClick={() => setShowModal(true)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Accordion.Body>
                </Accordion.Item>
              ))
            ) : (
              <LoadingSpinner />
            )}
          </Accordion>
          <Link to="new" className={styles.Link}>
            New Event <i class="fa-solid fa-plus"></i>
          </Link>
        </Col>
      </Row>
      <DeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        feature="event"
        modalContent="Are you sure you want to delete this event"
        // handleDelete={handleDelete}
      />
    </>
  );
}

export default EventsList;
