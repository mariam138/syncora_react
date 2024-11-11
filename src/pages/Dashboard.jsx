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
      <Row className="mb-3">
        <Col md={{ span: 8, offset: 2 }}>
          <h1 className={`${appStyles.Header} text-decoration-underline`}>Dashboard</h1>
        </Col>
      </Row>

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

        <NotesList
          showSearchBar={false}
          showCreateLink={false}
          className={styles.ScrollCard}
          dashboardLayout={true}
        />
      </Row>
      {/* Row for Events */}
      <Row className="mb-4">
        <EventsList
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
