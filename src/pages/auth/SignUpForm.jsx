import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Alert, Card, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import appStyles from "../../App.module.css";
import api from "../../api/axiosDefaults";
import Image from "react-bootstrap/Image";
import { SuccessToast } from "../../functions/toasts";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    first_name: "",
  });

  // Destructure to avoid using dot notation
  const { username, email, password1, password2, first_name } = signUpData;
  const navigate = useNavigate();
  // Set any errors initially to an empty object
  const [error, setError] = useState({});

  // handle change event to get sign up data
  const handleChange = (e) => {
    setSignUpData({
      // Spread the data to create a new object
      ...signUpData,
      // set the name property to the value, avoids writing separate
      // handlers for each input field
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(api)
    // Prevents page refresh when sign up button is pressed
    e.preventDefault();
    try {
      await api.post("/dj-rest-auth/registration/", signUpData);
      // When sign up data is submitted, navigate user to sign in page
      navigate("/signin");
      SuccessToast("Sign up successful!");
    } catch (error) {
      console.log(error);
      // Set any errors if applicable to the error repsonse data
      setError(error.response?.data);
    }
  };

  return (
    <Row className="mx-md-4">
      <div className="text-center px-3">
        <h1 className={appStyles.Header}>Syncora</h1>
        <h2 className={appStyles.Header}>Let's get organised.</h2>
      </div>
      <Col md={6} className="gx-md-0">
        <Card>
          <Card.Body>
            <Card.Title className="text-center">
              Sign up below to start using Syncora
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  name="first_name"
                  value={first_name}
                  onChange={handleChange}
                />
              </Form.Group>
              {error.first_name?.map((message, i) => (
                <Alert variant="warning" key={i}>
                  {message}
                </Alert>
              ))}

              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Choose a username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              {error.username?.map((message, i) => (
                <Alert variant="warning" key={i}>
                  {message}
                </Alert>
              ))}

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </Form.Group>
              {error.email?.map((message, i) => (
                <Alert variant="warning" key={i}>
                  {message}
                </Alert>
              ))}

              <Form.Group className="mb-3" controlId="formPassword1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password1"
                  value={password1}
                  onChange={handleChange}
                />
              </Form.Group>
              {error.password1?.map((message, i) => (
                <Alert variant="warning" key={i}>
                  {message}
                </Alert>
              ))}

              <Form.Group className="mb-3" controlId="formPassword2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password again"
                  name="password2"
                  value={password2}
                  onChange={handleChange}
                />
              </Form.Group>
              {error.password2?.map((message, i) => (
                <Alert variant="warning" key={i}>
                  {message}
                </Alert>
              ))}

              <div
                className="text-center
              "
              >
                <Button type="submit" className={appStyles.Button}>
                  Sign Up
                </Button>
              </div>

              <Card.Text className="text-center">
                Already have an account? Sign in{" "}
                <Link exact to="/signin">
                  here.
                </Link>
              </Card.Text>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6} className="gx-md-0">
        <Image
          className={`d-none d-md-block ${appStyles.Hero}`}
          src="https://res.cloudinary.com/dy1xfelbe/image/upload/v1729512622/lists-6131220_1280_xvupzh.jpg"
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
