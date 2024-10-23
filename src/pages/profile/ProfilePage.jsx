import React, { useEffect, useRef, useState } from "react";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
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
    name: "",
    username: "",
    email: "",
    profile_image: "",
  });
  const { name, username, email, profile_image } = profileData;
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  /** Get current user's profile by their primary
   * key and set the data as the profile state.
   * This is done on component mount, so is called
   * in the useEffect() hook below.
   * Log an error to the console if applicable.
   */
  const handleMount = async () => {
    try {
      const { data } = await api.get(`/profiles/${currentUser.pk}`);
      const { name, username, email, profile_image } = data;
      setProfileData({
        name,
        username,
        email,
        profile_image,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Ensure mount only happens once
  useEffect(() => {
    if (currentUser?.pk) {
      handleMount();
    }
  }, [currentUser]);

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
  const imageFile = useRef();

  // const inputRef = useRef(null);
  const handleUpload = () => {
    imageFile.current?.click();
  };
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const handleDisplayFileDetails = () => {
    imageFile.current?.files &&
      setUploadedFileName(imageFile.current.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(imageFile);
    if (imageFile.current?.files[0]) {
      formData.append("profile_image", imageFile?.current?.files[0]);
      console.log(imageFile.current?.files[0]);
    } else {
      console.log("no image found");
      return;
    }

    try {
      const { data } = await api.put(`/profiles/${currentUser.pk}/`, formData);
      console.log(data);
      // Update the profileData state with the new profile image URL
      setProfileData((prevState) => ({
        ...prevState,
        profile_image: data.profile_image,
      }));
      // console.log(data.profile_image);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.profile_image,
      }));
    } catch (error) {
      console.log(error);
    }
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
                      ref={imageFile}
                      className="d-none"
                      type="file"
                      onChange={handleDisplayFileDetails}
                    />
                    <button
                      type="button"
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
