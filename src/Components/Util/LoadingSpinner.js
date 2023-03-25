import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useContextValues } from "../../Context/Context";

export default function LoadingSpinner() {
  const { hideBackground } = useContextValues();
  return (
    <div
      style={{
        position: "fixed",
        zIndex: "1000000000",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: hideBackground ? " rgba(0,0,0,1)" : "rgba(0,0,0,0.5)",
      }}
    >
      <Spinner animation="border" variant="primary" />
      <Spinner animation="border" variant="secondary" />
      <Spinner animation="border" variant="success" />
      <Spinner animation="border" variant="danger" />
      <Spinner animation="border" variant="warning" />
    </div>
  );
}
