// Library Imports
import React from "react";

// Relative Imports
import { Container, Header, Row, Key, Value } from "./styles";

const Transaction = ({ state }) => {
  const { send_ticker, send_amount, recipient_address } = state;

  return (
    <Container>
      <Header>
        <Value>Transaction Details</Value>
        <Value />
      </Header>
      <Row>
        <Key>Transfer Asset</Key>
        <Value>
          {send_amount > 0 && send_ticker !== ""
            ? `${send_amount} ${send_ticker}`
            : "--"}
        </Value>
      </Row>
      <Row>
        <Key>Recipient Address</Key>
        <Value>
          {recipient_address === "" ? "--" : `${recipient_address}`}
        </Value>
      </Row>

      <Row>
        <Key>Transaction Fee</Key>
        <Value>0.0203 XHV</Value>
      </Row>
    </Container>
  );
};

export default Transaction;
