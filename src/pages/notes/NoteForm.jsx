import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import appStyles from "../../App.module.css";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { apiReq } from "../../api/axiosDefaults";
import { SuccessToast, WarningToast } from "../../functions/toasts";

function NoteForm() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
  });

  const { title, content } = noteData;
  const currentUser = useCurrentUser();

  const goBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    setNoteData({
      ...noteData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentUser) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      try {
        await apiReq.post("/notes/new/", formData);
        navigate("/notes/");
        SuccessToast("Note created");
      } catch (error) {
        console.log(error);
        if (error.response.status !== 400) {
          WarningToast("Note could not be created. Please try again.");
        }
        setError(error.response?.data);
      }
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <h1>New Note</h1>
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
                {error.title?.map((message, i) => (
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
                {error.content?.map((message, i) => (
                  <Alert variant="warning" key={i}>
                    {message}
                  </Alert>
                ))}
                <div className="text-center">
                  <Button className={`${appStyles.Button} btn`} type="submit">
                    Create <i class="fa-solid fa-plus"></i>
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center mb-3">
            <Button variant="outline-secondary">
              <i class="fa-solid fa-arrow-left"></i> Back
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default NoteForm;
