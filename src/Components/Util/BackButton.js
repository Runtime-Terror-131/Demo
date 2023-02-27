import React from 'react';
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
      <Button variant="secondary" onClick={() => navigate(-1)} >Back</Button>
  );
}