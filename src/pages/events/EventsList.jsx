import React, { useState } from "react";
import { apiResp } from "../../api/axiosDefaults";

function EventsList() {
  // Set events list to an empty results array
  const [eventsList, setEventsList] = useState({ results: [] });
  // Initially set loaded state to false
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMount = async () => {
    try {
      const { data } = await apiResp.get("/events");
      setEventsList(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return <div>EventsList</div>;
}

export default EventsList;
