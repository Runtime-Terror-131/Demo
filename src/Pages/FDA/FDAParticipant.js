import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import { useContextValues } from "../../Context/Context";
import { useFDA } from "../../Config/FDA-Config";
import { StudyConfirmModel, StudyStatusConst } from "../../Components";
export default function FDAParticipant() {
  const [patientData, setPatientData] = useState();
  const [studyList, setStudyList] = useState();
  const [realDrugList, setRealDrugList] = useState();
  const [placeboList, setPlaceboList] = useState();
  const [numberOfStudies, setNumberOfStudies] = useState(0);
  const [numberOfPatients, setNumberOfPatients] = useState(0);
  const { setShowGridSpinner, setShowConfirmationStudy } = useContextValues();
  const { getPatientList, getStudyList, getDrugList } = useFDA();
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
          setNumberOfPatients(items.length);
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
        .then((result) => {
          setStudyList(result);
          setNumberOfStudies(result.length);
        });
    } catch (e) {
      console.log(e);
    }
    try {
      getDrugList()
        .then((result) => {
          return result;
        })
        .then((item) => {
          let [realDrug, placebo] = [...item];
          setRealDrugList(realDrug);
          setPlaceboList(placebo);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div>
      <StudyConfirmModel
        studyList={studyList}
        patientList={patientData}
        realDrugList={realDrugList}
        placeboList={placeboList}
      />
      <Row>
        <Col lg={8}>
          <Card>
            <Card.Header>Eligable Patients</Card.Header>
            <Card.Body>
              <Row>
                <Col lg={6}>
                  <strong>Number of Participants: </strong>
                  {numberOfPatients ? numberOfPatients : 0}
                </Col>
                <Col lg={6}>
                  <strong>Number of Studies available : </strong>
                  {numberOfStudies ? numberOfStudies : 0}
                </Col>
              </Row>
            </Card.Body>
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
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
            <AgGridReact
              rowData={patientData}
              columnDefs={columnDefs}
              domLayout="autoHeight"
            ></AgGridReact>
          </div>
        </Col>
      </Row>
    </div>
  );
}
