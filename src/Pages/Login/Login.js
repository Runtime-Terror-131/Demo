import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
export default function Login({ setUser }) {
  const [toggleLogin, setToggleLogin] = useState(true);
  const SignInButtonClick = () => {
    setToggleLogin(true);
  };
  const SignUpButtonClick = () => {
    setToggleLogin(false);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Card className="text-center" style={{ width: "40vw" }}>
        <Card.Header style={{ background: "#343a40", color: "white" }}>
          <h1>RunTime Terror</h1>
        </Card.Header>
        <Card.Body
          style={{
            marginleft: "auto !important",
            marignright: "auto !important",
          }}
        >
          {toggleLogin ? (
            <SignIn setLoginUser={setUser} />
          ) : (
            <SignUp setUser={setUser} />
          )}
        </Card.Body>
        <Card.Footer>
          <Button variant="outline-dark" onClick={SignInButtonClick}>
            SignIn
          </Button>
          <Button variant="outline-dark" onClick={SignUpButtonClick}>
            SignUp
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
