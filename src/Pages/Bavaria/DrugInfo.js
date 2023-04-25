import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useBavaria } from "../../Config/Bavaria-Config";
import { AgGridReact } from "ag-grid-react";
import { useContextValues } from "../../Context/Context";
import { NavLink } from "react-router-dom";
import { DrugConfirmation } from "../../Components";

export default function DrugInfo() {
  const goToCreateDrug = () => {
    console.log("here");
  };
  const { getDrugList, SendDrugListToFDA } = useBavaria();

  const {
    setShowConfirmationWarning,
    setShowGridSpinner,
    ConfirmSendDrugList,
    setConfirmSendDrugList,
  } = useContextValues();
  const [DrugList, setDrugList] = useState(null);
  const [drugData, setDrugData] = useState();
  const [eligibleDrugList, setEligibleDrugList] = useState();
  const [columnDefs] = useState([
    { field: "id" },
    { field: "placebo" },
    { field: "batchNumber" },
    { field: "availableToFDA" },
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
          let eligibleDrugList = items.filter(
            (item) => item.availableToFDA === false
          );
          setEligibleDrugList(eligibleDrugList);
          setShowGridSpinner(false);
        });
    } catch (e) {
      alert(e);
    }
  }, []);

  useEffect(() => {
    if (ConfirmSendDrugList) {
      setShowGridSpinner(true);
      try {
        let eligibleDrugList = drugData.filter(
          (item) => item.isEligible == null
        );

        SendDrugListToFDA(
          eligibleDrugList,
          setConfirmSendDrugList,
          setShowGridSpinner
        );
      } catch (e) {
        console.log(e);
        setShowGridSpinner(false);
      }
    }
  }, [ConfirmSendDrugList, getDrugList]);

  return (
    <div>
      <DrugConfirmation drugData={eligibleDrugList} />
      <Row>
        <Col lg={4}>
          <Card className="box-shadow">
            <Card.Header className="border-bottom-0">Drug</Card.Header>
            <Card.Body>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button
                  variant="warning"
                  type="button"
                  className="m-2"
                  onClick={goToCreateDrug}>
                  <NavLink
                    to={"/bavaria/createdrug"}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontWeight: "600",
                    }}>
                    Create New Drug
                  </NavLink>
                </Button>
                <Button
                  variant="success"
                  type="button"
                  className="m-2"
                  onClick={() => {
                    setShowConfirmationWarning(true);
                  }}>
                  Send Drug list to FDA
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8}>
          <div
            className="ag-theme-alpine box-shadow"
            style={{ marginTop: "5px", marginBottom: "5px" }}>
            <AgGridReact
              rowData={drugData}
              columnDefs={columnDefs}
              domLayout="autoHeight"></AgGridReact>
          </div>
        </Col>
      </Row>
      <Row></Row>
    </div>
  );
}
