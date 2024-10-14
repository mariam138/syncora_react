import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Alert, Card } from "react-bootstrap";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import appStyles from "../App.module.css";
import styles from "../styles/SignUpForm.module.css";
import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  // Destructure to avoid using dot notation
  const { username, email, password1, password2 } = signUpData;
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
    // Prevents page refresh when sign up button is pressed
    e.preventDefault();
    try {
      await axios.post(
        'https://syncora-api-ecc74194384c.herokuapp.com/dj-rest-auth/registration/',
        signUpData
      );
      // When sign up data is submitted, navigate user to index
      navigate("/");
    } catch (error) {
      console.log(error);
      // Set any errors if applicable to the error repsonse data
      setError(error.response?.data);
    }
  };

  return (
    <div className="text-center">
      <h1 className={appStyles.Header}>Syncora</h1>
      <h2 className={appStyles.Header}>Let's get organised.</h2>
      <Card>
        <Card.Body>
          <Card.Title>Sign up below to start using Syncora</Card.Title>
          <Form onSubmit={handleSubmit}>
            {/* <Form.Group className="mb-3" controlId="formFirstName">
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
            ))} */}

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
              </Alert>))}

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
            <Button type="submit" className={styles.SignupButton}>
              Sign Up
            </Button>
            <Card.Text>
              Already have an account? Sign in{" "}
              <Link exact to="/signin">
                here.
              </Link>
            </Card.Text>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUpForm;
