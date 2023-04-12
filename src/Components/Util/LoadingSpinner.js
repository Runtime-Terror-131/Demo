import React, { useState } from "react";
import { useContextValues } from "../../Context/Context";
import spinner from "../../images/spinner.gif";

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
      }}>
      <img src={spinner} alt="Spinner" />
    </div>
  );
}
