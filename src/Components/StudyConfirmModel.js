import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useContextValues } from "../Context/Context";
import { useFDA } from "../Config/FDA-Config";

export default function StudyConfirmModel({ studyList, patientList }) {
  const {
    showConfirmationStudy,
    setShowConfirmationStudy,
    setConfirmAddStudy,
    setShowSpinner,
  } = useContextValues();
  const { updatePatientListWithStudyID } = useFDA();
  const handleClose = () => setShowConfirmationStudy(false);
  const handleShow = () => setShowConfirmationStudy(true);
  const updateStudy = () => {
    setShowSpinner(true);
    const studyID = document.getElementById("studyConfirmation").value;
    updatePatientListWithStudyID(studyID, patientList, setShowSpinner).then(
      (result) => {
        setShowSpinner(false);
      }
    );
    setShowConfirmationStudy(false);
    setConfirmAddStudy(true);
  };

  return (
    <>
      <Modal show={showConfirmationStudy} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Eligible Patients</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please Pick which active study to use</Modal.Body>
        {studyList ? (
          <Form.Select
            id="studyConfirmation"
            aria-label="Default select example"
          >
            {studyList.map((item, i) => {
              return (
                <option value={item._id} key={i}>
                  {item.studyName}
                </option>
              );
            })}
          </Form.Select>
        ) : (
          "there are no studies to pick from"
        )}

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={updateStudy}>
            Add Patients to Study
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
