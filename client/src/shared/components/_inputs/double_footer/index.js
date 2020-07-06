// Library Imports
import React from "react";

// Relative Imports
import { Container, Fill, Outline } from "./styles";

const DoubleFooter = ({ leftLabel, rightLabel, onClick }) => {
  return (
    <Container>
      <Outline>{leftLabel}</Outline>
      <Fill onClick={onClick}>{rightLabel}</Fill>
    </Container>
  );
};

export default DoubleFooter;
