// Library Imports
import React from "react";

// Relative Imports
import { Container } from "./styles";

const Form = ({ children, onSubmit }) => {
  return <Container onSubmit={onSubmit}>{children}</Container>;
};

export default Form;
