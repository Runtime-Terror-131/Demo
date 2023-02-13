import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContextValues } from "../Context/Context";
export default function Header() {
  const { userType } = useContextValues();

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className=" shadow-sm mb-3 header-background "
    >
      <Container>
        <Navbar.Brand href="/" className="header-icon-text-color">
          RunTime Terror
        </Navbar.Brand>
        {/* logo should be here */}
        <h1 style={{ color: "white" }}>LOGO</h1>
        <div>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav defaultActiveKey="/home" className="me-auto">
              <Nav.Link
                to="/hopkins"
                as={NavLink}
                className="header-text-color"
              >
                Jane Hopkins
              </Nav.Link>
              <Nav.Link
                to={"/bavaria"}
                as={NavLink}
                className="header-text-color"
              >
                Bavaria
              </Nav.Link>
              <Nav.Link to={"/fda"} as={NavLink} className="header-text-color">
                FDA
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}
