import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
export default function FormTemplate({ data }) {
  const [isEdit, setIsEdit] = useState();
  useEffect(() => {
    if (!data) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
    console.log(data);
  }, []);
  return (
    <Container>
      <div>form</div>
      {!isEdit ? (
        <Container>
          <h1>this is the create view</h1>
        </Container>
      ) : (
        <h1>this is the edit view</h1>
      )}
    </Container>
  );
}
