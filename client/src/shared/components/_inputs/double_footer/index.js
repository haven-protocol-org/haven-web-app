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
  onClick,
}) => {
  return (
    <Container>
      <Outline onClick={leftOnClick} disabled={leftDisabled}>
        {leftLabel}
      </Outline>
      <Fill disabled={rightDisabled} onClick={rightOnClick}>
        {rightLoading ? <Spinner /> : rightLabel}
      </Fill>
    </Container>
  );
};

export default DoubleFooter;
