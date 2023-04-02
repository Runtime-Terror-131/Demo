import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spinner, Button } from "react-bootstrap";
import { Breadcrumbs } from "../../Components";
import { useJaneHopkins } from "../../Config/Hopkins-Config";

export default function HopkinsStudyDetails() {
  const { getStudyByID } = useJaneHopkins();
  const [studyData, setStudyData] = useState();
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
        <Card.Footer></Card.Footer>
      </Card>
    </Row>
  );
}
