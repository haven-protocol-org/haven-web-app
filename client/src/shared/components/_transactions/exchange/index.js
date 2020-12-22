// Library Imports
import React, { Fragment } from "react";

// Relative Imports
import { Container, Row, Key, Value, Tag } from "./styles";
import Confirm from "../../confirm/index.js";
import { Information } from "../../../../assets/styles/type.js";

const Transaction = ({
  xRate,
  fromAmount,
  toAmount,
  fromTicker,
  toTicker,
  fee,
  externAddress,
  onChange,
  checked,
  priority,
  isOwnAddress,
}) => {
  const first = externAddress.substring(0, 4);
  const last = externAddress.substring(externAddress.length - 4);
  const truncatedAddress = first + "...." + last;

  const priorityInfo =
    priority === 0
      ? "~7d"
      : priority === 1
      ? "~48h"
      : priority === 2
      ? "~24h"
      : priority === 3
      ? "~6h"
      : null;

  return (
    <Fragment>
      <Container>
        <Row>
          <Key>Convert From</Key>
          <Value>
            {fromAmount.toFixed(2)} {fromTicker}
          </Value>
        </Row>
        <Row>
          <Key>Convert To</Key>
          <Value>
            {toAmount.toFixed(2)} {toTicker}
          </Value>
        </Row>
        {isOwnAddress ? null : (
          <Row>
            <Key>Convert To</Key>
            <Value>{truncatedAddress}</Value>
          </Row>
        )}
        <Row>
          {(function () {
            switch (priority) {
              case 0:
                return (
                  <>
                    <Key>Normal Priority</Key>
                    <Value>Unlocks ~7d</Value>
                  </>
                );
              case 1:
                return (
                  <>
                    <Key>Low Priority</Key>
                    <Value>Unlocks ~48h</Value>
                  </>
                );
              case 2:
                return (
                  <>
                    <Key>Medium Priority</Key>
                    <Value>Unlocks ~24h</Value>
                  </>
                );
              case 3:
                return (
                  <>
                    <Key>High Priority</Key>
                    <Value>Unlocks ~6h</Value>
                  </>
                );

              default:
            }
          })()}
        </Row>
        <Row>
          <Key>Final Conversion Fee</Key>
          <Tag priority={priority}>
            <Value>
              {fee.toFixed(4)} {fromTicker}
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
        I have reviewed my conversion details and accept all responsibility for
        this transaction. Once I click confirm, I understand that a portion of
        my balance may be locked for the entirety of your {priorityInfo} unlock
        priority time.
      </Information>
    </Fragment>
  );
};

export default Transaction;
