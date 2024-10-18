import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Alert, Card } from "react-bootstrap";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import appStyles from "../../App.module.css";
import styles from "../../styles/SignUpForm.module.css";
import api from "../../api/axiosDefaults";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signInData;
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Destructure data from user login to be used to set the current user
      const { data } = await api.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError(error.response?.data);
    }
  };

  return (
    <div className="text-center px-3">
      <h1 className={appStyles.Header}>Syncora</h1>
      <h2 className={appStyles.Header}>Let's get organised.</h2>
      <Card>
        <Card.Body>
          <Card.Title>Sign in below to Syncora</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
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

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {error.password?.map((message, i) => (
              <Alert variant="warning" key={i}>
                {message}
              </Alert>
            ))}

            <Button type="submit" className={styles.SignupButton}>
              Sign In
            </Button>
            <Card.Text>
              Don't have an account? Sign up{" "}
              <Link exact to="/signup">
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
