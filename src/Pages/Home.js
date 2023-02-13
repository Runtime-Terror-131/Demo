import React from "react";
import Card from "react-bootstrap/Card";
export default function Home() {
  return (
    <Card>
      <Card.Header>
        Vendia Home Page{" "}
        <Card.Subtitle className="mb-2 text-muted">
          Pharma Project
        </Card.Subtitle>
      </Card.Header>

      <Card.Body>
        In the United States the Federal Drug Administration (FDA) approves
        medications for specific use cases, if the medication has been shown to
        be both effective and safe. To prove safety and effectiveness of a new
        drug, pharma companies conduct multi-phase clinical trials in
        collaboration with health care providers and under oversight of the FDA.
        For a successful study, all three parties need to exchange data in a
        controlled and auditable manner. For example, a health care provider
        needs to be able to identify their patient and track treatment, but they
        should not know whether the patient is part of the treatment group
        (receiving the actual medication) or the control group (receiving a
        placebo or established medication). On the other hand, the FDA and
        pharma companies need this information, but generally have no need to
        know a patient's personally identifiable information (PII), such as
        their name, date of birth, or address. In the interest of patient
        privacy, PII should be redacted before it is transmitted by a healthcare
        provider. At the same time it is important that the FDA can verify the
        integrity of study data. The technical means used to transfer data
        should make it impossible to - for example - remove a study participant
        or manipulate laboratory data to improve the chances of approval for a
        new medication. While we generally believe in the moral integrity of
        humans, this is a real risk given the cost of developing a new drug
        (~$1B). Especially when the drug maker has to show that the medication
        is more effective than existing alternatives.
      </Card.Body>
    </Card>
  );
}
