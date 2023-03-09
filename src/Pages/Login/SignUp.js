import React, { useState } from "react";
import { register } from "../../Config/Firebase-Config";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useContextValues } from "../../Context/Context";
export default function SignUp({ setLoginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showUserError, setShowUserError] = useState(false);
  const [showPassError, setShowPassError] = useState(false);
  const { setShowSpinner } = useContextValues();
  const userError = "Issue with Email";
  const PassError = "Issue with Password";

  const submitForm = () => {
    setShowSpinner(true);
    if (email && email.length > 0 && password && password.length > 0) {
      register(email, password, setLoginUser, setShowUserError, setShowSpinner);
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
       setShowSpinner(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login-header">Sign Up</div>
      <div>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {showUserError && <span style={{ color: "red" }}>{userError}</span>}
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassError && <span style={{ color: "red" }}>{PassError}</span>}
        </FloatingLabel>
        <Form.Select
          aria-label="Default select example"
          className="signup-dropdown"
        >
          <option>Select Account Type</option>
          <option value="1">Hopkins</option>
          <option value="2">Bavaria</option>
          <option value="3">FDA</option>
        </Form.Select>
        <br />
        <br />

        <div>
          <Button
            variant="outline-primary"
            className="button"
            onClick={submitForm}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}
