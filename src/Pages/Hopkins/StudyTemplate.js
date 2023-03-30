import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useJaneHopkins } from "../../Config/Hopkins-Config";
import { StudyStatusConst } from "../../Components";
import { useContextValues } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
export default function StudyTemplate() {
  const { createNewStudy } = useJaneHopkins();
  const { setShowSpinner } = useContextValues();
  const [studyName, setStudyName] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const navigate = useNavigate();
  const handleChange = (setValue, value) => {
    setValue(value);
  };

  const saveStudy = () => {
    try {
      setShowSpinner(true);
      let study = {};
      study.studyName = studyName;
      study.startDate = startDate;
      study.endDate = endDate;
      study.status = StudyStatusConst.Pending.toString();
      if (
        study.studyName != null &&
        study.startDate != null &&
        study.endDate != null
      ) {
        createNewStudy(study).then((result) => {
          setShowSpinner(false);
          if (result == true) {
            navigate("/hopkins/studyinfo");
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container style={{ textAlign: "center", margin: "3px" }}>
      <Form
        style={{
          backgroundColor: "#384E89",
          color: "white",
          borderRadius: "30px",
        }}
      >
        <Row>
          <Col lg={4}>
            <Form.Group className="m-3 ">
              <Form.Label>Study Name</Form.Label>
              <Form.Control
                type="text"
                value={studyName}
                onChange={(e) => {
                  handleChange(setStudyName, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="m-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => {
                  handleChange(setStartDate, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="m-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => {
                  handleChange(setEndDate, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row
          lg={6}
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px",
            padding: "10px",
            marginInline: "5% 5%",
          }}
        >
          <Button variant="success" onClick={saveStudy}>
            Save
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
