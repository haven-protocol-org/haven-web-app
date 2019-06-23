// Library Imports
import React from "react";

// Relative Imports
import { Container, Header, Row, Key, Value } from "./styles";

const Transaction = ({ state }) => {
  console.log(state);
  const {
    from_asset,
    from_price,
    from_ticker,
    from_amount,
    to_price,
    to_amount,
    to_ticker,
    to_asset
  } = state;

  return (
    <Container>
      <Header>
        <Value>Transaction Details</Value>
        <Value />
      </Header>
      <Row>
        <Key>From Asset</Key>
        <Value>
          {from_amount > 0 ? `${from_amount}${" "}${from_ticker}` : ""}
        </Value>
      </Row>
      <Row>
        <Key>To Asset</Key>
        <Value>{to_amount > 0 ? `${to_amount}${" "}${to_ticker}` : ""}</Value>
      </Row>

      <Row>
        <Key>Exchange Fee</Key>
        <Value>0.0203 XHV</Value>
      </Row>
    </Container>
  );
};

export default Transaction;
