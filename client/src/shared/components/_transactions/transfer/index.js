// Library Imports
import React, { Fragment } from "react";

// Relative Imports
import { Container, Row, Key, Value, Tag, Url } from "./styles";
import Confirm from "../../confirm/index.js";
import { Information } from "../exchange/styles";

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
            {transferAmount} {ticker}
          </Value>
        </Row>

        <Row>
          <Key>Recipient Address</Key>
          <Value>{truncated}</Value>
        </Row>
        <Row>
          <Key>Standard Priority</Key>
          <Value>Unlocks ~20m</Value>
        </Row>

        <Row>
          <Key>Final Transfer Fee</Key>
          <Tag>
            <Value>
              {fee} {ticker}
            </Value>
          </Tag>
        </Row>
        <Confirm
          description="I accept the ~20m Unlock Time, Details, Terms & Fees."
          checked={checked}
          onChange={onChange}
        />
      </Container>
      <Information>
        <strong style={{ textDecoration: 'underline'}}>ALERT</strong>: I have reviewed my transfer details and accept all
        responsibility for this transaction.{" "}
        <strong>
          I understand that a portion of my balance may be locked and unusable
          for the entirety of the ~20m unlock priority time. However, this
          amount will be unlocked and usable once the transaction is complete.{" "}
        </strong>
        To understand why this happens and how it might impact your experience,
        please{" "}
        <strong>
          <Url
            target="_blank"
            href="https://havenprotocol.org/knowledge/haven-transactions/"
          >
            click here.
          </Url>
        </strong>
      </Information>
    </Fragment>
  );
};
