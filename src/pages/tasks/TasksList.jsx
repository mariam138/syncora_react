import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import appStyles from "../../App.module.css";

function TasksList() {
  return (
    <>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          <h1 className={appStyles.Header}>Tasks</h1>
        </Col>
      </Row>
    </>
  );
}

export default TasksList;
