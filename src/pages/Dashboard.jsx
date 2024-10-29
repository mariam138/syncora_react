import React from "react";
import EventsList from "./events/EventsList";
import appStyles from "../App.module.css";

function Dashboard() {
  return (
    <>
      <h1 className={appStyles.Header}>Dashboard</h1>
      <EventsList />
    </>
  );
}

export default Dashboard;
