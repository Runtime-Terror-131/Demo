import React, { useEffect, useState } from "react";
import { Row, Col, Card, Alert, Button } from "react-bootstrap";
import { InfoCards, Notifications } from "../../Components";
import { AgGridReact } from "ag-grid-react";
import { useContextValues } from "../../Context/Context";
import { useJaneHopkins } from "../../Config/Hopkins-Config";
import { NavLink } from "react-router-dom";
const ButtonCell = (props) => {
  return (
    <NavLink
      to={"/hopkins/studyinfo/details" + "?id=" + props.data._id}
      id={`detailsLink-${props.data.name}`}
      style={{ textDecoration: "none" }}
    >
      {" "}
      Details
    </NavLink>
  );
};
const Legend = (props) => {
  let status =
    props.data.status == 1
      ? "Pending"
      : props.data.status == 2
      ? "Active"
      : props.data.status == 3
      ? "Completed"
      : "Canceled";
  return (
    <Alert
      variant={
        props.data.status == 1
          ? "danger"
          : props.data.status == 2
          ? "success"
          : props.data.status == 3
          ? "warning"
          : "info"
      }
      style={{
        display: "flex",
        justifyContent: "center",
        // alignContent: "center",
        paddingTop: 0,
        color: "#8a6d3b",
        fontWeight: "bold",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {status}
    </Alert>
  );
};
export default function Study() {
  const [studyData, setStudyData] = useState();
  const { setShowSpinner } = useContextValues();
  const { getStudyList } = useJaneHopkins();
  const [columnDefs] = useState([
    {
      field: "detials",
      cellRenderer: ButtonCell,
    },
    {
      field: "status",
      cellRenderer: Legend,
    },
    { field: "studyName" },
    // { field: "status" },
    { field: "startDate" },
    { field: "endDate" },
    { field: "agreedByBavaria" },
    { field: "agreedByFDA" },
    { field: "MaxNumberOfParticipants" },
  ]);
  useEffect(() => {
    setShowSpinner(true);
    try {
      getStudyList()
        .then((result) => {
          return result.items;
        })
        .then((items) => {
          setStudyData(items);
          setShowSpinner(false);
        });
    } catch (e) {
      alert(e);
    }
  }, []);
  return (
    <div>
      <InfoCards />
      <br />
      <Row>
        <Col lg={8}>
          <Card style={{ height: "370px" }}>
            <Card.Header>Studies</Card.Header>
            <Card.Body>
              this is where the new study search stuff should go
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
        </Col>
        <Col lg={4}>
          <Notifications />
        </Col>
      </Row>
      <Row>
        <Col lg={10}>
          <div
            className="ag-theme-alpine"
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
            <AgGridReact
              rowData={studyData}
              columnDefs={columnDefs}
              domLayout="autoHeight"
            ></AgGridReact>
          </div>
        </Col>
      </Row>
    </div>
  );
}
