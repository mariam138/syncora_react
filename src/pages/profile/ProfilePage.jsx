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
import Alert from "react-bootstrap/Alert";
import DeleteModal from "../../components/DeleteModal";

function ProfilePage() {
  // Sets initial profile data
  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    email: "",
    profile_image: "",
  });
  // Destructures profile data into variables to use for display
  const { name, username, email, profile_image } = profileData;
  // create currentUser and setCurrentUser vars from CurrentUserContext
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  // Create navigate var with react-router's useNavigate hook
  const navigate = useNavigate();
  // Create a ref for the input field to trigger upload
  // Then use the upload button to trigger device files to open
  // Change the button text to display the uploaded file if successful
  // Code adapted from:
  // https://medium.com/codex/use-a-button-to-upload-files-on-your-react-app-with-bootstrap-ef963cbe8280
  const imageFile = useRef();
  // Used to display the file name when choosing new profile image
  const [uploadedFileName, setUploadedFileName] = useState(null);
  // Sets error when file size is too big for image upload
  const [fileSizeError, setFileSizeError] = useState(null);
  // Used to disable the submit button if user uploads an image too large
  const [disableSubmit, setDisableSumit] = useState(false);
  // Displays a success alert when user uploads new profile image
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // Allows modal to be displayed
  const [showModal, setShowModal] = useState(false);

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
  const goBack = () => {
    navigate(-1);
  };

  // Handles upload of new image and sets imageFile by click
  const handleUpload = () => {
    imageFile.current?.click();
  };

  /** Resets states initially when user uploads a new file.
   * Checks to see if any files have been uploaded, and if so
   * sets the upload button text to the file name.
   * If the file is too big, an error occurs which is displayed
   * to the user as an alert. The file name is removed from the
   * upload button, the current value of the imageFile set to null
   * and the submit button is disabled to prevent the user
   * from uploading the file if it is too large.
   */
  const handleChange = () => {
    setFileSizeError(null);
    setDisableSumit(false);
    setSubmitSuccess(false);
    imageFile.current?.files &&
      setUploadedFileName(imageFile.current.files[0].name);
    if (imageFile.current.files[0].size > 2 * 1024 * 1024) {
      setFileSizeError(
        "Image size is larger than 2MB. Please choose a smaller image.",
      );
      setUploadedFileName(null);
      imageFile.current.value = null;
      setDisableSumit(true);
    }
  };

  /**When submitting the new profile picture, new form data is created.
   * If there is a file, append the file to the profile_image form data.
   * If no image is found, log it to the console. In a try-catch block,
   * the data is sent to the api endpoint with a put request. The profile
   * data is then set with the new profile image as well as the current user.
   * The upload button text is reverted and the user is alerted their upload
   * was successful. Logs any errors to the console in the catch block.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (imageFile.current?.files[0]) {
      formData.append("profile_image", imageFile?.current?.files[0]);
    } else {
      console.log("no image found");
      return;
    }

    try {
      const { data } = await api.put(`/profiles/${currentUser.pk}/`, formData);
      // Update the profileData state with the new profile image URL
      setProfileData((prevState) => ({
        ...prevState,
        profile_image: data.profile_image,
      }));
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.profile_image,
      }));
      setUploadedFileName(null);
      setSubmitSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/profiles/${currentUser.pk}`);
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          <h1 className={appStyles.Header}>Your Profile</h1>
          {/* Alert if profile picture upload was successful */}
          {submitSuccess && (
            <Alert variant="success" dismissible className="my-2">
              Your profile picture has been changed!
            </Alert>
          )}
          {/* Display profile */}
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
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className={`${appStyles.Button} btn`}
                      onClick={handleUpload}
                    >
                      {uploadedFileName ? uploadedFileName : "Upload"}
                    </button>
                    {/* Display error if image is too large */}
                    {fileSizeError && (
                      <Alert variant="warning" className="my-2" dismissible>
                        {fileSizeError}
                      </Alert>
                    )}
                  </div>
                  <Button variant="info" type="submit" disabled={disableSubmit}>
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
            <Button variant="danger" onClick={() => setShowModal(true)}>
              Delete account
            </Button>
          </div>
          <div className="text-center mt-4">
            <Button variant="outline-secondary" onClick={goBack}>
              Back
            </Button>
          </div>
        </Col>
      </Row>
      <DeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        feature="account"
        modalContent="Are you sure you want to delete your account"
        handleDelete={handleDelete}
      />
    </>
  );
}

export default ProfilePage;
