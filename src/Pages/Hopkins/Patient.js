import React, { useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { patients, patientHeaders } from "../../Components/Data/patients";
import { AgGridReact } from "ag-grid-react";

export default function Patient() {
  return (
    <div>
      <Card>
        <Row>
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
              <Col lg={8}>
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
            </Form>
          </Card.Body>
        </Row>
        <div className="ag-theme-alpine" style={{ height: 400 }}>
          <AgGridReact
            rowData={patients}
            columnDefs={patientHeaders}
          ></AgGridReact>
        </div>
      </Card>
    </div>
  );
}
