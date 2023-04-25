import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spinner, Button } from "react-bootstrap";
import { Breadcrumbs, StudyStatusConst } from "../../Components";
import { useFDA } from "../../Config/FDA-Config";
import { useContextValues } from "../../Context/Context";
import { AgGridReact } from "ag-grid-react";
export default function FDAStudyDetails() {
  const {
    getStudyByID,
    approveStudy,
    getStudyPatients,
    completeStudy,
    disapproveStudy,
  } = useFDA();
  const { setShowSpinner } = useContextValues();
  const [studyData, setStudyData] = useState();
  const [patientData, setPatientData] = useState();
  const [columnDefs] = useState([
    { field: "uuid" },
    { field: "_id" },
    { field: "currentMedications" },
    { field: "icdHealthCodes" },
    { field: "drugID" },
    { field: "currentlyEmployed" },
    { field: "currentlyInsured" },
  ]);
  const approveFDAStudy = () => {
    try {
      setShowSpinner(true);
      approveStudy(studyData).then((result) => {
        if (!result) {
        } else {
          setStudyData(result.result);
          setShowSpinner(false);
        }
      });
    } catch (e) {
      setShowSpinner(false);
      console.log(e);
    }
  };
  const cancelStudy = () => {
    try {
      setShowSpinner(true);
      disapproveStudy(studyData).then((result) => {
        if (!result) {
        } else {
          setStudyData(result.result);
          setShowSpinner(false);
        }
      });
    } catch (e) {
      setShowSpinner(false);
      console.log(e);
    }
  };
  const finishStudy = () => {
    try {
      setShowSpinner(true);
      completeStudy(studyData).then((result) => {
        if (!result) {
        } else {
          setStudyData(result.result);
          setShowSpinner(false);
        }
      });
    } catch (e) {
      setShowSpinner(false);
      console.log(e);
    }
  };
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
          <Card.Footer>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button
                variant="success"
                onClick={approveFDAStudy}
                disabled={
                  studyData &&
                  studyData.status == StudyStatusConst.Pending &&
                  studyData.agreedByFDA == null
                    ? false
                    : true
                }
              >
                Approve Study
              </Button>
              <Button
                variant="danger"
                onClick={cancelStudy}
                disabled={
                  studyData &&
                  studyData.status == StudyStatusConst.Pending &&
                  studyData.agreedByFDA == null
                    ? false
                    : true
                }
              >
                Disapprove Study
              </Button>
              <Button
                variant="danger"
                disabled={
                  studyData &&
                  studyData.agreedByFDA &&
                  studyData.agreedByBavaria &&
                  studyData.status != StudyStatusConst.Completed
                    ? false
                    : true
                }
                onClick={finishStudy}
              >
                Finish Study
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </Row>

      <Row style={{ marginTop: "10px", paddingRight: 0 }}>
        <Col lg={8}>
          <Card>
            <Card.Header style={{ fontWeight: "boldd" }}>
              Participants
            </Card.Header>
          </Card>
          <div
            className="ag-theme-alpine"
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
            <AgGridReact
              rowData={patientData}
              columnDefs={columnDefs}
              overlayNoRowsTemplate="No Participants associated with this study"
              domLayout="autoHeight"
            ></AgGridReact>
          </div>
        </Col>
      </Row>
    </>
  );
}
