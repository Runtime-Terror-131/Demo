import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContextValues } from "../Context/Context";
export default function DrugConfirmation() {
  const {
    showConfirmationWarning,
    setShowConfirmationWarning,
    setConfirmSendDrugList,
  } = useContextValues();

  const handleClose = () => setShowConfirmationWarning(false);
  const handleShow = () => setShowConfirmationWarning(true);
  const SendDrugList = () => {
    setShowConfirmationWarning(false);
    setConfirmSendDrugList(true);
  };
  return (
    <>
      <Modal show={showConfirmationWarning} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Drug List</Modal.Title>
        </Modal.Header>
        <Modal.Body>Drug List will be available for FDA</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={SendDrugList}>
            Send List
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
