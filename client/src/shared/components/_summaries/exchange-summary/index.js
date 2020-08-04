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
            {fromAmount && !isNaN(fromAmount) ? fromAmount : ""}{" "}
            {fromTicker ? fromTicker : "--"}
          </Value>
        </Row>
        <Row>
          <Key>Converting To</Key>
          <Value>
            {toAmount && !isNaN(toAmount) ? toAmount : ""}{" "}
            {toTicker ? toTicker : "--"}
          </Value>
        </Row>
        <Row>
          <Key>{selectedPrio.name} Priority</Key>
          <Value>{selectedPrio.ticker}</Value>
        </Row>
      </Container>
      <FeeRow>
        <FeePadding>
          <Key>Estimated Fee ({selectedPrio.percent})</Key>
          <Tag priority={selectedPrio.prio}>
            <Value>{fee === "" ? "" : `${fee.toFixed(4)} ${fromTicker}`}</Value>
          </Tag>
        </FeePadding>
      </FeeRow>
    </Wrapper>
  );
};
