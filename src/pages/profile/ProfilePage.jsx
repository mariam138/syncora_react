import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import api from "../../api/axiosDefaults";

function ProfilePage() {
  const [profileData, setProfileData] = useState({
    profile: { results: [] },
  });
  const { profile } = profileData;

  // Get list of profiles from api and log it to the console
  // When component is mounted
  const handleMount = async () => {
    try {
      const { data } = await api.get("/profiles");
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
  return <div>ProfilePage</div>;
}

export default ProfilePage;
