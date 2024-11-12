import React from "react";
import { Link } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

import appStyles from "../../App.module.css";
import styles from "../../styles/SignInForm.module.css";

function LandingPage() {
  return (
    <Row className="mx-md-4">
      <div className="text-center px-3 mb-4">
        <h1 className={appStyles.Header}>Syncora</h1>
        <h2 className={appStyles.Header}>Your Digital Organiser</h2>
      </div>

      <Col md={6} className="gx-md-0">
        <Card className={styles.FormCard}>
          <Card.Body className="text-center">
            <Card.Title className="fs-4">
              Organise Your Life with Syncora
            </Card.Title>
            <Card.Text className="fs-5">
              Syncora brings together your tasks, events and notes in one place.
              It's the perfect digital solution to stay on top of your
              day-to-day life and be more productive.
            </Card.Text>
            <Button className={appStyles.Button} as={Link} to="/signup">
              Sign Up Now <i class="fa-solid fa-user-plus"></i>
            </Button>
            <Card.Text className="mt-3">
              Already have an account? <Link to="/signin">Sign in here</Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6} className="gx-md-0">
        <Image
          className={`d-md-block ${appStyles.Hero}`}
          src="https://res.cloudinary.com/dy1xfelbe/image/upload/v1729512622/lists-6131220_1280_xvupzh.jpg"
          alt="Illustration of organized notes and lists"
        />
      </Col>
    </Row>
  );
}

export default LandingPage;
