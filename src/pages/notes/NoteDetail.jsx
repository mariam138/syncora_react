import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import styles from "../../styles/DetailPageButtons.module.css";
import appStyles from "../../App.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { apiReq } from "../../api/axiosDefaults";

function NoteDetail() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [noteDetail, setNoteDetail] = useState({
    owner: "",
    title: "",
    date_updated: "",
    content: "",
  });

  const { owner, title, date_updated, content } = noteDetail;
  const { pk } = useParams();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  const is_owner = currentUser?.username === owner;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await apiReq.get(`/notes/${pk}/`);
        setNoteDetail(data);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    setIsLoaded(false);
    handleMount();
  }, [pk]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <h1>Note title</h1>
          <Card bg="warning">
            <Card.Body>
              <Card.Text>Note content blah blah blah</Card.Text>
            </Card.Body>
            <Card.Footer>Date updated</Card.Footer>
          </Card>

          <div className="text-center mt-4">
            <Button variant="info" className={`mx-2 ${styles.BtnText}`}>
              Edit <i className="fa-solid fa-pencil"></i>
            </Button>
            <Button variant="danger" className={`mx-2 ${styles.BtnText}`}>
              Delete <i className="fa-solid fa-trash"></i>
            </Button>
          </div>

          <div className="text-center mt-4">
            <Button
              className={`btn ${appStyles.Button} mx-2 ${styles.BtnText}`}
              onClick={goBack}
            >
              <i className="fa-solid fa-arrow-left"></i> Back
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default NoteDetail;
