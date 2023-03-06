import React, { useState, useEffect } from "react";
import FormTemplate from "./FormTemplate";
import { useJaneHopkins } from "../../Config/Hopkins-Config";
import { Spinner } from "react-bootstrap";
export default function EditPatient() {
  const { getByID } = useJaneHopkins();
  const [patientData, setPatientData] = useState();
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
    <div>{patientData ? <FormTemplate data={patientData} /> : <Spinner />}</div>
  );
}
