import React, { useEffect, useState, useRef } from "react";
import { Card, Row, Col, Spinner, Button } from "react-bootstrap";
import { Breadcrumbs } from "../../Components";
import { useJaneHopkins } from "../../Config/Hopkins-Config";
import { AgGridReact } from "ag-grid-react";
import { NavLink } from "react-router-dom";
const ButtonCell = (props) => {
  return (
    <NavLink
      to={"/hopkins/patient/details" + "?id=" + props.data._id}
      id={`detailsLink-${props.data.name}`}
      style={{ textDecoration: "none" }}
    >
      {" "}
      Details
    </NavLink>
  );
};

export default function HopkinsStudyDetails() {
  const { getStudyByID, getStudyPatients } = useJaneHopkins();
  const [studyData, setStudyData] = useState();
  const [patientData, setPatientData] = useState();
  const gridRef = useRef();
  const patientHeaders = [
    {
      field: "detials",
      cellRenderer: ButtonCell,
    },
    { field: "name" },
    { field: "Age" },
    { field: "dob" },
    { field: "insuranceNumber" },
    {
      field: "allergies",
      valueGetter: (params) => {
        return JSON.stringify(params.data.allergies);
      },
    },
    {
      field: "currentMedications",
      valueGetter: (params) => {
        return JSON.stringify(params.data.currentMedications);
      },
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let opportunity_id = urlParams.get("id");
    getStudyByID(opportunity_id).then((result) => {
      setStudyData(result);
    });
    getStudyPatients(opportunity_id).then((result) => {
      setPatientData(result);
    });
  }, []);
  return (
    <>
      <Row>
        <Breadcrumbs />
        <Card>
          <Card.Header>Study Details</Card.Header>
          <Card.Body>
            <Row>
              {studyData ? (
                Object.entries(studyData).map((item, i) => (
                  <Col lg={4} key={i}>
                    <div>
                      <span style={{ color: "grey" }} key={item[0].toString()}>
                        {item[0]}:
                      </span>
                      <h4 key={JSON.stringify(item[1])}>
                        {JSON.stringify(item[1])}
                      </h4>
                    </div>
                  </Col>
                ))
              ) : (
                <Spinner />
              )}
            </Row>
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Card>
      </Row>
      <Row>
        <div
          className="ag-theme-alpine"
          style={{ marginTop: "5px", marginBottom: "5px" }}
        >
          <Card>
            <Card.Header>Participants</Card.Header>
          </Card>
          <AgGridReact
            className="box-shadow"
            ref={gridRef}
            rowData={patientData ? patientData : ""}
            columnDefs={patientHeaders}
            pagination={true}
            paginationPageSize={10}
            domLayout="autoHeight"
          ></AgGridReact>
        </div>
      </Row>
    </>
  );
}
