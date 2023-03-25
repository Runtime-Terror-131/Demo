import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { logout } from "../Config/Firebase-Config";
import logo from "../images/logo.gif";
import Avatar from "./Avatar";
export default function Header() {
  // const { userType, portalNamePath } = useContextValues();
  // const logoutUser = () => {
  //   logout();
  //   if (window.location) {
  //     window.location.href = "/"; //window.location.reload();
  //   }
  // };
  return (
    <Navbar expand="lg" sticky="top" className="box-shadow header-background ">
      <Container>
        <Navbar.Brand href="/" className="header-icon-text-color ">
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
            <Nav defaultActiveKey="/home" className="me-auto">
              <Avatar />
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}
