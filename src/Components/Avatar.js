import React, { useState, useEffect } from "react";
import { Dropdown, Button } from "react-bootstrap";
import { logout } from "../Config/Firebase-Config";
import { useContextValues } from "../Context/Context";
export default function Avatar() {
  const { loginUserName, loginUserType } = useContextValues();
  const [userName, setUserName] = useState();
  const logoutUser = () => {
    logout();
    if (window.location) {
      window.location.href = "/"; //window.location.reload();
    }
  };
  useEffect(() => {
    if (loginUserType) {
      setUserName(loginUserName);
    }
  }, [loginUserType]);
  return (
    <div className="avatar-container">
      <div className="avatar-image">
        {userName != null && userName.length > 0
          ? `${userName[0].toUpperCase()}${userName[1].toUpperCase()}`
          : "AN"}
      </div>
      <div className="avatar-info">
        <div className="avatar-text">
          {userName != null && userName.length > 0
            ? `Welcome ${userName}`
            : "loading..."}
        </div>
        <Dropdown>
          <Dropdown.Toggle
            style={{ background: "inherit", border: "none", color: "black" }}
          ></Dropdown.Toggle>

          <Dropdown.Menu
            style={{
              background: "var(--header-background-color)",
              color: "white !important",
            }}
          >
            <Dropdown.Item href="#/action-2" style={{ color: "white" }}>
              Profile
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/action-3" style={{ color: "white" }}>
              Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/action-1" style={{ color: "white" }}>
              <Button variant="outline-warning" onClick={logoutUser}>
                Logout
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
