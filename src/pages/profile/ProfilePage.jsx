import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import api from "../../api/axiosDefaults";

function ProfilePage() {
  const [profileData, setProfileData] = useState({
    profile: { results: [] },
  });
  const { profile } = profileData;

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

  useEffect(() => {
    handleMount();
  }, []);
  return <div>ProfilePage</div>;
}

export default ProfilePage;
