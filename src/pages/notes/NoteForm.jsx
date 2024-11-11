import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import appStyles from "../../App.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { apiReq } from "../../api/axiosDefaults";
import { SuccessToast, WarningToast } from "../../functions/toasts";

function NoteForm({
  noteTitle,
  noteContent,
  isEditing,
  setIsEditing,
  isOwner,
  onUpdateNoteDetail,
}) {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState({});
  const [noteData, setNoteData] = useState({
    title: noteTitle || "",
    content: noteContent || "",
  });

  const { title, content } = noteData;
  const currentUser = useCurrentUser();
  const { pk } = useParams();

  const goBack = () => {
    navigate(-1);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    WarningToast("Your changes were not saved.");
  };

  // Allows changing of input fields values by creating a copy
  // of the previous data before updating
  const handleChange = (e) => {
    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    try {
      if (isEditing && isOwner) {
        setIsSaving(true);
        const { data } = await apiReq.put(`/notes/${pk}/`, formData);
        if (onUpdateNoteDetail) {
          onUpdateNoteDetail(data);
        }
        SuccessToast("Note updated");
      } else if (currentUser) {
        setIsCreating(true);
        await apiReq.post("/notes/new/", formData);
        navigate("/notes/");
        SuccessToast("Note created");
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status !== 400) {
        WarningToast("Note could not be created. Please try again.");
      }
      setError(error.response?.data);
    }
  };

  return (
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <h1 className={appStyles.Header}>
            {isEditing ? "Edit Note" : "New Note"}
          </h1>
          <Card className="mb-3">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label className="fs-5 d-flex flex-column flex-lg-row align-content-center">
                    <span>
                      Title <i class="fa-solid fa-heading"></i>
                    </span>
                    <span className="text-body-secondary fs-6 ms-lg-3 align-self-lg-center">
                      <i className="fa-solid fa-circle-info"></i> Title is not
                      required.
                    </span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Note title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  />
                </Form.Group>
                {error &&
                  error.title?.map((message, i) => (
                    <Alert variant="warning" key={i}>
                      {message}
                    </Alert>
                  ))}

                <Form.Group className="mb-3" controlId="formContent">
                  <Form.Label>
                    Content <i class="fa-solid fa-pencil"></i>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="A penny for your thoughts?"
                    name="content"
                    value={content}
                    onChange={handleChange}
                  />
                </Form.Group>
                {error &&
                  error.content?.map((message, i) => (
                    <Alert variant="warning" key={i}>
                      {message}
                    </Alert>
                  ))}
                <div className="text-center">
                  <Button
                    className={`${appStyles.Button} btn`}
                    type="submit"
                    disabled={isSaving || isCreating}
                  >
                    {isEditing
                      ? isSaving
                        ? "Saving..."
                        : "Save changes"
                      : isCreating
                        ? "Creating task..."
                        : "Create"}{" "}
                    <i class="fa-solid fa-plus"></i>
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center mb-3">
            {/* Conditionally display different btn text and different onClick handlers
            based on editing state of the form */}
            <Button
              variant="outline-secondary"
              onClick={isEditing ? cancelEdit : goBack}
            >
              {isEditing ? (
                <>
                  Cancel <i class="fa-solid fa-xmark"></i>
                </>
              ) : (
                <>
                  <i class="fa-solid fa-arrow-left"></i> Back
                </>
              )}
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default NoteForm;
