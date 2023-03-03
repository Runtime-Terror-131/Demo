import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { logout } from "../../Config/Firebase-Config";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import logo from "../../images/logo.gif";
export default function Login({ setUser }) {
  const [toggleLogin, setToggleLogin] = useState(true);
  const SignInButtonClick = () => {
    setToggleLogin(true);
  };
  const SignUpButtonClick = () => {
    setToggleLogin(false);
  };

  return (
    <div className="row login-bg-color">
      <div
        className="col-md-6"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          flexDirection: "column",
          height: "100vh",
          width: "50%",
        }}
      >
        <div
          style={{
            color: "white",
          }}
        >
          <h1>RunTime Terror</h1>
          <div style={{textAlign:"center"}}>
          <h4>Good to See you!</h4>
          </div>
          
        </div>
        <Card className="text-center login-view shadow-sm " style={{ width: "45vw", borderColor: "#2B223D", marginLeft: "5vw"}}>
          <Card.Body
            style={{
              background: "#2B223D",
              //marginLeft: "auto !important",
              //marginRight: "auto !important",
              
            }}
          >
            {toggleLogin ? (
              <SignIn setLoginUser={setUser} />
            ) : (
              <SignUp setLoginUser={setUser} />
            )}
          </Card.Body>
          <Card.Footer style={{background: "#2B223D"}}>
            <Button variant="outline-primary" onClick={SignInButtonClick}>
              SignIn
            </Button>
            <Button variant="outline-primary" onClick={SignUpButtonClick}>
              SignUp
            </Button>
          </Card.Footer>
        </Card>
      </div>
      <div className="col-md-6">
        <img
          src={logo}
          alt="LOGO"
          style={{
            width: "40vw",
            height: "auto",
            marginTop: "14vh",
            marginRight: "auto",
            marginLeft: "5vw",
          }}
        />
      </div>
    </div>
  );
}
