import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useContextValues } from "../Context/Context";
export default function SideNav() {
  const { portalNamePath } = useContextValues();
  return (
    <Nav defaultActiveKey="/home" className="flex-column mt-2 fw-bold">
      <Nav.Link
        to={`${portalNamePath}/home`}
        as={NavLink}
        className="header-text-color add-bottom-border"
      >
        Home
      </Nav.Link>
      {portalNamePath == "/hopkins" && (
        <Nav.Link
          to={"/hopkins/patient"}
          as={NavLink}
          className="header-text-color add-bottom-border"
        >
          Patient
        </Nav.Link>
      )}
    </Nav>
  );
}
