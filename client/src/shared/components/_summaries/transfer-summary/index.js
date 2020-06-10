// Library Imports
import React from "react";

// Relative Imports
import { Container, Row, Key, Value } from "./styles";
import Confirm from "../../confirm/index.js";

const TransferSummary = ({
  transferAsset,
  transferAmount,
  paymentId,
  recipientAddress,
}) => {
  const first = recipientAddress.substring(0, 4);
  const last = recipientAddress.substring(recipientAddress.length - 4);
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
        <Value>{recipientAddress === "--" ? "--" : truncated}</Value>
      </Row>
      {paymentId !== "none" && (
        <Row>
          <Key>Payment ID</Key>
          <Value>{paymentId}</Value>
        </Row>
      )}
      <Confirm description="I accept the transfer rates and fees" />
    </Container>
  );
};

export default TransferSummary;
