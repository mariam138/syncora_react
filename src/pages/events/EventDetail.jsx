import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiResp } from "../../api/axiosDefaults";

function EventDetail() {
  const { pk } = useParams();
  const [hasLoaded, setHasLoaded] = useState(false);
    const [eventDetail, setEventDetail] = useState({
        id: null,
        owner: '',
        name: '',
        date: '',
        start_time: '',
        end_time: '',
        category: '',
        location: '',
        notes: ''
  });

  const handleMount = async () => {
    try {
      const { data } = await apiResp.get(`/events/${pk}/`);
      setEventDetail(data);
      setHasLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleMount();
  }, [pk]);

  return <div>EventDetail</div>;
}

export default EventDetail;
