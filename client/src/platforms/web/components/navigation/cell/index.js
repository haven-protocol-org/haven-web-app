// Library Imports
import React from "react";

// Relative Imports
import { Container } from "./styles";
import { Body, Label } from "../../../../../assets/styles/type.js";

const Cell = ({ body, label }) => {
  return (
    <Container>
      <Body>{body}</Body>
      <Label>{label}</Label>
    </Container>
  );
};

export default Cell;
