// Library Imports
import React from "react";

// Relative Imports
import { Container, Padding } from "./styles";

const Body = ({ children, span }) => {
  return (
    <Container span={span}>
      {children}
      <Padding />
    </Container>
  );
};

export default Body;
