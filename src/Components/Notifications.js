import React, { useEffect, useState } from "react";
import { Alert, Card, Col, Row } from "react-bootstrap";

export default function Notifications({ studyData }) {
  const [data, setData] = useState();
  useEffect(() => {
    if (studyData && !data) {
      let notificationData = [];
      studyData.map((item, i) => {
        item.agreedByBavaria && item.agreedByFDA
          ? notificationData.push(
              `${item.studyName} is approved by both bavaria and FDA-status updated to Active`
            )
          : item.agreedByBavaria
          ? notificationData.push(
              `${item.studyName} is approved bavaria - waiting on FDA`
            )
          : item.agreedByFDA
          ? notificationData.push(
              `${item.studyName} is approved FDA - waiting on Bavaria`
            )
          : notificationData.push(
              `${item.studyName} is waiting to be approved by both Bavaria and FDA`
            );
      });
      setData(notificationData);
    }
  }, [studyData]);
  return (
    <Card style={{ height: "370px", overflow: "auto" }}>
      <Card.Header>Notifications</Card.Header>
      <Card.Body>
        {data &&
          data.map((item, i) => (
            <Alert key={i} dismissible>
              {item}
            </Alert>
          ))}
      </Card.Body>
    </Card>
  );
}
