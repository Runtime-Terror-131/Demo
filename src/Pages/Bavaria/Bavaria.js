import React, { useEffect } from "react";
import { updateColor } from "../../Components";
import { Card } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useContextValues } from "../../Context/Context";
export default function Bavaria() {
  const { setPortalNamePath } = useContextValues();
  useEffect(() => {
    updateColor(2);
    setPortalNamePath("/bavaria");
  }, []);
  return (
    <div>
      <h1>Bavaria</h1>
      <Outlet />
    </div>
  );
}
