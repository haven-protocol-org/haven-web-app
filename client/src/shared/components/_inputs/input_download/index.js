// Library Imports
import React from "react";

// Relative Imports
import { Container, Field, Labels, Wrapped, Download } from "./styles";
import { Label } from "../../../../assets/styles/type.js";

// NOTE: This is a non input, that looks like an input for consistency purposes

const InputDownload = ({
  type,
  label,
  name,
  value,
  width,
  button,
  onClick,
  action,
  onChange,
}) => {
  return (
    <Container width={width}>
      <Labels>
        <Label>{label}</Label>
      </Labels>
      <Wrapped>
        <Field>{value}</Field>
        <Download href={value} download>
          Save
        </Download>
      </Wrapped>
    </Container>
  );
};

export default InputDownload;
