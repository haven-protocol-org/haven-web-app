// Library Imports
import React from "react";

// Relative Imports
import { Container, Field, Labels, Error, Paste } from "./styles";
import { Label } from "../../../../assets/styles/type.js";

const Seed = ({
  label,
  error,
  width,
  onClick,
  ref,
  type,
  actionEvent,
  action,
  ...rest
}) => {
  return (
    <Container width={width}>
      <Labels>
        <Label>{label}</Label>
        <Error>{error}</Error>
      </Labels>
      <Field ref={ref} {...rest} />
      <Paste onClick={actionEvent}>{action}</Paste>
    </Container>
  );
};

export default Seed;
