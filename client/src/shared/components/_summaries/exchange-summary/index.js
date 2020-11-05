// Library Imports
import React from "react";

// Relative Imports
import {
  Wrapper,
  Container,
  Row,
  Key,
  Value,
  FeeRow,
  FeePadding,
  Tag,
} from "./styles";
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
          <Key>Exchange Rate</Key>
          <Value active={true}>
            {!hasLatestXRate ? (
              <Error>Checking lastest rates...</Error>
            ) : (
              `1 ${fromTicker} : ${xRate.toFixed(4)} ${toTicker}`
            )}
          </Value>
        </Row>
        <Row>
          <Key>Converting From</Key>
          <Value>
            {fromAmount && !isNaN(fromAmount) ? fromAmount : "0"}{" "}
            {fromTicker ? fromTicker : "--"}
          </Value>
        </Row>
        <Row>
          <Key>Converting To</Key>
          <Value>
            {toAmount && !isNaN(toAmount) ? toAmount : "0"}{" "}
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
