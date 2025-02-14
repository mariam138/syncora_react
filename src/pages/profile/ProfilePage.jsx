import { useEffect, useRef, useState } from "react";
import { useCurrentUser } from "../../contexts/useCurrentUser.js";
import { useSetCurrentUser } from "../../contexts/useSetCurrentUser.js";
import { apiReq, apiResp } from "../../api/axiosDefaults";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import DeleteModal from "../../components/DeleteModal";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import { SuccessToast, WarningToast } from "../../functions/toasts.js";

function ProfilePage() {
  // Gets the pk from the url
  const { pk } = useParams();
  // Sets initial profile data
  const [profileData, setProfileData] = useState({
    id: null,
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
  const [disableSubmit, setDisableSubmit] = useState(false);
  // Displays a success alert when user uploads new profile image
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // Allows modal to be displayed
  const [showModal, setShowModal] = useState(false);
  // Controls disabled state of cancel button
  const [disableCancel, setDisableCancel] = useState(true);
  // Allows alert to be displayed when user cancels image upload
  const [cancelUpload, setCancelUpload] = useState(false);
  // Sets loaded state
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  // Checks to see if current user matches the profile id
  // Sets to either true or false
  const is_owner = currentUser?.pk === profileData.id;

  // Ensure mount only happens if pk value has changed
  useEffect(() => {
    /** Get current user's profile by their primary
     * key and set the data as the profile state.
     * This is done on component mount, so is called
     * in the useEffect() hook below.
     * Log an error to the console if applicable.
     */
    const handleMount = async () => {
      try {
        const { data } = await apiResp.get(`/profiles/${pk}/`);
        const { id, name, username, email, profile_image } = data;
        setProfileData({
          id,
          name,
          username,
          email,
          profile_image,
        });
        setIsLoaded(true);
      } catch (error) {
        WarningToast(
          "There was a problem loading your profile. Please try again later.",
        );
      }
    };
    setIsLoaded(false);
    handleMount();
  }, [pk]);

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
    setDisableSubmit(false);
    setSubmitSuccess(false);
    setDisableCancel(false);

    if (
      imageFile.current?.files &&
      imageFile.current.files[0].size < 2 * 1024 * 1024
    ) {
      setUploadedFileName(imageFile.current.files[0].name);
      SuccessToast("Image uploaded!");
    } else if (imageFile.current.files[0].size > 2 * 1024 * 1024) {
      setFileSizeError(
        "Image size is larger than 2MB. Please choose a smaller image.",
      );
      setUploadedFileName(null);
      imageFile.current.value = null;
      setDisableSubmit(true);
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
    if (is_owner) {
      const formData = new FormData();
      if (imageFile.current?.files[0]) {
        formData.append("profile_image", imageFile?.current?.files[0]);
      } else {
        return;
      }

      try {
        setIsUploading(true);
        const { data } = await apiReq.put(
          `/profiles/${currentUser.pk}/`,
          formData,
        );
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
        setIsUploading(false);
      } catch (error) {
        WarningToast(
          "There was a problem saving your profile picture. Please try again later.",
        );
      }
    } else {
      navigate("/");
    }
  };

  const handleDelete = async () => {
    if (is_owner) {
      try {
        setIsDeleting(true);
        await apiReq.delete(`/profiles/${currentUser.pk}`);
        setCurrentUser(null);
        navigate("/signup");
        SuccessToast("Account deleted!");
      } catch (error) {
        WarningToast(
          "There was a problem deleting your account. Please try again later.",
        );
      }
    } else {
      navigate("/");
    }
  };

  const handleCancel = () => {
    setDisableCancel(true);
    setUploadedFileName(null);
    imageFile.current.value = null;
    setCancelUpload(true);
  };

  // Set cancelUpload and submitSuccess back to false after time delay
  // To ensure alerts can continue to appear if user saves/cancels
  // a file upload several times on the page
  useEffect(() => {
    // Timeout for cancel upload
    let cancelTimeout;
    if (cancelUpload) {
      cancelTimeout = setTimeout(() => {
        setCancelUpload(false);
      }, 3000);
    }

    // Time out for successful submit
    let submitTimeout;
    if (submitSuccess) {
      submitTimeout = setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }

    // Clean up timeouts
    return () => {
      clearTimeout(cancelTimeout);
      clearTimeout(submitTimeout);
    };
  }, [cancelUpload, submitSuccess]);

  return (
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <h1 className={appStyles.Header}>Your Profile</h1>
          {/* Alert if profile picture upload was successful */}
          {submitSuccess && (
            <Alert variant="success" dismissible className="my-2">
              Your profile picture has been changed!
            </Alert>
          )}
          {/* Alert if user decides to cancel uploading a profile image */}
          {cancelUpload && (
            <Alert variant="info" dismissible className="my-2">
              Your changes have not been saved.
            </Alert>
          )}
          {/* Display profile */}
          <Card className="my-3">
            <Card.Body>
              <div className="text-center my-2">
                {isLoaded ? (
                  <Image
                    alt={`${username}'s profile image`}
                    src={profile_image}
                    roundedCircle
                    className={styles.ProfileImage}
                  />
                ) : (
                  <LoadingSpinner />
                )}
              </div>
              <div className="text-center my-2">
                {is_owner && (
                  <>
                    <Form onSubmit={handleSubmit}>
                      {/* Custom upload btn for new photo */}
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
                      <div className="text-center">
                        <Button
                          variant="info"
                          type="submit"
                          disabled={disableSubmit || isUploading}
                          className="mx-2"
                        >
                          {isUploading ? "Saving..." : "Save"}
                        </Button>
                        <Button
                          variant="outline-secondary"
                          className="mx-2"
                          disabled={disableCancel}
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Form>
                  </>
                )}
              </div>

              <hr />
              <Card.Title>Name</Card.Title>
              <Card.Text>{name}</Card.Text>
              <hr />
              <Card.Title>Username</Card.Title>
              <Card.Text>{username}</Card.Text>
              <hr />
              <Card.Title>Email</Card.Title>
              <Card.Text>{email ? email : "No email found"}</Card.Text>
            </Card.Body>
          </Card>
          {is_owner && (
            <div className="text-center">
              <Button variant="danger" onClick={() => setShowModal(true)}>
                Delete account
              </Button>
            </div>
          )}

          <div className="text-center mt-4">
            <Button variant="outline-secondary" onClick={goBack}>
              <i className="fa-solid fa-arrow-left"></i> Back
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
        isDeleting={isDeleting}
      />
    </>
  );
}

export default ProfilePage;
