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
  hasLatestXRate,
  offshoreEnabled,
}) => {
  return (
    <Wrapper>
      {offshoreEnabled ? (
        <Error>{hasLatestXRate ? "" : "Awaiting lastest exchange rates"}</Error>
      ) : (
        <Error>{"Offshore is available in 2d"}</Error>
      )}

      <Container>
        <Row>
          <Key>Conversion Rate</Key>
          <Value active={true}>
            {`1 ${fromTicker} : ${xRate.toFixed(4)} ${toTicker}`}
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
    </Wrapper>
  );
};
