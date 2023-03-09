import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { BackButton } from "../../Components";
import { useJaneHopkins } from "../../Config/Hopkins-Config";
import { useContextValues } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import DeleteModel from "../../Components";
export default function FormTemplate({ data }) {
  const { createNewPatient, updatePatientData } = useJaneHopkins();
  const { setShowSpinner, setShowDeleteWarning } = useContextValues();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState();
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [dob, setDob] = useState();
  const [address, setAddress] = useState();
  const [insuranceNumber, setInsuranceNumber] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [bloodPressure, setBloodPressure] = useState();
  const [temperature, setTemperature] = useState();
  const [oxygen, setOxygen] = useState();
  // const [familyHistory, setFamilyHistory] = useState("");
  const [employed, setEmployed] = useState(false);
  const [insured, setInsured] = useState(false);
  const handleChange = (setvalue, value) => {
    setvalue(value);
  };
  // THIS PART WILL BE OPTIMIZED
  useEffect(() => {
    if (!data) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
      setName(data.name);
      let date = new Date(data.dob);
      let month = date.getMonth();
      let day = date.getDay();
      date =
        date.getFullYear() +
        "-" +
        (month < 10 ? "0" + month : month) +
        "-" +
        (day < 10 ? "0" + day : day);
      setDob(date);
      setAddress(data.address);
      setInsuranceNumber(data.insuranceNumber);
      setHeight(data.height);
      setWeight(data.weight);
      setBloodPressure(data.bloodPressure);
      setTemperature(data.temperature);
      setOxygen(data.oxygenSaturation);
      // setFamilyHistory(data.familyHistory);
      setEmployed(data.currentlyEmployed === "Yes" ? true : false);
      setInsured(data.currentlyInsured === "Yes" ? true : false);
      //setAge()
    }
  }, []);
  const savePatient = () => {
    const patient = {};

    patient.name = name;
    patient.address = address;
    patient.insuranceNumber = insuranceNumber;
    patient.height = height;
    patient.weight = weight;
    patient.bloodPressure = bloodPressure;
    patient.temperature = temperature;
    patient.oxygenSaturation = oxygen;
    patient.dob = dob;
    patient.currentlyEmployed = employed ? "Yes" : "No";
    patient.currentlyInsured = insured ? "Yes" : "No";
    setShowSpinner(true);
    if (data && data._id != null) {
      // meaning it's an edit page
      patient._id = data._id;
      updatePatientData(patient).then((result) => {
        setShowSpinner(false);
        if (result == true) {
          navigate("/hopkins/patient");
        }
      });
    } else {
      createNewPatient(patient).then((result) => {
        setShowSpinner(false);
        if (result == true) {
          navigate("/hopkins/patient");
        }
      });
    }
  };
  return (
    <Container style={{ textAlign: "center", margin: "3px" }}>
      {data ? <h2>Edit Patient</h2> : <h2>Add a New Patient</h2>}
      {/* {!isEdit ? (
        <Container>
          <h1>this is the create view</h1>
        </Container>
      ) : (
        <h1>this is the edit view</h1>
      )} */}
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => {
                  handleChange(setName, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="m-3">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="date"
                value={dob}
                onChange={(e) => {
                  handleChange(setDob, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="m-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => {
                  handleChange(setAddress, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={4}>
            <Form.Group className="m-3">
              <Form.Label>InsuranceNumber</Form.Label>
              <Form.Control
                type="text"
                value={insuranceNumber}
                onChange={(e) => {
                  handleChange(setInsuranceNumber, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="m-3">
              <Form.Label>Height</Form.Label>
              <Form.Control
                type="text"
                value={height}
                onChange={(e) => {
                  handleChange(setHeight, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="m-3">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="text"
                value={weight}
                onChange={(e) => {
                  handleChange(setWeight, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={4}>
            <Form.Group className="m-3">
              <Form.Label>Blood Pressure</Form.Label>
              <Form.Control
                type="text"
                value={bloodPressure}
                onChange={(e) => {
                  handleChange(setBloodPressure, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="m-3">
              <Form.Label>Temperature</Form.Label>
              <Form.Control
                type="text"
                value={temperature}
                onChange={(e) => {
                  handleChange(setTemperature, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="m-3">
              <Form.Label>Oxygen Saturation</Form.Label>
              <Form.Control
                type="text"
                value={oxygen}
                onChange={(e) => {
                  handleChange(setOxygen, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={4}>
            <Form.Group className="m-3">
              <Form.Check
                type="switch"
                id="custom-switch1"
                label="Currently Employed"
                checked={employed}
                onChange={(e) => handleChange(setEmployed, !employed)}
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="m-3">
              <Form.Check
                type="switch"
                id="custom-switch2"
                label="Currently Insured"
                checked={insured}
                onChange={(e) => handleChange(setInsured, !insured)}
              />
            </Form.Group>
          </Col>
          <Col lg={4}></Col>
        </Row>

        <Row>
          <Col lg={4}></Col>
          <Col lg={4}></Col>
          <Col lg={4}></Col>
        </Row>

        <Row>
          <Col lg={4}></Col>
          <Col lg={4}></Col>
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
          }}
        >
          <Button variant="success" onClick={savePatient}>
            Save
          </Button>
          <BackButton />
        </Row>
      </Form>
    </Container>
  );
}
