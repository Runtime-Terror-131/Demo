import React, { useState, useEffect, useLayoutEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Components/Style/GlobalStyle.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Row, Col, Container } from "react-bootstrap";
import {
  Header,
  SideNav,
  Footer,
  LoadingSpinner,
  updateColor,
} from "./Components";
import { useContextValues } from "./Context/Context";
import { Login } from "./Pages";
import AllRoutes from "./Routes/AllRoutes";
import { checkIfUserStillLoggedIn } from "./Config/Firebase-Config";
import { useJaneHopkins } from "./Config/Hopkins-Config";
function App() {
  const { getUserData } = useJaneHopkins();

  const [user, setUser] = useState(null);
  const {
    userType,
    setUserType,
    showSpinner,
    setShowSpinner,
    setLoginUserType,
    setLoginUserName,
    loginUserType,
    setHideBackground,
  } = useContextValues();

  useLayoutEffect(() => {
    return () => {
      if (!localStorage.getItem("userData")) {
        checkIfUserStillLoggedIn(user, setUser);
      } else {
        setUser(localStorage.getItem("userData"));
      }
      //Do some cleanup here
    };
  }, []);
  useEffect(() => {
    if (user) {
      try {
        getUserData(
          JSON.parse(localStorage.getItem("userData")).uid,
          setLoginUserType,
          setLoginUserName,
          setShowSpinner
        );
      } catch (e) {
        console.log(e);
      }
    }
  }, [user]);
  useEffect(() => {
    if (loginUserType) {
      updateColor(loginUserType);
      setShowSpinner(false);
      setHideBackground(false);
    }
  }, [loginUserType]);
  return (
    <div>
      {showSpinner && <LoadingSpinner />}
      {!user ? (
        <Login user={user} setUser={setUser} />
      ) : (
        <>
          <Header />
          <Container fluid className="container-height">
            <Row>
              <Col lg={2} className="sidenav-style">
                <SideNav />
              </Col>
              <Col lg={10}>
                <Row>
                  <AllRoutes />
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
