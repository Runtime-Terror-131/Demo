import React, { useEffect, useState, useMemo, useRef } from "react";
import { Button, Card, Col, Form, Nav, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { patients } from "../../Components/Data/patients";
import { AgGridReact } from "ag-grid-react";
import { NavLink } from "react-router-dom";
import { Location } from "react-router-dom";
import { useContextValues } from "../../Context/Context";
import { useJaneHopkins } from "../../Config/Hopkins-Config";
import { ConfirmationModel } from "../../Components";
const ButtonCell = (props) => {
  const { setPatientDetails } = useContextValues();
  const {} = useJaneHopkins();
  return (
    <NavLink
      to={"/hopkins/patient/details" + "?id=" + props.data._id}
      id={`detailsLink-${props.data.name}`}
      style={{ textDecoration: "none" }}
    >
      {" "}
      Details
    </NavLink>
  );
};

export default function Patient() {
  const [isPageRendered, setIsPageRendered] = useState(false);
  const {
    setPatientDetails,
    setShowSpinner,
    setShowConfirmationWarning,
    ConfirmSendPatientList,
    setConfirmSendPatientList,
  } = useContextValues();
  const [patientList, setPatientList] = useState(null);
  const { getAll, SendPatientListToFDA } = useJaneHopkins();
  const gridRef = useRef();
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
    };
  }, []);

  const undo = () => {
    setShowSpinner(true);
    document.getElementById("Name").value = "";
    document.getElementById("Age").value = "";
    document.getElementById("Insurance Number").value = "";
    document.getElementById("ICD Health Code").value = "";
    document.getElementById("formBasicCheckbox").checked = false;
    document.getElementById("formBasicCheckbox2").checked = false;
    if (getAll) {
      getAll()
        .then((result) => {
          if (result.items.length > 0) {
            return result.items.flat();
          } else {
            console.log(result);
          }
        })
        .then((flattedResult) => {
          setPatientList(flattedResult);
          setShowSpinner(false);
          setIsPageRendered(true);
        });
    }
  };
  const filter = () => {
    if (patientList) {
      let nameValue = document.getElementById("Name").value;
      let ageValue = document.getElementById("Age").value;
      let insuranceValue = document.getElementById("Insurance Number").value;
      let ICDValue = document.getElementById("ICD Health Code").value;
      let excludePregnencyValue =
        document.getElementById("formBasicCheckbox").checked;
      let excludeBirthDayValue =
        document.getElementById("formBasicCheckbox2").checked;
      let values = patientList;
      let checkName = nameValue.length > 0 ? true : false;
      let checkAge = ageValue.length > 0 ? true : false;
      let checkInsurance = insuranceValue.length > 0 ? true : false;
      let checkICD = ICDValue.length > 0 ? true : false;

      if (checkName) {
        values = values.filter((item, index) => {
          return item.name.toLowerCase().includes(nameValue.toLowerCase());
        });
      }
      if (checkAge) {
        values = values.filter((item, index) => {
          return item.Age * 1 === ageValue * 1;
        });
      }
      if (checkInsurance) {
        values = values.filter((item, index) => {
          return item.insuranceNumber.includes(insuranceValue.toUpperCase());
        });
      }
      if (checkICD) {
        values = values.filter((item, index) => {
          return item.icdHealthCodes.includes(ICDValue);
        });
      }
      if (excludePregnencyValue) {
        // will implement this part once we implement ICD code types
      }
      if (excludeBirthDayValue) {
        values = values.filter((item, index) => {
          return new Date(item.dob) < new Date("1/1/2005");
        });
      }
      setPatientList(values);
    }
  };
  const downloadResult = () => {
    gridRef.current.api.exportDataAsCsv();
  };
  const goToCreatePatient = () => {};
  const patientHeaders = [
    {
      field: "detials",
      cellRenderer: ButtonCell,
    },
    { field: "name" },
    { field: "Age" },
    { field: "dob" },
    { field: "insuranceNumber" },
    {
      field: "allergies",
      valueGetter: (params) => {
        return JSON.stringify(params.data.allergies);
      },
    },
    {
      field: "currentMedications",
      valueGetter: (params) => {
        return JSON.stringify(params.data.currentMedications);
      },
    },
    { field: "isEligible" },
  ];
  useEffect(() => {
    setShowSpinner(true);
    if (getAll) {
      getAll()
        .then((result) => {
          if (result.items.length > 0) {
            return result.items.flat();
          } else {
            console.log(result);
          }
        })
        .then((flattedResult) => {
          setPatientList(flattedResult);
          setShowSpinner(false);
          setIsPageRendered(true);
        });
    }
  }, []);
  useEffect(() => {
    if (ConfirmSendPatientList) {
      setShowSpinner(true);
      try {
        let eligiblePatientList = patientList.filter(
          (item) => item.isEligible == null
        );
        SendPatientListToFDA(
          eligiblePatientList,
          setConfirmSendPatientList,
          setShowSpinner
        );
      } catch (e) {
        console.log(e);
        setShowSpinner(false);
      }
    }
  }, [ConfirmSendPatientList]);
  return (
    <Row>
      <ConfirmationModel />
      <Col lg={10}>
        <Card className="box-shadow">
          {/* <Row> */}
          <Card.Header className="border-bottom-0">Patient Search</Card.Header>
          <Card.Body>
            <Form>
              <Row>
                <Col lg={3}>
                  <Form.Group className="mb-3" controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                </Col>
                <Col lg={3}>
                  <Form.Group className="mb-3" controlId="Age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                </Col>
                <Col lg={3}>
                  <Form.Group className="mb-3" controlId="Insurance Number">
                    <Form.Label>Insurance Number</Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                </Col>
                <Col lg={3}>
                  <Form.Group className="mb-3" controlId="ICD Health Code">
                    <Form.Label>ICD Health Code</Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Exclude ICD-10 Pregnancy codes"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox2">
                    <Form.Check
                      type="checkbox"
                      label="Exclude DOB greater than 1/1/2005"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
          <Card.Footer>
            <Col>
              <div className="float-start">
                <Button
                  variant="warning"
                  type="button"
                  className="m-2"
                  onClick={goToCreatePatient}
                >
                  <NavLink
                    to={"/hopkins/createpatient"}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    Create New Patient
                  </NavLink>
                </Button>
                <Button
                  variant="success"
                  onClick={() => {
                    setShowConfirmationWarning(true);
                  }}
                >
                  Send Valid Patient list to FDA for Approvel
                </Button>
              </div>
              <div className="float-end">
                <Button variant="primary" type="button" onClick={filter}>
                  Search
                </Button>
                <Button
                  className="m-2"
                  variant="secondary"
                  type="button"
                  onClick={undo}
                >
                  Undo
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  onClick={downloadResult}
                >
                  Download Result
                </Button>
              </div>
            </Col>
          </Card.Footer>
          {/* </Row> */}
        </Card>
      </Col>

      <div
        className="ag-theme-alpine"
        style={{ marginTop: "5px", marginBottom: "5px" }}
      >
        <AgGridReact
          className="box-shadow"
          ref={gridRef}
          rowData={patientList ? patientList : ""}
          columnDefs={patientHeaders}
          defaultColDef={defaultColDef}
          pagination={true} //paginates the rows
          paginationPageSize={10} //setting each page to contain 10 rows
          domLayout="autoHeight"
        ></AgGridReact>
      </div>
      <NavLink
        to={"/hopkins/patient/details"}
        style={{ display: "none" }}
        id="detailsLink"
        // onClick={test}
      >
        hidden
      </NavLink>
    </Row>
  );
}
