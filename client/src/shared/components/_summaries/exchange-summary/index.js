// Library Imports
import React from "react";

// Relative Imports
import { Container, Header, Row, Key, Value, Footer } from "./styles";
import Confirm from "../../confirm/index.js";

const ExchangeSummary = ({
  xRate,
  fromAmount,
  toAmount,
  fromTicker,
  toTicker,
  estimatedFee,
  checked,
  onChange
}) => {
  return (
    <Container>
      <Row>
        <Key>Conversion Rate</Key>
        <Value>
          {xRate && fromTicker && toTicker
            ? `1 ${fromTicker} =  ${xRate.toFixed(4)} ${toTicker}`
            : ""}
        </Value>
      </Row>
      <Row>
        <Key>From Asset</Key>
        <Value>
          {(fromTicker ? fromTicker : "") +
            " " +
            (fromAmount && !isNaN(fromAmount) ? fromAmount : "--")}
        </Value>
      </Row>
      <Row>
        <Key>To Asset</Key>
        <Value>
          {(toTicker ? toTicker : "") +
            " " +
            (toAmount && !isNaN(toAmount) ? toAmount : "--")}
        </Value>
      </Row>
    </Container>
  );
};

export default ExchangeSummary;
