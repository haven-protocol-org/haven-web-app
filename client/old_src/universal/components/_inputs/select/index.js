// Library Imports
import React from "react";

// Relative Imports
import { Container, Field, Labels } from "./styles";
import { Label, Error } from "../../../../assets/styles/type.js";

const Select = ({ type, placeholder, label, error, onChange, name, value }) => {
  return (
    <Container>
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
      >
        <option>One</option>
        <option>One</option>
        <option>One</option>
        <option>One</option>
      </Field>
    </Container>
  );
};

export default Select;
