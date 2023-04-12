import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import study from "../../images/study.png";
import info from "../../images/info.png";

export default function FDAHome() {
  return (
    <Row className="justify-content-center">
      <Col md={3}>
        <Card className="box-shadow hover">
          <Card.Link href="https://www.youtube.com">
            <Card.Img src={info} alt="About Bavaria" />
          </Card.Link>
          <Card.Body className="text-center">
            <Card.Title>About FDA</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="box-shadow hover">
          <Card.Link href="https://www.google.com">
            <Card.Img src={study} alt="Drug Info" />
          </Card.Link>
          <Card.Body className="text-center">
            <Card.Title>Study Info</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
