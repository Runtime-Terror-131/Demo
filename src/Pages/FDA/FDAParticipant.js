import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import { useContextValues } from "../../Context/Context";
import { useFDA } from "../../Config/FDA-Config";
import { StudyConfirmModel, StudyStatusConst } from "../../Components";
import { useBavaria } from "../../Config/Bavaria-Config";
export default function FDAParticipant() {
  const [patientData, setPatientData] = useState();
  const [studyList, setStudyList] = useState();
  const { setShowGridSpinner, setShowConfirmationStudy } = useContextValues();
  const { getPatientList, getStudyList, getDrugList } = useFDA();
  //const { getDrugList } = useBavaria();
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
  const [columnDefForDrug] = useState([
    { field: "id" },
    { field: "placebo" },
    { field: "batchNumber" },
    { field: "availableToFDA" },
  ]);
  const [drugData, setDrugData] = useState();
  useEffect(() => {
    setShowGridSpinner(true);
    try {
      getDrugList().then((items) => {
        setDrugData(items);
        setShowGridSpinner(false);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

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
            <h3>Participant List</h3>
            <AgGridReact
              rowData={patientData}
              columnDefs={columnDefs}
              domLayout="autoHeight"></AgGridReact>
          </div>
        </Col>
        <Col lg={8}>
          <div
            className="ag-theme-alpine"
            style={{ marginTop: "5px", marginBottom: "5px" }}>
            <h3>Drug List</h3>
            <AgGridReact
              rowData={drugData}
              columnDefs={columnDefForDrug}
              domLayout="autoHeight"></AgGridReact>
          </div>
        </Col>
      </Row>
    </div>
  );
}
