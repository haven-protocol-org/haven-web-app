// Library Imports
import React from "react";

// Relative Imports
import { Container, Field, Labels, Error } from "./styles";
import { Label } from "../../../constants/type.js";

const Description = ({ label, error, ...rest }) => {
  return (
    <Container>
      <Labels>
        <Label>{label}</Label>
        <Error>{error}</Error>
      </Labels>
      <Field {...rest} />
    </Container>
  );
};

export default Description;
