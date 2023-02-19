import React, { useEffect } from "react";
import { Button, Card, Col, Form, Nav, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { patients } from "../../Components/Data/patients";
import { AgGridReact } from "ag-grid-react";
import { Navigate, NavLink } from "react-router-dom";
class detailsButton extends React.Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }
  btnClickedHandler(e) {
    console.log("button click");

    let link = document.getElementById("detailsLink");
    link.state = () => {
      return (state = { myState: "myStateValue" });
    };
    link.click();
    //this.props.clicked(this.props.value);
  }
  render() {
    return <Button onClick={this.btnClickedHandler}>Details</Button>;
  }
}
export default function Patient() {
  const patientHeaders = [
    {
      field: "detials",
      cellRenderer: detailsButton,
    },
    { field: "name" },
    { field: "age" },
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

  return (
    <Row>
      <Col lg={10}>
        <Card>
          {/* <Row> */}
          <Card.Header className="border-bottom-0">Patient Search</Card.Header>
          <Card.Body>
            <Form>
              <Row>
                <Col lg={4}>
                  <Form.Group className="mb-3" controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="email" placeholder="Enter Name" />
                    <Form.Text className="text-muted">
                      Search for Patient Name
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group className="mb-3" controlId="Age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="text" placeholder="Enter Age" />
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
              <div className="float-end">
                <Button variant="primary" type="button">
                  Search
                </Button>
                <Button className="m-2" variant="secondary" type="button">
                  Undo
                </Button>
                <Button variant="primary" type="button">
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
        style={{ height: 400, marginTop: "5px" }}
      >
        <AgGridReact
          rowData={patients}
          columnDefs={patientHeaders}
        ></AgGridReact>
      </div>
      <NavLink
        to={"/hopkins/patient/details"}
        style={{ display: "none" }}
        id="detailsLink"
      >
        test
      </NavLink>
    </Row>
  );
}
