import React from "react";
import { Breadcrumbs } from "../../Components";
import { Outlet } from "react-router-dom";
export default function Bavaria() {
  return (
    <div>
      <h1>Bavaria</h1>
      <Breadcrumbs />
      <Outlet />
    </div>
  );
}
