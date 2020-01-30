// Library Imports
import React from "react";

// Relative Imports
import { Container, Header, Row, Key, Value, Footer } from "./styles";
import Confirm from "../../confirm/index.js";

export const Transaction = ({ state, checked, onChange }) => {
  const { selectedAsset, send_amount, recipient_address, payment_id } = state;
  const first = recipient_address.substring(0, 4);
  const last = recipient_address.substring(recipient_address.length - 4);
  const truncated = first + "...." + last;

  return (
    <Container>
      <Header>
        <Value>Transaction Details</Value>
        <Value />
      </Header>
      <Row>
        <Key>Transfer Asset</Key>
        <Value>
          {send_amount > 0 && selectedAsset !== null
            ? `${send_amount} ${selectedAsset.ticker}`
            : "--"}
        </Value>
      </Row>
      <Row>
        <Key>Recipient Address</Key>
        <Value>{recipient_address === "" ? "--" : `${truncated}`}</Value>
      </Row>
      <Row>
        <Key>Payment ID</Key>
        <Value>{payment_id === "" ? "--" : `${payment_id}`}</Value>
      </Row>
      <Footer>
        <Confirm
          checked={checked}
          onChange={onChange}
          label="Confirm and Transfer"
        />
      </Footer>
    </Container>
  );
};
