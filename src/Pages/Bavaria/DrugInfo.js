import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useBavaria } from "../../Config/Bavaria-Config";
import { AgGridReact } from "ag-grid-react";
import { useContextValues } from "../../Context/Context";
export default function DrugInfo() {
  const { getDrugList } = useBavaria();
  const { setShowGridSpinner } = useContextValues();
  const [drugData, setDrugData] = useState();
  const [columnDefs] = useState([
    { field: "id" },
    { field: "placebo" },
    { field: "batchNumber" },
  ]);
  useEffect(() => {
    setShowGridSpinner(true);
    try {
      getDrugList()
        .then((result) => {
          return result.items;
        })
        .then((items) => {
          setDrugData(items);
          setShowGridSpinner(false);
        });
    } catch (e) {
      alert(e);
    }
  }, []);
  return (
    <div>
      <Row>
        <Col lg={5}>
          <Card className="box-shadow">
            <Card.Header className="border-bottom-0">Drug</Card.Header>
            <Card.Body>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button variant="info">Create New Drug</Button>
                <Button variant="info">Send Drug list to FDA</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <div
            className="ag-theme-alpine"
            style={{ marginTop: "5px", marginBottom: "5px" }}>
            <AgGridReact
              rowData={drugData}
              columnDefs={columnDefs}
              domLayout="autoHeight"></AgGridReact>
          </div>
        </Col>
      </Row>
    </div>
  );
}
