// Library Imports
import React from "react";

// Relative Imports
import { Container, Header, Row, Key, Value } from "./styles";

const Transaction = ({ state }) => {
  const {
    from_asset,
    from_price,
    from_ticker,
    to_price,
    to_ticker,
    to_asset
  } = state;

  return (
    <Container>
      <Header>
        <Value>Transfer Transaction Details</Value>
        <Value />
      </Header>
      <Row>
        <Key>
          {from_ticker === "" ? "From Asset" : `${from_asset}: ${from_ticker}`}{" "}
        </Key>
        <Value>{from_price === "" ? "--" : `${"$"}${from_price}`}</Value>
      </Row>
      <Row>
        <Key>{to_ticker === "" ? "To Asset" : `${to_asset}: ${to_ticker}`}</Key>
        <Value>{to_price === "" ? "--" : `${"$"}${to_price}`} </Value>
      </Row>

      <Row>
        <Key>Exchange Fee</Key>
        <Value>0.0203 XHV</Value>
      </Row>
    </Container>
  );
};

export default Transaction;
