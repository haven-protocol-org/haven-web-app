// Library Imports
import React from "react";

// Relative Imports
import {
  Container,
  Column,
  Title,
  Subtitle,
  Icon,
  Inner,
  Wrapper,
  Ticker,
  Row
} from "./styles";
import chevron from "../../../assets/icons/chevron.svg";

const Cell = ({ tokenName, ticker, price, value,  fullwidth, balance }) => {
  return (
    <Container fullwidth={fullwidth} to={`/wallet/assets/${ticker}`}>
      <Column>
        <Row>
          <Title left>{tokenName}</Title>
          <Ticker left>({ticker})</Ticker>
        </Row>
        <Subtitle left>{balance}</Subtitle>
      </Column>
      <Wrapper>
        <Column>
          <Title>{price}</Title>
          <Subtitle>{value}</Subtitle>
        </Column>
        <Inner>
          <Icon src={chevron} />
        </Inner>
      </Wrapper>
    </Container>
  );
};

export default Cell;
