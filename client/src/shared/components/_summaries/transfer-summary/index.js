// Library Imports
import React from "react";

// Relative Imports
import { Container, Header, Row, Key, Value, Footer } from "./styles";
import Confirm from "../../confirm/index.js";

const TransferSummary = ({
  transferAsset,
  transferAmount,
  payment_id,
  recipient_address
}) => {
  const first = recipient_address.substring(0, 4);
  const last = recipient_address.substring(recipient_address.length - 4);
  const truncated = first + "...." + last;
  return (
    <Container>
      <Row>
        <Key>Transfer Asset</Key>
        <Value>{transferAsset}</Value>
      </Row>
      <Row>
        <Key>Transfer Amount</Key>
        <Value>{transferAmount}</Value>
      </Row>
      <Row>
        <Key>Recipient Address</Key>
        <Value>{truncated}</Value>
      </Row>
      <Row>
        <Key>Payment ID</Key>
        <Value>{payment_id}</Value>
      </Row>
    </Container>
  );
};

export default TransferSummary;
