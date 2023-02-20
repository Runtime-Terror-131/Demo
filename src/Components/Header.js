import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContextValues } from "../Context/Context";
import { logout } from "../Config/Firebase-Config";
export default function Header() {
  const { userType, portalNamePath } = useContextValues();
  const logoutUser = () => {
    logout();
    location.reload();
  };
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
                to="/hopkins/home"
                as={NavLink}
                className="header-text-color"
              >
                Jane Hopkins
              </Nav.Link>
              <Nav.Link
                to={"/bavaria/home"}
                as={NavLink}
                className="header-text-color"
              >
                Bavaria
              </Nav.Link>
              <Nav.Link
                to={"/fda/home"}
                as={NavLink}
                className="header-text-color"
              >
                FDA
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
      <Button variant="outline-warning" onClick={logoutUser}>
        Logout
      </Button>
    </Navbar>
  );
}
