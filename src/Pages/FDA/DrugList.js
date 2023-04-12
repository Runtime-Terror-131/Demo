import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import { useContextValues } from "../../Context/Context";
import { useFDA } from "../../Config/FDA-Config";
export default function DrugList() {
  const [patientData, setPatientData] = useState();
  const [studyList, setStudyList] = useState();
  const { setShowGridSpinner, setShowConfirmationStudy } = useContextValues();
  const { getAllDrugList } = useFDA();
  const [columnDef] = useState([
    { field: "id" },
    { field: "placebo" },
    { field: "batchNumber" },
    { field: "availableToFDA" },
  ]);
  const [drugData, setDrugData] = useState();
  useEffect(() => {
    setShowGridSpinner(true);
    try {
      getAllDrugList().then((items) => {
        setDrugData(items);
        setShowGridSpinner(false);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div>
      <Row>
        <Col lg={6}>
          <Card>
            <Card.Header>Search</Card.Header>
            <Card.Body>Search Fields here</Card.Body>
            <Card.Footer>
              {" "}
              <Button variant="success">search</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <div
            className="ag-theme-alpine"
            style={{ marginTop: "5px", marginBottom: "5px" }}>
            <h3>Drug List</h3>
            <AgGridReact
              rowData={drugData}
              columnDefs={columnDef}
              domLayout="autoHeight"></AgGridReact>
          </div>
        </Col>
      </Row>
    </div>
  );
}
