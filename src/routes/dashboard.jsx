import React, { useEffect, useState } from "react";
import TopNavbar from "../components/TopNavbar";

const Dashboard = () => {

  // Create screensize state so that top navbar only shows on large screen sizes
  // Where the large navbar has the quick menu links which disappear from the sidebar
  // at larger screensizes
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
      {screenSize ? (null):(<TopNavbar />)}
      {/* <TopNavbar /> */}
    </>
  );
};

export default Dashboard;
