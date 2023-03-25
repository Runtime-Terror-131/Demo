import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { logout } from "../../Config/Firebase-Config";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import logo from "../../images/logo.gif";
export default function Login({ user, setUser }) {
  const [toggleLogin, setToggleLogin] = useState(true);
  const SignInButtonClick = () => {
    setToggleLogin(true);
  };
  const SignUpButtonClick = () => {
    setToggleLogin(false);
  };

  return (
    <div className="row login-bg-color">
      <div className="col-md-6 login-panel ">
        <div
          style={{
            color: "white",
          }}
        >
          <h1>RunTime Terror</h1>
          <div style={{ textAlign: "center" }}>
            <h4>Good to See you!</h4>
          </div>
        </div>
        <Card className="text-center login-card shadow-sm ">
          <Card.Body
            style={{
              background: "#2B223D",
            }}
          >
            {toggleLogin ? (
              <SignIn setLoginUser={setUser} />
            ) : (
              <SignUp LoginUser={user} setLoginUser={setUser} />
            )}
          </Card.Body>
          <Card.Footer style={{ background: "#2B223D" }}>
            {toggleLogin ? (
              <div>
                <span style={{ color: "white" }}>
                  Dont have an account? Click{" "}
                </span>
                <a
                  className="active login-switch-link"
                  onClick={SignUpButtonClick}
                >
                  Here
                </a>
              </div>
            ) : (
              <div>
                <span style={{ color: "white" }}>
                  Already have an account? Click{" "}
                </span>

                <a
                  className="active login-switch-link"
                  onClick={SignInButtonClick}
                >
                  Here
                </a>
              </div>
            )}
          </Card.Footer>
        </Card>
      </div>
      <div className="col-md-6" id="login-logo">
        <img src={logo} alt="LOGO" className="login-logo-img" />
      </div>
    </div>
  );
}

/*Button one if we need
<Card.Footer style={{ background: "#2B223D" }}>
            <Button variant="outline-light" onClick={SignInButtonClick}>
              SignIn
            </Button>
            <Button variant="outline-light" onClick={SignUpButtonClick}>
              SignUp
            </Button>
          </Card.Footer> */
