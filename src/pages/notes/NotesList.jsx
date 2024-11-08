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

function NotesList({ showHeader = true, showSearchBar = true }) {
  const [query, setQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [notesList, setNotesList] = useState({ results: [] });
  const [noteId, setNoteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await apiReq.get("/notes/");
        setNotesList(data);
        setIsLoaded(true);
        console.log(data);
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
                  onClick={() => setQuery("")}
                >
                  Clear
                </Button>
              </Form>
            </div>
          )}

          <Card>
            <Card.Body>
              <Card.Title>Note title</Card.Title>
              <Card.Text>First line of note</Card.Text>
              <Button variant="primary">View note detail</Button>
            </Card.Body>
            <Card.Footer className="text-muted">Note created date</Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default NotesList;
