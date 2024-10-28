import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiResp } from '../../api/axiosDefaults';

function EventDetail() {
    const id = useParams();
    const [hasLoaded, setHasLoaded] = useState(false);
    const [eventDetail, setEventDetail] = useState({})

    const handleMount = async () => {
        try {
            const { data } = await apiResp.get(`/events/${id}/`)
            setEventDetail(data);
            console.log(data)
            setHasLoaded(true);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleMount();
    }, [id])

  return (
    <div>EventDetail</div>
  )
}

export default EventDetail