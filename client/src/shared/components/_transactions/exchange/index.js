// Library Imports
import React from "react";

// Relative Imports
import { Container, Header, Row, Key, Value, Footer } from "./styles";
import Confirm from "../../confirm/index.js";

const Transaction = ({
  xRate,
  fromAmount,
  toAmount,
  fromTicker,
  toTicker,
  estimatedFee,
  checked,
  onChange,
  validated
}) => {
  return (
    <>
      <Container>
        <Row>
          <Key>Conversion Rate</Key>
          <Value>
            {xRate && fromTicker && toTicker
              ? `1 ${fromTicker} =  ${xRate.toFixed(4)} ${toTicker}`
              : "Syncing..."}
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
        <Row>
          <Key>Priority ({"Medium"}) </Key>
          <Value>{"Unlocks ~2 hours"}</Value>
        </Row>
        <Row>
          <Key>Fee (${"0.02 USD"})</Key>
          <Value>
            {"0.1234"} {"XHV"}
          </Value>
        </Row>
      </Container>
      <Footer>
        <Confirm
          checked={checked}
          onChange={onChange}
          validated={validated}
          label="Confirm and Exchange"
        />
      </Footer>
    </>
  );
};

export default Transaction;
