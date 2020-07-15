// Library Imports
import React, { Fragment } from "react";

// Relative Imports
import { Container, Row, Key, Value } from "./styles";
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
          <Key>From Asset</Key>
          <Value>
            {fromAmount} {fromTicker}
          </Value>
        </Row>
        <Row>
          <Key>To Asset</Key>
          <Value>
            {toAmount} {toTicker}
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
                    <Key>Low Priority</Key>
                    <Value>Unlocks in ~2d</Value>
                  </>
                );
              case 2:
                return (
                  <>
                    <Key>Medium Priority</Key>
                    <Value>Unlocks ~18h</Value>
                  </>
                );
              case 3:
                return (
                  <>
                    <Key>High Priority</Key>
                    <Value>Unlocks ~6h</Value>
                  </>
                );
              case 4:
                return (
                  <>
                    <Key>Very High Priority</Key>
                    <Value>Unlocks ~2h</Value>
                  </>
                );

              default:
            }
          })()}
        </Row>
        <Row>
          <Key>Transaction Fee</Key>
          <Value>
            {fee} {fromTicker}
          </Value>
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
