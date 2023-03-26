import React from "react";
import { Card, Col, Row } from "react-bootstrap";

export default function InfoCards() {
  return (
    <Row>
      <Col lg={3}>
        <Card>
          <Card.Body>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="40px"
              fill="red"
              className="bi bi-person-fill patient-card"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            </svg>
            Number of Patients:
          </Card.Body>
        </Card>
      </Col>
      <Col lg={3}>
        <Card>
          <Card.Body>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="teal"
              className="bi bi-book-fill study-card"
              viewBox="0 0 16 16"
            >
              <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
            </svg>
            Number of Active Studies:
          </Card.Body>
        </Card>
      </Col>
      <Col lg={3}>
        {/* <Card>
          <Card.Body>body</Card.Body>
        </Card> */}
      </Col>
      <Col lg={3}>
        {/* <Card>
          <Card.Body>body</Card.Body>
        </Card> */}
      </Col>
    </Row>
  );
}
