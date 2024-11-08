import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import appStyles from "../../App.module.css";

function NotesList({ showHeader = true, showSearchBar = true }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);
  };
  return (
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          {showHeader && <h1 className={appStyles.Header}>Notes</h1>}
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
        </Col>
      </Row>
    </>
  );
}

export default NotesList;
