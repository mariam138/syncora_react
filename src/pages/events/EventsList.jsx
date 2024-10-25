import React, { useEffect, useState } from "react";
import { apiResp } from "../../api/axiosDefaults";
import LoadingSpinner from "../../components/LoadingSpinner";
import appStyles from '../../App.module.css';

function EventsList() {
  // Set events list to an empty results array
  const [eventsList, setEventsList] = useState({ results: [] });
  // Initially set loaded state to false
  const [isLoaded, setIsLoaded] = useState(false);

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
  }, []);

  return (
    <div>
      <h1 className={appStyles.Header}>Events</h1>
      {isLoaded ? (
        eventsList.results.map((event) => <p key={event.id}>{event.name}</p>)
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default EventsList;
