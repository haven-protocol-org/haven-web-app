// Library Imports
import React, { Fragment } from "react";

// Relative Imports
import { Container, Row, Key, Value, Tag } from "./styles";
import Confirm from "../../confirm/index.js";
import { Information } from "../../../../assets/styles/type.js";

export const Transaction = ({
  checked,
  onChange,
  recipientAddress,
  ticker,
  transferAmount,
  fee,
}) => {
  const first = recipientAddress.substring(0, 4);
  const last = recipientAddress.substring(recipientAddress.length - 4);
  const truncated = first + "...." + last;

  return (
    <Fragment>
      <Container>
        <Row>
          <Key>Transfer Asset</Key>
          <Value>
            {transferAmount.toFixed(2)} {ticker}
          </Value>
        </Row>

        <Row>
          <Key>Recipient Address</Key>
          <Value>{truncated}</Value>
        </Row>

        <Row>
          <Key>Final Transfer Fee</Key>
          <Tag>
            {" "}
            <Value>
              {fee.toFixed(4)} {ticker}
            </Value>
          </Tag>
        </Row>
        <Confirm
          description="I reviewed the transaction and I accept the Fees and Terms"
          checked={checked}
          onChange={onChange}
        />
      </Container>
      <Information>
        I have reviewed my transfer details and accept all responsibility for
        this transaction. Once I click confirm, I understand that a portion of
        my total balance may be temporarily locked for ~20 mins until the
        transfer is confirmed.
      </Information>
    </Fragment>
  );
};
