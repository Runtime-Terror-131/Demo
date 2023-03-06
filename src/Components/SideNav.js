import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useContextValues } from "../Context/Context";
export default function SideNav() {
  const { portalNamePath, setShowSpinner } = useContextValues();
  // const patientTabClicked = () => {
  //   setShowSpinner(true);
  // };
  return (
    <Nav
      defaultActiveKey="/home"
      className="flex-column mt-2 fw-bold nav-height"
    >
      <Nav.Link
        to={`${portalNamePath}/home`}
        as={NavLink}
        className="header-text-color sidenav-navlink mb-1"
      >
        Home
      </Nav.Link>
      {portalNamePath == "/hopkins" && (
        <>
          <Nav.Link
            to={"/hopkins/patient"}
            as={NavLink}
            className="header-text-color sidenav-navlink mb-1"
            // onClick={patientTabClicked}
          >
            Patient
          </Nav.Link>
          <Nav.Link
            to={"/hopkins/reports"}
            as={NavLink}
            className="header-text-color sidenav-navlink mb-1"
            // onClick={patientTabClicked}
          >
            Reports
          </Nav.Link>
        </>
      )}
      {portalNamePath == "/bavaria" && (
        <>
          <Nav.Link
            to={"/bavaria/drugInfo"}
            as={NavLink}
            className="header-text-color sidenav-navlink mb-1"
            // onClick={patientTabClicked}
          >
            Drug Info
          </Nav.Link>
        </>
      )}
      {portalNamePath == "/fda" && (
        <>
          <Nav.Link
            to={"/fda/studyInfo"}
            as={NavLink}
            className="header-text-color sidenav-navlink mb-1"
            // onClick={patientTabClicked}
          >
            Study Info
          </Nav.Link>
        </>
      )}
    </Nav>
  );
}
