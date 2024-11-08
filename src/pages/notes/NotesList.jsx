import { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";

// Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

// Custom styles
import appStyles from "../../App.module.css";
import { apiReq } from "../../api/axiosDefaults";
import LoadingSpinner from "../../components/LoadingSpinner";

function NotesList({ showHeader = true, showSearchBar = true }) {
  const [query, setQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [notesList, setNotesList] = useState({ results: [] });
  const [noteId, setNoteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
        console.log(error);
      }
    };

    setIsLoaded(false);
    fetchNotes();
  }, [currentUser]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);
    setIsSearching(!!searchTerm);

    const searchedNotes = notesList.results.filter((note) => {
      return note.content.toLowerCase().includes(query);
    });

    setSearchList({ results: searchedNotes });
  };
  return (
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          {showHeader && <h1 className={appStyles.Header}>Notes</h1>}
          {/* Search bar for notes */}
          {showSearchBar && (
            <div className="d-flex align-items-center mb-2">
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
                      <Card.Text>{`${note.content.slice(0, 60)}...`}</Card.Text>
                      <Button size="sm" className={`btn ${appStyles.Button}`}>
                        See more
                      </Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      {note.date_created}
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
        </Col>
      </Row>
    </>
  );
}

export default NotesList;
