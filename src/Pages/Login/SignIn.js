import React, { useState } from "react";
import {
  auth,
  register,
  loginUser,
  logout,
} from "../../Config/Firebase-Config";
export default function SignIn({ setLoginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showUserError, setShowUserError] = useState(false);
  const [showPassError, setShowPassError] = useState(false);
  const userError = " Email Required";
  const PassError = "Password Required";

  const submitForm = () => {
    if (email && email.length > 0 && password && password.length > 0) {
      loginUser(email, password, setLoginUser);
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
      <div>Sign In section</div>
      <div>
        <div>
          <input
            value={email}
            placeholder=" Email"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          {showUserError && <span style={{ color: "red" }}>{userError}</span>}
        </div>
        <div>
          <input
            value={password}
            placeholder="password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          {showPassError && <span style={{ color: "red" }}>{PassError}</span>}
        </div>
        <div>
          <button className="button" onClick={submitForm}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
