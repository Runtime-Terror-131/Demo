import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spinner, Button } from "react-bootstrap";
import { Breadcrumbs } from "../../Components";
import { useBavaria } from "../../Config/Bavaria-Config";
import { useContextValues } from "../../Context/Context";

export default function BavariaStudyDetails() {
  const { getStudyByID, approveStudy } = useBavaria();
  const { setShowSpinner } = useContextValues();
  const [studyData, setStudyData] = useState();
  const approveBavariaStudy = () => {
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
  useEffect(() => {
    window.scrollTo(0, 0);
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let opportunity_id = urlParams.get("id");
    getStudyByID(opportunity_id).then((result) => {
      setStudyData(result);
    });
  }, []);
  return (
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
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              variant="success"
              onClick={approveBavariaStudy}
              disabled={studyData && studyData.agreedByBavaria ? true : false}
            >
              {studyData && studyData.agreedByBavaria
                ? "Study already approved"
                : "Approve Study"}
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </Row>
  );
}
