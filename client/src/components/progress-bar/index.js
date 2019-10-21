import React from "react";
import { Container, Progress } from "./styles";

export const ProgressBar = ({ max, value }) => {
  const amount = value / max;
  const percentage = amount.toFixed(2);

  return (
    <Container>
      <Progress width={percentage * 100} />
    </Container>
  );
};

export default ProgressBar;
