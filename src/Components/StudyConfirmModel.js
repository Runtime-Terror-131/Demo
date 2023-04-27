import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";

import { useContextValues } from "../Context/Context";
import { useFDA } from "../Config/FDA-Config";

export default function StudyConfirmModel({
  studyList,
  patientList,
  realDrugList,
  placeboList,
}) {
  const {
    showConfirmationStudy,
    setShowConfirmationStudy,
    setConfirmAddStudy,
    setShowSpinner,
  } = useContextValues();
  const {
    updatePatientListWithStudyID,
    updateStudyWithParticipantsAndDrugIDs,
  } = useFDA();
  const handleClose = () => setShowConfirmationStudy(false);
  const handleShow = () => setShowConfirmationStudy(true);
  const updateStudy = () => {
    setShowSpinner(true);
    const studyID = document.getElementById("studyConfirmation").value;
    const realDrugID = document.getElementById("studyConfirmation2").value;
    const placeboID = document.getElementById("studyConfirmation3").value;
    const numberOfParticipants = patientList
      ? patientList.length.toString()
      : "0";

    //testing
    try {
      updateStudyWithParticipantsAndDrugIDs(
        studyID,
        realDrugID,
        placeboID,
        numberOfParticipants
      );
    } catch (e) {
      console.log(e);
    }
    // finish testing
    updatePatientListWithStudyID(
      studyID,
      patientList,
      realDrugID,
      placeboID,
      setShowSpinner
    ).then((result) => {
      setShowSpinner(false);
    });
    setShowConfirmationStudy(false);
    setConfirmAddStudy(true);
  };

  return (
    <>
      <Modal show={showConfirmationStudy} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Eligible Patients</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Please Pick which active study to use :</h5>
          <div>
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
          </div>
          <br />
          <h5>
            Please pick which drug will be associated with the study, there will
            be two drugs to pick from, one is the test drug and the other is the
            placebo :
          </h5>
          <Row>
            <Col lg={4}>
              <>
                <Form.Label>
                  <strong>Drug List</strong>
                </Form.Label>
                {realDrugList ? (
                  <Form.Select
                    id="studyConfirmation2"
                    aria-label="Default select example"
                  >
                    {realDrugList.map((item, i) => {
                      return (
                        <option value={item._id} key={i}>
                          {item.batchNumber}
                        </option>
                      );
                    })}
                  </Form.Select>
                ) : (
                  "there is no drug list to pick from"
                )}
              </>
            </Col>
            <Col lg={4}>
              <>
                <Form.Label>
                  <strong>Placebo List</strong>
                </Form.Label>
                {placeboList ? (
                  <Form.Select
                    id="studyConfirmation3"
                    aria-label="Default select example"
                  >
                    {placeboList.map((item, i) => {
                      return (
                        <option value={item._id} key={i}>
                          {item.batchNumber}
                        </option>
                      );
                    })}
                  </Form.Select>
                ) : (
                  "there is no placebo list to pick from"
                )}
              </>
            </Col>
          </Row>
          Assigning the drug is random for now! we will create individual assign
          method in the next sprint
        </Modal.Body>

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
