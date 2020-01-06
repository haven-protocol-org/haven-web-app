// Library Imports
import React from "react";

// Relative Imports
import { Container, Header, Row, Key, Value, Footer } from "./styles";
import Confirm from "../../confirm/index.js";

const Transaction = ({ state, checked, onChange }) => {
  const {
    xRate,
    fromAmount,
    toAmount,
    fromAsset,
    toAsset
  } = state;

  return (
    <Container>
      <Header>
        <Value>Exchange Details</Value>
        <Value />
      </Header>
      <Row>
        <Key>Conversion Rate</Key>
        <Value>
          {xRate && fromAsset && toAsset
            ? `1 ${fromAsset.ticker} =  ${xRate.toFixed(4)} ${toAsset.ticker}`
            : ""}
        </Value>
      </Row>
      <Row>
        <Key>From Asset</Key>
        <Value>
          {(fromAsset ? fromAsset.ticker : "") +
            " " +
            (fromAmount && !isNaN(fromAmount) ? fromAmount : "--")}
        </Value>
      </Row>
      <Row>
        <Key>To Asset</Key>
        <Value>
          {(toAsset ? toAsset.ticker : "") + " " + (toAmount && !isNaN(toAmount) ? toAmount : "--")}
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
