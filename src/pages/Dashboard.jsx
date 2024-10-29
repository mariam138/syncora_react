import React from "react";
import EventsList from "./events/EventsList";
import appStyles from "../App.module.css";

function Dashboard() {
  return (
    <>
      <h1 className={appStyles.Header}>Dashboard</h1>
      <h2 className={appStyles.Header}>Events</h2>
      <EventsList
        showHeader={false}
        showCreateLink={false}
        showDeleteButton={false}
      />
    </>
  );
}

export default Dashboard;
