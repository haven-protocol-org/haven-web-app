// Library Imports
import React from "react";

// Relative Imports
import { Container, Title, Message } from "./styles";

export const Warning = ({ message }) => {
  return (
    <Container type="warning">
      <Message>{message}</Message>
    </Container>
  );
};

export const Hint = ({ message }) => {
  return (
    <Container type="warning">
      <Message>{message}</Message>
    </Container>
  );
};

export const Success = ({ message }) => {
  return (
    <Container type="success">
      <Message>{message}</Message>
    </Container>
  );
};
