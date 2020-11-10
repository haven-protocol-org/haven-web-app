// Library Imports
import React from "react";

// Relative Imports
import { Container, Field, Labels, Wrapped, Upload, Labeled } from "./styles";
import { Label } from "../../../../assets/styles/type.js";

// NOTE: This is a non input, that looks like an input for consistency purposes

const InputUpload = ({
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
        <Field value={value}>{value}</Field>
        <Labeled htmlfor="file-upload">
          {button}
          <Upload id="file-upload" type="file" onChange={onChange} />
        </Labeled>
      </Wrapped>
    </Container>
  );
};

export default InputUpload;
