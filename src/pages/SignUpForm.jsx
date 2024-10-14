import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import appStyles from "../App.module.css";
import styles from "../styles/SignUpForm.module.css";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    fname: "",
    username: "",
    email: "",
    password: "",
  });

  // Destructure to avoid using dot notation
  const { fname, username, email, password } = signUpData;

  return (
    <div className="text-center">
      <h1 className={appStyles.Header}>Syncora</h1>
      <h2 className={appStyles.Header}>Let's get organised.</h2>
      <Card>
        <Card.Body>
          <Card.Title>Sign up below to start using Syncora</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                name="fname"
                value={fname}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Choose a username"
                name="username"
                value={username}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
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
