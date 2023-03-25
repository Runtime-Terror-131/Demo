import React, { useEffect } from "react";
import { updateColor, Breadcrumbs } from "../../Components";
import { Card } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useContextValues } from "../../Context/Context";
export default function FDA() {
  const { setPortalNamePath } = useContextValues();
  useEffect(() => {
    updateColor(4);
    setPortalNamePath("/fda");
  }, []);
  return (
    <div>
      <h1>FDA</h1>
      <Breadcrumbs />
      <Outlet />
    </div>
  );
}
