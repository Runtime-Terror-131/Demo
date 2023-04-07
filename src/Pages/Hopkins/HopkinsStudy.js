import React, { useEffect, useState } from "react";
import { Row, Col, Card, Alert, Button } from "react-bootstrap";
import { InfoCards, Notifications, StudyStatusConst } from "../../Components";
import { AgGridReact } from "ag-grid-react";
import { useContextValues } from "../../Context/Context";
import { useJaneHopkins } from "../../Config/Hopkins-Config";
import { NavLink } from "react-router-dom";
const ButtonCell = (props) => {
  return (
    <NavLink
      to={"/hopkins/studyinfo/details" + "?id=" + props.data._id}
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
export default function Study() {
  const [studyData, setStudyData] = useState();
  const [pendingStudies, setPendingStudies] = useState(0);
  const [activeStudies, setActiveStudies] = useState(0);
  const [completedStudies, setCompletedStudies] = useState(0);
  const [canceledStudies, setCanceledStudies] = useState(0);

  const { setShowGridSpinner } = useContextValues();
  const { getStudyList } = useJaneHopkins();
  const [columnDefs] = useState([
    {
      field: "detials",
      cellRenderer: ButtonCell,
    },
    { field: "studyName" },
    {
      field: "status",
      cellRenderer: Legend,
    },
    // { field: "status" },
    { field: "startDate" },
    { field: "endDate" },
    { field: "agreedByBavaria" },
    { field: "agreedByFDA" },
    { field: "MaxNumberOfParticipants" },
  ]);
  useEffect(() => {
    setShowGridSpinner(true);
    try {
      getStudyList()
        .then((result) => {
          return result.items;
        })
        .then((items) => {
          setStudyData(items);
          let pending = 0,
            active = 0,
            complete = 0,
            canceled = 0;
          items.forEach((element) => {
            element.status == StudyStatusConst.Pending
              ? pending++
              : element.status == StudyStatusConst.Active
              ? active++
              : element.status == StudyStatusConst.Completed
              ? complete++
              : canceled++;
          });
          setPendingStudies(pending);
          setActiveStudies(active);
          setCompletedStudies(complete);
          setCanceledStudies(canceled);
          setShowGridSpinner(false);
        });
    } catch (e) {
      alert(e);
    }
  }, []);
  return (
    <div>
      <InfoCards
        pending={pendingStudies}
        active={activeStudies}
        completed={completedStudies}
        canceled={canceledStudies}
      />
      <br />
      <Row>
        <Col lg={9}>
          <Card style={{ height: "370px" }}>
            <Card.Header>Studies</Card.Header>
            <Card.Body>
              this is where the new study search stuff should go
            </Card.Body>
            <Card.Footer>
              <Button variant="warning" type="button" className="m-2">
                <NavLink
                  to={"/hopkins/createstudy"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontWeight: "600",
                  }}>
                  Create New Study
                </NavLink>
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg={3}>
          <Notifications studyData={studyData} />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
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
