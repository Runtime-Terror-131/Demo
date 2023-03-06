import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContextValues } from "../Context/Context";
export default function DeleteModel() {
  const { showDeleteWarning, setShowDeleteWarning, setConfirmDeletePatient } =
    useContextValues();

  const handleClose = () => setShowDeleteWarning(false);
  const handleShow = () => setShowDeleteWarning(true);
  const deletePatient = () => {
    setShowDeleteWarning(false);
    setConfirmDeletePatient(true);
  };
  return (
    <>
      <Modal show={showDeleteWarning} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this patient? this is irreversable!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deletePatient}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
