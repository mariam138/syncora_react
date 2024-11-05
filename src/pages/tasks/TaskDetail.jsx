import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import appStyles from "../../App.module.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { apiReq, apiResp } from "../../api/axiosDefaults";
import styles from "../../styles/DetailPageButtons.module.css";
import DeleteModal from "../../components/DeleteModal";
import { SuccessToast, WarningToast } from "../../functions/toasts";
import TaskForm from "./TaskForm";
import { formatDueDate } from "../../functions/dateFormat";

function TaskDetail() {
  const { pk } = useParams();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskDetail, setTaskDetail] = useState({
    owner: "",
    title: "",
    due_date: "",
    priority: "",
    priority_display: "",
    category_display: "",
    description: "",
    completed: "",
  });

  const {
    owner,
    title,
    due_date,
    priority,
    priority_display,
    category,
    category_display,
    description,
    completed,
  } = taskDetail;

  const is_owner = currentUser?.username === owner;

  const handleMount = async () => {
    try {
      const { data } = await apiResp.get(`/tasks/${pk}/`);
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

  const handleDelete = async () => {
    if (is_owner) {
      try {
        setIsDeleting(true);
        await apiReq.delete(`/tasks/${pk}/`);
        navigate("/tasks/");
        SuccessToast("Task deleted");
      } catch (error) {
        console.log(error);
        WarningToast(
          "There was a problem deleting your task. Please try again later.",
        );
      }
    } else {
      navigate("/signin");
    }
  };

  const handleTaskUpdate = (updatedTask) => {
    setTaskDetail((prevTaskDetail) => ({
      ...prevTaskDetail,
      ...updatedTask,
    }));
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <TaskForm
          taskTitle={title}
          detailDueDate={new Date(due_date)}
          taskPriority={priority}
          taskCategory={category}
                  taskDescription={description}
                  taskCompleted={completed}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isOwner={is_owner}
          onUpdateTaskDetail={handleTaskUpdate}
        />
      ) : isLoaded ? (
        <>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <h1 className={appStyles.Header}>{title}</h1>
              <Card className="my-3">
                <Card.Body>
                  <Card.Title>
                    Due Date <i class="fa-regular fa-calendar-check"></i>
                  </Card.Title>
                  <Card.Text>{due_date && formatDueDate(due_date)}</Card.Text>
                  <hr />
                  <Card.Title>
                    Priority <i class="fa-solid fa-triangle-exclamation"></i>
                  </Card.Title>
                  <Card.Text>{priority_display}</Card.Text>
                  <hr />
                  <Card.Title>
                    Category <i className="fa-solid fa-icons"></i>
                  </Card.Title>
                  <Card.Text>{category_display}</Card.Text>
                  <hr />
                  <Card.Title>
                    Description <i class="fa-solid fa-pencil"></i>
                  </Card.Title>
                  <Card.Text className={`!description && text-body-secondary`}>
                    {description || "No description available"}
                  </Card.Text>
                  <hr />
                  <Card.Title>
                    Completed? <i class="fa-solid fa-list-check"></i>
                  </Card.Title>
                  <Card.Text>{completed ? "Yes" : "No"}</Card.Text>
                </Card.Body>
              </Card>

              <div className="text-center mt-4">
                <Button
                  variant="info"
                  className={`mx-2 ${styles.BtnText}`}
                  onClick={() => setIsEditing(true)}
                >
                  Edit <i className="fa-solid fa-pencil"></i>
                </Button>
                <Button
                  variant="danger"
                  className={`mx-2 ${styles.BtnText}`}
                  onClick={() => setShowModal(true)}
                >
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
      ) : (
        <div className="text-center">
          <LoadingSpinner />
        </div>
      )}

      <DeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        feature="task"
        modalContent="Are you sure you want to delete this task"
        handleDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}

export default TaskDetail;
