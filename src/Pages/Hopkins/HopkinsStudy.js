import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, Alert, Button, Form } from "react-bootstrap";
import { InfoCards, Notifications, StudyStatusConst } from "../../Components";
import { AgGridReact } from "ag-grid-react";
import { useContextValues } from "../../Context/Context";
import { useJaneHopkins } from "../../Config/Hopkins-Config";
import { NavLink } from "react-router-dom";
import { UserTypeConst } from "../../Components/Util/StaticConst";
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
          : "dark"
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
export default function Study({ userType }) {
  const [studyData, setStudyData] = useState();
  const [pendingStudies, setPendingStudies] = useState(0);
  const [activeStudies, setActiveStudies] = useState(0);
  const [completedStudies, setCompletedStudies] = useState(0);
  const [canceledStudies, setCanceledStudies] = useState(0);
  const gridRef = useRef();
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
  const downloadResult = () => {
    gridRef.current.api.exportDataAsCsv();
  };
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
            <Card.Header>Studies Search</Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col lg={4}>
                    <Form.Group className="mb-3" controlId="Name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group className="mb-3" controlId="Name">
                      <Form.Label>Status</Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option></option>
                        <option value="1">Pending</option>
                        <option value="2">Active</option>
                        <option value="3">Completed</option>
                        <option value="3">Canceled</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
            <Card.Footer>
              {userType === UserTypeConst.hopkinsAdmin && (
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
              )}

              <Button variant="primary" type="button" onClick={downloadResult}>
                Download Result
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
              ref={gridRef}
              rowData={studyData}
              columnDefs={columnDefs}
              domLayout="autoHeight"></AgGridReact>
          </div>
        </Col>
      </Row>
    </div>
  );
}
