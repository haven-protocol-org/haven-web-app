// Library Imports
import React from "react";

// Relative Imports
import { Container, Row, Key, Value, Divider } from "./styles";

const Summary = ({ state }) => {
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
      <Row>
        <Value>Exchange Rate</Value>
        <Value />
      </Row>
      <Divider />
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
      <Divider clear="clear" />
      <Row>
        <Key>Exchange Fee</Key>
        <Value>0.0203 XHV</Value>
      </Row>
    </Container>
  );
};

export default Summary;
