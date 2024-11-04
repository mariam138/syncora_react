import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import appStyles from "../../App.module.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { apiResp } from "../../api/axiosDefaults";
import styles from "../../styles/DetailPageButtons.module.css";

function TaskDetail() {
  const { pk } = useParams();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [taskDetail, setTaskDetail] = useState({
    owner: "",
    title: "",
    due_date: "",
    priority: "",
    category_display: "",
    description: "",
    completed: "",
  });

  const {
    owner,
    title,
    due_date,
    priority,
    category_display,
    description,
    completed,
  } = taskDetail;

  const is_owner = currentUser?.username === owner;

  const handleMount = async () => {
    try {
      const { data } = await apiResp.get(`/tasks/${pk}/`);
      const {
        owner,
        title,
        due_date,
        priority,
        category_display,
        description,
        completed,
      } = data;
      setTaskDetail(data);
      setIsLoaded(true);
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
        <Col md={{ span: 6, offset: 3 }}>
          {isLoaded ? (
            <>
              <h1 className={appStyles.Header}>{title}</h1>
              <Card className="my-3">
                <Card.Body>
                  <Card.Title>
                    Due Date <i className="fa-regular fa-calendar"></i>
                  </Card.Title>
                  <Card.Text>{due_date}</Card.Text>
                  <hr />
                  <Card.Title>
                    Priority <i className="fa-solid fa-hourglass-start"></i>
                  </Card.Title>
                  <Card.Text>{priority}</Card.Text>
                  <hr />
                  <Card.Title>
                    Category <i className="fa-solid fa-hourglass-end"></i>
                  </Card.Title>
                  <Card.Text>{category_display}</Card.Text>
                  <hr />
                  <Card.Title>
                    Description <i className="fa-solid fa-location-dot"></i>
                  </Card.Title>
                  <Card.Text>{description}</Card.Text>
                  <hr />
                  <Card.Title>
                    Completed? <i className="fa-solid fa-icons"></i>
                  </Card.Title>
                  <Card.Text>{completed ? "Yes" : "No"}</Card.Text>
                </Card.Body>
              </Card>

              <div className="text-center mt-4">
                <Button
                  className={`btn ${appStyles.Button} mx-2 ${styles.BtnText}`}
                  onClick={goBack}
                >
                  <i class="fa-solid fa-arrow-left"></i> Back
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <LoadingSpinner />
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}

export default TaskDetail;
