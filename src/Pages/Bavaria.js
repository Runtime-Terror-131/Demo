import React, { useEffect } from "react";
import { updateColor } from "../Components";
import { Card } from "react-bootstrap";
export default function Bavaria() {
  useEffect(() => {
    updateColor(2);
  }, []);
  return (
    <div>
      <h1>Bavaria</h1>
      <Card>
        <Card.Body>
          <Card.Title>Pharma Study</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Intruduction
          </Card.Subtitle>
          <Card.Text>
            Patients receive doses of the medication as well as an identically
            packaged, frequently used generic medication from Bavaria. Every
            dose is marked with a tracking code and a boolean “generic” flag by
            Bavaria. The FDA re-labels these doses with their own code and
            assigns them to individual patients before sending them to Jane
            Hopkins. Only the FDA has visibility into the tracking code mapping.
            This way, neither the treating physicians at Jane Hopkins, nor the
            researchers at Bavaria can determine which patient is in the control
            and treatment group until the study is complete.
          </Card.Text>
          <Card.Link href="https://www.google.com">Find us</Card.Link>
          <Card.Link href="https://www.youtube.com">Videos</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}
