import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Alert, Card } from "react-bootstrap";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import appStyles from "../../App.module.css";
import styles from "../../styles/SignUpForm.module.css";
import api from "../../api/axiosDefaults";

const SignInForm = () => {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signInData;
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/dj-rest-auth/login/", signInData);
    } catch (error) {
        console.log(error);
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
          <Form>
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

            {/* <Form.Group className="mb-3" controlId="formEmail">
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
            ))} */}

            <Form.Group className="mb-3" controlId="formPassword1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {error.password1?.map((message, i) => (
              <Alert variant="warning" key={i}>
                {message}
              </Alert>
            ))}

            {/* <Form.Group className="mb-3" controlId="formPassword2">
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
            ))} */}

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

export default SignInForm;
