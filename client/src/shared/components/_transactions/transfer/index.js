// Library Imports
import React, { Fragment } from "react";

// Relative Imports
import { Container, Row, Key, Value } from "./styles";
import Confirm from "../../confirm/index.js";

export const Transaction = ({
  checked,
  onChange,
  paymentId,
  recipientAddress,
  ticker,
  transferAmount,
  fee,
}) => {
  const first = recipientAddress.substring(0, 4);
  const last = recipientAddress.substring(recipientAddress.length - 4);
  const truncated = first + "...." + last;

  const paymentIdFirstFour = paymentId.substring(0, 4);
  const paymentIdLastFour = paymentId.substring(paymentId.length - 4);
  const paymentIdTruncated = paymentIdFirstFour + "...." + paymentIdLastFour;

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
        {paymentId.length > 63 ? (
          <Row>
            <Key>Payment ID</Key>
            <Value>{paymentIdTruncated}</Value>
          </Row>
        ) : null}
        <Row>
          <Key>Transaction Fee </Key>
          <Value>
            {fee} {ticker}
          </Value>
        </Row>
        <Confirm
          description="I have reviewed my transfer and accept the transaction fee"
          checked={checked}
          onChange={onChange}
        />
      </Container>
    </Fragment>
  );
};
