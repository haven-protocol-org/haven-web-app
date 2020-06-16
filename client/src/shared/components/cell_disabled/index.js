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
  Row,
  Ticker,
} from "./styles";
import chevron from "../../../assets/icons/chevron.svg";

const CellDisabled = ({ tokenName, ticker, price, balance, fullwidth }) => {
  return (
    <Container fullwidth={fullwidth}>
      <Column>
        <Row>
          <Title>{tokenName}</Title>
          <Ticker>{ticker}</Ticker>
        </Row>
        <Subtitle left>{balance}</Subtitle>
      </Column>
      <Wrapper>
        <Column>
          <Title>{price}</Title>
          <Subtitle>
            {"$"}
            {"0.00"}
          </Subtitle>
        </Column>
        <Inner>
          <Icon src={chevron} />
        </Inner>
      </Wrapper>
    </Container>
  );
};

export default CellDisabled;
