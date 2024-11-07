import React, { useEffect, useState } from "react";
import { apiReq } from "../../api/axiosDefaults";
import LoadingSpinner from "../../components/LoadingSpinner";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/CreateLink.module.css";
import accordStyles from "../../styles/Accordion.module.css";
import DeleteModal from "../../components/DeleteModal";
import { SuccessToast } from "../../functions/toasts";
import { formatDate, formatToIsoDateOnly } from "../../functions/dateFormat";

function EventsList({
  showHeader = true,
  showCreateLink = true,
  showDeleteButton = true,
  showFilters = true,
}) {
  // Set events list to an empty results array
  const [eventsList, setEventsList] = useState({ results: [] });
  // Initially set loaded state to false
  const [isLoaded, setIsLoaded] = useState(false);
  const [category, setCategory] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const currentUser = useCurrentUser();
  const [showModal, setShowModal] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [query, setQuery] = useState("");
  const [searchList, setSearchList] = useState({ results: [] });

  // Check current user against event owner
  const eventOwner = eventsList.results[0]?.owner;
  const is_owner = currentUser?.username === eventOwner;

  const navigate = useNavigate();

  // Get current pathname with react router's useLocation hook
  const { pathname } = useLocation();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await apiReq.get(`/events/`);
        setEventsList(data);
        setSearchList(data);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    setIsLoaded(false);
    const timer = setTimeout(() => handleMount(), 1000);
    return () => clearTimeout(timer);
  }, [query, pathname, currentUser]);

  const viewEvent = (eventId) => {
    navigate(`/events/${eventId}/`);
  };

  const handleDelete = async (e) => {
    if (is_owner) {
      e.preventDefault();
      try {
        setShowModal(false);
        await apiReq.delete(`/events/${eventId}/`);
        // Updates the events list by filtering through the results to remove the deleted event from the list
        setEventsList((prevEventsList) => ({
          ...prevEventsList,
          results: prevEventsList.results.filter(
            (event) => event.id !== eventId,
          ),
        }));

        SuccessToast("Event deleted");
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/");
    }
  };

  const handleCategoryFilter = (newCategory) => {
    setCategory(newCategory);
    setIsFiltering(true);
  };
  // Format current date to match api date format
  const now = formatToIsoDateOnly(new Date());
  const filteredEvents = eventsList.results.filter((event) => {
    const isCategoryMatch = category ? event.category === category : true;
    const isSearchMatch = event.name
      .toLowerCase()
      .includes(query.toLowerCase());
    return isCategoryMatch && isSearchMatch && now <= event.date;
  });

  const handleClearFilters = () => {
    setCategory("");
    setIsFiltering(false);
  };

  const allCategories = [
    ["WORK", "Work"],
    ["SOC", "Social"],
    ["FAM", "Family"],
    ["EDU", "Education"],
    ["APP", "Appointment"],
    ["TRAVEL", "Travel"],
  ];

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    const searchedEvents = eventsList.results.filter((event) => {
      return event.name.toLowerCase().includes(searchTerm);
    });

    setSearchList({ results: searchedEvents });
  };

  return (
    <>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          <Form className="d-flex w-50 mx-auto mb-3">
            <Form.Control
              type="text"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={query}
              onChange={handleSearch}
            />
          </Form>
          {showHeader && <h1 className={appStyles.Header}>Events</h1>}
          {showFilters && (
            <DropdownButton
              id="filter-dropdown"
              title="Filter"
              className="mb-2"
              variant="info"
              role="menu"
            >
              <Dropdown.ItemText className="text-decoration-underline">
                Category
              </Dropdown.ItemText>
              {allCategories.map(([value, label]) => (
                <Dropdown.Item
                  key={value}
                  as="button"
                  role="menuitem"
                  onClick={() => handleCategoryFilter(value)}
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
                <i class="fa-solid fa-xmark"></i> Clear filters
              </Dropdown.Item>
            </DropdownButton>
          )}
          {!isFiltering && (
            <Accordion alwaysOpen className="mb-3">
              {isLoaded ? (
                filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => {
                    const dateRep = formatDate(event.date);
                    return (
                      <Accordion.Item eventKey={`${event.id}`} key={event.id}>
                        <Accordion.Header
                          className={accordStyles.AccordionHeader}
                        >
                          <i className="fa-solid fa-scroll"></i> {event.name}
                          {now === event.date && (
                            <span className="ms-3 text-success">Today</span>
                          )}
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="mb-2">
                            <i className="fa-regular fa-calendar"></i> {dateRep}{" "}
                            | <i className="fa-solid fa-hourglass-start"></i>{" "}
                            {event.start_time} |{" "}
                            <i className="fa-solid fa-location-dot"></i>{" "}
                            {event.location}
                          </div>
                          <ButtonGroup aria-label="View event and delete event buttons">
                            <Button
                              variant="outline-secondary"
                              onClick={() => viewEvent(event.id)}
                            >
                              View event
                            </Button>
                            {showDeleteButton && (
                              <Button
                                variant="danger"
                                onClick={() => {
                                  setShowModal(true);
                                  setEventId(event.id);
                                }}
                              >
                                Delete
                              </Button>
                            )}
                          </ButtonGroup>
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                  })
                ) : (
                  <p className="fs-5">No upcoming events</p>
                )
              ) : (
                <LoadingSpinner />
              )}
            </Accordion>
          )}

          {isFiltering && (
            <div>
              {filteredEvents.length > 0 ? (
                <ListGroup>
                  {filteredEvents.map((event) => {
                    const dateRep = formatDate(event.date);
                    return (
                      <ListGroup.Item key={event.id}>
                        <div className="d-flex align-items-start flex-column flex-sm-row">
                          <div className="me-auto mt-1 mb-0">
                            <h6 className="fs-5">{event.name}</h6>
                            <p>
                              <i className="fa-regular fa-calendar"></i>{" "}
                              {dateRep} |{" "}
                              <i className="fa-solid fa-hourglass-start"></i>{" "}
                              {event.start_time} |{" "}
                              <i className="fa-solid fa-location-dot"></i>{" "}
                              {event.location}
                            </p>
                          </div>

                          <Button
                            className="align-self-center"
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => viewEvent(event.id)}
                          >
                            View event
                          </Button>
                        </div>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              ) : (
                <p className="fs-5 text-body-secondary">
                  No tasks found with this category.
                </p>
              )}
            </div>
          )}

          {showCreateLink && (
            <Link to="new/" className={styles.Link}>
              New Event <i class="fa-solid fa-plus"></i>
            </Link>
          )}
        </Col>
      </Row>
      <DeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        feature="event"
        modalContent="Are you sure you want to delete this event"
        handleDelete={handleDelete}
      />
    </>
  );
}

export default EventsList;
