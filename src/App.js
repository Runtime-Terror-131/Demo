import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Components/Style/GlobalStyle.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Row, Col, Container } from "react-bootstrap";
import { Header, SideNav, Footer } from "./Components";
import { Routes, Route } from "react-router-dom";
import { useContextValues } from "./Context/Context";
import {
  Bavaria,
  Home,
  FDA,
  NoMatch,
  Hopkins,
  Patient,
  Login,
  HopkinsHome,
  BavariaHome,
  FDAHome,
  PatientDetails,
} from "./Pages";
import { checkIfUserStillLoggedIn } from "./Config/Firebase-Config";
function App() {
  const [user, setUser] = useState(null);
  const { userType } = useContextValues();

  useEffect(() => {
    checkIfUserStillLoggedIn(user, setUser);
  }, []);
  return (
    <div>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <Header />
          <Container fluid className="container-height">
            <Row>
              <Col lg={2} className="sidenav-style" >
                <SideNav />
              </Col>
              <Col lg={10}>
                <Row>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="Hopkins" element={<Hopkins />}>
                      <Route path="home" element={<HopkinsHome />} />
                      <Route path="patient" element={<Patient />}></Route>
                    </Route>
                    <Route
                      path="hopkins/patient/details"
                      element={<PatientDetails />}
                    />
                    <Route path="bavaria" element={<Bavaria />}>
                      <Route path="home" element={<BavariaHome />} />
                    </Route>
                    <Route path="fda" element={<FDA />}>
                      <Route path="Home" element={<FDAHome />} />
                    </Route>
                    <Route path="*" element={<NoMatch />} />
                  </Routes>
                </Row>
              </Col>
            </Row>
          </Container>
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
