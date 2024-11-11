import React from "react";
import EventsList from "./events/EventsList";
import appStyles from "../App.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TasksList from "./tasks/TasksList";
import styles from "../styles/Dashboard.module.css";
import NotesList from "./notes/NotesList";

function Dashboard() {
  return (
    <>
      <Row>
        <h1 className={appStyles.Header}>Dashboard</h1>
      </Row>

      {/* <Row>
        <Col md={{ span: 4, offset: 2 }}>
          <h2 className={appStyles.Header}>Tasks</h2>
        </Col>
        <Col md={4}>
          <h2 className={appStyles.Header}>Notes</h2>
        </Col>
      </Row> */}

      {/* Row for Tasks and Notes on larger screens */}
      <Row>
        <TasksList
          showCreateLink={false}
          showCompletedTab={false}
          showCheck={false}
          className={styles.ScrollCard}
          showFilters={false}
          dashboardLayout={true}
        />

        {/* <h2 className={appStyles.Header}>Notes</h2> */}
        <NotesList
          showHeader={true}
          showSearchBar={false}
          showCreateLink={false}
          className={styles.ScrollCard}
          dashboardLayout={true}
        />
      </Row>
      {/* Row for Events */}
      <Row className="mb-4">
        <Col md={{ span: 8, offset: 2 }}>
          <h2 className={appStyles.Header}>Events</h2>
        </Col>
        <EventsList
          showHeader={false}
          showCreateLink={false}
          showDeleteButton={false}
          showFilters={false}
          dashboardLayout={true}
        />
      </Row>
    </>
  );
}

export default Dashboard;
