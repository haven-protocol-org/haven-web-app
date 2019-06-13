// Library Imports
import React from "react";

// Relative Imports
import { Container, Amount, Value, Wrapper } from "./styles";

const Overview = ({ amount }) => {
  return (
    <Container>
      <Wrapper>
        <Amount>{amount}</Amount>
        <Value>Total Balance (USD)</Value>
      </Wrapper>
    </Container>
  );
};

export default Overview;
