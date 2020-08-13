// Library Imports
import React from "react";

// Relative Imports
import {
  Container,
  Column,
  Title,
  Subtitle,
  Inner,
  Wrapper,
  Row,
  Ticker,
  Balance,
  Arrow,
} from "./styles";

const CellDisabled = ({ tokenName, ticker, price, balance, fullwidth }) => {
  return (
    <Container fullwidth={fullwidth}>
      <Column>
        <Row>
          <Title>{tokenName}</Title>
          <Ticker>{ticker}</Ticker>
        </Row>
        <Subtitle left>{price}</Subtitle>
      </Column>
      <Wrapper>
        <Column>
          <Balance>$0.00</Balance>
          <Subtitle>{balance}</Subtitle>
        </Column>
        <Inner>
          <Arrow />
        </Inner>
      </Wrapper>
    </Container>
  );
};

export default CellDisabled;
