import React, { useState } from "react";
import { Form, Button, FloatingLabel, Col } from "react-bootstrap";
import {
  auth,
  register,
  loginUser,
  logout,
} from "../../Config/Firebase-Config";
import { useContextValues } from "../../Context/Context";
export default function SignIn({ setLoginUser }) {
  const { loginErrorMessage, setLoginErrorMessage } = useContextValues();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showUserError, setShowUserError] = useState(false);
  const [showPassError, setShowPassError] = useState(false);

  const userError = " Email Required";
  const PassError = "Password Required";

  const submitForm = () => {
    if (email && email.length > 0 && password && password.length > 0) {
      loginUser(email, password, setLoginUser, setLoginErrorMessage);
    } else {
      if ((email && email.length <= 0) || !email) {
        setShowUserError(true);
      } else {
        setShowUserError(false);
      }
      if ((password && password.length <= 0) || !password) {
        setShowPassError(true);
      } else {
        setShowPassError(false);
      }
    }
  };
  return (
    <div>
      <div className="login-header">Sign in</div>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
        {showUserError && <span style={{ color: "red" }}>{userError}</span>}
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {showPassError && <span style={{ color: "red" }}>{PassError}</span>}
      </FloatingLabel>
      <br />
      <br />
      {loginErrorMessage && (
        <span style={{ color: "red" }}>{loginErrorMessage}</span>
      )}
      <div>
        <Button
          variant="outline-primary"
          className="button"
          onClick={submitForm}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
