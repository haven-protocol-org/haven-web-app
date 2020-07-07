// Library Imports
import React from "react";

// Relative Imports
import { Container, Fill, Outline } from "./styles";

const DoubleFooter = ({ leftLabel, rightLabel, onClick, disabled }) => {
  return (
    <Container>
      <Outline disabled={disabled}>{rightLabel}</Outline>
      <Fill disabled={disabled} onClick={onClick}>
        {leftLabel}
      </Fill>
    </Container>
  );
};

export default DoubleFooter;
