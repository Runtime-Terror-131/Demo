import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContextValues } from "../Context/Context";
import { logout } from "../Config/Firebase-Config";
import logo from "../images/logo.gif";
export default function Header() {
  const { userType, portalNamePath } = useContextValues();
  const logoutUser = () => {
    logout();
    if (window.location) {
      window.location.reload();
    }
  };
  return (
    <Navbar
      expand="lg"
      sticky="top"
      className=" shadow-sm mb-3 header-background "
    >
      <Container>
        <Navbar.Brand href="/" className="header-icon-text-color">
        <img
          src={logo}
          alt="LOGO"
          style={{
            width: "auto",
            height: "10vh",
          }}
          />
        </Navbar.Brand>
        <h1 style={{ color: "white" }}>RunTime Terror</h1>
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
