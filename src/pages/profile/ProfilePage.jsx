import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import api from "../../api/axiosDefaults";

function ProfilePage() {
  const [profileData, setProfileData] = useState({
    profile: { results: [] },
  });
  const { profile } = profileData;
  const currentUser = useCurrentUser();

  // Get list of profiles from api and log it to the console
  // When component is mounted
  const handleMount = async () => {
    try {
      const { data } = await api.get(`/profiles/${currentUser.pk}`);
      console.log(data);
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
  return (
    <>
      {/* {profile.results.map(pfp => (
                <p key={pfp.id}>{pfp.username}|{pfp.profile_image}</p> */}
      {/* ))} */}
      <h1>Profile</h1>
    </>
  );
}

export default ProfilePage;
