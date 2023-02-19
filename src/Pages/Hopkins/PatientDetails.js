import React from "react";
import { useLocation } from "react-router-dom";
export default function PatientDetails() {
  const location = useLocation();
  return <div>PatientDetails {console.log(location)}</div>;
}
