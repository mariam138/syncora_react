import { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import styles from "../../styles/Notes.module.css";
import btnStyles from "../../styles/DetailPageButtons.module.css";
import appStyles from "../../App.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/useCurrentUser";
import { apiReq } from "../../api/axiosDefaults";
import LoadingSpinner from "../../components/LoadingSpinner";
import DeleteModal from "../../components/DeleteModal";
import { SuccessToast, WarningToast } from "../../functions/toasts";
import NoteForm from "./NoteForm";

function NoteDetail() {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [noteDetail, setNoteDetail] = useState({
    owner: "",
    title: "",
    date_created: "",
    date_updated: "",
    content: "",
  });

  const { owner, title, date_created, date_updated, content } = noteDetail;
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
        WarningToast(
          "There was a problem loading your note. Please try again later.",
        );
      }
    };

    setIsLoaded(false);
    handleMount();
  }, [pk]);

  const goBack = () => {
    navigate(-1);
  };

  const handleDelete = async () => {
    if (is_owner) {
      try {
        setIsDeleting(true);
        await apiReq.delete(`/notes/${pk}/`);
        navigate("/notes/");
        SuccessToast("Note deleted");
      } catch (error) {
        setShowModal(false);
        WarningToast(
          "There was a problem deleting your note. Please try again later.",
        );
      }
    } else {
      navigate("/signin");
    }
  };

  // Takes the updated note and spreads it into the previous
  // note detail, then sets isEditing back to false
  // to display note detail again
  const handleNoteUpdate = (updatedNote) => {
    setNoteDetail((prevNoteDetail) => ({
      ...prevNoteDetail,
      ...updatedNote,
    }));
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <NoteForm
          noteTitle={title}
          noteContent={content}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isOwner={is_owner}
          onUpdateNoteDetail={handleNoteUpdate}
        />
      ) : isLoaded ? (
        <Row>
          <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
            <h1
              className={`${appStyles.Header} ${!title && "text-body-tertiary"}`}
            >
              {title ? title : "Untitled"}
            </h1>
            <Card className={`mx-auto ${styles.Note}`}>
              <Card.Body>
                <Card.Text className="fs-5">{content}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-body-secondary">
                <strong>Created:</strong> {date_created}
                <br />
                <strong>Updated:</strong> {date_updated}
              </Card.Footer>
            </Card>

            <div className="text-center mt-4">
              <Button
                variant="info"
                className={`mx-2 ${btnStyles.BtnText}`}
                onClick={() => setIsEditing(true)}
              >
                Edit <i className="fa-solid fa-pencil"></i>
              </Button>
              <Button
                variant="danger"
                className={`mx-2 ${btnStyles.BtnText}`}
                onClick={() => setShowModal(true)}
              >
                Delete <i className="fa-solid fa-trash"></i>
              </Button>
            </div>

            <div className="text-center mt-4">
              <Button
                className={`btn ${appStyles.Button} mx-2 ${btnStyles.BtnText}`}
                onClick={goBack}
              >
                <i className="fa-solid fa-arrow-left"></i> Back
              </Button>
            </div>
          </Col>
        </Row>
      ) : (
        <LoadingSpinner />
      )}
      <DeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        feature="note"
        modalContent="Are you sure you want to delete this note"
        handleDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}

export default NoteDetail;
