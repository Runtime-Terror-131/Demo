import React, { useState } from "react";
import { register } from "../../Config/Firebase-Config";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useContextValues } from "../../Context/Context";
import { useJaneHopkins } from "../../Config/Hopkins-Config";
export default function SignUp({ loginUser, setLoginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [showUserError, setShowUserError] = useState(false);
  const [showPassError, setShowPassError] = useState(false);
  const { setShowSpinner } = useContextValues();
  const { setUserType } = useJaneHopkins();
  const userError = "Issue with Email";
  const PassError = "Issue with Password";

  const submitForm = async () => {
    setShowSpinner(true);
    if (email && email.length > 0 && password && password.length > 0) {
      // register(
      //   email,
      //   password,
      //   setLoginUser,
      //   setShowUserError,
      //   setShowSpinner
      // ).then((user) => {
      //   console.log("user registered succesfully and the user is  ");
      //   console.log(user);
      //   setUserType(user.uid, type, name)
      //     .then((result) => {
      //       if (result == true) {
      //         console.log("user added");
      //         return user;
      //       } else {
      //         console.log(result);
      //       }
      //     })
      //     .then((user) => {
      //       setLoginUser(user);
      //       setShowSpinner(false);
      //     });
      // });
      let user = await register(
        email,
        password,
        setLoginUser,
        setShowUserError,
        setShowSpinner
      );
      if (user) {
        let result = await setUserType(user.uid, type, name);
        if (result === true) {
          console.log("working correctly");
          setLoginUser(user);
          // setShowSpinner(false);
        }
      }
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
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassError && <span style={{ color: "red" }}>{PassError}</span>}
        </FloatingLabel>
        <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
          <Form.Control type="Text" onChange={(e) => setName(e.target.value)} />
        </FloatingLabel>
        <Form.Select
          aria-label="Default select example"
          className="signup-dropdown"
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option>Select Account Type</option>
          <option value="1">Hopkins Admin</option>
          <option value="2">Bavaria Doctor</option>
          <option value="3">Bavaria</option>
          <option value="4">FDA</option>
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
