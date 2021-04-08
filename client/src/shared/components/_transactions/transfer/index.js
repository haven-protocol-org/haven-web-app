// Library Imports
import React, { Fragment } from "react";

// Relative Imports
import { Container, Row, Key, Value, Tag, Url } from "./styles";
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
            {transferAmount.toFixed(4)} {ticker}
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
              {fee.toFixed(4)} {ticker}
            </Value>
          </Tag>
        </Row>
        <Confirm
          description="I accept the ~20m Unlock Time, Terms & Fees."
          checked={checked}
          onChange={onChange}
        />
      </Container>
      <Information>
        I have reviewed my transfer details and accept all responsibility for
        this transaction. Once I click confirm,{" "}
        <strong>
          I understand that a portion of my balance may be locked for the
          entirety of the ~20m unlock priority time.{" "}
        </strong>
        To learn more about how locked tokens work, and how they might impact
        your experience{" "}
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
