// Library Imports
import React from "react";

// Relative Imports
import { Container, Header, Row, Key, Value, Footer } from "./styles";
import Confirm from "../../confirm/index.js";

export const Transaction = ({
  checked,
  onChange,
  paymentId,
  recipientAddress,
  transferAsset,
  transferAmount
}) => {
  const first = recipientAddress.substring(0, 4);
  const last = recipientAddress.substring(recipientAddress.length - 4);
  const truncated = first + "...." + last;
  console.log("paymentId", paymentId);
  return (
    <>
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
          <Value>{recipientAddress}</Value>
        </Row>
        {paymentId === "--" && (
          <Row>
            <Key>Payment ID</Key>
            <Value>{paymentId}</Value>
          </Row>
        )}
        <Row>
          <Key>Transaction Fee</Key>
          <Value>{"0.01234 XHV"}</Value>
        </Row>
      </Container>
      <Footer>
        <Confirm
          checked={checked}
          onChange={onChange}
          label="Confirm and Transfer"
        />
      </Footer>
    </>
  );
};
