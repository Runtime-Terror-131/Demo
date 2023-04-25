import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContextValues } from "../../Context/Context";
import { useFDA } from "../../Config/FDA-Config";
import { Alert, Row, Col, Form } from "react-bootstrap";

export default function ReportConfirmation({
  studyData,
  setStudyData,
  numberOfParticipants,
}) {
  const { showReportStudy, setShowReportStudy, setShowSpinner } =
    useContextValues();
  const { completeStudy, generateReport } = useFDA();
  const handleClose = () => setShowReportStudy(false);
  const handleShow = () => setShowReportStudy(true);
  const UpdateStudyAndGenerateReport = () => {
    try {
      setShowSpinner(true);
      completeStudy(studyData).then((result) => {
        if (!result) {
        } else {
          setStudyData(result.result);
        }
      });
    } catch (e) {
      setShowSpinner(false);
      console.log(e);
    }
    try {
      let notes = document.getElementById("NotesControl").value;
      let result = document.getElementById("studyResult").value;
      let report = {};
      //console.log(studyData);
      // we need to update the report schema to assign more values like drug id etc...
      report.StudyID = studyData._id;
      report.numberOfParticipants = numberOfParticipants.toString();
      report.StudyName = studyData.studyName;
      report.notes = notes;
      report.result = result == 1 ? "true" : "false";
      report.createdOn = new Date().toLocaleDateString();
      //console.log(report);
      generateReport(report).then((result) => {
        console.log(result);
        setShowSpinner(false);
        setShowReportStudy(false);
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Modal show={showReportStudy} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Completing Study</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This Study status will be changed to Completed, and as such! a Report
          will be generated and shared with both Bavaria and Hopkins!
          <br />
          <Row>
            <Col lg={6}>
              <Alert>{studyData && studyData.studyName}</Alert>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Form.Select aria-label="Default select example" id="studyResult">
                <option value="1">Success</option>
                <option value="2">Failure</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="NotesControl">
                <Form.Label>Add Notes for other parties to see:</Form.Label>
                <Form.Control as="textarea" rows={10} />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={UpdateStudyAndGenerateReport}>
            Generate Report
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
