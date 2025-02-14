import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosDefaults";
import { useSetCurrentUser } from "../../contexts/useSetCurrentUser";
import appStyles from "../../App.module.css";
import { removeTokenTimestamp } from "../../utils/utils";
import { SuccessToast, WarningToast } from "../../functions/toasts";

export default function SignOutPage() {
  // Use react-router's useNavigate hook to allow the user to go back
  // to the previous page if they change their mind about logging out
  // Adapted from the docs:
  // https://reactrouter.com/en/main/start/tutorial#cancel-button
  const navigate = useNavigate();
  const setCurrentUser = useSetCurrentUser();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoggingOut(true);
      await api.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      navigate("/signin");
      SuccessToast("You have logged out.");
    } catch (error) {
      WarningToast("We couldn't sign you out. Please try again.");
    }
  };

  return (
    <>
      <Container fluid="sm">
        <Row>
          <Col className="text-center">
            <h1 className={appStyles.Header}>
              Are you sure you want to sign out?
            </h1>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Button
              className="mx-2"
              variant="outline-secondary"
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Go back
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              type="submit"
              disabled={loggingOut}
              onClick={handleSubmit}
            >
              {loggingOut ? "Please wait..." : "Sign Out"}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
