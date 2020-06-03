// Library Imports
import React, { FormEvent, FunctionComponent } from "react";
// Relative Imports
import { Container } from "./styles";
// Relative Imports

type FormProps = {
  onSubmit?: (e: FormEvent) => void;
};

const Form: FunctionComponent<FormProps> = ({ children, onSubmit }) => {
  if (onSubmit) {
    return <Container onSubmit={onSubmit}>{children}</Container>;
  } else {
    return <Container>{children}</Container>;
  }
};

export default Form;
