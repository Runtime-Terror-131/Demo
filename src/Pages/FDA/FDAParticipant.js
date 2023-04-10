import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import { useContextValues } from "../../Context/Context";
import { useFDA } from "../../Config/FDA-Config";
import { StudyConfirmModel, StudyStatusConst } from "../../Components";
export default function FDAParticipant() {
  const [patientData, setPatientData] = useState();
  const [studyList, setStudyList] = useState();
  const { setShowGridSpinner, setShowConfirmationStudy } = useContextValues();
  const { getPatientList, getStudyList } = useFDA();
  const showPickStudyModel = () => {
    setShowConfirmationStudy(true);
  };
  const [columnDefs] = useState([
    { field: "uuid" },
    { field: "_id" },
    { field: "currentMedications" },
    { field: "icdHealthCodes" },
    { field: "currentlyEmployed" },
    { field: "currentlyInsured" },
  ]);
  useEffect(() => {
    setShowGridSpinner(true);
    try {
      getPatientList()
        .then((result) => {
          return result;
        })
        .then((items) => {
          setPatientData(items);
          setShowGridSpinner(false);
        });
    } catch (e) {
      alert(e);
    }
    try {
      getStudyList()
        .then((result) => {
          return result.items.filter(
            (item) => item.status == StudyStatusConst.Active
          );
        })
        .then((result) => setStudyList(result));
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div>
      <StudyConfirmModel studyList={studyList} patientList={patientData} />
      <Row>
        <Col lg={6}>
          <Card>
            <Card.Header>Eligable Patients</Card.Header>
            <Card.Body>Search Fields here</Card.Body>
            <Card.Footer>
              {" "}
              <Button variant="success" onClick={showPickStudyModel}>
                Include All participants in Study
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <div
            className="ag-theme-alpine"
            style={{ marginTop: "5px", marginBottom: "5px" }}>
            <AgGridReact
              rowData={patientData}
              columnDefs={columnDefs}
              domLayout="autoHeight"></AgGridReact>
          </div>
        </Col>
      </Row>
    </div>
  );
}
