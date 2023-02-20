import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
export default function SideNav() {
  return (
    <Nav variant="tabs" defaultActiveKey="/home" className="flex-column , nav-height">
      <Nav.Link to={"/"} as={NavLink} className="header-text-color">
        Home
      </Nav.Link>
      <Nav.Link
        to={"/hopkins/patient"}
        as={NavLink}
        className="header-text-color"
      >
        Patient
      </Nav.Link>
    </Nav>
  );
}
