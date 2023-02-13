import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Components/Style/GlobalStyle.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Row, Col, Container } from "react-bootstrap";
import { Header, SideNav } from "./Components";
import { Routes, Route } from "react-router-dom";
import { useContextValues } from "./Context/Context";
import { Bavaria, Home, FDA, NoMatch, Hopkins, Patient, Login } from "./Pages";

function App() {
  const [user, setUser] = useState(null);
  const { userType } = useContextValues();

  return (
    <div>
       
        <>
          <Header />
          <Container fluid>
            <Row>
              <Col lg={2} className="sidenav-style">
                <SideNav />
              </Col>
              <Col lg={10}>
                <Row>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="Hopkins" element={<Hopkins />}>
                      <Route path="patient" element={<Patient />} />
                    </Route>
                    <Route
                      path="bavaria"
                      element={<Bavaria userType={userType} />}
                    />
                    <Route path="fda" element={<FDA />} />
                    <Route path="*" element={<NoMatch />} />
                  </Routes>
                </Row>
              </Col>
            </Row>
          </Container>
        </>
      
    </div>
  );
}

export default App;