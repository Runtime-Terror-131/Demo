import React from "react";
import { Breadcrumbs } from "../../Components";
import { Outlet } from "react-router-dom";
export default function FDA() {
  return (
    <div>
      <h1>FDA</h1>
      <Breadcrumbs />
      <Outlet />
    </div>
  );
}
