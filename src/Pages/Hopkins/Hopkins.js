import React from "react";
import { Outlet } from "react-router-dom";
import { Breadcrumbs } from "../../Components";
export default function Hopkins() {
  return (
    <div>
      <h1>Hopkins</h1>
      <Breadcrumbs />
      <Outlet />
    </div>
  );
}
