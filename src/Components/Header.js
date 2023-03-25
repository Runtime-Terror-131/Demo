import { UserComponentFactory } from "ag-grid-community";
import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useContextValues } from "../Context/Context";
import logo from "../images/logo.gif";
import Avatar from "./Avatar";
export default function Header() {
  const { loginUserType } = useContextValues();
  useEffect(() => {
    console.log(loginUserType);
  }, [loginUserType]);

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
