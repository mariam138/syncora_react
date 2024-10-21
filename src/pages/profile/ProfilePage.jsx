import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import api from "../../api/axiosDefaults";
import Image from "react-bootstrap/Image";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/ProfilePage.module.css";

function ProfilePage() {
  const [profileData, setProfileData] = useState({
    profile: {},
  });
  const { profile } = profileData;
  const currentUser = useCurrentUser();

  /** Get current user's profile by their primary
   * key and set the data as the profile state.
   * This is done on component mount, so is called
   * in the useEffect() hook below.
   * Log an error to the console if applicable.
   */
  const handleMount = async () => {
    try {
      const { data } = await api.get(`/profiles/${currentUser.pk}`);
      setProfileData({
        profile: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Ensure mount only happens once
  useEffect(() => {
    handleMount();
  }, []);

  // Destructure profile data to use variables to construct profile page
  const { id, username, name, email, profile_image } = profile;

  // Create separate function to go back a page which is called when back button is clicked
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          <h1>Your Profile</h1>
          <Card>
            <Card.Body>
              <div className="text-center my-2">
                <Image
                  src={profile_image}
                  roundedCircle
                  className={styles.ProfileImage}
                />
              </div>
              <div className="text-center my-2">
                <Button variant="warning" className="text-center">
                  Upload image
                </Button>
              </div>

              <Card.Subtitle>Name</Card.Subtitle>
              <Card.Text>{name}</Card.Text>
              <Card.Subtitle>Username</Card.Subtitle>
              <Card.Text>{username}</Card.Text>
              <Card.Subtitle>Email</Card.Subtitle>
              <Card.Text>{email}</Card.Text>
            </Card.Body>
          </Card>
          <Button variant="danger">Delete account</Button>
        </Col>
      </Row>

      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          <Button variant="secondary" onClick={goBack}>
            Back
          </Button>
        </Col>
      </Row>

      {/* <Row>
        <Col></Col>
      </Row> */}
    </>
  );
}

export default ProfilePage;
