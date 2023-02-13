import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { updateColor } from "../Components";
export default function Hopkins() {
  useEffect(() => {
    updateColor(1);
  }, []);
  return (
    <div>
      <h1>Hopkins</h1>
      <Outlet />
    </div>
  );
}
