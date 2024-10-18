import React, { useEffect, useState } from "react";
import TopNavbar from "../components/TopNavbar";

const Dashboard = () => {

  const [screenSize, setScreenSize] = useState(window.innerWidth < 992);
  const updateTopNavbar = () => {
    setScreenSize(window.innerWidth < 992);
  }

  useEffect(() => {
    window.addEventListener("resize", updateTopNavbar);
    return () => window.removeEventListener("resize", updateTopNavbar);
  }, [])

  return (
    <>
      <TopNavbar />
    </>
  );
};

export default Dashboard;
