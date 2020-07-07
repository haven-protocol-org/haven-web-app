// Library Imports
import React from "react";

// Relative Imports
import { Container, Fill, Outline } from "./styles";
import { Spinner } from "../../spinner/index.js";

const DoubleFooter = ({
  leftOnClick,
  leftLabel,
  leftDisabled,
  leftLoading,
  rightLabel,
  rightDisabled,
  rightLoading,
  rightOnClick,
}) => {
  return (
    <Container>
      <Outline leftDisabled={leftDisabled}>{leftLabel}</Outline>
      <Fill rightDisabled={rightDisabled} rightOnClick={rightOnClick}>
        {rightLoading ? <Spinner /> : rightLabel}
      </Fill>
    </Container>
  );
};

export default DoubleFooter;
