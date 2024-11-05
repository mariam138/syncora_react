import React from "react";
import EventsList from "./events/EventsList";
import appStyles from "../App.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TasksList from "./tasks/TasksList";

function Dashboard() {
  return (
    <>
      <Row>
        <h1 className={appStyles.Header}>Dashboard</h1>
      </Row>

      <Row>
        {/* <Col> */}
        <h2 className={appStyles.Header}>Events</h2>
        <EventsList
          showHeader={false}
          showCreateLink={false}
          showDeleteButton={false}
        />
        {/* </Col> */}
        {/* <Col> */}
        <TasksList />
        {/* </Col> */}
      </Row>
    </>
  );
}

export default Dashboard;
