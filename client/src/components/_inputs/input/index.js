// Library Imports
import React from "react";

// Relative Imports
import { Container, Field, Labels } from "./styles";
import { Label, Error } from "../../../constants/type.js";

const Input = ({
  type,
  placeholder,
  label,
  error,
  onChange,
  name,
  value,
  width,
  readOnly
}) => {
  return (
    <Container width={width}>
      <Labels>
        <Label>{label}</Label>
        <Error>{error}</Error>
      </Labels>
      <Field
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </Container>
  );
};

export default Input;
