import React, { useEffect, useState } from "react";
import { Alert, Card, Col, Row } from "react-bootstrap";
import AlertText from "./Util/AlertText";
import { StudyStatusConst } from "./Util/StaticConst";
export default function Notifications({ studyData }) {
  const [data, setData] = useState();

  useEffect(() => {
    if (studyData && !data) {
      let notificationData = [];
      studyData.map((item, i) => {
        item.status == StudyStatusConst.Completed
          ? notificationData.push([
              `${item.studyName} was Completed!`,
              "warning",
            ])
          : item.status == StudyStatusConst.Canceled
          ? notificationData.push([`${item.studyName} was Canceled!`, "dark"])
          : item.agreedByBavaria && item.agreedByFDA
          ? notificationData.push([
              `${item.studyName} is approved by both bavaria and FDA-status updated to Active`,
              "success",
            ])
          : item.agreedByBavaria
          ? notificationData.push([
              `${item.studyName} is approved by bavaria - waiting on FDA`,
              "danger",
            ])
          : item.agreedByFDA
          ? notificationData.push([
              `${item.studyName} is approved by FDA - waiting on Bavaria`,
              "danger",
            ])
          : notificationData.push([
              `${item.studyName} is waiting to be approved by both Bavaria and FDA`,
              "danger",
            ]);
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
            // <Alert key={i} dismissible variant={item[1]}>
            //   {item[0]}
            // </Alert>
            <AlertText item={item} index={i} />
          ))}
      </Card.Body>
    </Card>
  );
}
