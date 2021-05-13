// Library Imports
import React from "react";

// Relative Imports
import { Wrapper, Container, Row, Key, Value } from "./styles";
import { Error } from "../../../../assets/styles/type.js";
import { Ticker } from "shared/reducers/types";
import { iNum } from "utility/utility";

export const ExchangeSummary = ({
  xRate,
  fromAmount,
  toAmount,
  fromTicker,
  toTicker,
  fee,
  selectedPrio,
  hasLatestXRate,
  xasset_conversion,
}) => {
  // use USD always as quote currency for better readability
  let xFromTicker = fromTicker;
  let xToTicker = toTicker;
  let rate = xRate;
  if (fromTicker === Ticker.xUSD && toTicker !== null) {
    xToTicker = fromTicker;
    xFromTicker = toTicker;
    rate = 1 / xRate;
  }
  /////////////////////

  return (
    <Wrapper>
      <Container>
        <Row>
          <Key>Conversion Rate</Key>
          <Value active={true}>
            {!hasLatestXRate ? (
              <Error>Awaiting lastest rates...</Error>
            ) : (
              `1 ${xFromTicker} : ${iNum(rate)} ${xToTicker}`
            )}
          </Value>
        </Row>
        <Row>
          <Key>Converting From</Key>
          <Value>
            {fromAmount}&#160;
            {fromTicker ? fromTicker : "--"}
          </Value>
        </Row>
        <Row>
          <Key>Converting To</Key>
          <Value>
            {toAmount}&#160;
            {toTicker ? toTicker : "--"}
          </Value>
        </Row>
        {xasset_conversion ? (
          <Row>
            <Key>Standard Priority</Key>
            <Value>Unlocks ~20m</Value>
          </Row>
        ) : (
          <Row>
            <Key>{selectedPrio.name} Priority</Key>
            <Value>{selectedPrio.ticker}</Value>
          </Row>
        )}
      </Container>
    </Wrapper>
  );
};
