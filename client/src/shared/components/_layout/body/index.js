// Library Imports
import React from "react";

// Relative Imports
import { Container, Spacing } from "./styles";

const Body = ({ children }) => {
  return (
    <Container>
      {children}
      <Spacing />
    </Container>
  );
};

export default Body;
