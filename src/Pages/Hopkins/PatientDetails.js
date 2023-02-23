import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { patients } from "../../Components/Data/patients";
export default function PatientDetails() {
  const location = useLocation();
  let errorMessage = "something went wrong, please try again";
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("patientID")) {
    } else {
      setShowError(true);
    }
  }, []);
  return (
    <div>
      <h1>PatientDetails</h1>
      <h2>{localStorage.getItem("patientID")}</h2>
      {showError && <h1>{errorMessage}</h1>}
    </div>
  );
}
