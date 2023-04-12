import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { BackButton } from "../../Components";
import { useBavaria } from "../../Config/Bavaria-Config";
import { useContextValues } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
export default function DrugTemplate({ data }) {
  const { createNewDrug, updateDrugData } = useBavaria();
  const { setShowSpinner, setShowDeleteWarning } = useContextValues();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState();

  const [placebo, setPlacebo] = useState(false);
  const [batchNumber, setBatchNumber] = useState();
  const [id, setId] = useState();
  const [availableToFDA, setAvailableToFDA] = useState(false);

  const handleChange = (setvalue, value) => {
    setvalue(value);
  };

  useEffect(() => {
    if (!data) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
      setPlacebo(data.placebo == true ? true : false);
      setBatchNumber(data.batchNumber);
      setId(data.id);

      setAvailableToFDA(data.availableToFDA == true ? true : false);
    }
  }, []);
  const saveDrug = () => {
    const drug = {};
    drug.placebo = placebo ? true : false;
    drug.batchNumber = batchNumber;
    drug.id = id;
    drug.availableToFDA = availableToFDA ? true : false;
    setShowSpinner(true);
    if (data && data._id !== null) {
      // work on this later this is an edit page
      drug._id = data._id;
      updateDrugData(drug).then((result) => {
        setShowSpinner(false);
        if (result === true) {
          navigate("/bavaria/drugInfo");
        }
      });
    } else {
      createNewDrug(drug).then((result) => {
        setShowSpinner(false);
        if (result == true) {
          navigate("/bavaria/drugInfo");
        }
      });
    }
  };
  return (
    <Container style={{ textAlign: "center", margin: "3px" }}>
      {data ? <h2>Edit Drug</h2> : <h2>Add a New Dug</h2>}
      {/* {!isEdit ? (
        <Container>
          <h1>this is the create view</h1>
        </Container>
      ) : (
        <h1>this is the edit view</h1>
      )} */}
      <Form
        style={{
          backgroundColor: "#543982",
          color: "white",
          borderRadius: "30px",
        }}>
        <Row>
          <Col lg={6}>
            <Form.Group className="m-3 ">
              <Form.Label>BatchNumber</Form.Label>
              <Form.Control
                type="text"
                value={batchNumber}
                onChange={(e) => {
                  handleChange(setBatchNumber, e.target.value);
                }}
              />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group className="m-3">
              <Form.Label>id</Form.Label>
              <Form.Control
                type="text"
                value={id}
                onChange={(e) => {
                  handleChange(setId, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={3}>
            <Form.Group className="m-3">
              <Form.Check
                type="switch"
                id="custom-switch1"
                label="placebo"
                checked={placebo}
                onChange={(e) => handleChange(setPlacebo, !placebo)}
              />
            </Form.Group>
          </Col>
          <Col lg={3}>
            <Form.Group className="m-3">
              <Form.Check
                type="switch"
                id="custom-switch2"
                label="availableToFDA"
                checked={availableToFDA}
                onChange={(e) =>
                  handleChange(setAvailableToFDA, !availableToFDA)
                }
              />
            </Form.Group>
          </Col>
          <Col lg={4}></Col>
        </Row>

        <Row
          lg={6}
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px",
            padding: "10px",
            marginInline: "5% 5%",
          }}>
          <Button variant="success" onClick={saveDrug}>
            Save
          </Button>
          <BackButton />
        </Row>
      </Form>
    </Container>
  );
}
