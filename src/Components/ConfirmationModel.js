import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContextValues } from "../Context/Context";
export default function ConfirmationModel() {
  const {
    showConfirmationWarning,
    setShowConfirmationWarning,
    setConfirmSendPatientList,
  } = useContextValues();

  const handleClose = () => setShowConfirmationWarning(false);
  const handleShow = () => setShowConfirmationWarning(true);
  const SendPatientList = () => {
    setShowConfirmationWarning(false);
    setConfirmSendPatientList(true);
  };
  return (
    <>
      <Modal show={showConfirmationWarning} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Eligible Patients</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Patient List will be available for FDA to review!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={SendPatientList}>
            Send List
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
