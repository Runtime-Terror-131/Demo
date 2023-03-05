import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export default function EditForm({ data }) {
  const [isEdit, setIsEdit] = useState();
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <Container>
      <div>form</div>
    </Container>
  );
}
