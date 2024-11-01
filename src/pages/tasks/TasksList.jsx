import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import { apiReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import LoadingSpinner from "../../components/LoadingSpinner";

function TasksList() {
  const [tasksList, setTasksList] = useState({ results: [] });
  const [isLoaded, setIsLoaded] = useState(false);
  const [key, setKey] = useState("uncompleted");
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      const { data } = await apiReq.get("/tasks/");
      setTasksList(data);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleMount();
  }, [currentUser]);

  return (
    <>
      <Tab.Container id="tasks-tabs" defaultActiveKey={key}>
        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <h1 className={appStyles.Header}>Tasks</h1>
            <Card>
              <Card.Header>
                <Nav
                  variant="tabs"
                  onSelect={(k) => {
                    setKey(k);
                  }}
                >
                  <Nav.Item>
                    <Nav.Link eventKey="uncompleted">To Do</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="completed">Completed</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="uncompleted">
                    <ListGroup variant="flush">
                      {/* Checks if there are any incomplete tasks before filtering
                                          incomplete tasks and displaying each one in a list item */}
                      {isLoaded ? (
                        tasksList.results.filter((task) => !task.completed)
                          .length > 0 ? (
                          tasksList.results
                            .filter((task) => !task.completed)
                            .map((task) => (
                              <ListGroup.Item key={task.id}>
                                {task.title}
                                <br />
                                Due: {task.due_date}
                              </ListGroup.Item>
                            ))
                        ) : (
                          <p className="fs-5 text-body-secondary">
                            No tasks due
                          </p>
                        )
                      ) : (
                        <LoadingSpinner />
                      )}
                    </ListGroup>
                  </Tab.Pane>
                  <Tab.Pane eventKey="completed">
                    <ListGroup variant="flush">
                      {/* Checks if there are any complete tasks before filtering
                                          complete tasks and displaying each one in a list item */}
                      {isLoaded ? (
                        tasksList.results.filter((task) => task.completed)
                          .length > 0 ? (
                          tasksList.results
                            .filter((task) => task.completed)
                            .map((task) => (
                              <ListGroup.Item key={task.id}>
                                {task.title}
                                <br />
                                Due: {task.due_date}
                              </ListGroup.Item>
                            ))
                        ) : (
                          <p className="fs-5 text-body-secondary">
                            You haven't completed any tasks yet!
                          </p>
                        )
                      ) : (
                        <LoadingSpinner />
                      )}
                    </ListGroup>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}

export default TasksList;
