import React, { useState } from "react";
import { Alert } from "react-bootstrap";
export default function AlertText({ item, index }) {
  const [show, setShow] = useState(true);
  return (
    <>
      {show && (
        <Alert
          key={index}
          dismissible
          onClose={() => setShow(false)}
          variant={item[1]}
        >
          {item[0]}
        </Alert>
      )}
    </>
  );
}
