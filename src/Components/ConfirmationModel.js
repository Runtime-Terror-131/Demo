import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContextValues } from "../Context/Context";
import Grid from "./Util/Grid";
export default function ConfirmationModel({ patientData }) {
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
  const [columnDefs] = useState([
    { field: "name" },
    { field: "age" },
    {
      field: "currentMedications",
      valueGetter: (params) => {
        return JSON.stringify(params.data.currentMedications);
      },
    },
    { field: "isEligible" },
  ]);
  return (
    <>
      <Modal show={showConfirmationWarning} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Eligible Patients</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This Patient List will be available for FDA to review!
          {patientData && <Grid data={patientData} dataColumns={columnDefs} />}
          This is irreversable! make sure to review the list please!
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
