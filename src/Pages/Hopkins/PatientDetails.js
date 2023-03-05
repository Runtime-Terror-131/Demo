import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { patients } from "../../Components/Data/patients";
import { useContextValues } from "../../Context/Context";
import { BackButton } from "../../Components/Util/BackButton";
import FormTemplate from "./FormTemplate";
import { useJaneHopkins } from "../../Config/Hopkins-Config";
export default function PatientDetails() {
  const { patientDetails } = useContextValues();
  const { getByID } = useJaneHopkins();
  const [patientData, setPatientData] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let opportunity_id = urlParams.get("id");
    getByID(opportunity_id).then((result) => {
      setPatientData(result);
    });
  }, []);

  return (
    <Card>
      <Card.Header>PatientDetails</Card.Header>
      <Card.Body>
        <Row>
          {patientData ? (
            Object.entries(patientData).map((item, i) => (
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
            <div>Sorry something went wrong</div>
          )}
        </Row>
      </Card.Body>
      <Card.Footer>
        <div className="float-end">
          <Button>Edit</Button>

          <Button variant="danger" style={{ margin: "5px" }}>
            Delete
          </Button>
          <BackButton />
        </div>
      </Card.Footer>
    </Card>
  );
}
