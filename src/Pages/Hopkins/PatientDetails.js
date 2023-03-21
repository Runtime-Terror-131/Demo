import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { useContextValues } from "../../Context/Context";
import { Breadcrumbs, BackButton } from "../../Components";
import FormTemplate from "./FormTemplate";
import { useJaneHopkins } from "../../Config/Hopkins-Config";
import { DeleteModel } from "../../Components";
export default function PatientDetails() {
  const navigate = useNavigate();
  const excludeFields = ["_id", "_owner", "uuid"];
  const {
    patientDetails,
    setShowSpinner,
    setShowDeleteWarning,
    confirmDeletePatient,
    setConfirmDeletePatient,
  } = useContextValues();
  const { getByID, deletePatient } = useJaneHopkins();
  const [patientData, setPatientData] = useState();
  const deletePatientValue = () => {
    setShowDeleteWarning(true);
  };
  useEffect(() => {
    if (confirmDeletePatient) {
      console.log("delete now");
      setShowSpinner(true);
      deletePatient(patientData._id).then((result) => {
        setConfirmDeletePatient(false);
        setTimeout(() => {
          setShowSpinner(false);
          navigate("/hopkins/patient");
        }, 5000);
      });
    }
  }, [confirmDeletePatient]);
  useEffect(() => {
    window.scrollTo(0, 0);
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let opportunity_id = urlParams.get("id");
    getByID(opportunity_id).then((result) => {
      setPatientData(result);
    });
  }, []);

  return (
    <>
      <DeleteModel />
      <Card>
        <Breadcrumbs />
        <Card.Header>PatientDetails</Card.Header>
        <Card.Body>
          <Row>
            {patientData ? (
              Object.entries(patientData)
                .filter(([key, value]) => !excludeFields.includes(key))
                .map((item, i) => (
                  <Col lg={4} key={i}>
                    <div>
                      <span style={{ color: "grey" }} key={item[0].toString()}>
                        {item[0]}:
                      </span>
                      {Array.isArray(item[1]) ? (
                        <ul>
                          {item[1].map((arrayItem, j) => (
                            <li key={`${i}-${j}`}>
                              {JSON.stringify(arrayItem)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <h4 key={JSON.stringify(item[1])}>
                          {JSON.stringify(item[1])}
                        </h4>
                      )}
                    </div>
                  </Col>
                ))
            ) : (
              <Spinner />
            )}
          </Row>
        </Card.Body>
        <Card.Footer>
          <div className="float-end">
            <Button>
              <NavLink
                to={`/hopkins/EditPatient?id=${
                  patientData ? patientData._id : -1
                }`}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Edit
              </NavLink>
            </Button>

            <Button
              variant="danger"
              style={{ margin: "5px" }}
              onClick={deletePatientValue}
            >
              Delete
            </Button>
            <BackButton />
          </div>
        </Card.Footer>
      </Card>
    </>
  );
}
