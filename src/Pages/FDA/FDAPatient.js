import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import { useContextValues } from "../../Context/Context";
import { useFDA } from "../../Config/FDA-Config";
export default function FDAPatient() {
  const [patientData, setPatientData] = useState();
  const { setShowSpinner } = useContextValues();
  const { getPatientList } = useFDA();
  const [columnDefs] = useState([
    { field: "uuid" },
    { field: "_id" },
    { field: "currentMedications" },
    { field: "icdHealthCodes" },
    { field: "currentlyEmployed" },
    { field: "currentlyInsured" },
  ]);
  useEffect(() => {
    setShowSpinner(true);
    try {
      getPatientList()
        .then((result) => {
          return result;
        })
        .then((items) => {
          setPatientData(items);
          setShowSpinner(false);
        });
    } catch (e) {
      alert(e);
    }
  }, []);
  return (
    <div>
      <Row>
        <Col lg={6}>
          <Card>
            <Card.Header>Eligable Patients</Card.Header>
            <Card.Body></Card.Body>
            <Card.Footer>
              {" "}
              <Button variant="success" disabled>
                Include All participants in Study
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={10}>
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
