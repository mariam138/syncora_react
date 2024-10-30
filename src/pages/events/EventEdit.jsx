import React, { useEffect, useState } from "react";

function EventEdit({ eventDetail, isEditing }) {
  const [eventData, setEventData] = useState({});
  const handleMount = () => {
    {
      isEditing &&
        setEventData({
          name: eventDetail?.name,
          date: eventDetail?.date,
          start_time: eventDetail?.start_time,
          end_time: eventDetail?.end_time,
          category: eventDetail?.category,
          location: eventDetail?.location,
          notes: eventDetail?.notes,
        });
    }
  };

  useEffect(() => {
    handleMount();
  }, [isEditing]);

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };
  return <div>EventEdit</div>;
}

export default EventEdit;
