// Library Imports
import React, { Fragment } from "react";

// Relative Imports
import { Container, Row, Key, Value, Tag } from "./styles";
import Confirm from "../../confirm/index.js";
import { Information } from "../../../../assets/styles/type.js";

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
          <Value>
            {transferAmount.toFixed(4)} {ticker}
          </Value>
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
          <Tag>
            {" "}
            <Value>
              {fee} {ticker}
            </Value>
          </Tag>
        </Row>
        <Confirm
          description="I have reviewed my Transfer details and I accept the Fees and Terms"
          checked={checked}
          onChange={onChange}
        />
      </Container>
      <Information>
        <strong>Terms:</strong> You accept any and all responsibility for your
        Transfer including the verification of Recipient Addresses, Payment
        ID's, Amounts and Fees. Upon clicking <strong>Confirm</strong> a portion
        of your balance may be locked for ~20 mins until the transaction is
        complete. The Vault will indicate any pending balances which can be seen
        by clicking the <strong>Show Pending Balances</strong> button in the
        Assets page.
      </Information>
    </Fragment>
  );
};
