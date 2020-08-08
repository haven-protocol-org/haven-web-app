// Library Imports
import React from "react";

// Relative Imports
import { Container, Row, Key, Value, FeePadding, FeeRow, Tag } from "./styles";
// import Confirm from "../../confirm/index.js";

const TransferSummary = ({
  transferAsset,
  transferAmount,
  paymentId,
  recipientAddress,

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
        <Value>
          {transferAmount === "--" ? "0" : transferAmount} {transferAsset}
        </Value>
      </Row>
      <Row>
        <Key>Recipient Address</Key>
        <Value>{recipientAddress === "--" ? "--" : truncated}</Value>
      </Row>
      <Row>
        <Key>Payment ID</Key>
        <Value>{paymentId === "--" ? "--" : paymentIdTruncated}</Value>
      </Row>
      <FeeRow>
        <FeePadding>
          <Key>Minimum Fee</Key>
          <Tag>
            <Value>0.0005 {transferAsset}</Value>
          </Tag>
        </FeePadding>
      </FeeRow>
    </Container>
  );
};

export default TransferSummary;
