import React, { useEffect, useState } from "react";
import { Row, Col, Card, Alert, Button } from "react-bootstrap";
import { InfoCards, Notifications } from "../../Components";
import { AgGridReact } from "ag-grid-react";
import { useContextValues } from "../../Context/Context";
import { useFDA } from "../../Config/FDA-Config";
import { NavLink } from "react-router-dom";
const ButtonCell = (props) => {
  const buttonClicked = () => {
    let link = document.getElementById(`detailsLink-${props.data.name}`);
    //localStorage.setItem("patientID", this.props.data.patient_ID);
    link.click();
    //this.props.clicked(this.props.value);
  };
  return (
    <NavLink
      to={"/fda/studyinfo/details" + "?id=" + props.data._id}
      id={`detailsLink-${props.data.name}`}
      style={{ textDecoration: "none" }}>
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
      }}>
      {status}
    </Alert>
  );
};
export default function StudyInfo() {
  const [studyData, setStudyData] = useState();
  const { setShowSpinner } = useContextValues();
  const { getStudyList } = useFDA();
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
            <Card.Footer>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button variant="primary">
                  Approve All Current Pending Studies
                </Button>
                <Button variant="danger">
                  Decline All Current Pending Studies
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg={4}>
          <Notifications studyData={studyData} />
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <div
            className="ag-theme-alpine"
            style={{ marginTop: "5px", marginBottom: "5px" }}>
            <AgGridReact
              rowData={studyData}
              columnDefs={columnDefs}
              domLayout="autoHeight"></AgGridReact>
          </div>
        </Col>
      </Row>
    </div>
  );
}
