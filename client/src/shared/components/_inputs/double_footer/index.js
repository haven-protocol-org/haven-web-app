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
  leftVisible,
  rightLabel,
  rightDisabled,
  rightLoading,
  rightOnClick,
}) => {
  return (
    <Container>
      <Outline
        onClick={leftOnClick}
        disabled={leftDisabled}
        leftVisible={leftVisible}
      >
        {leftLabel}
      </Outline>

      <Fill disabled={rightDisabled} onClick={rightOnClick}>
        {rightLabel === "Loading" ? <Spinner /> : rightLabel}
      </Fill>
    </Container>
  );
};

export default DoubleFooter;
