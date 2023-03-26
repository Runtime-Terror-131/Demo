import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import logo from "../images/logo.gif";
import Avatar from "./Avatar";
export default function Header() {
  return (
    <Navbar expand="lg" sticky="top" className="box-shadow header-background ">
      <Container>
        <Navbar.Brand className="header-icon-text-color ">
          <img
            src={logo}
            alt="LOGO"
            style={{
              width: "auto",
              height: "50px",
              float: "left",
            }}
          />
          <h1 style={{ color: "white" }}>RunTime Terror</h1>
        </Navbar.Brand>
        <div>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto">
              <Avatar />
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}
