import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useContextValues } from "../Context/Context";

function Profile() {
  const { loginUserName, loginUserType } = useContextValues();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (loginUserType) {
      setUserName(loginUserName);
    }
  }, [loginUserType]);

  return (
    <Container className="my-4">
      <Row>
        <Col md={4}>
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="rounded-circle mb-3"
            width="150"
            height="150"
          />
        </Col>
        <Col md={8}>
          <h2>About Me</h2>
          <div>
            {userName?.length > 0 ? `Name - ${userName}` : "loading..."}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Profile;
