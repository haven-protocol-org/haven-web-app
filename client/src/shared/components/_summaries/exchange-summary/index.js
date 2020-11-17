// Library Imports
import React from "react";

// Relative Imports
import { Wrapper, Container, Row, Key, Value } from "./styles";
import { Error } from "../../../../assets/styles/type.js";

export const ExchangeSummary = ({
  xRate,
  fromAmount,
  toAmount,
  fromTicker,
  toTicker,
  fee,
  selectedPrio,
  hasLatestXRate,
}) => {
  return (
    <Wrapper>
      <Container>
        <Row>
          <Key>Conversion Rate</Key>
          <Value active={true}>
            {!hasLatestXRate ? (
              <Error>Awaiting lastest rates...</Error>
            ) : (
              `1 ${fromTicker} : ${xRate.toFixed(2)} ${toTicker}`
            )}
          </Value>
        </Row>
        <Row>
          <Key>Converting From</Key>
          <Value>
            {fromAmount && !isNaN(fromAmount)
              ? parseFloat(fromAmount).toFixed(2)
              : "0"}{" "}
            {fromTicker ? fromTicker : "--"}
          </Value>
        </Row>
        <Row>
          <Key>Converting To</Key>
          <Value>
            {toAmount && !isNaN(toAmount)
              ? parseFloat(toAmount).toFixed(2)
              : "0"}{" "}
            {toTicker ? toTicker : "--"}
          </Value>
        </Row>
        <Row>
          <Key>{selectedPrio.name} Priority</Key>
          <Value>{selectedPrio.ticker}</Value>
        </Row>
      </Container>
    </Wrapper>
  );
};
