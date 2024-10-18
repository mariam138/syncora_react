import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import api from "../../api/axiosDefaults";
import Image from "react-bootstrap/Image";

function ProfilePage() {
  const [profileData, setProfileData] = useState({
    profile: {},
  });
  const { profile } = profileData;
  const currentUser = useCurrentUser();

  // Get list of profiles from api and log it to the console
  // When component is mounted
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
    const { id, username, name, email, profile_image } = profile;
    // console.log(profile_image)
  return (
    <>
          <h1>{username}'s Profile</h1>
          <Image src={profile_image} roundedCircle/>
    </>
  );
}

export default ProfilePage;
