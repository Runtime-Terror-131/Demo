import React, { useEffect } from "react";
import { updateColor, Breadcrumbs } from "../../Components";
import { Card } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useContextValues } from "../../Context/Context";
export default function Bavaria() {
  const { setPortalNamePath } = useContextValues();
  useEffect(() => {
    updateColor(3);
    setPortalNamePath("/bavaria");
  }, []);
  return (
    <div>
      <h1>Bavaria</h1>
      <Breadcrumbs />
      <Outlet />
    </div>
  );
}
