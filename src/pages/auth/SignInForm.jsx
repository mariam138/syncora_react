import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Alert, Card, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import appStyles from "../../App.module.css";
import api from "../../api/axiosDefaults";
import Image from "react-bootstrap/Image";
import styles from "../../styles/SignInForm.module.css";
import { setTokenTimestamp } from "../../utils/utils";
import { SuccessToast, WarningToast } from "../../functions/toasts";
import { useSetCurrentUser } from "../../contexts/useSetCurrentUser";

const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();
  const [signingIn, setSigningIn] = useState(false);

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
      setSigningIn(true);
      // Destructure data from user login to be used to set the current user
      const { data } = await api.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      navigate("/dashboard");
      SuccessToast("Login successful!");
    } catch (error) {
      WarningToast("There was a problem signing in. Please try again.");
      setError(error.response?.data);
      setSigningIn(false);
    }
  };

  return (
    <Row className="mx-md-4">
      <div className="text-center px-3">
        <h1 className={appStyles.Header}>Syncora</h1>
        <h2 className={appStyles.Header}>Let&apos;s get organised.</h2>
      </div>
      <Col md={6} className="gx-md-0">
        <Card className={styles.FormCard}>
          <Card.Body>
            <Card.Title className="text-center">
              Sign in below to Syncora
            </Card.Title>
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
              {error &&
                error.username?.map((message, i) => (
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
              {error &&
                error.password?.map((message, i) => (
                  <Alert variant="warning" key={i}>
                    {message}
                  </Alert>
                ))}
              <div
                className="text-center
              "
              >
                <Button
                  type="submit"
                  className={appStyles.Button}
                  disabled={signingIn}
                >
                  {signingIn ? "Signing in..." : "Sign In"}
                </Button>
              </div>
              <Card.Text className="text-center">
                Don&apos;t have an account? Sign up{" "}
                <Link exact="true" to="/signup">
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
          src="https://res.cloudinary.com/dy1xfelbe/image/upload/v1731487405/lists-6131220_1280_hviaxt.webp"
        />
      </Col>
    </Row>
  );
};

export default SignInForm;
