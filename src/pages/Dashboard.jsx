import React from "react";
import EventsList from "./events/EventsList";
import appStyles from "../App.module.css";

function Dashboard() {
  const Events = () => {};

  return (
    <>
      <h1 className={appStyles.Header}>Dashboard</h1>
      <h2 className={appStyles.Header}>Events</h2>
      <EventsList />
    </>
  );
}

export default Dashboard;
