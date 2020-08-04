// Library Imports
import React, { Fragment } from "react";

// Relative Imports
import { Container, Row, Key, Value, Tag } from "./styles";
import Confirm from "../../confirm/index.js";

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

  return (
    <Fragment>
      <Container>
        <Row>
          <Key>Exchange From</Key>
          <Value>
            {fromAmount.toFixed(4)} {fromTicker}
          </Value>
        </Row>
        <Row>
          <Key>Exchange To</Key>
          <Value>
            {toAmount.toFixed(4)} {toTicker}
          </Value>
        </Row>
        {isOwnAddress ? null : (
          <Row>
            <Key>Exchange To</Key>
            <Value>{truncatedAddress}</Value>
          </Row>
        )}
        <Row>
          {(function () {
            switch (priority) {
              case 1:
                return (
                  <>
                    <Key>Normal Priority</Key>
                    <Value>Unlocks ~7d</Value>
                  </>
                );
              case 2:
                return (
                  <>
                    <Key>Low Priority</Key>
                    <Value>Unlocks ~48hr</Value>
                  </>
                );
              case 3:
                return (
                  <>
                    <Key>Medium Priority</Key>
                    <Value>Unlocks ~24hr</Value>
                  </>
                );
              case 4:
                return (
                  <>
                    <Key>High Priority</Key>
                    <Value>Unlocks ~6hr</Value>
                  </>
                );

              default:
            }
          })()}
        </Row>
        <Row>
          <Key>Exchange Fee</Key>
          <Tag priority={priority}>
            <Value>
              {fee} {fromTicker}
            </Value>
          </Tag>
        </Row>
        <Confirm
          description="I have reviewed my Exchange and accept the transaction fee"
          checked={checked}
          onChange={onChange}
        />
      </Container>
    </Fragment>
  );
};

export default Transaction;
