import { Spinner } from "react-bootstrap/Spinner";

import React from "react";

function Spinner() {
  return (
    <Spinner animation="border" role="status">
      <span>Loading...</span>
    </Spinner>
  );
}

export default Spinner;
