import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";

const DeleteModal = ({ show, handleClose, feature, modalContent, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete {feature}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalContent}?{" "}
        <strong>This action is not reversible.</strong>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" type="submit" onSubmit={handleSubmit}>
          Yes, delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
