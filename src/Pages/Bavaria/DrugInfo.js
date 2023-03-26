import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useBavaria } from "../../Config/Bavaria-Config";
import { AgGridReact } from "ag-grid-react";
import { useContextValues } from "../../Context/Context";
export default function DrugInfo() {
  const { getDrugList } = useBavaria();
  const { setShowSpinner } = useContextValues();
  const [drugData, setDrugData] = useState();
  const [columnDefs] = useState([
    { field: "id" },
    { field: "placebo" },
    { field: "batchNumber" },
  ]);
  useEffect(() => {
    setShowSpinner(true);
    try {
      getDrugList()
        .then((result) => {
          return result.items;
        })
        .then((items) => {
          setDrugData(items);
          setShowSpinner(false);
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
              <Button variant="info">Create New Drug</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={5}>
          <div
            className="ag-theme-alpine"
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
            <AgGridReact
              rowData={drugData}
              columnDefs={columnDefs}
              domLayout="autoHeight"
            ></AgGridReact>
          </div>
        </Col>
      </Row>
    </div>
  );
}
