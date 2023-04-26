import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContextValues } from "../Context/Context";
import Grid from "./Util/Grid";
import React, { useState } from "react";
import Grid from "./Util/Grid";
export default function DrugConfirmation({ drugData }{ drugData }) {
  const {
    showConfirmationWarning,
    setShowConfirmationWarning,
    setConfirmSendDrugList,
  } = useContextValues();
  const [columnDefs] = useState([
    { field: "id" },
    { field: "placebo" },
    { field: "batchNumber" },
  ]);
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
        <Modal.Body>
          Drug List will be available for FDA
          {drugData && <Grid data={drugData} dataColumns={columnDefs} />}
          This is irreversable! make sure to review the list please!
        </Modal.Body>
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
