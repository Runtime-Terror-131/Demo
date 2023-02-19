import React from "react";
import { Card } from "react-bootstrap";
export default function HopkinsHome() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Hopkins Portal</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Intruduction</Card.Subtitle>
        <Card.Text>
          In the United States the Federal Drug Administration (FDA) approves
          medications for specific use cases, if the medication has been shown
          to be both effective and safe. To prove safety and effectiveness of a
          new drug, pharma companies conduct multi-phase clinical trials in
          collaboration with health care providers and under oversight of the
          FDA. For a successful study, all three parties need to exchange data
          in a controlled and auditable manner. For example, a health care
          provider needs to be able to identify their patient and track
          treatment, but they should not know whether the patient is part of the
          treatment group (receiving the actual medication) or the control group
          (receiving a placebo or established medication). On the other hand,
          the FDA and pharma companies need this information, but generally have
          no need to know a patient's personally identifiable information (PII),
          such as their name, date of birth, or address. In the interest of
          patient privacy, PII should be redacted before it is transmitted by a
          healthcare provider.
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Card.Link href="https://www.google.com">FDA Website</Card.Link>
        <Card.Link href="https://www.youtube.com">
          FDA Rules and Regulations
        </Card.Link>
      </Card.Footer>
    </Card>
  );
}
