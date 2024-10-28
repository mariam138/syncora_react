import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiResp } from "../../api/axiosDefaults";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import appStyles from "../../App.module.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import LoadingSpinner from "../../components/LoadingSpinner";

function EventDetail() {
  const { pk } = useParams();
  const [hasLoaded, setHasLoaded] = useState(false);
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
  const { owner, name, date, start_time, end_time, category_display, location, notes } =
    eventDetail;

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

  return (
    <>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          {hasLoaded ? (
            <>
              <h1 className={appStyles.Header}>{name}</h1>
              <Card className="my-3">
                <Card.Body>
                  <Card.Title>Date</Card.Title>
                  <Card.Text>{date}</Card.Text>
                  <hr />
                  <Card.Title>Start Time</Card.Title>
                  <Card.Text>{start_time}</Card.Text>
                  <hr />
                  <Card.Title>End Time</Card.Title>
                  <Card.Text>{end_time}</Card.Text>
                  <hr />
                  <Card.Title>Location</Card.Title>
                  <Card.Text>{location}</Card.Text>
                  <hr />
                  <Card.Title>Category</Card.Title>
                  <Card.Text>{category_display}</Card.Text>
                  <hr />
                  <Card.Title>Notes</Card.Title>
                  <Card.Text>{notes ? notes : "No notes"}</Card.Text>
                </Card.Body>
              </Card>{" "}
            </>
          ) : (
            <div className="text-center">
              <LoadingSpinner />
            </div>
          )}

          <div className="text-center mt-4">
            <Button className={`btn ${appStyles.Button}`} onClick={goBack}>
              Back
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default EventDetail;
