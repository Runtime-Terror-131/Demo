import React, { useEffect } from "react";
import { updateColor } from "../Components";
import { Card } from "react-bootstrap";
export default function FDA() {
  useEffect(() => {
    updateColor(3);
  }, []);
  return (
    <div>
      <h1>FDA</h1>
      <Card>
        <Card.Body>
          <Card.Title>Pharma Result</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Intruduction
          </Card.Subtitle>
          <Card.Text>
            The goal of this class is to build a proof of concept distributed
            information system with suitable user interfaces that could be used
            by the FDA, pharmaceutical companies, and participating health care
            providers to exchange study data as it is produced (i.e., in near
            real time) in a secure, trusted (i.e., auditable), and controlled
            (i.e., minimally permissive) manner. We will build our information
            system on top of the Vendia Share platform, which supports data
            exchange through an immutable, cryptographically verifiable,
            distributed ledger and provides the primitives to control data flow
            (e.g., redaction). In the following, we go into more detail on the
            use case, which you will translate into technical requirements and a
            suitable implementation during this class.
          </Card.Text>
          <Card.Link href="https://www.google.com">FDA Website</Card.Link>
          <Card.Link href="https://www.youtube.com">
            FDA Rules and Regulations
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}
