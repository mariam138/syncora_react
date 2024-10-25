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

function EventsList() {
  // Set events list to an empty results array
  const [eventsList, setEventsList] = useState({ results: [] });
  // Initially set loaded state to false
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useCurrentUser();

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
          <Accordion alwaysOpen>
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
                      <Button variant="danger">Delete</Button>
                    </ButtonGroup>
                  </Accordion.Body>
                </Accordion.Item>
              ))
            ) : (
              <LoadingSpinner />
            )}
          </Accordion>
          <Link to="new">New Event</Link>
        </Col>
      </Row>
    </>
  );
}

export default EventsList;
