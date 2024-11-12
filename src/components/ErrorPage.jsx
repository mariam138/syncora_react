import { useRouteError } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import styles from "../App.module.css";
import btnStyles from "../styles/DetailPageButtons.module.css";
import appStyles from "../App.module.css";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  // Code to create the error page component is adapted from the react router docs
  // https://reactrouter.com/en/main/start/tutorial#handling-not-found-errors

  const error = useRouteError();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Row className="justify-content-center align-items-center">
      <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
        <h1 className={`${appStyles.Header} text-center mb-4`}>
          Oops! There's an error.
        </h1>
        <div className={`${styles.App} text-center`}>
          <p className="fs-5">
            {error.statusText ||
              error.message ||
              "An unexpected error occured."}
          </p>
          <Button
            className={`btn ${appStyles.Button} mx-2 ${btnStyles.BtnText}`}
            onClick={goBack}
          >
            <i className="fa-solid fa-arrow-left"></i> Back
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default ErrorPage;
