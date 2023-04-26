import React from "react";
import { Alert, Container, Row } from "react-bootstrap";
import { BackButton } from "../Components";
export default function NoMatch() {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Alert variant="warning" style={{ margin: "50px" }}>
        <Alert.Heading>
          Hi, this page doesn't exist or you don't have the permission to view
          it!
        </Alert.Heading>
        <p>Congratulations for getting to our secret page.</p>
        <hr />
        <BackButton />
      </Alert>
    </Container>
  );
}
