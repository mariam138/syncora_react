import React, { useEffect, useState } from "react";
import { apiResp } from "../../api/axiosDefaults";
import LoadingSpinner from "../../components/LoadingSpinner";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
          {isLoaded ? (
            eventsList.results.map((event) => (
              <p key={event.id}>{event.name}</p>
            ))
          ) : (
            <LoadingSpinner />
          )}
        </Col>
      </Row>
    </>
  );
}

export default EventsList;
