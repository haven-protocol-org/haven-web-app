// Library Imports
import React from "react";

// Relative Imports
import { Container, Row, Title, Subtitle } from "./styles";

const Cell = ({ tokenName, ticker, price, change, fullWidth }) => {
  return (
    <Container fullWidth={fullWidth} to={`/wallet/assets/${ticker}`}>
      <Row>
        <Title>{ticker}</Title>
        <Title>{price}</Title>
      </Row>
      <Row>
        <Subtitle>{tokenName}</Subtitle>
        <Subtitle>{change}</Subtitle>
      </Row>
    </Container>
  );
};

export default Cell;
