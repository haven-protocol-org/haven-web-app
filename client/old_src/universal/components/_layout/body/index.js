// Library Imports
import React from "react";

// Relative Imports
import { Container, Spacing } from "./styles";

const Body = ({ children, span }) => {
  return (
    <Container span={span}>
      {children}
      <Spacing />
    </Container>
  );
};

export default Body;
