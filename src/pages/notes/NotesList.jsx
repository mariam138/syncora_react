import { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/useCurrentUser";
import { Link, useNavigate } from "react-router-dom";

// Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

// Custom styles
import appStyles from "../../App.module.css";
import linkStyles from "../../styles/CreateLink.module.css";
import { apiReq } from "../../api/axiosDefaults";
import LoadingSpinner from "../../components/LoadingSpinner";
import { WarningToast } from "../../functions/toasts";

/*
 * BUGS TO FIX:
 * 1. When using search bar, the search bar only accepts one letter at a time. User has to
 * reselect search bar to keep typing
 * - component is rerendered on each keystroke causing this bug to happen
 */

function NotesList({
  showSearchBar = true,
  showCreateLink = true,
  className = "",
  dashboardLayout = false,
}) {
  const [query, setQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [notesList, setNotesList] = useState({ results: [] });
  const [searchList, setSearchList] = useState({ results: [] });
  const [isSearching, setIsSearching] = useState(false);

  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await apiReq.get("/notes/");
        setNotesList(data);
        setSearchList(data);
        setIsLoaded(true);
      } catch (error) {
        WarningToast(
          "There was a problem loading your notes. Please try again later.",
        );
      }
    };

    setIsLoaded(false);
    fetchNotes();
  }, [currentUser]);

  const viewNote = (noteId) => {
    navigate(`/notes/${noteId}/`);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);
    // setIsSearching(!!searchTerm);

    // Checks against the title or the content of a note
    const searchedNotes = notesList.results.filter((note) => {
      return (
        note.content.toLowerCase().includes(searchTerm) ||
        note.title.toLowerCase().includes(searchTerm)
      );
    });

    setSearchList({ results: searchedNotes });
  };

  // Separate component for content to avoid duplication for condition Row rendering
  const ContentNotesList = () => {
    return (
      <>
        {dashboardLayout ? (
          <h2 className={appStyles.Header}>Notes</h2>
        ) : (
          <h1 className={appStyles.Header}>Notes</h1>
        )}
        {/* Search bar for notes */}
        {showSearchBar && (
          <div className="d-flex align-items-center mb-2">
            <Form className="d-flex w-auto me-auto">
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
                  setIsSearching(false);
                }}
              >
                Clear
              </Button>
            </Form>
          </div>
        )}

        {isLoaded ? (
          (isSearching ? searchList.results : notesList.results).length ? (
            (isSearching ? searchList.results : notesList.results).map(
              (note) => (
                <Card key={note.id} className="mb-3">
                  <Card.Body>
                    {note.title && <Card.Title>{note.title}</Card.Title>}
                    {/* Shows summary of note only if the length is longer than 60 characters */}
                    <Card.Text>{`${note.content.length > 60 ? `${note.content.slice(0, 60)}...` : note.content}`}</Card.Text>
                    <Button
                      size="sm"
                      className={`btn ${appStyles.Button}`}
                      onClick={() => viewNote(note.id)}
                    >
                      See more
                    </Button>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    {note.date_updated}
                  </Card.Footer>
                </Card>
              ),
            )
          ) : (
            <p className="fs-5">No notes found</p>
          )
        ) : (
          <LoadingSpinner />
        )}
        {showCreateLink && (
          <Link to="new/" className={linkStyles.Link}>
            New Note <i className="fa-solid fa-plus"></i>
          </Link>
        )}
      </>
    );
  };
  return (
    <>
      {dashboardLayout ? (
        <Col md={4} className={className}>
          <ContentNotesList />
        </Col>
      ) : (
        <Row>
          <Col
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}
            className={className}
          >
            <ContentNotesList />
          </Col>
        </Row>
      )}
    </>
  );
}

export default NotesList;
