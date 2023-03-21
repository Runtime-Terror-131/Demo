import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import pills from "../../images/pills.png";
import info from "../../images/info.png";

export default function BavariaHome() {
  return (
    <Row className="justify-content-center">
      <Col md={3}>
        <Card className="box-shadow">
          <Card.Link href="https://www.youtube.com">
            <Card.Img
              src={info}
              alt="About Bavaria"
              className="img-fluid rounded"
            />
          </Card.Link>
          <Card.Body className="text-center">
            <Card.Title>About Bavaria</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="box-shadow">
          <Card.Link href="https://www.google.com">
            <Card.Img
              src={pills}
              alt="Drug Info"
              className="img-fluid rounded"
            />
          </Card.Link>
          <Card.Body className="text-center">
            <Card.Title>Drug Info</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
