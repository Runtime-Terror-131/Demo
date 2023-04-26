import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useContextValues } from "../Context/Context";
import { useJaneHopkins } from "../Config/Hopkins-Config";
import ProfileTemplate from "./ProfileTemplate";
function Profile() {
  const { loginUserName, loginUserType } = useContextValues();
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(true);
  const { getUserInfo } = useJaneHopkins();
  const excludeFields = [
    "_id",
    "_owner",
    "UserUID",
    "userType",
    "profilePicture",
  ];
  useEffect(() => {
    if (loginUserType) {
      setUserName(loginUserName);
    }
  }, [loginUserType]);

  useEffect(() => {
    setLoading(true);
    const localStorageData = localStorage.getItem("userData");
    if (localStorageData) {
      const { uid } = JSON.parse(localStorageData);
      getUserInfo(uid)
        .then((result) => {
          setUserInfo(result);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user info", error);
          setLoading(false);
        });
    }
  }, [getUserInfo]);

  return (
    <Container className="my-4">
      <Row>
        <Col md={4}>
          <div className="text-center">
            <img
              src={
                userInfo?.profilePicture || "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="rounded-circle mb-3"
              width="150"
              height="150"
            />
            <h3>{userName}</h3>
          </div>
        </Col>
        <Col md={8}>
          <h2>About Me</h2>
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : userInfo ? (
            <Row>
              {Object.entries(userInfo)
                .filter(([key, value]) => !excludeFields.includes(key))
                .map((item, i) => (
                  <Col lg={12} key={i}>
                    <div className="mb-6">
                      <span style={{ color: "grey" }} key={item[0].toString()}>
                        {item[0]}:
                      </span>
                      {Array.isArray(item[1]) ? (
                        <ul>
                          {item[1].map((arrayItem, j) => (
                            <li key={`${i}-${j}`}>
                              {JSON.stringify(arrayItem)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <h5 className="mb-0" key={JSON.stringify(item[1])}>
                          {JSON.stringify(item[1])}
                        </h5>
                      )}
                    </div>
                  </Col>
                ))}
            </Row>
          ) : (
            <div className="text-muted">No user information found.</div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
