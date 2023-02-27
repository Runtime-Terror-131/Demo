import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { patients } from "../../Components/Data/patients";
import { useContextValues } from "../../Context/Context";
import {BackButton} from "../../Components/Util/BackButton";
export default function PatientDetails() {
  const { patientDetails } = useContextValues();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (patientDetails) {
      console.log(typeof patientDetails);
    }
  }, []);
  return (
    <Card>
      <Card.Header>PatientDetails</Card.Header>
      <Card.Body>
        <Row>
          {patientDetails ? (
            Object.entries(patientDetails).map((item, i) => (
              <Col lg={4} key={i}>
                <div>
                  <span style={{ color: "grey" }} key={item[0].toString()}>
                    {item[0]}:
                  </span>
                  <h4 key={item[1].toString()}>{item[1]}</h4>
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
