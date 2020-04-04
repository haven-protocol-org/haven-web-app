// Library Imports
import React, { Fragment } from "react";

// Relative Imports
import { Container, Row, Key, Value, Footer } from "./styles";
import Confirm from "../../confirm/index.js";

export const Transaction = ({
  checked,
  onChange,
  paymentId,
  recipientAddress,
  ticker,
  transferAmount,
    fee
}) => {
  const first = recipientAddress.substring(0, 4);
  const last = recipientAddress.substring(recipientAddress.length - 4);
  const truncated = first + "...." + last;

  return (
    <Fragment>
      <Container>
        <Row>
          <Key>Transfer Asset</Key>
          <Value>{ticker}</Value>
        </Row>
        <Row>
          <Key>Transfer Amount</Key>
          <Value>{transferAmount}</Value>
        </Row>
        <Row>
          <Key>Recipient Address</Key>
          <Value>{truncated}</Value>
        </Row>
        {paymentId === "--" && (
          <Row>
            <Key>Payment ID</Key>
            <Value>{paymentId}</Value>
          </Row>
        )}
        <Row>
          <Key>Fee </Key>
          <Value>{fee}</Value>
        </Row>
      </Container>
    </Fragment>
  );
};
