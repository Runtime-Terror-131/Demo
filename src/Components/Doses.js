import React, { useEffect, useState } from "react";
import { Button, Col, Row, ProgressBar, Container } from "react-bootstrap";
import { useJaneHopkins } from "../Config/Hopkins-Config";
import { useContextValues } from "../Context/Context";
export default function Doses({ patientDoses, patient, setRender }) {
  const { applyDose } = useJaneHopkins();
  const { setShowGridSpinner } = useContextValues();
  const [current, setCurrent] = useState(0);
  const [disableButtonOne, setDisableButtonOne] = useState(false);
  const [disableButtonTwo, setDisableButtonTwo] = useState(false);
  const [disableButtonThree, setDisableButtonThree] = useState(false);
  const [disableButtonFour, setDisableButtonFour] = useState(false);
  const [disableButtonFive, setDisableButtonFive] = useState(false);
  let percantageList = [20, 40, 60, 80, 100, 100];
  let labelList = [
    "First Dose",
    "Second Dose",
    "Third Dose",
    "Fourth Dose",
    "Fifth Does",
    "Done",
  ];
  let varientList = [
    "success",
    "warning",
    "info",
    "secondary",
    "danger",
    "primary",
  ];
  const enableDisable = (number) => {
    switch (number) {
      case 0:
        setDisableButtonOne(false);
        setDisableButtonTwo(true);
        setDisableButtonThree(true);
        setDisableButtonFour(true);
        setDisableButtonFive(true);

        break;
      case 1:
        setDisableButtonOne(true);
        setDisableButtonTwo(false);
        setDisableButtonThree(true);
        setDisableButtonFour(true);
        setDisableButtonFive(true);
        break;
      case 2:
        setDisableButtonOne(true);
        setDisableButtonTwo(true);
        setDisableButtonThree(false);
        setDisableButtonFour(true);
        setDisableButtonFive(true);
        break;
      case 3:
        setDisableButtonOne(true);
        setDisableButtonTwo(true);
        setDisableButtonThree(true);
        setDisableButtonFour(false);
        setDisableButtonFive(true);
        break;
      case 4:
        setDisableButtonOne(true);
        setDisableButtonTwo(true);
        setDisableButtonThree(true);
        setDisableButtonFour(true);
        setDisableButtonFive(false);
        break;
      default:
        setDisableButtonOne(true);
        setDisableButtonTwo(true);
        setDisableButtonThree(true);
        setDisableButtonFour(true);
        setDisableButtonFive(true);
        setCurrent(number);
        break;
    }
    let random = Math.random() * 100;
    setRender(random);
  };
  const updateDosage = (buttonNumber) => {
    try {
      setShowGridSpinner(true);
      applyDose(patient, patient.drugID, setShowGridSpinner)
        .then((result) => {
          console.log(result);
        })
        .then((result) => {
          setShowGridSpinner(false);
          setCurrent(buttonNumber);
        });
    } catch (e) {
      setShowGridSpinner(false);
      console.log(e);
    }
  };
  useEffect(() => {
    if (patient && patient.doses != null) {
      console.log("here");
      setCurrent(patient.doses.length);
      //enableDisable(patient.doses.length);
    }
  }, []);
  useEffect(() => {
    enableDisable(current);
  }, [current]);
  return (
    <>
      <Row>
        <ProgressBar
          animated
          striped
          variant={varientList[current]}
          now={percantageList[current]}
          key={1}
          label={labelList[current]}
        ></ProgressBar>
      </Row>

      <Row style={{ marginTop: "10px" }}>
        <Col lg={1}></Col>
        <Col lg={2} md={2} style={{ margin: 5 }}>
          <Button
            onClick={() => {
              updateDosage(1);
            }}
            disabled={disableButtonOne}
          >
            Apply Dose 1
          </Button>
        </Col>
        <Col lg={2} md={2} style={{ margin: 5 }}>
          <Button
            onClick={() => {
              updateDosage(2);
            }}
            disabled={disableButtonTwo}
          >
            Apply Dose 2
          </Button>
        </Col>
        <Col lg={2} md={2} style={{ margin: 5 }}>
          <Button
            onClick={() => {
              updateDosage(3);
            }}
            disabled={disableButtonThree}
          >
            Apply Dose 3
          </Button>
        </Col>
        <Col lg={2} md={2} style={{ margin: 5 }}>
          <Button
            onClick={() => {
              updateDosage(4);
            }}
            disabled={disableButtonFour}
          >
            Apply Dose 4
          </Button>
        </Col>
        <Col lg={2} md={2} style={{ margin: 5 }}>
          <Button
            onClick={() => {
              updateDosage(5);
            }}
            disabled={disableButtonFive}
          >
            Apply Dose 5
          </Button>
        </Col>
        <Col lg={1}></Col>
      </Row>
    </>
  );
}
