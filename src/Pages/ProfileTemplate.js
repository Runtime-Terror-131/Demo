import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { BackButton } from "../Components";
import { useJaneHopkins } from "../Config/Hopkins-Config";
import { useContextValues } from "../Context/Context";
import { useNavigate } from "react-router-dom";

export default function FormTemplate({ data }) {
  const { updateUserData } = useJaneHopkins();
  const { setShowSpinner } = useContextValues();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState();
  const [name, setName] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [bio, setBio] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const handleChange = (setvalue, value) => {
    setvalue(value);
  };

  useEffect(() => {
    if (!data) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
      setName(data.name);
      setProfilePicture(data.profilePicture);
      setBio(data.bio);
      setPhone(data.phone);
      setEmail(data.email);
    }
  }, []);
  const saveUser = () => {
    const user = {};

    user.name = name;
    user.profilePicture = profilePicture;
    user.bio = bio;
    user.phone = phone;
    user.email = email;
    setShowSpinner(true);
    if (data && data._id != null) {
      user._id = data._id;
      updateUserData(user).then((result) => {
        setShowSpinner(false);
        if (result == true) {
          navigate("/profile");
        }
      });
    } else {
    }
  };
  return (
    <Container style={{ textAlign: "center", margin: "3px" }}>
      <h2>Edit Profile</h2>

      <Form
        style={{
          backgroundColor: "#384E89",
          color: "white",
          borderRadius: "30px",
        }}>
        <Row>
          <Col lg={4}>
            <Form.Group className="m-3 ">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => {
                  handleChange(setName, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="m-3 ">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                value={bio}
                onChange={(e) => {
                  handleChange(setBio, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="m-3 ">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => {
                  handleChange(setPhone, e.target.value);
                }}
              />
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="m-3 ">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => {
                  handleChange(setEmail, e.target.value);
                }}
              />
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="m-3 ">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="text"
                value={profilePicture}
                onChange={(e) => {
                  handleChange(setProfilePicture, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row
          lg={6}
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px",
            padding: "10px",
            marginInline: "5% 5%",
          }}>
          <Button variant="success" onClick={saveUser}>
            Save
          </Button>
          <BackButton />
        </Row>
      </Form>
    </Container>
  );
}
