<<<<<<< HEAD
import React, { useState } from "react";
import { register } from "../../Config/Firebase-Config";
import { FloatingLabel, Form, Button } from "react-bootstrap";
export default function SignUp({ setLoginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showUserError, setShowUserError] = useState(false);
  const [showPassError, setShowPassError] = useState(false);

  const userError = " Email Required";
  const PassError = "Password Required";

  const submitForm = () => {
    if (email && email.length > 0 && password && password.length > 0) {
      register(email, password, setLoginUser);
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
            Register
          </Button>
        </div>
      </div>
    </div>
=======
import { useState } from "react";
import { auth } from "../../Config/Firebase-Config";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed up successfully
        const user = userCredential.user;
        console.log("User signed up successfully:", user);
      })
      .catch((error) => {
        // Error occurred during sign up
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during sign up:", errorCode, errorMessage);
      });
  };

  return (
    <form onSubmit={handleSignup}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button type="submit">Sign up</button>
    </form>
>>>>>>> origin/main
  );
}
export default Signup;