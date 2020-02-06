// Library Imports
import React from "react";

// Relative Imports
import { Container, Header, Row, Key, Value, Footer } from "./styles";
import Confirm from "../../confirm/index.js";

const Transaction = ({ xRate,fromAmount, toAmount,  fromTicker, toTicker, estimatedFee, checked, onChange }) => {

  return (
    <Container>
      <Header>
        <Value>Exchange Details</Value>
        <Value />
      </Header>
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
      <Row>
        <Key>Estimated Fees</Key>
        <Value>
          {estimatedFee !== 0
            ? `${estimatedFee.toFixed(4)} ${fromTicker}`
            : "--"}
        </Value>
      </Row>
      <Footer>
        <Confirm
          checked={checked}
          onChange={onChange}
          label="Confirm and Exchange"
        />
      </Footer>
    </Container>
  );
};

export default Transaction;
