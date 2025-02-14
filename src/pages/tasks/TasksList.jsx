import { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/useCurrentUser";
import { Link, useNavigate } from "react-router-dom";
import { apiReq } from "../../api/axiosDefaults";

//Custom functions
import { SuccessToast, WarningToast } from "../../functions/toasts";
import { formatDueDate, formatToIso } from "../../functions/dateFormat";

// Bootstrap imports
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// Custom components and styles
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "../../styles/CreateLink.module.css";
import taskStyles from "../../styles/TaskList.module.css";
import appStyles from "../../App.module.css";

/*
 * BUGS TO FIX:
 * 1. When using search bar, the search bar only accepts one letter at a time. User has to
 * reselect search bar to keep typing
 */

function TasksList({
  showCreateLink = true,
  showCompletedTab = true,
  showCheck = true,
  className = "",
  showFilters = true,
  dashboardLayout = false,
}) {
  const [tasksList, setTasksList] = useState({ results: [] });
  const [isLoaded, setIsLoaded] = useState(false);
  const [key, setKey] = useState("uncompleted");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [query, setQuery] = useState("");
  const [searchList, setSearchList] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  // Converts the current datetime into iso format for comparison
  // with the task due date
  const now = formatToIso(new Date());

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await apiReq.get("/tasks/");
        setTasksList(data);
        setIsLoaded(true);
      } catch (error) {
        WarningToast(
          "There was a problem loading your tasks. Please try again later.",
        );
      }
    };

    setIsLoaded(false);
    handleMount();
  }, [currentUser]);

  const viewTask = (taskId) => {
    navigate(`/tasks/${taskId}/`);
  };

  /* Sends a patch request to the API to only update the completed
  status of the task. New form data is created to send with the
  request. The task list is then updated. If the task id matches the id that
  is passed through as a parameter, then a new object is created for that
  task with the spread operator, overriding the completed property
  to the new value. Otherwise the default task object is returned.
  */
  const toggleCompleted = async (taskId, completed) => {
    try {
      const formData = new FormData();
      formData.append("completed", completed);
      setTasksList((prevTaskList) => ({
        ...prevTaskList,
        results: prevTaskList.results.map((task) =>
          task.id === taskId ? { ...task, completed } : task,
        ),
      }));

      // Only display the toast if the task was completed
      {
        completed && SuccessToast("Task complete!");
      }
      await apiReq.patch(`/tasks/${taskId}/`, formData);
    } catch (error) {
      WarningToast("There was an error. Please try again.");
    }
  };

  // Functions to allow filtering of tasks adapted from:
  // https://www.dhiwise.com/post/reactjs-filter-array-of-objects-effortless-data-handling
  /* Sets category back to an empty string so only the
  priority is changed. Sets new priority for filtering. */
  const handlePrioFilterChange = (newPriority) => {
    setCategory("");
    setPriority(newPriority);
    setIsFiltering(true);
  };

  /* Sets priority back to an empty string so only the
  category is changed. Sets new category for filtering.*/
  const handleCategoryFilterChange = (newCategory) => {
    setPriority("");
    setCategory(newCategory);
    setIsFiltering(true);
  };

  // Function to clear filters and display normal content
  const handleClearFilters = () => {
    setPriority("");
    setCategory("");
    setIsFiltering(false);
    setKey("uncompleted");
  };

  // Handler for searching through tasks
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    // Avoid re-rendering a new object for `setSearchList`
    // Fixes bug of only being able to type one letter at a time
    const searchedTasks = tasksList.results.filter((task) =>
      task.title.toLowerCase().includes(searchTerm),
    );

    setSearchList((prev) => ({
      ...prev,
      results: searchedTasks,
    }));
  };

  // Filters the tasksList results either by priority or by category
  const filteredTasks = tasksList.results.filter((task) => {
    const isPriorityMatch = priority ? task.priority === priority : true;
    const isCategoryMatch = category ? task.category === category : true;
    const isSearchMatch = task.title
      .toLowerCase()
      .includes(query.toLowerCase());
    return isCategoryMatch && isPriorityMatch && isSearchMatch;
  });

  // Gets categories labels and values to make filter button for each category
  const allCategories = [
    ["WORK", "Work"],
    ["SOC", "Social"],
    ["FAM", "Family"],
    ["HOME", "Home"],
    ["EDU", "Learning"],
    ["FIN", "Finance"],
    ["HEALTH", "Health"],
    ["PER", "Personal"],
  ];

  // Gets priority labels and values for filtering buttons
  const allPriorities = [
    ["L", "Low"],
    ["M", "Medium"],
    ["H", "High"],
  ];

  return (
    <>
      <Tab.Container id="tasks-tabs" activeKey={key}>
        <Row className={!dashboardLayout && appStyles.RowHeight}>
          <Col
            md={
              dashboardLayout ? { span: 4, offset: 2 } : { span: 8, offset: 2 }
            }
            lg={!dashboardLayout && { span: 6, offset: 3 }}
          >
            {dashboardLayout ? (
              <h2 className={appStyles.Header}>Tasks</h2>
            ) : (
              <h1 className={appStyles.Header}>Tasks</h1>
            )}
            {/* Dropdown button for filters and search bar */}
            {showFilters && (
              <div className="d-flex align-items-center mb-2">
                <DropdownButton
                  id="filter-dropdown"
                  title="Filter"
                  className="me-3"
                  variant="info"
                  role="menu"
                  drop="end"
                >
                  <Dropdown.ItemText className="text-decoration-underline">
                    Priority
                  </Dropdown.ItemText>
                  {allPriorities.map(([value, label]) => (
                    <Dropdown.Item
                      key={value}
                      as="button"
                      role="menuitem"
                      onClick={() => handlePrioFilterChange(value)}
                    >
                      {label}
                    </Dropdown.Item>
                  ))}
                  <Dropdown.ItemText className="text-decoration-underline">
                    Category
                  </Dropdown.ItemText>
                  {allCategories.map(([value, label]) => (
                    <Dropdown.Item
                      as="button"
                      role="menuitem"
                      key={value}
                      onClick={() => handleCategoryFilterChange(value)}
                    >
                      {label}
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Item
                    as="button"
                    role="menuitem"
                    onClick={() => handleClearFilters()}
                    className="text-body-secondary"
                  >
                    <i className="fa-solid fa-xmark"></i> Clear filters
                  </Dropdown.Item>
                </DropdownButton>
                <Form className="d-flex w-auto ms-auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={query}
                    onChange={handleSearch}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      setQuery("");
                      setIsFiltering(false);
                    }}
                  >
                    Clear
                  </Button>
                </Form>
              </div>
            )}

            {/* If using a filter, displays the relevant tasks in a list group */}
            {isFiltering ? (
              <div>
                {filteredTasks.length > 0 ? (
                  <ListGroup>
                    {filteredTasks.map((task) => (
                      <ListGroup.Item key={task.id}>
                        <div className="d-flex align-items-start flex-column flex-sm-row">
                          <div className="me-auto">
                            <span className={taskStyles.Title}>
                              {task.title}
                            </span>
                            <span
                              className={`${
                                task.priority_display === "Low"
                                  ? taskStyles.Low
                                  : task.priority_display === "Medium"
                                    ? taskStyles.Medium
                                    : task.priority_display === "High"
                                      ? taskStyles.High
                                      : ""
                              } ps-3`}
                            >
                              {task.priority_display}
                            </span>
                            <div className="me-auto">
                              Due: {formatDueDate(task.due_date)}
                            </div>
                          </div>

                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => viewTask(task.id)}
                          >
                            View task
                          </Button>
                        </div>
                        {showCheck && (
                          <Form>
                            <Form.Check
                              reverse
                              label="Completed"
                              checked={task.completed}
                              onChange={(e) =>
                                toggleCompleted(task.id, e.target.checked)
                              }
                            />
                          </Form>
                        )}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p className="fs-5 text-body-secondary">
                    No tasks found with this filter.
                  </p>
                )}
              </div>
            ) : (
              // If not filtering, create a tabbed pane to separate completed and incomplete tasks
              <Card className={`mb-3 ${className} ${taskStyles.TaskScroll}`}>
                {showCompletedTab && (
                  <Card.Header>
                    <Nav
                      fill
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
                )}

                <Card.Body>
                  <Tab.Content>
                    {/* To do tasks */}
                    <Tab.Pane eventKey="uncompleted">
                      <ListGroup variant="flush">
                        {isLoaded ? (
                          // Loads only tasks which are not completed
                          filteredTasks.filter((task) => !task.completed)
                            .length > 0 ? (
                            filteredTasks
                              .filter((task) => !task.completed)
                              .map((task) => {
                                const dueDateRep = formatDueDate(task.due_date);
                                const formattedTaskDueDate =
                                  task.due_date.replace(" ", "T");
                                const isOverdue = now > formattedTaskDueDate;

                                return (
                                  <ListGroup.Item key={task.id}>
                                    <div className="d-flex align-items-start flex-column flex-sm-row">
                                      <div className="me-auto">
                                        <span className={taskStyles.Title}>
                                          {task.title}
                                        </span>
                                        <span
                                          className={`${
                                            task.priority_display === "Low"
                                              ? taskStyles.Low
                                              : task.priority_display ===
                                                  "Medium"
                                                ? taskStyles.Medium
                                                : task.priority_display ===
                                                    "High"
                                                  ? taskStyles.High
                                                  : ""
                                          } ps-3`}
                                        >
                                          {task.priority_display}
                                        </span>
                                        {isOverdue && (
                                          <>
                                            {" "}
                                            <br />
                                            <span className="text-danger">
                                              <i className="fa-solid fa-circle-exclamation"></i>{" "}
                                              Overdue
                                            </span>
                                          </>
                                        )}
                                        <div className="d-flex align-items-start flex-column">
                                          <div className="text-muted me-auto">
                                            Due: {dueDateRep}
                                          </div>
                                          {showCheck && (
                                            <Form.Check
                                              aria-label="Click to complete the task"
                                              isValid
                                              reverse
                                              label="Completed"
                                              checked={task.completed}
                                              onChange={(e) =>
                                                toggleCompleted(
                                                  task.id,
                                                  e.target.checked,
                                                )
                                              }
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <Button
                                        className="me-2"
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => viewTask(task.id)}
                                      >
                                        View task
                                      </Button>
                                    </div>
                                  </ListGroup.Item>
                                );
                              })
                          ) : (
                            <p>No tasks found</p>
                          )
                        ) : (
                          <LoadingSpinner />
                        )}
                      </ListGroup>
                    </Tab.Pane>
                    {/* Tab for completed tasks */}
                    <Tab.Pane eventKey="completed">
                      <ListGroup variant="flush">
                        {isLoaded ? (
                          // Filters only completed tasks
                          filteredTasks.filter((task) => task.completed)
                            .length > 0 ? (
                            filteredTasks
                              .filter((task) => task.completed)
                              .map((task) => {
                                const dueDateRep = formatDueDate(task.due_date);

                                return (
                                  <ListGroup.Item key={task.id}>
                                    <div className="d-flex align-items-start flex-column flex-sm-row">
                                      <div className="me-auto">
                                        <span className={taskStyles.Title}>
                                          {task.title}
                                        </span>
                                        <span
                                          className={`${
                                            task.priority_display === "Low"
                                              ? taskStyles.Low
                                              : task.priority_display ===
                                                  "Medium"
                                                ? taskStyles.Medium
                                                : task.priority_display ===
                                                    "High"
                                                  ? taskStyles.High
                                                  : ""
                                          } ps-3`}
                                        >
                                          {task.priority_display}
                                        </span>
                                        <div className="d-flex align-items-start flex-column">
                                          <span className="text-muted me-auto">
                                            Due: {dueDateRep}
                                          </span>
                                          {showCheck && (
                                            <Form.Check
                                              aria-label="Click to complete the task"
                                              isValid
                                              className="text-muted"
                                              reverse
                                              label="Completed"
                                              checked={task.completed}
                                              onChange={(e) =>
                                                toggleCompleted(
                                                  task.id,
                                                  e.target.checked,
                                                )
                                              }
                                            ></Form.Check>
                                          )}
                                        </div>
                                      </div>
                                      <Button
                                        className="me-2"
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => viewTask(task.id)}
                                      >
                                        View task
                                      </Button>
                                    </div>
                                  </ListGroup.Item>
                                );
                              })
                          ) : (
                            <p>No completed tasks found</p>
                          )
                        ) : (
                          <LoadingSpinner />
                        )}
                      </ListGroup>
                    </Tab.Pane>
                  </Tab.Content>
                </Card.Body>
              </Card>
            )}

            {showCreateLink && (
              <Link to="new/" className={styles.Link}>
                New Task <i className="fa-solid fa-plus"></i>
              </Link>
            )}
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}

export default TasksList;
