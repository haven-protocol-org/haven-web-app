import React from "react";
import { Container, Progress } from "./styles";

export const ProgressBar = ({ percentage }) => {
  return (
    <Container>
      <Progress width={percentage} />
    </Container>
  );
};

export default ProgressBar;
