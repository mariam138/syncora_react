import React, { useEffect, useRef, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import api from "../../api/axiosDefaults";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import { Form } from "react-bootstrap";

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

  // Create a ref for the input field to trigger upload
  // Then use the upload button to trigger device files to open
  // Change the button text to display the uploaded file if successful
  // Code adapted from:
  // https://medium.com/codex/use-a-button-to-upload-files-on-your-react-app-with-bootstrap-ef963cbe8280
  const inputRef = useRef(null);
  const handleUpload = () => {
    inputRef.current?.click();
  };
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const handleDisplayFileDetails = () => {
    inputRef.current?.files &&
      setUploadedFileName(inputRef.current.files[0].name);
  };

  // const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const handleSubmit = async (e) => {
    // inputRef.current?.click();
    e.preventDefault();
    console.log("Submit!");
    const new_photo = inputRef.current?.files[0];
    console.log(new_photo);
    // try {
    //   const new_photo = inputRef.current?.files[0];
    //   await api.put(`/profiles/${currentUser.pk}`, new_photo);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          <h1>Your Profile</h1>
          <Card className="my-3">
            <Card.Body>
              <div className="text-center my-2">
                <Image
                  src={profile_image}
                  roundedCircle
                  className={styles.ProfileImage}
                />
              </div>
              <div className="text-center my-2">
                {/* Custom upload btn for new photo */}
                <Form onSubmit={handleSubmit}>
                  <div className="m-3">
                    <label className="mx-3">Change profile picture: </label>
                    <input
                      ref={inputRef}
                      className="d-none"
                      type="file"
                      onChange={handleDisplayFileDetails}
                    />
                    <button
                      type="submit"
                      className={`${appStyles.Button} btn`}
                      onClick={handleUpload}
                    >
                      {uploadedFileName ? uploadedFileName : "Upload"}
                    </button>
                  </div>
                  <Button variant="info" type="submit">
                    Save
                  </Button>
                </Form>
              </div>

              <hr />
              <Card.Title>Name</Card.Title>
              <Card.Text>{name ? { name } : "No name found"}</Card.Text>
              <hr />
              <Card.Title>Username</Card.Title>
              <Card.Text>{username}</Card.Text>
              <hr />
              <Card.Title>Email</Card.Title>
              <Card.Text>{email}</Card.Text>
            </Card.Body>
          </Card>
          <div className="text-center">
            <Button variant="danger">Delete account</Button>
          </div>
          <div className="text-center mt-4">
            <Button variant="outline-secondary" onClick={goBack}>
              Back
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ProfilePage;
