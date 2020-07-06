// Library Imports
import React from "react";

// Relative Imports
import { Container, Row, Key, Value } from "./styles";
// import Confirm from "../../confirm/index.js";

const TransferSummary = ({
  transferAsset,
  transferAmount,
  paymentId,
  recipientAddress,
  checked,
  onChange,
}) => {
  const first = recipientAddress.substring(0, 4);
  const last = recipientAddress.substring(recipientAddress.length - 4);
  const truncated = first + "...." + last;

  const paymentIdFirstFour = paymentId.substring(0, 4);
  const paymentIdLastFour = paymentId.substring(paymentId.length - 4);
  const paymentIdTruncated = paymentIdFirstFour + "...." + paymentIdLastFour;
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
      {paymentId.length > 63 ? (
        <Row>
          <Key>Payment ID</Key>
          <Value>{paymentIdTruncated}</Value>
        </Row>
      ) : null}
    </Container>
  );
};

export default TransferSummary;
