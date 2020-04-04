// Library Imports
import React from "react";

// Relative Imports
import { Container, Row, Key, Value } from "./styles";

export const ExchangeSummary = ({
  xRate,
  fromAmount,
  toAmount,
  fromTicker,
  toTicker,
  fee,
    hasLatestXRate
}) => {
  return (
    <Container>
      <Row>
        <Key>Conversion Rate</Key>
        <Value active={true}>
            { `1 ${fromTicker} : ${xRate.toFixed(4)} ${toTicker}`}
        </Value>
      </Row>
      <Row>
        <Key>From Asset</Key>
        <Value>
          {(fromTicker ? fromTicker : "") +
            " " +
            (fromAmount && !isNaN(fromAmount) ? fromAmount : "0")}
        </Value>
      </Row>
      <Row>
        <Key>To Asset</Key>
        <Value>
          {(toTicker ? toTicker : "") +
            " " +
            (toAmount && !isNaN(toAmount) ? toAmount : "0")}
        </Value>
      </Row>
        <Row>
            <Key>Fee</Key>
            <Value>
                {fee}
            </Value>
        </Row>
    </Container>
  );
};
