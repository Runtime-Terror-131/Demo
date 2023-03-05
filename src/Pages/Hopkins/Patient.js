import React, { useEffect, useState, useMemo, useRef } from "react";
import { Button, Card, Col, Form, Nav, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { patients } from "../../Components/Data/patients";
import { AgGridReact } from "ag-grid-react";
import { NavLink } from "react-router-dom";
import { Location } from "react-router-dom";
import { useContextValues } from "../../Context/Context";
import { useJaneHopkins } from "../../Config/Hopkins-Config";
const ButtonCell = (props) => {
  const { setPatientDetails } = useContextValues();
  const buttonClicked = () => {
    let link = document.getElementById(`detailsLink-${props.data.name}`);
    //localStorage.setItem("patientID", this.props.data.patient_ID);
    setPatientDetails(props.data);
    link.click();
    //this.props.clicked(this.props.value);
  };
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
  const { setPatientDetails } = useContextValues();
  const [patientList, setPatientList] = useState(null);
  const gridRef = useRef();
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
    };
  }, []);
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
    { field: "age" },
    { field: "dob" },
    { field: "address" },
    { field: "insurance_number" },
    { field: "height" },
    { field: "weight" },
    { field: "blood_pressure" },
    { field: "blood_type" },
    { field: "temperature" },
    { field: "oxygen_saturation" },
    { field: "patient_ID" },
    { field: "allergies" },
    { field: "current_medications" },
    { field: "family_history" },
    { field: "currently_employed" },
    { field: "currently_insured" },
    { field: "ICD_Health_Code" },
  ];
  const { getAll } = useJaneHopkins();
  useEffect(() => {
    if (getAll) {
      getAll()
        .then((result) => {
          return result.items.flat();
        })
        .then((flattedResult) => {
          setPatientList(flattedResult);
        });
    }
  }, []);
  return (
    <Row>
      <Col lg={10}>
        <Card>
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
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Exclude ICD-10 Pregnancy codes"
                />
                <Form.Check
                  type="checkbox"
                  label="Exclude DOB greater than 1/1/2005"
                />
              </Form.Group>
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
              </div>
              <div className="float-end">
                <Button variant="primary" type="button">
                  Search
                </Button>
                <Button className="m-2" variant="secondary" type="button">
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
        style={{ height: 500, marginTop: "5px" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={patientList ? patientList : patients}
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
