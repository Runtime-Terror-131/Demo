import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { updateColor, Breadcrumbs  } from "../../Components";
import { useContextValues } from "../../Context/Context";
export default function Hopkins() {
  const { setPortalNamePath } = useContextValues();
  useEffect(() => {
    updateColor(1);
    setPortalNamePath("/hopkins");
  }, []);
  return (
    <div>
      <h1>Hopkins</h1>
      <Breadcrumbs />
      <Outlet />
    </div>
  );
}
