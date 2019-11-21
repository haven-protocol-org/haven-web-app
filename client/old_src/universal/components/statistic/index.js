// Library Imports
import React from "react";

// Relative Imports
import { Container, Title, Description } from "./styles";

const Statistic = ({ value, label }) => {
  return (
    <Container>
      <Title>{value}</Title>
      <Description>{label}</Description>
    </Container>
  );
};

export default Statistic;
